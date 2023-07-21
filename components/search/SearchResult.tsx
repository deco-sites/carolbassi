import Filters from "deco-sites/carolbassi/islands/Filters.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import SearchControls from "deco-sites/fashion/islands/SearchControls.tsx";
import { SendEventOnLoad } from "deco-sites/fashion/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import NotFound from "deco-sites/fashion/islands/SearchNotFound.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  /**
   * @description Number of products per line on grid
   */
  columns: Columns;
}

function Result({
  page,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;

  return (
    <>
      <div class="px-4 sm:py-10 sm:px-[100px]">
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          records={pageInfo.records!}
        />

        {filters.length > 0 && (
          <div class="hidden sm:flex w-full mt-11 ml-1 mb-[30px]">
            <h5 class="text-xl text-primary-content mr-5">Filtros</h5>

            <Filters filters={filters} />
          </div>
        )}

        <ProductGallery products={products} />

        <div class="flex justify-center my-4">
          <div class="btn-group">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="btn btn-ghost"
            >
              <Icon id="ChevronLeft" width={20} height={20} strokeWidth={2} />
            </a>
            <span class="btn btn-ghost">
              Page {pageInfo.currentPage + 1}
            </span>
            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class="btn btn-ghost"
            >
              <Icon
                id="ChevronRight"
                width={20}
                height={20}
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page || page.products.length === 0) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
