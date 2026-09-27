export function waitForImage(image: HTMLImageElement, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    async function decode() {
      try {
        // downloading is not enough, the browser also needs to prepare the image for display
        await image.decode();
        resolve();
      } catch {
        // skip broken images, but try again when a replacement image loads
        if (image.complete && image.naturalWidth === 0) {
          resolve();
        }
      }
    }

    image.addEventListener("load", decode, { signal });
    image.addEventListener("error", () => resolve(), { signal });
    // let the caller stop waiting while the browser continues loading the image
    signal.addEventListener("abort", () => resolve(), { once: true });

    // try now too, since a cached image may already be loaded
    void decode();
  });
}
