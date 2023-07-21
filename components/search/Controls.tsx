import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Filters from "deco-sites/carolbassi/islands/Filters.tsx";
import Sort from "deco-sites/fashion/components/search/Sort.tsx";
import Modal from "deco-sites/fashion/components/ui/Modal.tsx";
import Breadcrumb from "deco-sites/fashion/components/ui/Breadcrumb.tsx";
import { headerHeight } from "../header/constants.ts";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    records?: number;
  };

function SearchControls(
  { filters, breadcrumb, sortOptions, records }: Props,
) {
  const filterModalOpen = useSignal(false);
  const orderByModalOpen = useSignal(false);

  return (
    <div class="flex relative flex-col justify-between mb-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-8 sm:border-b sm:border-[rgba(0,0,0,.25)]">
      <div class="flex flex-row items-center mt-5 sm:p-0 mb-2 sm:m-0 border-b border-[rgba(0,0,0,.3)] sm:border-none">
        <Breadcrumb
          itemListElement={breadcrumb?.itemListElement}
          style="line"
        />
        {records && (
          <span class="block sm:hidden ml-auto text-xl text-[rgba(0,0,0,.5)]">
            {records} <span class="text-xs">itens</span>
          </span>
        )}
      </div>

      <div class="flex flex-row items-center justify-between sm:gap-4 sm:border-none">
        <Button
          class={"bg-info hover:bg-info active:bg-info h-auto min-h-[31px] rounded-none text-sm font-normal text-primary w-[49%] flex gap-5 items-center capitalize justify-center sm:hidden"}
          onClick={() => {
            filterModalOpen.value = true;
          }}
        >
          <Icon id="FilterList" width={16} height={16} />
          Filtrar
        </Button>
        <Button
          class={"bg-info hover:bg-info active:bg-info rounded-none h-auto min-h-[31px] text-sm font-normal text-primary flex gap-5 items-center justify-center capitalize w-[49%] sm:hidden"}
          onClick={() => {
            orderByModalOpen.value = true;
          }}
        >
          <Icon id="OrderList" width={16} height={16} />
          Ordenar
        </Button>
        <div class="hidden sm:flex">
          {sortOptions.length > 0 && (
            <Sort variant="select" sortOptions={sortOptions} />
          )}
          {records && (
            <span class="ml-8 mr-[18px] text-xl text-[rgba(0,0,0,.5)]">
              {records} Itens
            </span>
          )}
        </div>
      </div>

      {orderByModalOpen.value && (
        <div
          style={{ marginTop: headerHeight }}
          class="fixed z-40 w-full h-full top-0 left-0 bg-white border-[.125rem] border-[#e3e4e6] border-solid"
        >
          <Sort variant="list" sortOptions={sortOptions} />
        </div>
      )}

      <Modal
        loading="lazy"
        title="Filtros"
        mode="sidebar-right"
        open={filterModalOpen.value}
        onClose={() => {
          filterModalOpen.value = false;
        }}
      >
        <div class="flex flex-col h-full">
          <div class="h-[calc(100%-125px)] overflow-y-auto">
            <Filters filters={filters} />
          </div>

          <div class="flex flex-col mt-auto h-[125px] px-3 sm:hidden">
            <button
              class="bg-white text-primary border border-solid border-black h-[42px] mb-[7px]"
              onClick={() => filterModalOpen.value = false}
            >
              Limpar Filtro
            </button>
            <button
              class="bg-info text-primary h-[42px]"
              onClick={() => filterModalOpen.value = false}
            >
              Filtrar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SearchControls;
