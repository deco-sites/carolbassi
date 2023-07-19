import Image from "deco-sites/std/components/Image.tsx";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnClick } from "$store/sdk/analytics.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  width?: number;
  height?: number;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}`;
};

function SearchbarProductCard(
  { product, preload, itemListName, width = 200, height = 279 }: Props,
) {
  const {
    url,
    productID,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const id = `sb-product-card-${productID}`;
  const name = isVariantOf?.name ?? product.name;
  const [front] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const clickEvent = {
    name: "select_item" as const,
    params: {
      item_list_name: itemListName,
      items: [
        mapProductToAnalyticsItem({
          product,
          price,
          listPrice,
        }),
      ],
    },
  };

  return (
    <div
      class="card card-compact group w-full rounded-none"
      data-deco="view-product"
      id={`product-card-${productID}`}
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
      <figure class="relative " style={{ aspectRatio: `${width} / ${height}` }}>
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="contents"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={width}
            height={height}
            class="absolute transition-opacity w-full opacity-100 hover:opacity-95"
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </a>
      </figure>
      {/* Prices & Name */}
      <div class="flex flex-col pt-1 px-4">
        <h2 class="text-sm text-center overflow-hidden mb-2">{name}</h2>
        <div class="flex flex-col gap-2 text-center">
          <span class="text-sm text-secondary">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
          <span class="text-sm">
            {installments}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SearchbarProductCard;
