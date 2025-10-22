import { ChromaClient } from 'chromadb';

const chromaUrl = process.env.CHROMA_URL || 'http://localhost:8000';

export const chromaClient = new ChromaClient({
  path: chromaUrl,
});

// Collection names
export const COLLECTIONS = {
  DOCUMENTS: 'documents',
  EVIDENCE: 'evidence',
  CASE_NOTES: 'case_notes',
  LEGAL_PRECEDENTS: 'legal_precedents',
};

// Initialize collections
export async function initializeCollections() {
  try {
    // Create collections if they don't exist
    const collections = await chromaClient.listCollections();

    const existingNames = collections.map(c => c.name);

    for (const [key, name] of Object.entries(COLLECTIONS)) {
      if (!existingNames.includes(name)) {
        await chromaClient.createCollection({
          name,
          metadata: { description: `Collection for ${key.toLowerCase()}` }
        });
        console.log(`✅ Created collection: ${name}`);
      }
    }
  } catch (error) {
    console.error('❌ Error initializing ChromaDB collections:', error);
    throw error;
  }
}

// Document operations
export async function addDocument(
  collectionName: string,
  id: string,
  document: string,
  metadata?: Record<string, any>
) {
  try {
    const collection = await chromaClient.getCollection({ name: collectionName });
    await collection.add({
      ids: [id],
      documents: [document],
      metadatas: metadata ? [metadata] : undefined,
    });
  } catch (error) {
    console.error(`❌ Error adding document to ${collectionName}:`, error);
    throw error;
  }
}

export async function searchDocuments(
  collectionName: string,
  queryText: string,
  nResults: number = 5
) {
  try {
    const collection = await chromaClient.getCollection({ name: collectionName });
    const results = await collection.query({
      queryTexts: [queryText],
      nResults,
    });
    return results;
  } catch (error) {
    console.error(`❌ Error searching ${collectionName}:`, error);
    throw error;
  }
}

export async function deleteDocument(collectionName: string, id: string) {
  try {
    const collection = await chromaClient.getCollection({ name: collectionName });
    await collection.delete({ ids: [id] });
  } catch (error) {
    console.error(`❌ Error deleting document from ${collectionName}:`, error);
    throw error;
  }
}
