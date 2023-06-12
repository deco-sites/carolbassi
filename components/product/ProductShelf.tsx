import ProductCard from "deco-sites/fashion/components/product/ProductCard.tsx";
import SliderJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import { SendEventOnLoad } from "deco-sites/fashion/sdk/analytics.tsx";
import { useId } from "preact/hooks";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  title: string;
  subTitle: string;
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;

  hideProps: {
    hideName?: boolean;
    hidePrice?: boolean;
    hideListPrice?: boolean;
  };
}

function ProductShelf({
  title,
  subTitle,
  products,
  hideProps,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <>
      <div class="my-7 lg:mt-[78px] lg:mb-[73px] text-center row-start-1 col-span-full">
        <p class="font-bold text-xl lg:text-3xl">{title}</p>
        <p class="font-medium text-base lg:text-xl">{subTitle}</p>
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
                itemListName={title}
              />
            </Slider.Item>
          ))}
        </Slider>

        <SliderJS rootId={id} />
        <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
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
