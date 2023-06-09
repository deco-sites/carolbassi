import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import Quilltext from "deco-sites/std/components/QuillText.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Block {
  style: "image" | "text";
  /**
   * @description Block alignment
   */
  alignment: "flex-start" | "center" | "flex-end";
  /**
   * @description Block sizing
   * @default full
   */
  size: "full" | "large" | "small";
  image?: {
    /**
     * @description Mobile optimized image
     */
    mobile?: LiveImage;
    /**
     * @description Desktop optimized image
     */
    desktop?: LiveImage;
    /**
     * @description Image alternate text
     */
    alt: string;
    /**
     * @description Link where this image leads to
     */
    href: string;
    /** @default 100% */
    maxHeight?: string;
  };
  /**
   * @description Content for text-styled block
   */
  text?: HTML;
  /**
   * @description Hide or show block by screen size
   */
  visibility: {
    /** @default true */
    mobile: boolean;
    /** @default true */
    desktop: boolean;
  };
}

export interface Props {
  blocks: Block[];
}

function ImageBlock({ image }: Block) {
  if (!image) return null;

  return (
    <a href={image.href}>
      <Picture preload={false}>
        {image.mobile && (
          <Source
            media="(max-width: 1023px)"
            fetchPriority="low"
            src={image.mobile}
            width={360}
          />
        )}
        {image.desktop &&
          (
            <Source
              media="(min-width: 1024px)"
              fetchPriority="low"
              src={image.desktop}
              width={1440}
            />
          )}
        <img
          style={{ maxHeight: image.maxHeight ?? "100%" }}
          class="object-cover w-full hover:opacity-95"
          loading="lazy"
          src={image.desktop || image.mobile || ""}
          alt={image?.alt}
        />
      </Picture>
    </a>
  );
}

function TextBlock({ text }: Block) {
  return <Quilltext html={text ?? ""} />;
}

const BLOCK_SIZE = {
  full: "100%",
  large: "45%",
  small: "33%",
};

function Blocks({ blocks }: Props) {
  const renderOnMobile = blocks.length > 0 &&
    blocks.some((block) => block.visibility.mobile === true);

  const renderOnDesktop = blocks.length > 0 &&
    blocks.some((block) => block.visibility.desktop === true);

  return (
    <div
      class={`${renderOnMobile ? "flex" : "hidden"} ${
        renderOnDesktop ? "lg:flex" : "lg:hidden"
      } flex-col lg:flex-row px-2 lg:px-[100px] mt-[66px]`}
    >
      {blocks.map((block) => (
        <div
          class={`${block.visibility.mobile ? "block" : "hidden"} ${
            !block.visibility.desktop ? "lg:hidden" : "lg:block"
          }`}
          style={{
            width: BLOCK_SIZE[block.size],
            alignSelf: block.alignment,
          }}
        >
          {block.style === "image"
            ? <ImageBlock {...block} />
            : <TextBlock {...block} />}
        </div>
      ))}
    </div>
  );
}

export default Blocks;
