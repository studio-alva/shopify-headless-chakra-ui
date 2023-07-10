import React, { useContext } from "react";
import Image from "next/legacy/image";
import { LineItem } from "shopify-buy";
import { CartContext } from "pages/cart";
import { QuantityInput } from "components/cart/QuantityInput";
import { Tr, Td, Flex, Box, Link, Text, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { MdDelete } from "react-icons/md";

type Props = {
  item: LineItem;
};

const CartItemRow: React.FC<Props> = ({ item }) => {
  const { cartState, checkout } = useContext(CartContext);

  const { handle, quantity, title, variant } = item;
  const price = Number(item.variant.price.amount);
  const subtotal = price * quantity;
  const imgSrc = variant.image.src;

  const onClickHandler = async (variantId: string) => {
    await checkout.removeItem(variantId).catch((err) => {
      console.error(err);
      alert("Failed to delete");
    });
  };

  return (
    <Tr>
      <Td>
        <Flex gap={4} alignItems="center">
          <Box>
            <Link
              as={NextLink}
              href={`/products/${variant.product.handle}?variant=${variant.id}`}
            >
              <Image
                priority
                src={imgSrc}
                height={150}
                width={150}
                alt={variant.product.handle}
              />
            </Link>
          </Box>
          <Box>
            <Box fontWeight="semibold" mb={2} color="gray.600">
              <Link
                as={NextLink}
                href={`/products/${variant.product.handle}?variant=${variant.id}`}
              >
                {title}
              </Link>
            </Box>
            <Box mb={2}>
              {item.variant.selectedOptions.map((opt, idx) => (
                <Flex gap={2} fontSize="sm" color="gray.500" key={idx}>
                  <Text>{opt.name}:</Text>
                  <Text>{opt.value}</Text>
                </Flex>
              ))}
            </Box>
            <Box>
              <Button
                size="sm"
                leftIcon={<MdDelete />}
                colorScheme="red"
                variant="solid"
                onClick={() => onClickHandler(item.id as string)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Flex>
      </Td>
      <Td className="align-top md:align-middle p-5 text-right text-gray-700 md:w-1/6 w-2/6">
        <div className="text-sm">
          {/* Rp {price.toLocaleString(item.variant.price.currencyCode)} */}
          {price
            .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
            .replace(",00", "")}
        </div>
        <div className="md:hidden mt-3">
          <label className="inline-block mt-auto mb-auto mr-2 my-auto text-xs">
            Qty
          </label>
          <QuantityInput id={item.id as string} quantity={quantity} />
        </div>
      </Td>
      <Td className="md:table-cell hidden p-5 text-gray-700 text-right w-1/6">
        <QuantityInput id={item.id as string} quantity={quantity} />
      </Td>
      <Td className="md:table-cell hidden p-5 pr-0 text-gray-700 text-right w-1/6">
        {/* Rp {subtotal.toLocaleString(item.variant.price.currencyCode)} */}
        {price
          .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
          .replace(",00", "")}
      </Td>
    </Tr>
  );
};

export default CartItemRow;
