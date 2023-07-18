import type { Product } from "deco-sites/std/commerce/types.ts";

export const useSizePossibilities = (
  { url: productUrl, isVariantOf }: Product,
) => {
  const allProperties = (isVariantOf?.hasVariant ?? [])
    .flatMap(({ additionalProperty = [], url }) =>
      additionalProperty.map((property) => ({ property, url }))
    )
    .filter((x) => x.url)
    .filter((x) =>
      x.property.valueReference === "SPECIFICATION" &&
      x.property.name === "Tamanho"
    )
    .sort((a, b) => a.url! < b.url! ? -1 : a.url === b.url ? 0 : 1);

  const possibilities = allProperties.reduce((acc, { property, url }) => {
    const { name = "", value = "" } = property;

    if (!acc[name]) {
      acc[name] = {};
    }

    if (!acc[name][value]) {
      acc[name][value] = [];
    }

    if (url) {
      // prefer current url first to easy selector implementation
      url === productUrl
        ? acc[name][value].unshift(url)
        : acc[name][value].push(url);
    }

    return acc;
  }, {} as Record<string, Record<string, string[]>>);

  return possibilities;
};

export const useColorsPossibilities = (
  // deno-lint-ignore no-explicit-any
  activeColor: any,
  productUrl: string,
  product: Product[],
) => {
  // deno-lint-ignore no-explicit-any
  const allProperties: any[] = [];

  allProperties.push(activeColor);

  product.forEach(({ isVariantOf }) => {
    const properties = (isVariantOf?.hasVariant ?? [])
      .flatMap(({ additionalProperty = [], url }) =>
        additionalProperty.map((property) => ({ property, url }))
      )
      .filter((x) => x.url)
      .filter((x) =>
        x.property.valueReference === "SPECIFICATION" &&
        x.property.name === "Cores"
      )
      .sort((a, b) => a.url! < b.url! ? -1 : a.url === b.url ? 0 : 1);

    allProperties.push(properties);
  });

  const possibilities = allProperties.reduce((acc, curr) => {
    const { property, url } = curr[0];
    const { name = "", value = "" } = property;

    if (!acc[name]) {
      acc[name] = {};
    }

    if (!acc[name][value]) {
      acc[name][value] = [];
    }

    if (url) {
      // prefer current url first to easy selector implementation
      url === productUrl
        ? acc[name][value].unshift(url)
        : acc[name][value].push(url);
    }

    return acc;
  }, {} as Record<string, Record<string, string[]>>);

  return possibilities;
};
