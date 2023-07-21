import { asset } from "$fresh/runtime.ts";
import type { ComponentChildren } from "preact";

interface Props {
  open: boolean;
  handleOpen: () => void;
  label: string;
  children: ComponentChildren;
}

function Dropdown({ children, label, open, handleOpen }: Props) {
  return (
    <div class="relative">
      <button
        class="text-lg text-primary-content cursor-pointer inline-block"
        onClick={handleOpen}
      >
        {label}
        <img
          width={15}
          height={8}
          alt="Arrow indicator"
          src={asset("/arrow-carol.webp")}
          class={`inline-block mx-4 transition-all duration-200 ease-in ${
            open && "rotate-180"
          }`}
        />
      </button>

      <div
        class={`absolute z-30 top-[calc(100%+17px)] w-[183px] overflow-y-auto break-words bg-white pt-[11px] pb-[22px] px-5 transition-all duration-200 ease-linear ${
          open
            ? "visible max-h-[350px] py-[11px] px-5"
            : "invisible pointer-events-none max-h-0 p-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Dropdown;
