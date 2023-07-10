import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";
import { sendEvent } from "deco-sites/fashion/sdk/analytics.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import CartItem from "./CartItem.tsx";
// import Coupon from "./Coupon.tsx";
import { Runtime } from "../../runtime.ts";
import { useCallback, useEffect, useState } from "preact/hooks";
import { pickSku } from "deco-sites/std/packs/vtex/utils/transform.ts";
import type { LegacyProduct } from "deco-sites/std/packs/vtex/types.ts";
import ToastContainer from "deco-sites/fashion/components/ui/ToastContainer.tsx";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

const CHECKOUT_URL = "https://carolbassi.vtexcommercestable.com.br/checkout";

export type withProductName = {
  productName?: string;
};

export type LegacyProductWithName = LegacyProduct & withProductName;

function Cart() {
  const { cart, loading, mapItemsToAnalyticsItems } = useCart();
  const isCartEmpty = cart.value?.items.length === 0;
  const totalizers = cart.value?.totalizers;
  const total = totalizers?.find((item) => item.id === "Items")?.value || 0;
  const discounts =
    totalizers?.find((item) => item.id === "Discounts")?.value || 0;
  const subtotal = total + (discounts * -1) || 0;
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const [productList, setProductList] = useState<
    LegacyProductWithName[] | null
  >([]);

  if (cart.value === null) {
    return null;
  }

  // Empty State
  if (isCartEmpty) {
    return (
      <div class="flex flex-col justify-center items-center h-full gap-6 border-t border-[rgba(0,0,0,.13)]">
        <span class="hidden lg:block font-normal text-base">
          Seu carrinho está vazio {":("}
        </span>
        <span class="block lg:hidden text-warning-content">
          <Icon id="FilledCart" width={64} height={64} />
        </span>
      </div>
    );
  }

  const getCartItemRealSku = (index: number) => {
    if (!productList) return null;

    const item = productList?.find((item) =>
      item.productId === cart.value?.items[index].productId
    );

    if (item) {
      const sku = pickSku(item, cart.value?.items[index].id);
      // deno-lint-ignore no-explicit-any
      (sku as any).productName = item.productName;

      return sku;
    }

    return null;
  };

  const getProductList = useCallback(async (ids: string[]) => {
    const data = await Runtime.invoke({
      key: "deco-sites/carolbassi/loaders/customFilterSearch.ts",
      props: { fq: `productId:${ids.join(",productId:")}`, count: ids.length },
    });

    return data;
  }, []);

  useEffect(() => {
    const promise = async (ids: string[]) => {
      const data = await getProductList(ids);
      setProductList(data);
    };

    if (cart.value?.items) {
      const productIDs = cart.value?.items.map((item) => item.productId);
      promise(productIDs);
    }
  }, [cart.value]);

  return (
    <div class="flex flex-col h-full w-full border-t border-info">
      <div class="absolute top-[15px] left-[15px] hidden lg:block">
        <Icon
          id="ShoppingCart"
          width={30}
          height={30}
          viewBox="0 0 20 20"
        />
        <span class="absolute -top-2 left-5 bg-info rounded-full text-white w-[22px] h-[22px] grid place-items-center text-[13px] font-normal">
          {cart.value.items.length.toString()}
        </span>
      </div>
      {/* Cart Items */}
      <ul
        role="list"
        class="pt-[45px] px-3 lg:px-6 flex-grow overflow-y-auto flex flex-col gap-1"
      >
        {cart.value.items.map((_, index) => (
          <li>
            <CartItem
              realSku={getCartItemRealSku(index)}
              index={index}
              key={index}
            />
          </li>
        ))}
      </ul>

      {/* Cart Footer */}
      <footer class="shadow-minicart-footer bg-[hsla(0,0%,96.9%,.6)] pb-[50px] pt-4">
        {/* Subtotal */}
        <div class="pt-2 flex lg:hidden flex-col mx-3 gap-2 lg:mx-6">
          <div class="w-full flex justify-between">
            <span class="text-base font-semibold">Subtotal</span>
            <span class="text-base">
              {subtotal
                ? formatPrice(subtotal / 100, currencyCode!, locale)
                : ""}
            </span>
          </div>
          {discounts < 0 && (
            <div class="flex justify-between items-center">
              <span class="text-base font-semibold">Descontos</span>
              <span class="text-base">
                {formatPrice(discounts / 100, currencyCode!, locale)}
              </span>
            </div>
          )}
        </div>
        {/* Total */}
        <div class="pt-2 flex flex-col justify-end items-end gap-2 mx-3 lg:mx-6">
          <div class="flex justify-between items-center w-full">
            <span class="block lg:hidden font-semibold text-xl pb-4">
              Total
            </span>
            <span class="hidden lg:block font-semibold lg:font-normal text-base lg:text-lg">
              Subtotal
            </span>
            <span class="text-xl lg:text-base text-primary-content">
              {formatPrice(total / 100, currencyCode!, locale)}
            </span>
          </div>
        </div>

        <div class="pt-2 hidden lg:flex flex-col justify-end items-end gap-2 mx-3 lg:mx-6">
          <div class="flex justify-between items-center w-full">
            <span class="text-[22px]">Entrega</span>
            <span class="text-base text-primary-content">
              A calcular
            </span>
          </div>
        </div>
        <div class="px-3 lg:px-6 my-2">
          <a
            class="inline-block w-full"
            target="_blank"
            href={`${CHECKOUT_URL}?orderFormId=${cart.value!.orderFormId}`}
          >
            <Button
              data-deco="buy-button"
              class="w-full bg-info hover:bg-info hover:opacity-95 active:bg-info text-primary rounded-none min-h-[40px] h-[40px] font-normal text-[15px] capitalize border-none"
              disabled={loading.value || cart.value.items.length === 0}
              onClick={() => {
                sendEvent({
                  name: "begin_checkout",
                  params: {
                    currency: cart.value ? currencyCode! : "",
                    value: total ? (total - (discounts)) / 100 : 0,
                    coupon: cart.value?.marketingData?.coupon ?? undefined,

                    items: cart.value
                      ? mapItemsToAnalyticsItems(cart.value)
                      : [],
                  },
                });
              }}
            >
              Finalizar Compra
            </Button>
          </a>
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
}

export default Cart;
