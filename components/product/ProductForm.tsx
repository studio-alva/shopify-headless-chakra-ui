import React from "react";
import ProductOption from "@components/product/ProductOption";
import PaymentButton from "@components/product/PaymentButton";
import { Box } from "@chakra-ui/react";

const ProductForm: React.FC = () => {
  return (
    <>
      <Box my={4} mb={12}>
        <ProductOption />
      </Box>
      <Box w="full">
        <PaymentButton />
      </Box>
    </>
  );
};

export default ProductForm;