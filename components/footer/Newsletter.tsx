import { useSignal } from "@preact/signals";
import { useState } from "preact/compat";
import { Runtime } from "deco-sites/fashion/runtime.ts";
import type { JSX } from "preact";
import Quilltext from "deco-sites/std/components/QuillText.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";

export interface Props {
  title?: HTML;
  placeholderEmail?: string;
  colorButton?: string;
  colorButtonMobile?: string;
  textSubmitButton?: string;
  successText?: string;
  errorText?: string;
}

const subscribe = Runtime.create(
  "deco-sites/std/actions/vtex/newsletter/subscribe.ts",
);

function Newsletter(
  {
    title,
    placeholderEmail,
    colorButton,
    colorButtonMobile,
    textSubmitButton,
    successText,
    errorText,
  }: Props,
) {
  const loading = useSignal(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      if (!email.length) {
        setShowError(true);
        return false;
      }

      if (!emailRegex) return false;

      await subscribe({ email });
      setShowSuccess(true);
      setShowError(false);
    } catch {
      setShowError(true);
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="flex flex-col lg:flex-row items-center gap-6 lg:gap-20">
      {title && (
        <div class="flex px-2 flex-col gap-2 max-w-[400px] sm:max-w-[unset] sm:px-2">
          <span class="text-primary mt-[37px]">
            <Quilltext html={title} />
          </span>
          <span class="sm:hidden font-normal px-2 text-2xl text-primary text-[18px] mt-[36px]">
            Newsletter
          </span>
        </div>
      )}
      <form
        class="px-4 font-body text-body w-full sm:w-[408px] xl:w-[280px] 2xl:w-[408px] form-control lg:px-0"
        onSubmit={handleSubmit}
      >
        <div class="flex flex-col w-full relative">
          <span class="hidden sm:block font-normal text-2xl text-primary text-[18px] mb-[23px]">
            Newsletter
          </span>
          {!showSuccess &&
            (
              <>
                <div class="flex flex-col lg:flex-row relative">
                  <input
                    name="email"
                    type="email"
                    class="flex-grow border-[1px] border-solid border-black text-[15px] font-light rounded-[3px] bg-transparent pl-1.5 h-[53px]"
                    placeholder={placeholderEmail}
                  />
                  <button
                    style={{ backgroundColor: colorButton }}
                    class="hidden lg:block disabled:loading bg-transparent lg:bg-info text-black mt-2.5 rounded-none font-normal capitalize border-[1px] border-solid border-black lg:border-0 lg:absolute lg:bottom-1 lg:right-1 lg:min-h-0 h-[44px] lg:w-[126px]"
                    disabled={loading}
                  >
                    {textSubmitButton ? textSubmitButton : "Cadastrar"}
                  </button>

                  <button
                    style={{ backgroundColor: colorButtonMobile }}
                    class="lg:hidden disabled:loading bg-transparent lg:bg-info  text-black mt-2.5 rounded-none font-normal capitalize border-[1px] border-solid border-black lg:border-0 lg:absolute lg:bottom-1 lg:right-1 lg:min-h-0 h-[44px] lg:w-[126px]"
                    disabled={loading}
                  >
                    {textSubmitButton ? textSubmitButton : "Cadastrar"}
                  </button>
                </div>
              </>
            )}

          {showSuccess &&
            (
              <>
                <h4 class="text-base text-primary">
                  {successText ? successText : "Obrigado!"}
                </h4>
              </>
            )}
          {showError && (
            <>
              <h4 class="text-sm mt-2 top-full text-error">
                {errorText ? errorText : "E-mail inválido"}
              </h4>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Newsletter;
