import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "deco-sites/fashion/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product, product: { url } }: Props) {
  const possibilities = useVariantPossibilities(product);
  return (
    <ul class="flex flex-col gap-4">
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

                let variant:
                  | "active"
                  | "disabled"
                  | "disabledActive"
                  | "default" = "default";

                if (offer) {
                  const { availability } = useOffer(offer?.offers);
                  const selected = link === url;

                  if (
                    availability !== "https://schema.org/InStock" && selected
                  ) {
                    variant = "disabledActive";
                  } else if (availability !== "https://schema.org/InStock") {
                    variant = "disabled";
                  } else if (selected) {
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
