import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import {
  useColorsPossibilities,
  useSizePossibilities,
} from "deco-sites/fashion/sdk/useVariantPossiblities.ts";

interface Props {
  product: Product;
  similars: Product[] | null;
}

function getActiveColor(product: Product) {
  const activeColor = product.isVariantOf?.hasVariant.flatMap((
    { additionalProperty = [], url },
  ) => additionalProperty.map((property) => ({ property, url })))
    .filter((x) =>
      x.property.valueReference === "SPECIFICATION" &&
      x.property.name === "Cores"
    )
    .filter((x) => x.url && x.url === product.url!);

  return activeColor;
}

function VariantSelector({ product, similars, product: { url } }: Props) {
  const possibilities = useSizePossibilities(product);
  const activeColor = getActiveColor(product);
  const colors = useColorsPossibilities(activeColor, product.url!, similars!);

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(colors).map((name) => {
        return (
          <li class="flex flex-col gap-2">
            <span class="text-xl">{name === "Cores" ? "Cor" : name}</span>
            <ul class="sm:ml-2 flex flex-row gap-2 flex-wrap">
              {Object.entries(colors[name]).map(([value, link]) => {
                return (
                  <li>
                    <a href={(link as string)[0]}>
                      <Avatar
                        content={value}
                        variant={(link as string)[0] === product.url!
                          ? "active"
                          : "default"}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}

      {Object.keys(possibilities).map((name) => {
        return (
          <li class="flex flex-col gap-2">
            <span class="text-xl">{name === "Cores" ? "Cor" : name}</span>
            <ul class="sm:ml-2 flex flex-row gap-2 flex-wrap">
              {Object.entries(possibilities[name]).map(([value, [link]]) => {
                const offer = product.isVariantOf?.hasVariant.find(
                  (variant) => {
                    return variant.name === value;
                  },
                );

                let variant: "active" | "disabled" | "default" = "default";

                if (offer) {
                  const { availability } = useOffer(offer?.offers);

                  if (availability !== "https://schema.org/InStock") {
                    variant = "disabled";
                  } else if (link === url) {
                    variant = "active";
                  }
                } else {
                  variant = "active";
                }

                return (
                  <li>
                    <a href={link}>
                      <Avatar
                        content={value}
                        variant={variant}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

export default VariantSelector;
