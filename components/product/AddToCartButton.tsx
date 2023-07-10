import React, { useState, useContext } from "react";
import { CartState, Checkout } from "lib/useCart";
import { ProductContext } from "pages/products/[handle]";
import CartDrawer from "@components/product/CartDrawer";
import { Button, CircularProgress, Image } from "@chakra-ui/react";
import Basket from "../../public/icons/shopping-cart.svg";
import { bagIcon } from "components/utils/Icon";
// import Image from "next/legacy/image";

type Props = {
  cartState: CartState;
  checkout: Checkout;
};

const AddToCartButton: React.FC<Props> = ({ cartState, checkout }) => {
  const { product, variant } = useContext(ProductContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = async () => {
    setLoading(true);
    const variantId = await (variant ? variant : product.variants[0]).id;
    const quantity = 1;
    await checkout.addItem(variantId, quantity);
    setLoading(false);
    setIsOpen(true);
  };

  return (
    <>
      {loading ? (
        <Button
          w="full"
          className="border border-gray-400 font-semibold inline-block text-gray-700 rounded-sm px-4 py-3 text-sm w-full"
          onClick={onClickHandler}
        >
          <CircularProgress
            // classes={{ svg: "font-bold text-gray-400" }}
            size="1.25rem"
            thickness={6}
          />
        </Button>
      ) : (
        <Button
          w="full"
          type="submit"
          bg="black"
          color={"white"}
          rounded={"full"}
          px={10}
          py={6}
          fontWeight={400}
          onClick={onClickHandler}
          mb={{ base: 5, sm: 5, md: 0 }}
        >
          Tambahkan ke Keranjang
        </Button>
      )}
      <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} cartState={cartState} />
    </>
  );
};

export default AddToCartButton;
