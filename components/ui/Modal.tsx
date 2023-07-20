import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { useEffect, useRef } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

import Icon from "./Icon.tsx";

// Lazy load a <dialog> polyfill.
if (IS_BROWSER && typeof window.HTMLDialogElement === "undefined") {
  await import(
    "https://raw.githubusercontent.com/GoogleChrome/dialog-polyfill/5033aac1b74c44f36cde47be3d11f4756f3f8fda/dist/dialog-polyfill.esm.js"
  );
}

export type Props = JSX.IntrinsicElements["dialog"] & {
  title?: string;
  mode?: "sidebar-right" | "sidebar-left" | "center" | "side-minicart";
  onClose?: () => Promise<void> | void;
  loading?: "lazy" | "eager";
};

const dialogStyles = {
  "sidebar-right": "animate-slide-left",
  "side-minicart": "animate-slide-left",
  "sidebar-left": "animate-slide-right",
  center: "animate-fade-in",
  "sidebar-left-close": "-translate-x-full",
  "sidebar-right-close": "translate-x-full",
  "side-minicart-close": "translate-x-full",
  "center-close": "",
};

const sectionStyles = {
  "sidebar-right": "justify-end",
  "sidebar-left": "justify-start",
  "side-minicart": "justify-end",
  center: "justify-center items-center",
};

const containerStyles = {
  "sidebar-right": "h-full w-full lg:max-w-[400px]",
  "sidebar-left": "h-full w-full lg:max-w-[400px]",
  "side-minicart": "h-full w-[85%] max-w-[400px]",
  center: "",
};

const Modal = ({
  open,
  title,
  mode = "sidebar-right",
  onClose,
  children,
  loading,
  ...props
}: Props) => {
  const lazy = useSignal(false);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open === false) {
      document.getElementsByTagName("body").item(0)?.classList.remove(
        "no-scroll",
      );
    } else if (open === true) {
      document.getElementsByTagName("body").item(0)?.classList.add(
        "no-scroll",
      );
      ref.current?.open === false && ref.current.showModal();
      lazy.value = true;
    }
  }, [open]);

  const handleCloseDialog = () => {
    ref.current?.classList.add(dialogStyles[`${mode}-close`]);
    setTimeout(() => {
      ref.current?.classList.remove(dialogStyles[`${mode}-close`]);
      onClose?.();
      ref.current?.close();
    }, 200);
  };

  return (
    <dialog
      {...props}
      ref={ref}
      class={`bg-transparent p-0 m-0 max-w-full w-full max-h-full h-full backdrop-opacity-50 transition-transform duration-200 ${
        dialogStyles[mode]
      } ${props.class ?? ""}`}
      onClick={(e) =>
        (e.target as HTMLDialogElement).tagName === "SECTION" &&
        handleCloseDialog()}
      onClose={handleCloseDialog}
    >
      <section
        class={`w-full h-full flex bg-transparent ${sectionStyles[mode]}`}
      >
        <div
          class={`bg-base-100 flex flex-col max-h-full ${
            containerStyles[mode]
          } relative`}
        >
          <header
            class={`flex px-3 py-3 justify-between items-center relative ${
              mode === "side-minicart" && "max-h-[58px]"
            }`}
          >
            {title && (
              <h1
                class={`${
                  mode === "side-minicart" &&
                  "order-2 lg:order-1 mx-auto"
                }`}
              >
                <span class="font-medium text-4xl text-primary-content">
                  {title}
                </span>
              </h1>
            )}
            <Button
              class={`btn btn-ghost bg-transparent hover:bg-transparent h-auto min-h-0 w-[34px] p-0 ${
                mode === "side-minicart"
                  ? "order-1 lg:order-2 ml-0 lg:absolute lg:right-3 lg:top-1/2 lg:-translate-y-1/2 lg:pl-1 lg:pb-1"
                  : "ml-auto"
              }`}
              title="Close dialog"
              onClick={handleCloseDialog}
            >
              <Icon
                id="XMark"
                width={mode === "side-minicart" ? 30 : 34}
                height={mode === "side-minicart" ? 30 : 20}
                strokeWidth={1}
              />
            </Button>
          </header>
          <div class="overflow-y-auto flex-grow flex flex-col">
            {loading === "lazy" ? lazy.value && children : children}
          </div>
        </div>
      </section>
    </dialog>
  );
};

export default Modal;
