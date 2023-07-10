import React, { useContext } from "react";
import { useRouter } from "next/router";
import { ProductOption } from "lib/graphql/product/getProductByHandle";
import { ProductContext } from "pages/products/[handle]";
import { Select, Text } from "@chakra-ui/react";

type Props = {
  productOption: ProductOption;
};

const Swatch: React.FC<Props> = ({ productOption }) => {
  const { product, variant, setVariant, setImageId } =
    useContext(ProductContext);
  
  const { name: optionName } = productOption;

  const selectedOptions = variant
    ? variant.selectedOptions
    : product.variants[0].selectedOptions;

  const currentValue = selectedOptions.find(
    (opt) => opt.name === optionName
  ).value;

  const router = useRouter();

  const changeVariant = (event) => {
    // Generate title from newly selected value and existing valuek and get matching variant
    const reducer = (accumulator, currentValue) => {
      accumulator.push(
        currentValue.name === optionName
          ? event.target.value
          : currentValue.value
      );
      return accumulator;
    };
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
      <Text color="gray.600" fontSize="md">{optionName}</Text>
      <Select
        onChange={changeVariant}
        value={currentValue}
      >
        {productOption.values.map((value, idx) => (
          <option value={value} key={idx}>
            {value}
          </option>
        ))}
      </Select>
    </>
  );
};

export default Swatch;
