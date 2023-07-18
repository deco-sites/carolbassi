import { useId, useState } from "preact/hooks";
import { debounce } from "std/async/debounce.ts";
import Image from "deco-sites/std/components/Image.tsx";
import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderJS from "deco-sites/fashion/components/ui/SliderJS.tsx";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";

interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
}

const WIDTH = 360;
const HEIGHT = 500;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

interface Zoom {
  zoomed: boolean;
  x: number;
  y: number;
}

function SliderProductShowcase({ page }: { page: ProductDetailsPage }) {
  const { product } = page;
  const images = useStableImages(product);
  const id = `product-image-gallery:${useId()}`;

  const handleMouseLeave = (e: MouseEvent) => {
    const parent = (e.target as HTMLImageElement).parentElement;
    const image = parent?.querySelector("div");

    if (image) image.style.display = "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    const target = e.target as HTMLImageElement;
    const image = target.nextElementSibling as HTMLDivElement;

    if (!image) return;

    const { offsetWidth, offsetHeight } = image;

    const container = target.parentElement as HTMLLIElement;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const xPercentage =
      ((e.clientX - container.getBoundingClientRect().left) / containerWidth) *
      100;

    const yPercentage =
      ((e.clientY - container.getBoundingClientRect().top) / containerHeight) *
      100;

    image.style.display = "block";
    image.style.backgroundPosition = `${xPercentage}% ${yPercentage}%`;
  };

  return (
    <>
      {/* Image Slider */}
      <div
        id={id}
        class="relative sm:w-[67%] md:w-full lg2:w-[67%] sm:col-start-2 sm:col-span-1 sm:row-start-1"
      >
        <Slider class="carousel gap-6 sm:hidden">
          {images.map((img, index) => (
            <Slider.Item
              index={index}
              class="min-w-[100vw] sm:min-w-[40vw]"
            >
              <img
                class="w-full"
                sizes="(max-width: 640px) 100vw, 40vw"
                src={img.url!}
                alt={img.alternateName}
                // Preload LCP image for better web vitals
                loading={index === 0 ? "eager" : "lazy"}
              />
            </Slider.Item>
          ))}
        </Slider>

        <div class="hidden sm:block lg2:mr-[30px]">
          <ul class="flex flex-wrap">
            {images.map((img, index) => (
              <li class="relative max-w-[414px] m-1 md:w-[432px] md:h-[638px] md:max-w-[49%] md:max-h-full md:flex md:overflow-hidden md:justify-center md:relative md:items-center">
                <Image
                  class="w-full"
                  src={img.url!}
                  alt={img.alternateName}
                  width={WIDTH}
                  height={611}
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                />
                <div
                  class="hidden absolute bg-no-repeat w-full h-full pointer-events-none"
                  style={{
                    backgroundImage: `url(${img.url!})`,
                    backgroundSize: "200%",
                    backgroundPosition: "center",
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Dots */}
        <ul class="flex justify-center gap-2 sm:justify-start overflow-auto px-4 sm:px-0 sm:flex-col sm:col-start-1 sm:col-span-1 sm:row-start-1 sm:hidden">
          {images.map((_, index) => (
            <li class="carousel-item">
              <Slider.Dot index={index}>
                <div class="pt-4">
                  <div class="w-[10px] h-[10px] rounded-full bg-neutral group-disabled:bg-info" />
                </div>
              </Slider.Dot>
            </li>
          ))}
        </ul>
      </div>

      <SliderJS rootId={id}></SliderJS>
    </>
  );
}

export default SliderProductShowcase;
