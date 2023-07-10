import React, { useContext } from "react";
import { ProductContext } from "pages/products/[handle]";
import { Flex, Text } from "@chakra-ui/react";

const ProductPrice: React.FC = () => {
  const { product, variant } = useContext(ProductContext);
  const price = Number(
    variant ? variant.price : product.variants[0].price.toLocaleString("id-ID")
  );
  // console.log(product);
  
  const isAvailable = variant
    ? variant.availableForSale
    : product.variants[0].availableForSale;

  return (
    <Flex gap={2}>
      <Text fontWeight="semibold">
        {price
          .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
          .replace(",00", "")}
      </Text>
      {isAvailable || (
        <Text fontSize="sm" fontWeight="light">
          Sold out
        </Text>
      )}
    </Flex>
  );
};

export default ProductPrice;
