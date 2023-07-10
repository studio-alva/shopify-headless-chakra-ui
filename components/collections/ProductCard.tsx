import React from "react";
import { Product } from "@lib/graphql/collection/getCollectionWithProducts";
import { Box, Img, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const price = product.priceMax;
  const priceVaries = !(product.priceMax === product.priceMin);

  return (
    <Box mx={"20px"}>
      <NextLink href={`/products/${product.handle}`} passHref>
        <Box
          height={{ base: "277px", sm: "250px", md: "277px" }}
          w="100%"
          overflow="hidden"
        >
          <Img
            alt={product.title}
            src={product.images[0]?.originalSrc}
            _hover={{
              transform: "scale(1.2)",
              transition: "transform .3s",
              transformOrigin: "50% 50%",
            }}
            height={{ base: "277px", sm: "250px", md: "277px" }}
            w="100%"
            bg={"gray.300"}
            objectFit="cover"
          />
        </Box>

        <Box mt={5}>
          <Text fontWeight={700} fontSize={"16px"}>
            {price
              .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
              .replace(",00", "")}
            {/* {priceVaries && "から"} */}
          </Text>
          <Text fontWeight={500} fontSize={"16px"} mt={2}>
            {product.title}
          </Text>
        </Box>
      </NextLink>
    </Box>
  );
};

export default ProductCard;
