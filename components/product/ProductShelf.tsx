import ProductCard from "deco-sites/fashion/components/product/ProductCard.tsx";
import SliderJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import { SendEventOnLoad } from "deco-sites/fashion/sdk/analytics.tsx";
import { useId } from "preact/hooks";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import type { HTML } from "deco-sites/std/components/types.ts";
import Quilltext from "deco-sites/std/components/QuillText.tsx";

export interface Props {
  titles: {
    titleMobile?: HTML;
    subTitleMobile?: HTML;
    titleDesktop?: HTML;
    subTitleDesktop?: HTML;
  };
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;

  hideProps: {
    hideName?: boolean;
    hidePrice?: boolean;
    hideListPrice?: boolean;
  };
  variant: "default" | "withoutSlider";
}

function ProductShelf({
  titles,
  products,
  hideProps,
  variant = "default",
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  if (variant === "withoutSlider") {
    return (
      <>
        {/* Mobile View for title */}
        <div class="my-7 lg:mt-[78px] lg:mb-[73px] text-center row-start-1 col-span-full md:hidden">
          <p class="">
            {titles.titleMobile && <Quilltext html={titles.titleMobile} />}
          </p>
          <p class="">
            {titles.subTitleMobile && (
              <Quilltext html={titles.subTitleMobile} />
            )}
          </p>
        </div>

        {/* Desktop View for title */}
        <div class="hidden md:block my-7 lg:mt-[78px] lg:mb-[73px] text-center row-start-1 col-span-full">
          <p class="">
            {titles.titleDesktop && <Quilltext html={titles.titleDesktop} />}
          </p>
          <p class="">
            {titles.subTitleDesktop && (
              <Quilltext html={titles.subTitleDesktop} />
            )}
          </p>
        </div>

        <div>
          <ul class="max-w-[1280px] mx-auto list-none flex flex-col lg:flex-row justify-between">
            {products?.map((product, index) => (
              <li class="w-full mb-5 lg:w-[32%]">
                <ProductCard
                  width={683}
                  height={1024}
                  variant="withoutSlider"
                  hideProps={hideProps}
                  product={product}
                  itemListName={titles.titleMobile}
                />
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Mobile View for title */}
      <div class="my-7 lg:mt-[78px] lg:mb-[73px] text-center row-start-1 col-span-full md:hidden">
        <p class="">
          {titles.titleMobile && <Quilltext html={titles.titleMobile} />}
        </p>
        <p class="">
          {titles.subTitleMobile && <Quilltext html={titles.subTitleMobile} />}
        </p>
      </div>

      {/* Desktop View for title */}
      <div class="hidden md:block my-7 lg:mt-[78px] lg:mb-[73px] text-center row-start-1 col-span-full">
        <p class="">
          {titles.titleDesktop && <Quilltext html={titles.titleDesktop} />}
        </p>
        <p class="">
          {titles.subTitleDesktop && (
            <Quilltext
              html={titles.subTitleDesktop}
            />
          )}
        </p>
      </div>
      <div
        id={id}
        class="w-full mx-auto grid grid-cols-[48px_1fr_48px] px-4 lg2:px-1 lg2:max-w-7xl"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-3 col-span-full row-start-2 row-end-5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full sm:w-[49%] lg2:w-[24%] lg2:h-[464px] sm:justify-center lg2:justify-normal lg2:px-0 lg2:max-w-[309px] first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0"
            >
              <ProductCard
                hideProps={hideProps}
                product={product}
                itemListName={titles.titleDesktop}
              />
            </Slider.Item>
          ))}
        </Slider>

        <SliderJS rootId={id} />
        <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: titles.titleDesktop,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </>
  );
}

export default ProductShelf;
