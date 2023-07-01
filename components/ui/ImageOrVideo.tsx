import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";
import Quilltext from "deco-sites/std/components/QuillText.tsx";

import type {
  Image as LiveImage,
  Video as LiveVideo,
} from "deco-sites/std/components/types.ts";

export type Video = {
  source: LiveVideo;
};

export type SourceItem = LiveImage | Video;

export type VerticalAlignment = "top" | "center" | "bottom";
export type HorizontalAlignment = "left" | "center" | "right";

export type OverContent = {
  content: HTML;
  verticalAlignment: VerticalAlignment;
  horizontalAlignment: HorizontalAlignment;
};

export interface Props {
  /** @description desktop optimized content */
  desktop?: {
    source?: SourceItem;
    overContent?: OverContent[];
  };
  /** @description mobile optimized content */
  mobile?: {
    source?: SourceItem;
    overContent?: OverContent[];
  };
  /** @description Image's alt text */
  alt?: string;
  /** @description when user clicks on the content, go to this link */
  href?: string;
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
}

const isVideo = (item: SourceItem): item is Video =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any).source === "string";

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

function ImageOrVideo(
  { desktop, mobile, alt = "", href = "#!", preload = false }: Props,
) {
  return (
    <>
      {/* Mobile view */}
      {mobile && mobile.source && (
        <div class="block lg:hidden mt-[60px] relative">
          <a
            href={href}
            aria-label={`Go to ${href}`}
            style={{ cursor: href === "#!" ? "auto" : "pointer" }}
            class="relative overflow-y-hidden w-full hover:opacity-95"
          >
            {isVideo(mobile.source)
              ? (
                <>
                  <video
                    class="pointer-events-none w-full"
                    autoPlay
                    loop
                    muted
                    preload={preload ? "auto" : "none"}
                  >
                    <source src={mobile.source.source} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </>
              )
              : (
                <>
                  <Picture preload={preload}>
                    <Source
                      media="(max-width: 1023px)"
                      fetchPriority={preload ? "high" : "auto"}
                      src={mobile.source}
                      width={360}
                    />
                    <img
                      class="object-cover w-full"
                      loading={preload ? "eager" : "lazy"}
                      src={mobile.source}
                      alt={alt}
                    />
                  </Picture>
                  {mobile.overContent &&
                    mobile.overContent.map((overContent) => (
                      <div
                        style={getContentAlignment(
                          overContent.verticalAlignment,
                          overContent.horizontalAlignment,
                        )}
                        class="absolute"
                      >
                        <Quilltext html={overContent.content} />
                      </div>
                    ))}
                </>
              )}
          </a>
        </div>
      )}
      {/* Desktop View */}
      {desktop && desktop.source && (
        <div class="hidden lg:block mt-[67px] relative">
          <a
            href={href}
            aria-label={`Go to ${href}`}
            style={{ cursor: href === "#!" ? "auto" : "pointer" }}
            class="relative overflow-y-hidden w-full hover:opacity-95"
          >
            {isVideo(desktop.source)
              ? (
                <>
                  <video
                    class="pointer-events-none w-full"
                    autoPlay
                    loop
                    muted
                    preload={preload ? "auto" : "none"}
                  >
                    <source src={desktop.source.source} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </>
              )
              : (
                <>
                  <Picture preload={preload}>
                    <Source
                      media="(min-width: 1024px)"
                      fetchPriority={preload ? "high" : "auto"}
                      src={desktop.source}
                      width={1440}
                    />
                    <img
                      class="object-cover w-full"
                      loading={preload ? "eager" : "lazy"}
                      src={desktop.source}
                      alt={alt}
                    />
                  </Picture>
                  {desktop.overContent &&
                    desktop.overContent.map((overContent) => (
                      <div
                        style={getContentAlignment(
                          overContent.verticalAlignment,
                          overContent.horizontalAlignment,
                        )}
                        class="absolute"
                      >
                        <Quilltext html={overContent.content} />
                      </div>
                    ))}
                </>
              )}
          </a>
        </div>
      )}
    </>
  );
}

export default ImageOrVideo;
