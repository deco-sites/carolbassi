import { asset } from "$fresh/runtime.ts";
import { useMemo } from "preact/hooks";
import { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(
    SORT_QUERY_PARAM,
    e.currentTarget.getAttribute("value") ?? "",
  );

  window.location.search = urlSearchParams.toString();
};

export type SortVariant = "select" | "list";

export type Props =
  & { variant: SortVariant }
  & Pick<ProductListingPage, "sortOptions">;

type sortOptions =
  | "relevance:desc"
  | "orders:desc"
  | "release:desc"
  | "discount:desc"
  | "price:desc"
  | "price:asc"
  | "name:asc"
  | "name:desc";

const sortLabels = {
  "relevance:desc": "Relevância",
  "orders:desc": "Mais Vendidos",
  "release:desc": "Mais recentes",
  "discount:desc": "Descontos",
  "price:desc": "Maior preço",
  "price:asc": "Menor preço",
  "name:asc": "De A a Z",
  "name:desc": "De Z a A",
};

function Sort({ variant, sortOptions }: Props) {
  const sort = useSort();

  const open = useSignal(false);

  const openSelectOptions = () => {
    open.value = !open.value;
  };

  // sort sortOptions based on sortLabels index order
  sortOptions.sort((a, b) => {
    const labelA = sortLabels[a.label as sortOptions];
    const labelB = sortLabels[b.label as sortOptions];

    if (
      Object.values(sortLabels).indexOf(labelA) <
        Object.values(sortLabels).indexOf(labelB)
    ) {
      return -1;
    }
    if (
      Object.values(sortLabels).indexOf(labelA) >
        Object.values(sortLabels).indexOf(labelB)
    ) {
      return 1;
    }

    return 0;
  });

  if (variant === "list") {
    return (
      <div class="flex flex-col">
        {sortOptions.map(({ value, label }) => (
          <div
            class={`py-3 px-4 hover:bg-[#f2f4f5] ${
              value === sort && "bg-[#e3e4e6]"
            }`}
            key={value}
            value={value}
            selected={value === sort}
            onClick={applySort}
          >
            <span class="text-base">{sortLabels[label as sortOptions]}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div class="relative">
      <button
        onClick={openSelectOptions}
        class="flex items-center text-lg font-normal"
      >
        Ordenar
        <img
          width={15}
          height={8}
          src={asset("/arrow-carol.webp")}
          class="block ml-4 rotate-180"
        />
      </button>
      <div
        class={`absolute ${
          open.value ? "block" : "hidden"
        } top-[35px] bg-white z-30 right-0 min-w-[180px] shadow-orderby border-solid border-[.125rem] border-[#e3e4e6]`}
      >
        {sortOptions.map(({ value, label }) => (
          <button
            class={`text-start w-full py-3 px-4 hover:bg-[#f2f4f5] ${
              value === sort && "bg-[#e3e4e6]"
            }`}
            onClick={applySort}
            key={value}
            value={value}
            selected={value === sort}
          >
            <span class="text-base">{sortLabels[label as sortOptions]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sort;
