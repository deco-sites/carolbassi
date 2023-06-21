import { useSignal } from "@preact/signals";
import Buttons from "deco-sites/fashion/islands/HeaderButton.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import type { INavItem } from "./NavItem.tsx";
import { AvailableIcons } from "deco-sites/fashion/components/ui/Icon.tsx";

export interface Props {
  items: INavItem[];
  loginIcon?: AvailableIcons;
  cartIcon?: AvailableIcons;
}

function MenuItemChild({ item }: { item: INavItem }) {
  return <div class="text-base leading-base">{item.label}</div>;
}

function MenuItem({ item }: { item: INavItem }) {
  const menuOpened = useSignal(false);

  return (
    <div class="flex flex-col">
      <div
        onClick={() => menuOpened.value = true}
        class="h-auto min-h-0 p-0 flex justify-between"
      >
        <div
          class={`text-lg leading-base ${
            item.highlight && "text-accent-content"
          }`}
        >
          {item.label}
        </div>
        {item.children && item.children.length > 0 && (
          <Icon id="ChevronRight" width={7} height={22} />
        )}
      </div>

      <div
        class={`fixed w-full h-full top-0 left-0 z-50 flex flex-col bg-white ${
          menuOpened.value ? "opacity-1" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={() => menuOpened.value = false}
          class="h-12 px-6 flex justify-center items-end text-2xl font-normal"
        >
          <Icon
            class="absolute left-[27px] top-[18px]"
            id="ChevronLeft"
            width={7}
            height={22}
          />
          {item.label}
          <Icon
            class="absolute right-[9px] top-3"
            id="XMark"
            width={34}
            height={20}
            strokeWidth={1}
          />
        </div>
        <ul
          class={`flex flex-wrap justify-start w-[390px] gap-4 mt-7 pl-5 overflow-hidden transition-all duration-300 ease-in-out h-max ${
            menuOpened.value ? "max-h-full" : "max-h-0"
          }`}
        >
          {item.children?.map((node) => (
            <li class="w-[41%]">
              <MenuItemChild item={node} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Menu({ items, loginIcon, cartIcon }: Props) {
  return (
    <>
      <ul class="px-6 flex flex-col gap-3 pb-3">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-col py-6 mt-3 border-t border-light gap-5">
        <li>
          <a
            aria-label="My Account"
            class="flex items-center gap-3 px-6"
            href="/login"
          >
            <Icon
              id={loginIcon ?? "User"}
              width={20}
              height={20}
              strokeWidth={2}
            />
            <span class="text-lg leading-base">Minha Conta</span>
          </a>
        </li>
        <li class="flex items-center gap-3 px-6">
          <Buttons variant="cart" icon={cartIcon} />
          <span class="text-lg leading-base">Sacola de compras</span>
        </li>
      </ul>
    </>
  );
}

export default Menu;
