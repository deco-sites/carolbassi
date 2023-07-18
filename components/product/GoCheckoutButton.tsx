import Button from "deco-sites/fashion/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "deco-sites/fashion/sdk/useAddToCart.ts";
import { useEffect, useState } from "preact/hooks";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
}

function GoCheckoutButton(
  { skuId, sellerId, discount, price, productGroupId, name }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    goCheckout: true,
  });

  const [isCentered, setIsCentered] = useState(false);

  useEffect(() => {
    const body = document.body;
    const scrollButton = document.createElement("button");
    scrollButton.innerText = "Comprar";
    scrollButton.classList.add("scrollButton");
    body.appendChild(scrollButton);

    const handleScroll = () => {
      const button = document.querySelector(
        "[data-fixed-button]",
      ) as HTMLElement;
      const rect = button.getBoundingClientRect();
      const bodyRect = document.body.getBoundingClientRect();
      const scrollButton = document.querySelector(
        ".scrollButton",
      ) as HTMLElement;

      if (window.scrollY > rect.top - bodyRect.top) {
        scrollButton.style.display = "block";
      } else {
        scrollButton.style.display = "none";
      }
    };

    globalThis.addEventListener("scroll", handleScroll);

    return () => globalThis.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   if (!button) return;
  //   if (isCentered) {
  //     button.style.display = "block";
  //   } else {
  //     button.style.display = "none";
  //   }
  // }, [isCentered]);

  return (
    <Button
      data-deco="add-to-cart"
      data-fixed-button
      {...props}
      class={`w-full h-[59px] bg-info text-primary text-lg font-normal normal-case rounded-none hover:bg-info ${
        isCentered ? "" : ""
      }`}
    >
      Comprar
    </Button>
  );
}

export default GoCheckoutButton;
