import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";
import Quilltext from "deco-sites/std/components/QuillText.tsx";

import type {
  Image as LiveImage,
  Video as LiveVideo,
} from "deco-sites/std/components/types.ts";

export interface Props {
  /** @description desktop optimized content */
  desktop?: {
    source: LiveImage | LiveVideo;
    /** @description Check this if this is a video */
    isVideo: boolean;
  };
  /** @description mobile optimized content */
  mobile?: {
    source: LiveImage | LiveVideo;
    /** @description Check this if this is a video */
    isVideo: boolean;
  };
  /**
   * @title Over-image content
   * @description allows custom html content over the image (only works for images)
   */
  overContent?: {
    content: HTML;
    alignment:
      | "top-left"
      | "top-center"
      | "top-right"
      | "left-center"
      | "center"
      | "right-center"
      | "bottom-left"
      | "bottom-center"
      | "bottom-right";
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

function ImageOrVideo(
  { desktop, mobile, alt = "", href = "#!", preload = false, overContent }:
    Props,
) {
  const getContentAlignment = () => {
    switch (overContent?.alignment) {
      case "top-left":
        return { top: 0, left: 0 };
      case "top-center":
        return { top: 0, left: "50%", transform: "translateX(-50%)" };
      case "top-right":
        return { top: 0, right: 0 };
      case "left-center":
        return { top: "50%", transform: "translateY(-50%)" };
      case "center":
        return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
      case "right-center":
        return { top: "50%", right: 0, transform: "translateY(-50%)" };
      case "bottom-left":
        return { bottom: 0, left: 0 };
      case "bottom-center":
        return { bottom: 0, left: "50%", transform: "translateX(-50%)" };
      case "bottom-right":
        return { bottom: 0, right: 0 };
      default:
        return {
          top: 0,
          left: 0,
        };
    }
  };
  return (
    <>
      {/* Mobile view */}
      {mobile && (
        <div class="block lg:hidden mt-[60px] relative">
          <a
            href={href}
            aria-label={`Go to ${href}`}
            style={{ cursor: href === "#!" ? "auto" : "pointer" }}
            class="relative overflow-y-hidden w-full hover:opacity-95"
          >
            {mobile.isVideo
              ? (
                <>
                  <video
                    class="pointer-events-none w-full"
                    autoPlay
                    loop
                    muted
                    preload={preload ? "auto" : "none"}
                  >
                    <source src={mobile.source} type="video/mp4" />
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
                  {overContent &&
                    (
                      <div
                        style={getContentAlignment()}
                        class="absolute"
                      >
                        <Quilltext html={overContent.content} />
                      </div>
                    )}
                </>
              )}
          </a>
        </div>
      )}
      {/* Desktop View */}
      {desktop && (
        <div class="hidden lg:block mt-[67px] relative">
          <a
            href={href}
            aria-label={`Go to ${href}`}
            style={{ cursor: href === "#!" ? "auto" : "pointer" }}
            class="relative overflow-y-hidden w-full hover:opacity-95"
          >
            {desktop.isVideo
              ? (
                <>
                  <video
                    class="pointer-events-none w-full"
                    autoPlay
                    loop
                    muted
                    preload={preload ? "auto" : "none"}
                  >
                    <source src={desktop.source} type="video/mp4" />
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
                  {overContent &&
                    (
                      <div
                        style={getContentAlignment()}
                        class="absolute"
                      >
                        <Quilltext html={overContent.content} />
                      </div>
                    )}
                </>
              )}
          </a>
        </div>
      )}
    </>
  );
}

export default ImageOrVideo;
