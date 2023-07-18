import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/tailwind.css")} rel="stylesheet" />

      {/* Icons */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .ql-editor {
              padding: 0 !important;
            }

            .product-disabled {
              background-image: linear-gradient(to top right,transparent 44%,rgba(0,0,0,.3) 48%,currentColor 0,currentColor 52%,transparent 0);
            }

            .scrollButton {
              display: none;
              position: fixed;
              bottom: 15px;
              width: 90%;
              background: #adcfdf;
              height: 60px;
              left: 50%;
              transform: translateX(-50%);
              z-index: 50;
              margin: auto;
              cursor: pointer;
            }
            `,
        }}
      />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
    </Head>
  );
}

export default GlobalTags;
