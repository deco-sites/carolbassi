import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import Modals from "deco-sites/fashion/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import { AvailableIcons } from "deco-sites/fashion/components/ui/Icon.tsx";

import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
  }>;
  images?: {
    src?: Image;
    alt?: string;
    title?: string;
    href?: string;
  }[];
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
  /** @title Header side buttons */
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
   * @title Transparent
   * @description Use transparency on desktop header
   * @default false
   */
  transparent?: boolean;
  /**
   * @title Transparency Level
   * @description If transparent is active, set transparency level from 0 to 100%
   */
  transparencyLevel?: {
    mobile: number;
    desktop: number;
  };
  /**
   * @title On Scroll Transparency Level
   * @description Set transparency level from 0 to 100% when user scroll the page down
   */
  onScrollTransparencyLevel?: {
    desktop: number;
    mobile: number;
  };

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
    transparent,
    transparencyLevel,
    onScrollTransparencyLevel,
  }: Props,
) {
  const isHeaderHovered = useSignal(false);
  const searchbar = { ..._searchbar, products, suggestions };

  useEffect(() => {
    const header = document.querySelector("header");

    if (!header) return;

    const onScroll = () => {
      if (globalThis.scrollY > 5) {
        const isDesktop = window?.matchMedia("(min-width: 1024px)")?.matches;

        if (isDesktop) {
          header.style.backgroundColor = `rgba(255,255,255,${
            (100 - (onScrollTransparencyLevel?.desktop ?? 100)) / 100
          })`;
        } else {
          header.style.backgroundColor = `rgba(255,255,255,${
            (100 - (onScrollTransparencyLevel?.mobile ?? 100)) / 100
          })`;
        }
      } else {
        header.style.backgroundColor = isHeaderHovered.value ? "white" : "";
      }
    };

    if (isHeaderHovered.value) {
      if (header) {
        header.style.backgroundColor = "white";
        return;
      }
    } else {
      onScroll();
    }

    globalThis.addEventListener("scroll", onScroll, { passive: true });
    return () => globalThis.removeEventListener("scroll", onScroll);
  }, [isHeaderHovered.value]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            header {
              min-height: ${headerHeight};
              background-color: ${
            transparent
              ? `rgba(255,255,255,${
                (100 - (transparencyLevel?.mobile ?? 100)) / 100
              })`
              : "white"
          };
            }
            
            ${
            transparent && `
            @media screen and (min-width: 1024px) {
              header {
                background-color: rgba(255,255,255,${
              (100 - (transparencyLevel?.desktop ?? 100)) / 100
            })`
          }
          `,
        }}
      />
      <header
        class="fixed w-full z-50 hover:bg-white"
        onMouseEnter={() => isHeaderHovered.value = true}
        onMouseLeave={() => isHeaderHovered.value = false}
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
