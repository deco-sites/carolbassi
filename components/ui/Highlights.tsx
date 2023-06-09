import Image from "deco-sites/std/components/Image.tsx";
import SliderJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { HTML } from "deco-sites/std/components/types.ts";
import Quilltext from "deco-sites/std/components/QuillText.tsx";

export type ContentAlignment =
  | "top-left"
  | "top-center"
  | "top-right"
  | "left-center"
  | "center"
  | "right-center"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface Highlight {
  src: {
    mobile: LiveImage;
    desktop: LiveImage;
  };
  alt: string;
  href: string;
  label: string;
  /**
   * @title Over-image content
   * @description allows custom html content over the image (only works for images)
   */
  overContent?: {
    content: HTML;
    alignment: ContentAlignment;
  };
}

export interface Props {
  highlights?: Highlight[];
  desktopTitle?: string;
  mobileTitle?: string;
}

function Dots({ highlights }: Props) {
  return (
    <>
      <ul class="carousel justify-center col-span-full gap-2 z-10 row-start-4 lg:hidden">
        {highlights?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="pt-4">
                <div class="w-[10px] h-[10px] rounded-full bg-warning group-disabled:bg-info" />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Highlights(
  { highlights = [], desktopTitle = "", mobileTitle = "" }: Props,
) {
  const id = useId();

  const getContentAlignment = (alignment: ContentAlignment) => {
    switch (alignment) {
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
    <div
      id={id}
      class="w-full max-w-[96rem] mx-auto px-2 lg:px-1 grid grid-cols-1 mt-[70px]"
    >
      {mobileTitle && (
        <h2 class="block lg:hidden text-center">
          <span class="font-bold text-xl">{mobileTitle}</span>
        </h2>
      )}
      {desktopTitle && (
        <h2 class="hidden lg:block text-center">
          <span class="font-bold text-3xl">{desktopTitle}</span>
        </h2>
      )}

      <Slider class="carousel carousel-center sm:carousel-end gap-[6px] mt-4 lg:mt-[72px]">
        {highlights.map(({ href, src, alt, overContent }, index) => (
          <Slider.Item
            index={index}
            class="carousel-item first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0 w-full lg:max-w-[33%]"
          >
            <a href={href} class="max-w-[357px] mx-auto lg:max-w-none relative">
              <figure class="hover:opacity-95">
                <Image
                  class="block lg:hidden w-full"
                  src={src.mobile}
                  alt={alt}
                  width={190}
                  loading="lazy"
                />
                <Image
                  class="hidden lg:block w-full"
                  src={src.desktop}
                  alt={alt}
                  width={500}
                  loading="lazy"
                />
              </figure>
              {overContent &&
                (
                  <div
                    style={getContentAlignment(overContent.alignment)}
                    class="absolute"
                  >
                    <Quilltext html={overContent.content} />
                  </div>
                )}
            </a>
          </Slider.Item>
        ))}
      </Slider>

      <Dots highlights={highlights} />

      <SliderJS rootId={id} />
    </div>
  );
}

export default Highlights;
