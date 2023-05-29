import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { sendEvent } from "deco-sites/fashion/sdk/analytics.tsx";
import { useUI } from "deco-sites/fashion/sdk/useUI.ts";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";
import { AvailableIcons } from "deco-sites/fashion/components/ui/Icon.tsx";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

function SearchButton({ icon }: { icon?: AvailableIcons }) {
  const { displaySearchbar } = useUI();

  return (
    <Button
      class="btn-square bg-transparent hover:bg-transparent border-none w-auto"
      aria-label="search icon button"
      onClick={() => {
        displaySearchbar.value = !displaySearchbar.peek();
      }}
    >
      <Icon
        id={icon ?? "MagnifyingGlass"}
        width={20}
        height={19}
        strokeWidth={0.1}
      />
    </Button>
  );
}

function MenuButton({ icon }: { icon?: AvailableIcons }) {
  const { displayMenu } = useUI();

  return (
    <Button
      class="btn-square bg-transparent hover:bg-transparent border-none w-auto"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon id={icon ?? "Bars3"} width={23} height={28} strokeWidth={0.01} />
    </Button>
  );
}

function CartButton({ icon }: { icon?: AvailableIcons }) {
  const { displayCart } = useUI();
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();
  const totalItems = cart.value?.items.length || null;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );

  const onClick = () => {
    displayCart.value = true;
    sendEvent({
      name: "view_cart",
      params: {
        currency: cart.value ? currencyCode! : "",
        value: total?.value
          ? (total?.value - (discounts?.value ?? 0)) / 100
          : 0,

        items: cart.value ? mapItemsToAnalyticsItems(cart.value) : [],
      },
    });
  };

  return (
    <Button
      class="btn-square bg-transparent hover:bg-transparent border-none relative w-auto"
      aria-label="open cart"
      data-deco={displayCart.value && "open-cart"}
      loading={loading.value}
      onClick={onClick}
    >
      <div class="indicator">
        {totalItems && (
          <span class="indicator-item badge badge-secondary badge-sm">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
        <Icon
          id={icon ?? "ShoppingCart"}
          width={20}
          height={22}
          strokeWidth={2}
        />
      </div>
    </Button>
  );
}

function Buttons(
  { variant, icon }: {
    variant: "cart" | "search" | "menu";
    icon?: AvailableIcons;
  },
) {
  if (variant === "cart") {
    return <CartButton icon={icon} />;
  }

  if (variant === "search") {
    return <SearchButton icon={icon} />;
  }

  if (variant === "menu") {
    return <MenuButton icon={icon} />;
  }

  return null;
}

export default Buttons;
