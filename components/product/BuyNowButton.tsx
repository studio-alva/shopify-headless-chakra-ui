import React, { useContext } from "react";
import { Checkout } from "lib/useCart";
import { ProductContext } from "pages/products/[handle]";
import { Button } from "@chakra-ui/react";

type Props = {
  checkout: Checkout;
};

const CheckoutButton: React.FC<Props> = ({ checkout }) => {
  const { product, variant } = useContext(ProductContext);

  const onClickHandler = async () => {
    const quantity = 1;
    await checkout.buyNow(
      (variant ? variant : product.variants[0]).id,
      quantity
    );
  };

  return (
    <Button
      w="full"
      type="submit"
      rounded={"full"}
      px={10}
      py={6}
      fontWeight={500}
      onClick={onClickHandler}
    >
      Beli sekarang
    </Button>
  );
};

export default CheckoutButton;
