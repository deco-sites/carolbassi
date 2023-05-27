import Modals from "deco-sites/fashion/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import { AvailableIcons } from "deco-sites/fashion/components/ui/Icon.tsx";

import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { desktopHeaderHeight, headerHeight } from "./constants.ts";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface Props {
  /** @title Logo */
  logo: {
    srcMobile: Image;
    srcDesktop: Image;
    alt: string;
  };
  alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  navButtons?: {
    searchbar: AvailableIcons;
    shoppingCart: AvailableIcons;
    login: AvailableIcons;
    mobileMenu: AvailableIcons;
  };
  /**
   * @title Navigation items alignment
   * @description Where to display the navigation items on desktop
   * @default left
   */
  navAlignment: "left" | "center" | "right";
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;
}

function Header(
  {
    logo,
    navButtons,
    alerts,
    searchbar: _searchbar,
    products,
    navAlignment,
    navItems = [],
    suggestions,
  }: Props,
) {
  const searchbar = { ..._searchbar, products, suggestions };
  return (
    <>
      <header
        class={`fixed w-full z-50 bg-base-100`}
        style={{ minHeight: headerHeight }}
      >
        <Alert alerts={alerts} />
        <Navbar
          alignment={navAlignment}
          navButtons={navButtons}
          logo={logo}
          items={navItems}
          searchbar={searchbar}
        />

        <Modals
          menu={{ items: navItems }}
          searchbar={searchbar}
        />
      </header>
    </>
  );
}

export default Header;
