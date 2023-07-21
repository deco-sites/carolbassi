import Dropdown from "deco-sites/carolbassi/islands/Dropdown.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";
import { parseRange } from "deco-sites/std/utils/filters.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label }: FilterToggleValue,
) {
  return (
    <a href={url} class="flex items-center gap-2">
      <div
        aria-checked={selected}
        class={`relative left-0 sm:absolute sm:left-3 w-3 h-3 sm:w-4 sm:h-4 border border-solid border-[#828282] sm:border-black ${
          selected && "bg-black text-white"
        }`}
      >
        {selected && (
          <Icon
            id="CheckMark"
            width={12}
            height={12}
            class="absolute -left-[1px] -top-[2px] sm:relative sm:left-0 sm:top-1/2 sm:-translate-y-1/2"
          />
        )}
      </div>
      <span class="ml-[3px] sm:ml-4 text-primary-content text-base sm:text-sm uppercase sm:lowercase">
        {label}
      </span>
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const firstValues = values.slice(0, 10);
  const showMore = useSignal(false);

  return (
    <ul class={`flex flex-wrap gap-[11px] sm:gap-2 flex-col`}>
      {firstValues.map((item) => {
        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}

      {values.length > 10 && !showMore.value && (
        <button
          class="bg-[#F0F0F0] text-primary w-max text-start"
          onClick={() => showMore.value = true}
        >
          Ver mais {values.slice(10).length}
        </button>
      )}

      {values.length > 10 && showMore.value && values.slice(10).map((item) => {
        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  const opens = useSignal<boolean[]>(new Array(filters.length - 1).fill(false));

  return (
    <ul class="flex flex-col sm:flex-row gap-5">
      {filters
        .filter(isToggle)
        .map((filter, index) =>
          filter.key !== "price" && (
            <Dropdown
              _class={`transition-[height] duration-200 ease-linear px-3 ${
                opens.value[index] ? "h-full sm:h-auto" : "h-[23px] sm:h-auto"
              } py-3 sm:py-0`}
              key={filter.key}
              open={opens.value[index]}
              handleOpen={() => {
                const isDesktop =
                  window.matchMedia("(min-width: 640px)").matches;

                if (isDesktop) {
                  const newOpens = new Array(filters.length - 1).fill(false);
                  newOpens[index] = !opens.value[index];
                  opens.value = newOpens;
                } else {
                  const newOpens = [...opens.value];
                  newOpens[index] = !opens.value[index];
                  opens.value = newOpens;
                }
              }}
              label={filter.label}
            >
              <FilterValues {...filter} />
            </Dropdown>
          )
        )}
    </ul>
  );
}

export default Filters;
