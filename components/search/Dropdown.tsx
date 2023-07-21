import { asset } from "$fresh/runtime.ts";
import Icon from "deco-sites/carolbassi/components/ui/Icon.tsx";
import type { ComponentChildren } from "preact";

interface Props {
  open: boolean;
  handleOpen: () => void;
  label: string;
  children: ComponentChildren;
  _class?: string;
}

function Dropdown({ children, label, open, handleOpen, _class = "" }: Props) {
  return (
    <div class={`relative ${_class}`}>
      <button
        class="w-full sm:w-auto text-lg text-primary sm:text-primary-content cursor-pointer flex justify-between sm:inline-block"
        onClick={handleOpen}
      >
        {label}
        <img
          width={15}
          height={8}
          alt="Arrow indicator"
          src={asset("/arrow-carol.webp")}
          class={`hidden sm:inline-block mx-4 transition-all duration-200 ease-in ${
            open && "rotate-180"
          }`}
        />
        <Icon
          id="ChevronDown"
          width={18}
          height={18}
          strokeWidth={1}
          class={`block sm:hidden ${open && "rotate-180"}`}
        />
      </button>

      <div
        class={`sm:absolute z-30 top-[calc(100%+17px)] w-full sm:w-[183px] break-words bg-white transition-[max-height] duration-200 ease-linear pt-[14px] sm:pt-[11px] ${
          open
            ? "max-h-[350px] pb-[22px] px-5 overflow-y-auto"
            : "pointer-events-none max-h-0 pb-0 px-5 overflow-y-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Dropdown;
