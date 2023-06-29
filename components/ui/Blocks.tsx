import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import Quilltext from "deco-sites/std/components/QuillText.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export type VerticalAlignment = "top" | "center" | "bottom";
export type HorizontalAlignment = "left" | "center" | "right";

export type OverContent = {
  content: HTML;
  verticalAlignment: VerticalAlignment;
  horizontalAlignment: HorizontalAlignment;
};

export type Image = {
  /**
   * @description Mobile optimized image
   */
  mobile?: {
    /**
     * @title Over-image content
     * @description allows custom html content over the image
     */
    overContent?: OverContent;
    source: LiveImage;
  };
  /**
   * @description Desktop optimized image
   */
  desktop?: {
    /**
     * @title Over-image content
     * @description allows custom html content over the image
     */
    overContent?: OverContent;
    source: LiveImage;
  };
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

export type Text = {
  content: HTML;
};

export interface Block {
  /**
   * @description Block alignment
   */
  alignment: VerticalAlignment;
  /**
   * @description Block sizing
   * @default full
   */
  size: "full" | "large" | "small";
  style: Image | Text;
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

const isImage = (item: Image | Text): item is Image =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any).href === "string";

function getAlignmentStyle(alignment: VerticalAlignment) {
  switch (alignment) {
    case "top":
      return "flex-start";
    case "center":
      return "center";
    case "bottom":
      return "flex-end";
  }
}

function getContentAlignment(
  vertical: VerticalAlignment,
  horizontal: HorizontalAlignment,
) {
  let top = "0";
  let left = "0";
  let transform = "none";

  switch (vertical) {
    case "top":
      break;
    case "center":
      top = "50%";
      transform = "translateY(-50%)";
      break;
    case "bottom":
      top = "100%";
      transform = "translateY(-100%)";
      break;
  }

  switch (horizontal) {
    case "left":
      break;
    case "center":
      left = "50%";
      transform += " translateX(-50%)";
      break;
    case "right":
      left = "100%";
      transform += " translateX(-100%)";
      break;
  }

  return { left, top, transform };
}

function ImageBlock({ style }: Block) {
  if (!style || !isImage(style)) return null;

  return (
    <a class="block relative" href={style.href}>
      <Picture preload={false}>
        {style.mobile && (
          <Source
            media="(max-width: 1023px)"
            fetchPriority="low"
            src={style.mobile.source}
            width={360}
          />
        )}
        {style.desktop &&
          (
            <Source
              media="(min-width: 1024px)"
              fetchPriority="low"
              src={style.desktop.source}
              width={1440}
            />
          )}
        <img
          style={{ maxHeight: style.maxHeight ?? "100%" }}
          class="object-cover w-full hover:opacity-95"
          loading="lazy"
          src={style.desktop?.source || style.mobile?.source || ""}
          alt={style?.alt}
        />
      </Picture>
      {style.desktop?.overContent &&
        (
          <div
            style={getContentAlignment(
              style.desktop.overContent.verticalAlignment,
              style.desktop.overContent.horizontalAlignment,
            )}
            class="absolute w-max hidden lg:block"
          >
            <Quilltext html={style.desktop.overContent.content} />
          </div>
        )}
      {style.mobile?.overContent &&
        (
          <div
            style={getContentAlignment(
              style.mobile.overContent.verticalAlignment,
              style.mobile.overContent.horizontalAlignment,
            )}
            class="absolute w-max block lg:hidden"
          >
            <Quilltext html={style.mobile.overContent.content} />
          </div>
        )}
    </a>
  );
}

function TextBlock({ style }: Block) {
  if (isImage(style)) return null;

  return <Quilltext html={style.content ?? ""} />;
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
            alignSelf: getAlignmentStyle(block.alignment),
          }}
        >
          {isImage(block.style)
            ? <ImageBlock {...block} />
            : <TextBlock {...block} />}
        </div>
      ))}
    </div>
  );
}

export default Blocks;
