import Buttons from "deco-sites/fashion/islands/HeaderButton.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import type { INavItem } from "./NavItem.tsx";
import { AvailableIcons } from "deco-sites/fashion/components/ui/Icon.tsx";

export interface Props {
  items: INavItem[];
  loginIcon?: AvailableIcons;
  cartIcon?: AvailableIcons;
}

function MenuItem({ item }: { item: INavItem }) {
  return (
    <div class="collapse">
      <input type="checkbox" class="min-h-0" />

      <div class="collapse-title h-auto min-h-0 p-0 flex justify-between">
        <div class={`text-lg leading-base ${item.highlight && 'text-accent-content'}`}>{item.label}</div>
        {item.children && item.children.length > 0 && (
          <Icon id="ChevronRight" width={7} height={22} />
        )}
      </div>

      <div class="collapse-content">
        <ul class="flex flex-col gap-3 mt-3">
          {item.children?.map((node) => (
            <li>
              <MenuItem item={node} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MenuItemChilds({ item }: { item: INavItem }) {
  return (
    <div class="absolute top-0 left-0 z-50 flex flex-col bg-white">
      <div class="text-lg leading-base text-center">{item.label}</div>
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
