import { useSignal } from "@preact/signals";
import { Runtime } from "deco-sites/fashion/runtime.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import type { JSX } from "preact";

interface Props {
  productID: Product["productID"];
}

const notifyme = Runtime.create("deco-sites/std/actions/vtex/notifyme.ts");

function Notify({ productID }: Props) {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await notifyme({ skuId: productID, name, email });
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
        class="h-[40px] border-b-[1px] border-solid border-primary"
        name="name"
      />
      <input
        placeholder="Email"
        class="h-[40px] border-b-[1px] border-solid border-primary"
        name="email"
      />

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
