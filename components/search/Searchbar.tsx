/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */
import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/compat";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Spinner from "deco-sites/fashion/components/ui/Spinner.tsx";
import SearchbarProductCard from "deco-sites/fashion/components/product/SearchbarProductCard.tsx";
import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import { useUI } from "deco-sites/fashion/sdk/useUI.ts";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";
import { sendEvent } from "deco-sites/fashion/sdk/analytics.tsx";
import { headerHeight } from "deco-sites/fashion/components/header/constants.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { useAutocomplete } from "../../sdk/useAutocomplete.ts";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

function CloseButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      class="btn-ghost btn-circle w-auto bg-transparent hover:bg-transparent lg:hidden"
      onClick={() => (displaySearchbar.value = false)}
    >
      <Icon id="XMark" width={20} height={20} strokeWidth={1} />
    </Button>
  );
}

// Editable props
export interface EditableProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

export type Props = EditableProps;

const MAX_TOP_SEARCHS = 10;
const MAX_SUGGESTIONS_RESULT = 3;

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  query,
}: Props) {
  const focused = useSignal(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions, loading } = useAutocomplete();
  const hasProducts = Boolean(suggestions.value?.products?.length);
  const hasTerms = Boolean(suggestions.value?.searches?.length);
  const notFound = !hasProducts && !hasTerms && focused.value;
  const showTopSearch = hasTerms &&
    Boolean(!searchInputRef?.current?.value?.length) &&
    focused.value;

  useEffect(() => {
    setSearch("", MAX_TOP_SEARCHS);
  }, []);

  const handleFocus = () => {
    focused.value = true;
  };

  const handleBlur = () => {
    focused.value = false;
  };

  return (
    <div class="flex flex-col">
      <div class="flex items-center gap-4 px-4 lg:px-0">
        <CloseButton />
        <form
          id="searchbar"
          action={action}
          class="flex-grow flex gap-3"
        >
          <input
            ref={searchInputRef}
            id="search-input"
            class="flex-grow outline-none placeholder-shown:sibling:hidden bg-transparent text-center lg:text-right text-secondary-content placeholder:text-primary"
            name={name}
            defaultValue={query}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onInput={(e) => {
              const value = e.currentTarget.value;

              if (value) {
                sendEvent({
                  name: "search",
                  params: { search_term: value },
                });
              }

              setSearch(
                value,
                value.length ? MAX_SUGGESTIONS_RESULT : MAX_TOP_SEARCHS,
              );
            }}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            autocomplete="off"
          />
        </form>
        <button
          class="block lg:hidden"
          onClick={() => {
            const value = searchInputRef?.current?.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setSearch(
              value ?? "",
              value ? MAX_SUGGESTIONS_RESULT : MAX_TOP_SEARCHS,
            );
          }}
        >
          <Icon
            id="MagnifyingGlass"
            width={20}
            height={19}
            strokeWidth={0.1}
          />
        </button>
      </div>
      {focused.value === true && (
        <div
          style={{ marginTop: headerHeight }}
          class="absolute right-0 top-0 lg:right-[50px] lg:-top-[20px] z-50 bg-base-100 flex flex-col mt-6 py-5 w-full lg:w-[508px] empty:mt-0"
        >
          {showTopSearch
            ? (
              <div class="flex flex-col gap-5">
                <span
                  class="pl-5 text-base"
                  role="heading"
                  aria-level={3}
                >
                  Termos Mais Buscados
                </span>
                <ol>
                  {suggestions?.value?.searches?.map((topS, index) => (
                    <li class="h-[35px] hover:bg-neutral">
                      <a
                        class="flex items-center w-full h-full px-5"
                        href={`/s?q=${topS.term}`}
                      >
                        <span class="w-[27px] h-[27px] inline-flex justify-center items-center rounded-[1.5px] bg-neutral-content text-info-content text-xs font-semibold">
                          {index + 1}º
                        </span>
                        <span class="text-xs pl-3 inline-flex">
                          {topS.term}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )
            : notFound
            ? (
              <div class="px-2 py-16 md:py-6! flex flex-col gap-4 w-full">
                <span
                  class="font-medium text-xl text-center"
                  role="heading"
                  aria-level={3}
                >
                  Nenhum resultado encontrado
                </span>
                <span class="text-center text-primary">
                  Vamos tentar de outro jeito? Verifique a ortografia ou use um
                  termo diferente
                </span>
              </div>
            )
            : focused.value === true && (
              <>
                <div class="flex flex-col px-2 pl-5 gap-6 md:w-[15.25rem] md:max-w-[15.25rem]\">
                  <div class="flex gap-2 items-center">
                    <span
                      class="text-base"
                      role="heading"
                      aria-level={3}
                    >
                      Sugestões
                    </span>
                    {loading.value && <Spinner />}
                  </div>
                  <ul id="search-suggestion" class="flex flex-col pl-5">
                    {suggestions.value!.searches?.map(({ term }) => (
                      <li class="list-disc list-outside marker:text-info">
                        <a
                          href={`/s?q=${term}`}
                          class="text-xs"
                        >
                          <span>
                            {term}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div class="flex flex-col px-2 pt-5 gap-3 overflow-x-hidden">
                  <div class="flex gap-2 items-center">
                    <span
                      class="text-base pl-3"
                      role="heading"
                      aria-level={3}
                    >
                      Produtos sugeridos:
                    </span>
                    {loading.value && <Spinner />}
                  </div>
                  <Slider class="carousel">
                    {suggestions.value!.products?.map((
                      product: Product,
                      index,
                    ) => (
                      <Slider.Item
                        index={index}
                        class="carousel-item w-[163px]"
                      >
                        <SearchbarProductCard
                          product={product}
                          width={163}
                          height={244}
                        />
                      </Slider.Item>
                    ))}
                  </Slider>
                </div>
              </>
            )}
        </div>
      )}
    </div>
  );
}

export default Searchbar;
