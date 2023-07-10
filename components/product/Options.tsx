import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { ProductOption } from "lib/graphql/product/getProductByHandle";
import { ProductContext } from "pages/products/[handle]";
import {
  Select,
  Text,
  Box,
  Grid,
  GridItem,
  Flex,
  Button,
  TabPanels,
  Tabs,
  Tab,
  TabList,
} from "@chakra-ui/react";
import { size } from "lodash";

type Props = {
  productOption: ProductOption;
};

const Options: React.FC<Props> = ({ productOption }) => {
  const { product, variant, setVariant, setImageId } =
    useContext(ProductContext);

  const { name: optionName } = productOption;

  const selectedOptions = variant
    ? variant.selectedOptions
    : product.variants[0].selectedOptions;
  // console.log("selectedOptions 👉️", selectedOptions);

  const currentValue = selectedOptions.find(
    (opt) => opt.name === optionName
  ).value;

  const router = useRouter();

  const handleClick = (event) => {
    event.preventDefault();

    // Generate title from newly selected value and existing valuek and get matching variant
    const reducer = (accumulator, currentValue) => {
      accumulator.push(
        currentValue.name === optionName
          ? event.target.outerText
          : currentValue.value
      );
      return accumulator;
    };
    // setActive(true);
    const title: string = selectedOptions.reduce(reducer, []).join(" / ");
    const newVariant = product.variants.find((vrt) => vrt.title === title);

    // update variant
    setVariant(newVariant);

    // update imageId
    newVariant?.image?.id && setImageId(newVariant.image.id as string);

    // query update params
    router.replace(
      {
        query: { handle: router.query.handle, variant: newVariant.id },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <Flex fontWeight={600} fontSize="md" mb={4} gap={1}>
        <Text> {optionName}</Text>
        <Text color="#8B8B8B">
          (Panduan {optionName.toLowerCase() === "size" ? optionName + " ─ EU" : optionName})
        </Text>
      </Flex>
      <Tabs
        display="grid"
        gridTemplateColumns={{
          base: "repeat(4, 1fr)",
          sm: "repeat(6, 1fr)",
          md: "repeat(7, 1fr)",
        }}
        gap={6}
      >
        {productOption.values.map((value, idx) => {
          return (
            <>
              <Tab
                key={idx}
                h="70px"
                w="70px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                border-collapse="collapse"
                border={"1px"}
                borderColor="gray.200"
                backgroundColor="transparent"
                cursor="pointer"
                _selected={{ color: "black", fontWeight: 600, border: "1px" }}
                onClick={handleClick}
              >
                {value}
              </Tab>
            </>
          );
        })}
      </Tabs>
    </>
  );
};

export default Options;
