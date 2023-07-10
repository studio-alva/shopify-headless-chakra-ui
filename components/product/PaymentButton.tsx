import React, { useContext } from "react";
import useCart from "lib/useCart";
import { ProductContext } from "pages/products/[handle]";
import AddToCartButton from "@components/product/AddToCartButton";
import BuyNowButton from "@components/product/BuyNowButton";
import { Box, Flex } from "@chakra-ui/react";

const PaymentButton: React.FC = () => {
  const { product, variant } = useContext(ProductContext);
  const [cartState, checkout] = useCart();

  const isAvailable = variant
    ? variant.availableForSale
    : product.variants[0].availableForSale;

  return (
    <>
      {isAvailable ? (
        <>
          <Box
            display={{ base: "block", sm: "block", md: "flex" }}
            gap={5}
            alignItems="center"
          >
            <AddToCartButton
              cartState={cartState}
              checkout={checkout}
            />
            <BuyNowButton checkout={checkout} />
          </Box>
        </>
      ) : (
        <div className="sold-out border border-gray-400 inline-block text-gray-400 rounded-sm px-4 py-3 text-center text-sm w-full">
          Sold out
        </div>
      )}
    </>
  );
};

export default PaymentButton;
