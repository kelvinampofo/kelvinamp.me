import Heading from "../../components/heading/Heading";

export const metadata = {
  title: "On Media Formats",
  description: "Some notes on media formats for reference.",
  publishedDate: "2025-05-08",
};

export default function MediaFormats() {
  return (
    <>
      <Heading>On Media Formats</Heading>
      <p>
        Some notes on media formats. Recommended watch:{" "}
        <a href="https://youtu.be/qB9L-ZYM1_0?si=ZRq60cGJWnDxZFxX">
          Explore media formats for the web
        </a>
        .
      </p>
      <Heading as="h2">GIF</Heading>
      <ul>
        <li>8 bits per pixel (256 colours), huge file sizes.</li>
        <li>
          good for memes, bad for actual image quality&mdash;avoid for anything
          longer than a few seconds
        </li>
      </ul>
      <Heading as="h2">JPEG</Heading>
      <ul>
        <li>lossy compression, great for photos</li>
        <li>no transparency support&mdash;supports progressive loading</li>
      </ul>
      <Heading as="h2">PNG</Heading>
      <ul>
        <li>lossless with alpha channel</li>
        <li>best for UI elements, not efficient for photo-like images</li>
      </ul>
      <Heading as="h2">WebP</Heading>
      <ul>
        <li>
          supports animation, transparency, and both lossy and lossless
          compression
          <ul>
            <li>
              lossy:{" "}
              <a href="https://developers.google.com/speed/webp/docs/webp_study">
                ~25-34%
              </a>{" "}
              smaller than JPEG
            </li>
            <li>
              lossless:{" "}
              <a href="https://developers.google.com/speed/webp/docs/webp_lossless_alpha_study#results">
                ~26%
              </a>{" "}
              smaller than PNG
            </li>
          </ul>
        </li>
        <li>
          better than GIF, PNG, and JPEG in most cases&mdash;ideal for the
          modern web; ensure fallback for older Safari versions (&lt; 14)
        </li>
      </ul>
      <Heading as="h2">AVIF</Heading>
      <ul>
        <li>
          newer format built on AV1 codec to achieve a high compression rate
          with no sacrifice to video quality
        </li>
        <li>
          smaller than JPEG/WebP, supports up to 12 bits colour depth, HDR, and
          animation
        </li>
        <li>
          should be the default if supported, though decoding can be
          CPU-intensive on some platforms
        </li>
      </ul>
      <Heading as="h2">JPEG XL</Heading>
      <ul>
        <li>designed to replace JPEG, with both lossy and lossless support</li>
        <li>discontinued or disabled support (e.g., Chrome)</li>
      </ul>
      <Heading as="h2">HEIC</Heading>
      <ul>
        <li>Apple’s format for iOS photos</li>
        <li>
          great compression, Live Photo support, depth data&mdash;not safe for
          the web, convert to WebP or AVIF first
        </li>
        <li>
          use the HTML <code>&lt;picture&gt;</code> element to specify
          fallbacks, allowing the browser to choose a supported format from top
          to bottom.
        </li>
      </ul>
      <aside aria-label="This is a code block of an HTML picture element with source fallbacks for HEIC, AVIF, WebP, and JPEG.">
        <pre>
          <code className="language-html">{`<picture>
  <source srcset="image.heic" type="image/heic" />
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="descriptive text" />
</picture>`}</code>
        </pre>
      </aside>
      <Heading as="h2">General Guidelines</Heading>
      <ul>
        <li>prefer AVIF -&gt; WebP -&gt; JPEG/PNG</li>
        <li>for UI assets: SVG &gt; PNG</li>
        <li>avoid GIF unless essential</li>
        <li>use WebP or video formats for animations</li>
        <li>
          for{" "}
          <a href="https://developer.apple.com/documentation/webkit/wkwebview">
            WKWebView
          </a>
          : use HEIC for hardware acceleration
        </li>
        <li>always serve the smallest viable file</li>
      </ul>
    </>
  );
}
