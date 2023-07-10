import type { Context } from "deco-sites/std/packs/vtex/accounts/vtex.ts";
import type { LegacyProduct } from "deco-sites/std/packs/vtex/types.ts";
import { paths } from "deco-sites/std/packs/vtex/utils/paths.ts";
import { fetchAPI } from "deco-sites/std/utils/fetchVTEX.ts";

export interface CustomFilterProps {
  /** @description custom filter */
  fq: string;
  /** @description total number of items to display */
  count: number;
}

export type Props = CustomFilterProps;

const fromProps = (
  props: Props,
  params = new URLSearchParams(),
): URLSearchParams => {
  const count = props.count ?? 12;

  params.set("fq", props.fq);
  params.set("_from", "0");
  params.set("_to", `${Math.max(count - 1, 0)}`);

  return params;
};

const loader = async (
  props: Props,
  _req: Request,
  ctx: Context,
): Promise<LegacyProduct[] | null> => {
  const { configVTEX: config } = ctx;
  const params = fromProps(props);

  const vtexProducts = await fetchAPI<LegacyProduct[]>(
    `${paths(config!).api.catalog_system.pub.products.search}?${params}`,
    {
      withProxyCache: true,
    },
  );

  return vtexProducts;
};

export default loader;
