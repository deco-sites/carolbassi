import Modals from "deco-sites/fashion/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import { AvailableIcons } from "deco-sites/fashion/components/ui/Icon.tsx";

import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
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
  const searchbar = { ..._searchbar, products, suggestions };

  return (
    <>
      <header
        id="main-header"
        style={{ minHeight: headerHeight }}
        class={`w-full z-50 top-0 hover:bg-white`}
      >
        <Navbar
          alignment={navAlignment}
          navButtons={navButtons}
          logo={logo}
          items={navItems}
          searchbar={searchbar}
        />

        <Modals
          menu={{
            items: navItems,
            loginIcon: navButtons?.login,
            cartIcon: navButtons?.shoppingCart,
          }}
        />
      </header>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function headerStuffs() {
              const header = document.querySelector("header#main-header");
              const isHomePage = window.location.pathname === "/";

              const setHeaderPosition = () => {
                // header should be fixed on Home page
                if (header) {
                  if (isHomePage) {
                    header.style.position = "fixed";
                  } else {
                    header.style.backgroundColor = "white";
                    header.style.position = "relative";
                  }
                }
              };
              
              setHeaderPosition();

              const onScroll = () => {
                // add onScrollTransparencyLevel for mobile and desktop
                if (!isHomePage) {
                  if (window.scrollY > 32) {
                    header.style.position = "fixed";
                  } else {
                    header.style.position = "relative";
                  }

                  header.style.backgroundColor = "white";
                  return;
                };

                const isDesktop = window?.matchMedia("(min-width: 1024px)")?.matches;
                const isHovering = header.matches(":hover");

                if (isHovering) return;

                if (window.scrollY > 32) {
                  if (isDesktop) {
                    header.style.backgroundColor = "rgba(255,255,255,${
            (100 - (onScrollTransparencyLevel?.desktop ?? 100)) / 100
          })";
                  } else {
                    header.style.backgroundColor = "rgba(255,255,255,${
            (100 - (onScrollTransparencyLevel?.mobile ?? 100)) / 100
          })";
                  }
                } else {
                  if (!${transparent}) {
                    header.style.backgroundColor = "white";
                  } else {
                    if (isDesktop) {
                      header.style.backgroundColor = "rgba(255,255,255,${
            (100 - (transparencyLevel?.desktop ?? 100)) / 100
          })";
                    } else {
                      header.style.backgroundColor = "rgba(255,255,255,${
            (100 - (transparencyLevel?.mobile ?? 100)) / 100
          })";
                    }
                  }
                }
              }

              window.addEventListener("scroll", onScroll, { passive: true });

              // add hover background without transparency
              header.addEventListener("mouseenter", () => {
                header.style.backgroundColor = "white";
              });

              header.addEventListener("mouseleave", () => {
                const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

                if (!${transparent} || !isHomePage) {
                  return header.style.backgroundColor = "white";
                }
                
                // check if we scrolled down first
                if (window.scrollY > 32) {
                  if (isDesktop) {
                    header.style.backgroundColor = "rgba(255,255,255,${(
            (100 - (onScrollTransparencyLevel?.desktop ?? 100)) / 100
          )})";
                  } else {
                    header.style.backgroundColor = "rgba(255,255,255,${((100 - (
            onScrollTransparencyLevel?.mobile ?? 100
          )) / 100)})";
                  }

                  return;
                }

                if (isDesktop) {
                  header.style.backgroundColor = "rgba(255,255,255,${
            (100 - (transparencyLevel?.desktop ?? 100)) / 100
          })";
                } else {
                  header.style.backgroundColor = "rgba(255,255,255,${
            (100 - (transparencyLevel?.mobile ?? 100)) / 100
          })";
                }
              })

            })();
      `,
        }}
      />
    </>
  );
}

export default Header;
