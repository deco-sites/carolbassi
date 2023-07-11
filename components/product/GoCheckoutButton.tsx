import Button from "deco-sites/fashion/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "deco-sites/fashion/sdk/useAddToCart.ts";

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

  return (
    <Button
      data-deco="add-to-cart"
      {...props}
      class="w-full h-[59px] bg-info text-primary text-lg font-normal normal-case rounded-none"
    >
      Comprar
    </Button>
  );
}

export default GoCheckoutButton;
