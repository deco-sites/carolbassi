import { useSignal } from "@preact/signals";
import { useState } from "preact/compat";
import { Runtime } from "deco-sites/fashion/runtime.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import type { JSX } from "preact";

interface Props {
  productID: Product["productID"];
}

const notifyme = Runtime.create("deco-sites/std/actions/vtex/notifyme.ts");

function Notify({ productID }: Props) {
  const loading = useSignal(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [showError, setShowError] = useState(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      if (!emailRegex.test(email)) {
        setShowError(true);
        return false;
      }

      if (!emailRegex) return false;

      await notifyme({ skuId: productID, name, email });
      setShowError(false);
    } catch {
      setShowError(true);
    } finally {
      loading.value = false;
    }
  };

  return (
    <form class="form-control justify-start gap-2" onSubmit={handleSubmit}>
      <span class="text-base text-primary">
        Este produto não está disponível no momento
      </span>
      <span class="text-sm text-primary">
        Quero saber quando estiver disponível
      </span>

      <input
        placeholder="Nome"
        class="h-[40px] border-b-[1px] border-solid border-primary outline-none focus-visible:border-b-[1px]"
        name="name"
      />
      <input
        placeholder="Email"
        class="h-[40px] border-b-[1px] border-solid border-primary outline-none focus-visible:border-b-[1px]"
        name="email"
      />
      {showError && (
        <>
          <h4 class="text-sm mt-2 top-full text-error">
            E-mail inválido
          </h4>
        </>
      )}

      <button
        class="btn disabled:loading bg-info text-primary normal-case rounded-none font-normal text-lg h-[59px]"
        disabled={loading}
      >
        Avise-Me Quando Chegar
      </button>
    </form>
  );
}

export default Notify;
