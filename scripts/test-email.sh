#!/bin/bash

# Email Testing Script for Nora's Law
# Tests Gmail SMTP configuration

set -e

echo "📧 Testing Gmail SMTP configuration..."

# Check if environment variables are set
if [ -z "$SMTP_USER" ] || [ -z "$SMTP_PASS" ]; then
    echo "❌ SMTP credentials not found in environment."
    echo "Please set SMTP_USER and SMTP_PASS in your .env.local file."
    exit 1
fi

# Create test email script
cat > test-email.js << 'EOF'
const nodemailer = require('nodemailer');

async function testEmail() {
    const transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    try {
        await transporter.verify();
        console.log('✅ SMTP connection successful!');

        // Send test email
        const info = await transporter.sendMail({
            from: `"Nora's Law" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            subject: 'Test Email from Nora\'s Law',
            html: `
                <h1>Nora's Law Email Test</h1>
                <p>This is a test email to verify SMTP configuration.</p>
                <p>Sent at: ${new Date().toISOString()}</p>
            `
        });

        console.log('✅ Test email sent successfully!');
        console.log('Message ID:', info.messageId);

    } catch (error) {
        console.error('❌ Email test failed:', error.message);
        process.exit(1);
    }
}

testEmail();
EOF

# Load environment variables
if [ -f ".env.local" ]; then
    export $(grep -v '^#' .env.local | xargs)
fi

# Run test
node test-email.js

# Clean up
rm test-email.js

echo "✅ Email testing complete!"
