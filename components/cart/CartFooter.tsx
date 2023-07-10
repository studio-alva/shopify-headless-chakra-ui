import React, { useContext } from "react";
import { CartContext } from "pages/cart";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import NextLink from "next/link";

const CartFooter: React.FC = () => {
  const { cartState } = useContext(CartContext);
  const subTotal = cartState.value.subtotalPrice;

  return (
    <Flex
      justifyContent={{ sm: "center", md: "flex-end" }}
      alignItems="center"
      gap={4}
    >
      <Box>
        <Flex justifyContent="space-between">
          <Text fontWeight="semibold">Subtotal</Text>
          <Text>
            {Number(subTotal.amount)
              .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
              .replace(",00", "")}{" "}
            {subTotal.currencyCode}
          </Text>
        </Flex>
        <Box mt={3}>
          Taxes and shipping charges are calculated during checkout
        </Box>
        <Text textAlign="end" mt={6}>
          <Button href={cartState.value.webUrl} as={NextLink}>
            To purchase procedure
          </Button>
        </Text>
      </Box>
    </Flex>
  );
};

export default CartFooter;
