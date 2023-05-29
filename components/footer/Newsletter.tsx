import { useSignal } from "@preact/signals";
import { Runtime } from "deco-sites/fashion/runtime.ts";
import type { JSX } from "preact";
import Quilltext from "deco-sites/std/components/QuillText.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";

export interface Props {
  title: HTML;
}

const subscribe = Runtime.create(
  "deco-sites/std/actions/vtex/newsletter/subscribe.ts",
);

function Newsletter({ title }: Props) {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-20">
      <div class="flex px-2 flex-col gap-2 max-w-[400px]">
        <span class="text-primary mt-[37px]">
          <Quilltext html={title} />
        </span>
        <span class="font-normal px-2 text-2xl text-primary text-[18px] mt-[36px]">
          Newsletter
        </span>
      </div>
      <form
        class="px-4 font-body text-body w-full sm:w-[408px] form-control"
        onSubmit={handleSubmit}
      >
        <div class="flex flex-col w-full">
          <input
            name="email"
            class="flex-grow border-[1px] border-solid border-black text-[15px] font-light rounded-[3px] bg-transparent pl-1.5 h-[53px]"
            placeholder="Deixe seu e-mail aqui"
          />
          <button
            class="btn disabled:loading bg-transparent text-black mt-2.5 rounded-none font-normal capitalize border-[1px] border-solid border-black"
            disabled={loading}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Newsletter;
