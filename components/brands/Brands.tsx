import React from "react";
import { Product } from "@lib/graphql/collection/getCollectionWithProducts";
import ProductCard from "components/collections/ProductCard";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Button,
  SimpleGrid,
  Center,
  Img,
  Flex,
} from "@chakra-ui/react";
import Image from "next/legacy/image";

import Nike from "../../public/brands/nike.svg";
import Puma from "../../public/brands/puma.svg";
import Spalding from "../../public/brands/spalding.svg";
import Adidas from "../../public/brands/adidas.svg";
import Jordan from "../../public/brands/jordan.svg";
import Molten from "../../public/brands/molten.svg";
import H from "../../public/brands/h.svg";

export default function Brands() {
  return (
    <Box
      position={"relative"}
      height={"full"}
      width={"full"}
      overflow={"hidden"}
    >
      <Center mb={"24px"}>
        <Text fontSize={"24px"} fontWeight={500}>
          Belanja Brands
        </Text>
      </Center>
      <Flex justifyItems={"center"} justifyContent={"space-between"} gap={2}>
        <Image src={Nike} alt="Nike" width={150} height={150} objectFit='cover' />
        <Image src={Puma} alt="Puma" width={150} height={150} objectFit='cover' />
        <Image src={Spalding} alt="Spalding" width={150} height={150} objectFit='cover' />
        <Image src={Adidas} alt="Adidas" width={150} height={150} objectFit='cover' />
        <Image src={Jordan} alt="Jordan" width={150} height={150} objectFit='cover' />
        <Image src={Molten} alt="Molten" width={150} height={150} objectFit='cover' />
        <Image src={H} alt="H" width={150} height={150} objectFit='cover' />
      </Flex>
    </Box>
  );
}
