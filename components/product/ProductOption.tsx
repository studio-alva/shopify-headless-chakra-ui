import React, { useContext } from "react";
import Swatch from "@components/product/Swatch";
import { ProductContext } from "pages/products/[handle]";
import { Box, Flex, Select, Text } from "@chakra-ui/react";
import Options from "./Options";

const ProductOption: React.FC = () => {
  const { product } = useContext(ProductContext);

  const qty = {
    name: "Qty",
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };

  const optionSize = product.options.filter((e: any) => e.name === "Size");
  const optionQty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const optionMaterial = product.options.filter(
    (e: any) => e.name === "Material"
  );
  const optionColor = product.options.filter((e: any) => e.name === "Color");

  return (
    <>
      {/* Color */}
      <Box mb={10} display={optionSize ? "block" : "none"}>
        {optionColor?.map((option) => {
          const { name: optionName } = option;
          return (
            <Box className="swatch mb-2 md:px-2" key={optionName}>
              {/* <Swatch productOption={option} /> */}
              <Options productOption={option} />
            </Box>
          );
        })}
      </Box>

      {/* Size */}
      <Box display={optionSize ? "block" : "none"}>
        {optionSize?.map((option) => {
          const { name: optionName } = option;
          return (
            <Box className="swatch mb-2 md:px-2" key={optionName}>
              {/* <Swatch productOption={option} /> */}
              <Options productOption={option} />
            </Box>
          );
        })}
      </Box>

      {/* Material */}
      <Flex
        display={optionMaterial[0] ? "flex" : "none"}
        fontWeight={600}
        my={10}
        gap={1}
      >
        <Text>{optionMaterial[0]?.name} :</Text>
        <Text color="#8B8B8B">{optionMaterial[0]?.values}</Text>
      </Flex>

      {/* Quantitiy */}
      <Box>
        <Text mt={10} mb={4} fontWeight={600}>
          Jumlah
        </Text>
        <Select
          w={20}
          // onChange={changeVariant}
          // value={currentValue}
        >
          {optionQty.map((value, idx) => {
            return (
              <option value={value} key={idx}>
                {value}
              </option>
            );
          })}
        </Select>
      </Box>
    </>
  );
};

export default ProductOption;
