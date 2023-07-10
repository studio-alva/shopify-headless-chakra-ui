import { Flex, Select, Text } from "@chakra-ui/react";
import React from "react";
import { Box, Grid, GridItem, Img } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
  items: any;
};

const CategoryCards: React.FC<Props> = ({ items }) => {
  // console.log("category cards", items);

  const formatRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };

  return (
    <>
      <NextLink href={`/products/${items.node.handle}`} passHref>
        <Box
          height={{ base: "277px", sm: "250px", md: "277px" }}
          w="100%"
          overflow="hidden"
        >
          <Img
            alt={items.node.images.edges[0].node.altText}
            src={items.node.images.edges[0].node.originalSrc}
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
            {formatRupiah(Number(items.node.priceRange.minVariantPrice.amount))}
          </Text>
          <Text fontWeight={500} fontSize={"16px"} mt={2}>
            {items.node.title}
          </Text>
        </Box>
      </NextLink>
    </>
  );
};

export default CategoryCards;
