import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { useUI } from "deco-sites/fashion/sdk/useUI.ts";
import { useToast } from "deco-sites/fashion/sdk/useToast.ts";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";
import { OrderFormItem } from "deco-sites/std/packs/vtex/types.ts";
import { sendEvent } from "deco-sites/fashion/sdk/analytics.tsx";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

export interface Options {
  skuId: string;
  sellerId?: string;
  price: number;
  discount: number;
  /**
   * sku name
   */
  name: string;
  productGroupId: string;
  goCheckout?: boolean;
}

export const useAddToCart = (
  {
    skuId,
    sellerId,
    price,
    discount,
    name,
    productGroupId,
    goCheckout = false,
  }: Options,
) => {
  const isAddingToCart = useSignal(false);
  const { displayCart } = useUI();
  const { cart, addItems, updateItems } = useCart();
  const { createToast } = useToast();

  const onClick = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!sellerId) {
      return;
    }

    if (!cart.value?.items) return;

    try {
      isAddingToCart.value = true;

      const alreadyInCart = cart.value.items.findIndex((item: OrderFormItem) =>
        item.id === skuId
      );

      if (typeof alreadyInCart !== "undefined" && alreadyInCart !== -1) {
        const quantity = cart.value.items[alreadyInCart].quantity + 1;

        const itemName = cart.value.items[alreadyInCart].name;

        await updateItems({
          orderItems: [{ index: alreadyInCart, quantity }],
        });

        const message = cart.value.messages[cart.value.messages.length - 1];

        if (
          message.code === "itemQuantityNotAvailable" &&
          message.text.includes(itemName)
        ) {
          createToast({
            message:
              `A quantidade desejada para o item ${itemName} não está disponível`,
            openDelay: 350,
          });
        }

        sendEvent({
          name: "add_to_cart",
          params: {
            items: [{
              item_id: productGroupId,
              quantity,
              price,
              discount,
              item_name: name,
              item_variant: skuId,
            }],
          },
        });
      } else {
        await addItems({
          orderItems: [{ id: skuId, seller: sellerId, quantity: 1 }],
        });

        sendEvent({
          name: "add_to_cart",
          params: {
            items: [{
              item_id: productGroupId,
              quantity: 1,
              price,
              discount,
              item_name: name,
              item_variant: skuId,
            }],
          },
        });
      }

      if (goCheckout) {
        window.location.href =
          "https://carolbassi.vtexcommercestable.com.br/checkout";
      } else {
        displayCart.value = true;
      }
    } finally {
      isAddingToCart.value = false;
    }
  }, [skuId, sellerId]);

  return { onClick, loading: isAddingToCart.value };
};
