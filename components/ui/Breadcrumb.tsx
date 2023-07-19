import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  style?: "arrow" | "line";
  breadcrumbSmallFont?: boolean;
}

function Breadcrumb(
  { itemListElement = [], style = "arrow", breadcrumbSmallFont = false }: Props,
) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div
      class={` text-[rgba(0,0,0,.5)] breadcrumbs ${
        style === "line" && "breadcrumbs-line"
      } ${breadcrumbSmallFont ? "text-xs" : "text-xs sm:text-xl"}`}
    >
      <ul>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }, index, arr) => (
            <li
              class={`${
                index === arr.length - 1
                  ? "text-primary"
                  : "text-[rgba(0,0,0,.5)]"
              }`}
            >
              <a href={item}>{name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
