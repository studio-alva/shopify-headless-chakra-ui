import React, { useContext } from "react";
import ProductForm from "@components/product/ProductForm";
import ProductPrice from "@components/product/ProductPrice";
import { ProductContext } from "pages/products/[handle]";
import { Box, Text } from "@chakra-ui/react";

const ProductDetail: React.FC = () => {
  const {
    product: { title, descriptionHtml },
  } = useContext(ProductContext);

  return (
    <>
      <Box mb={4}>
        <Text fontWeight={600} fontSize="3xl" mb={1}>
          {title}
        </Text>
        <Box mb={10}>
          <ProductPrice />
        </Box>
        <Box mb={10}>
          <Text dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        </Box>
      </Box>
      <Box my={3}>
        <ProductForm />
      </Box>
    </>
  );
};

export default ProductDetail;
