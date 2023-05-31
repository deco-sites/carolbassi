import { lazy, Suspense } from "preact/compat";

import { useUI } from "deco-sites/fashion/sdk/useUI.ts";
import Loading from "deco-sites/fashion/components/ui/Loading.tsx";
import type { Props as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";

const LazySearchbar = lazy(() =>
  import("deco-sites/fashion/components/search/Searchbar.tsx")
);

interface Props {
  searchbar: SearchbarProps;
}

function Searchbar({ searchbar }: Props) {
  const { displaySearchbar } = useUI();
  const open = displaySearchbar.value;

  return (
    <>
      <div
        class={`${open ? "block" : "hidden"}`}
      >
        {open && (
          <Suspense fallback={<Loading />}>
            <LazySearchbar {...searchbar} />
          </Suspense>
        )}
      </div>
    </>
  );
}

export default Searchbar;
