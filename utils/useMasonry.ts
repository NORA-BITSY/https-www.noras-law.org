import { useRef, useEffect } from "react";

export default function useMasonry() {
  const masonryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = masonryRef.current;
    if (!container) return;

    const resizeAllItems = () => {
      const items = container.children;
      if (items.length === 0) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i] as HTMLElement;
        item.style.gridRowEnd = "span 1";
      }

      // Wait for images to load before calculating heights
      setTimeout(() => {
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as HTMLElement;
          const rowHeight = parseInt(
            window.getComputedStyle(container).getPropertyValue("grid-auto-rows")
          );
          const rowGap = parseInt(
            window.getComputedStyle(container).getPropertyValue("grid-row-gap")
          );
          const rowSpan = Math.ceil(
            (item.querySelector("article")?.getBoundingClientRect().height || 0 + rowGap) /
              (rowHeight + rowGap)
          );
          item.style.gridRowEnd = `span ${rowSpan}`;
        }
      }, 100);
    };

    // Initial resize
    resizeAllItems();

    // Resize on window resize
    window.addEventListener("resize", resizeAllItems);

    // Observe content changes
    const observer = new MutationObserver(resizeAllItems);
    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      window.removeEventListener("resize", resizeAllItems);
      observer.disconnect();
    };
  }, []);

  return masonryRef;
}
