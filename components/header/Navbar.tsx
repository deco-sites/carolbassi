import Image from "deco-sites/std/components/Image.tsx";
import Searchbar from "deco-sites/fashion/islands/HeaderSearchbar.tsx";
import Buttons from "deco-sites/fashion/islands/HeaderButton.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import { headerHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { AvailableIcons } from "deco-sites/fashion/components/ui/Icon.tsx";

function Navbar({ logo, navButtons, items, searchbar }: {
  logo: {
    srcMobile: LiveImage;
    srcDesktop: LiveImage;
    alt: string;
  };
  navButtons?: {
    searchbar: AvailableIcons;
    shoppingCart: AvailableIcons;
    login: AvailableIcons;
    mobileMenu: AvailableIcons;
  };
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div class="lg:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-4 pr-2 gap-2">
        <a
          href="/"
          class="flex-grow inline-flex items-center w-full"
          style={{ minHeight: headerHeight }}
          aria-label="Store logo"
        >
          <Image
            class="w-full sm:max-w-[70%] lg:max-w-[340px]"
            src={logo.srcMobile}
            alt={logo.alt}
            width={180}
            height={18}
            loading="eager"
          />
        </a>

        <div class="flex gap-4 w-full justify-center">
          <Buttons variant="search" icon={navButtons?.searchbar} />
          <Buttons variant="cart" icon={navButtons?.shoppingCart} />
          <Buttons variant="menu" icon={navButtons?.mobileMenu} />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden relative lg:flex flex-row justify-between items-center border-b border-base-200 w-full px-[46px]">
        <div class="flex items-center">
          <a href="/" aria-label="Store logo" class="block">
            <Image
              class="w-full sm:max-w-[70%] lg:max-w-[340px] mr-[30px]"
              src={logo.srcDesktop}
              alt={logo.alt}
              width={340}
              loading="eager"
            />
          </a>
          <div class="flex-auto flex justify-center">
            {items.map((item) => <NavItem item={item} />)}
          </div>
        </div>
        <div class="flex-none w-44 flex items-center justify-end gap-2">
          <Buttons variant="search" icon={navButtons?.searchbar} />
          <Searchbar searchbar={searchbar} />
          <a
            class="btn btn-square btn-ghost"
            href="/login"
            aria-label="Log in"
          >
            <Icon
              id={navButtons?.login ?? "User"}
              width={20}
              height={20}
              strokeWidth={0.4}
            />
          </a>
          <Buttons variant="cart" icon={navButtons?.shoppingCart} />
        </div>
      </div>
    </>
  );
}

export default Navbar;
