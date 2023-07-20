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

function AddToCartButton(
  { skuId, sellerId, discount, price, productGroupId, name }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  });

  return (
    <Button
      data-deco="add-to-cart"
      {...props}
      class="w-full h-[59px] bg-base-100 text-primary text-lg font-normal normal-case rounded-none border-solid border-[1px] border-black sm:p-0 hover:bg-base-100"
    >
      Adicionar ao carrinho
    </Button>
  );
}

export default AddToCartButton;
