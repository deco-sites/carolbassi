import Image from "deco-sites/std/components/Image.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import QuantitySelector from "deco-sites/fashion/components/ui/QuantitySelector.tsx";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { useToast } from "deco-sites/fashion/sdk/useToast.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";
import { sendEvent } from "deco-sites/fashion/sdk/analytics.tsx";
import type {
  Item as SkuVTEX,
  LegacyItem as LegacySkuVTEX,
} from "deco-sites/std/packs/vtex/types.ts";
import { useCallback, useEffect } from "preact/hooks";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

export type withProductName = {
  productName?: string;
};

export type withVariants = {
  Cores?: string[];
  Tamanho?: string[];
};

interface Props {
  index: number;
  realSku:
    | SkuVTEX & withProductName & withVariants
    | LegacySkuVTEX & withProductName & withVariants
    | null;
}

const ASSETS_URL = "https://carolbassi.vteximg.com.br/arquivos/";
const IMAGE_WIDTH = "96";
const IMAGE_HEIGHT = "auto";

function CartItem({ index, realSku }: Props) {
  const { loading, cart, updateItems, mapItemsToAnalyticsItems } = useCart();
  const { createToast } = useToast();
  const item = cart.value!.items[index];
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const AvailableQuantity =
    realSku?.sellers[0].commertialOffer.AvailableQuantity || 0;

  const {
    skuName,
    sellingPrice,
    listPrice,
    name,
    detailUrl,
    quantity,
  } = item;

  const isGift = sellingPrice < 0.01;

  const showListPrice = sellingPrice < listPrice;

  const imageUrl = `${ASSETS_URL}/ids/${
    realSku?.images[0].imageId
  }-${IMAGE_WIDTH}-${IMAGE_HEIGHT}`;

  const withLoading = useCallback(
    <A,>(cb: (args: A) => void) => async (e: A) => {
      try {
        loading.value = true;
        await cb(e);
      } finally {
        loading.value = false;
      }
    },
    [loading],
  );

  return (
    <div class="flex flex-row justify-between items-start gap-4">
      <a
        class="block w-[90px] h-[134px]"
        href={detailUrl}
        style={{
          backgroundImage: `url(${item.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {realSku && (
          <Image
            loading="lazy"
            style={{ opacity: "0" }}
            onLoad={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            src={imageUrl}
            alt={skuName}
            width={90}
            height={134}
            class="object-cover object-center hover:opacity-95 transition-opacity ease-in-out duration-200"
          />
        )}
      </a>
      <div class="flex-grow">
        <span class="uppercase text-xs font-semibold text-secondary-content">
          {item.additionalInfo.brandName}
        </span>
        <a
          class="block text-primary text-base lg:text-[15px] font-semibold lg:font-normal lg:min-h-[39px]"
          href={detailUrl}
        >
          <span>{realSku?.productName || name}</span>
        </a>
        <div class="flex flex-col mt-1 lg:mt-0">
          {realSku?.Cores && (
            <span class="text-sm text-secondary-content">
              Cores: {realSku?.Cores[0]}
            </span>
          )}
          {realSku?.Tamanho && (
            <span class="text-sm text-secondary-content">
              Tamanho: {realSku?.Tamanho[0]}
            </span>
          )}

          <div class="mt-4 max-w-min lg:hidden">
            <QuantitySelector
              disabled={loading.value || isGift}
              quantity={quantity}
              onChange={withLoading(async (_quantity) => {
                if (_quantity > AvailableQuantity) {
                  createToast(
                    `A quantidade desejada para o item ${name} não está disponível`,
                  );
                  return;
                }

                await updateItems({
                  orderItems: [{ index, quantity: _quantity }],
                });

                const quantityDiff = _quantity - item.quantity;

                if (!cart.value) return;

                sendEvent({
                  name: quantityDiff < 0 ? "remove_from_cart" : "add_to_cart",
                  params: {
                    items: mapItemsToAnalyticsItems({
                      items: [{
                        ...item,
                        quantity: Math.abs(quantityDiff),
                      }],
                      marketingData: cart.value.marketingData,
                    }),
                  },
                });
              })}
            />
          </div>

          {showListPrice && (
            <span class="line-through text-secondary-content text-xs">
              {formatPrice(listPrice / 100, currencyCode!, locale)}
            </span>
          )}
          <span class="text-primary-content text-base">
            {isGift ? "Grátis" : formatPrice(
              (sellingPrice / 100) * quantity,
              currencyCode!,
              locale,
            )}
          </span>
        </div>
      </div>
      <Button
        onClick={() => {
          updateItems({ orderItems: [{ index, quantity: 0 }] });
          if (!cart.value) return;
          sendEvent({
            name: "remove_from_cart",
            params: {
              items: mapItemsToAnalyticsItems({
                items: [item],
                marketingData: cart.value.marketingData,
              }),
            },
          });
        }}
        disabled={loading.value || isGift}
        loading={loading.value}
        class="btn btn-ghost min-h-0 h-auto hover:bg-transparent p-0"
      >
        <Icon class="hidden lg:block" id="Trash" width={19} height={18} />
        <Icon class="block lg:hidden text-secondary-content" id="TrashRetro" width={16} height={16} />
      </Button>
    </div>
  );
}

export default CartItem;
