import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderJS from "deco-sites/fashion/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import { headerHeight } from "../header/constants.ts";
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

export interface Banner {
  /** @description desktop optimized source */
  desktop: {
    /**
     * @title Over-image content
     * @description allows custom html content over the image (only works for images)
     */
    overContent?: {
      content: HTML;
      verticalAlignment: VerticalAlignment;
      horizontalAlignment: HorizontalAlignment;
    };
    source: SourceItem;
  };
  /** @description mobile optimized source */
  mobile: {
    /**
     * @title Over-image content
     * @description allows custom html content over the image (only works for images)
     */
    overContent?: {
      content: HTML;
      verticalAlignment: VerticalAlignment;
      horizontalAlignment: HorizontalAlignment;
    };
    source: SourceItem;
  };
  /** @description Image's alt text */
  alt: string;
  /** @description when user clicks on the image, go to this link */
  href: string;
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

const isVideo = (item: SourceItem): item is Video =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any).source === "string";

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
    href,
  } = image;

  const getContentAlignment = (
    vertical: VerticalAlignment,
    horizontal: HorizontalAlignment,
  ) => {
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
  };

  return (
    <>
      {/* Desktop View */}
      <a
        href={href ?? "#"}
        aria-label={`Go to ${href}`}
        class="hidden lg:block relative overflow-y-hidden w-full hover:opacity-95"
      >
        {isVideo(desktop.source)
          ? (
            <video
              class="pointer-events-none w-full"
              autoPlay
              loop
              muted
              preload={lcp ? "auto" : "none"}
            >
              <source src={desktop.source.source} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
          : (
            <>
              <Picture preload={lcp}>
                <Source
                  fetchPriority={lcp ? "high" : "auto"}
                  src={desktop.source}
                  width={1440}
                />
                <img
                  class="object-cover w-full"
                  loading={lcp ? "eager" : "lazy"}
                  src={desktop.source}
                  alt={alt}
                />
              </Picture>
              {desktop.overContent &&
                (
                  <div
                    style={getContentAlignment(
                      desktop.overContent.verticalAlignment,
                      desktop.overContent.horizontalAlignment,
                    )}
                    class="absolute w-max"
                  >
                    <Quilltext html={desktop.overContent.content} />
                  </div>
                )}
            </>
          )}
      </a>
      {/* Mobile View */}
      <a
        href={href ?? "#"}
        aria-label={`Go to ${href}`}
        class="block lg:hidden relative overflow-y-hidden w-full hover:opacity-95"
      >
        {isVideo(mobile.source)
          ? (
            <video
              class="pointer-events-none w-full "
              autoPlay
              loop
              muted
              preload={lcp ? "auto" : "none"}
            >
              <source src={mobile.source.source} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
          : (
            <>
              <Picture preload={lcp}>
                <Source
                  fetchPriority={lcp ? "high" : "auto"}
                  src={mobile.source}
                  width={360}
                />
                <img
                  class="object-cover w-full"
                  loading={lcp ? "eager" : "lazy"}
                  src={mobile.source}
                  alt={alt}
                />
              </Picture>
              {mobile.overContent &&
                (
                  <div
                    style={getContentAlignment(
                      mobile.overContent.verticalAlignment,
                      mobile.overContent.horizontalAlignment,
                    )}
                    class="absolute w-max"
                  >
                    <Quilltext html={mobile.overContent.content} />
                  </div>
                )}
            </>
          )}
      </a>
    </>
  );
}

function Dots({ images, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-16 sm:w-20 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function BannerCarousel({ images, preload, interval }: Props) {
  const id = useId();

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media screen and (max-width: 1023px) {
              #${id} ul.carousel {
                margin-top: ${headerHeight};
              }
            }
          `,
        }}
      />
      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
      >
        <Slider class="carousel carousel-center col-span-full row-span-full scrollbar-none gap-6">
          {images?.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem image={image} lcp={index === 0 && preload} />
            </Slider.Item>
          ))}
        </Slider>

        {images && images.length > 1 && (
          <Dots images={images} interval={interval} />
        )}

        <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
    </>
  );
}

export default BannerCarousel;
