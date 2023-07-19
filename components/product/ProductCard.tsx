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

  hideProps?: {
    hideName?: boolean;
    hidePrice?: boolean;
    hideListPrice?: boolean;
  };

  variant?: "default" | "withoutSlider";
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}`;
};

function ProductCard(
  {
    product,
    preload,
    itemListName,
    width = 309,
    height = 464,
    hideProps,
    variant = "default",
  }: Props,
) {
  const {
    url,
    productID,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const id = `product-card-${productID}`;
  const name = isVariantOf?.name ?? product.name;
  const productGroupID = isVariantOf?.productGroupID;

  const [front, back] = images ?? [];
  const { listPrice, price } = useOffer(offers);

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
      class={`group w-full rounded-none lg:mx-0 ${
        variant == "withoutSlider"
          ? `max-w-[683px] mx-0`
          : `max-w-[433px] mx-auto`
      }`}
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
      <figure
        class="card card-compact relative rounded-lg block"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {/* Wishlist button */}
        {
          /* <div class="absolute top-0 right-0 z-10">
          <WishlistIcon productGroupID={productGroupID} productID={productID} />
        </div> */
        }
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
            class={`absolute transition-opacity w-full opacity-100 group-hover:md:opacity-0 ${
              variant === "withoutSlider"
                ? `rounded-none`
                : `rounded-t-[0.5rem] md:rounded-[0.3rem]`
            }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={width}
            height={height}
            class="absolute transition-opacity w-full opacity-0 group-hover:md:opacity-100 rounded-b-[0.3rem]"
            sizes="(max-width: 640px) 50vw, 20vw"
            loading="lazy"
            decoding="async"
          />
        </a>
      </figure>
      {/* Prices & Name */}
      <div
        class={variant == "withoutSlider"
          ? `p-0`
          : `card-body ${
            hideProps?.hideName && hideProps?.hideListPrice &&
            hideProps?.hidePrice && "hidden"
          }`}
      >
        <h2
          class={`${
            hideProps?.hideName ? "hidden" : "block"
          } card-title whitespace-nowrap overflow-hidden ${
            variant == "withoutSlider" && `text-lg font-normal text-[#3f4040]`
          }`}
        >
          {name}
        </h2>
        <div class="flex items-end gap-2">
          <span
            class={`${
              hideProps?.hideListPrice ? "hidden" : "block"
            } line-through text-base-300 text-xs`}
          >
            {formatPrice(listPrice, offers!.priceCurrency!)}
          </span>
          <span
            class={`${
              hideProps?.hidePrice ? "hidden" : "block"
            } text-secondary ${
              variant == "withoutSlider" && `text-lg font-normal text-secondary`
            }`}
          >
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
