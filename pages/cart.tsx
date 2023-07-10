import React, { createContext } from "react";
import useCart, { CartState, Checkout } from "lib/useCart";
import CartItemTable from "components/cart/CartItemTable";
import CartFooter from "components/cart/CartFooter";
import Link from "next/link";
import { Skeleton, Text, Box, Container, Flex, Button } from "@chakra-ui/react";

type CartContext = {
  cartState: CartState;
  checkout: Checkout;
};

export const CartContext = createContext<CartContext>({} as CartContext);

const CartPage: React.FC = () => {
  const [cartState, checkout] = useCart();
  const CartContextValue: CartContext = {
    cartState,
    checkout,
  };

  return (
    <CartContext.Provider value={CartContextValue}>
      <article className="collections-all">
        <Box my={6}>
          <Text fontSize="2xl" textAlign="center" fontWeight="semibold">
            Shopping cart
          </Text>
        </Box>
        <Container maxW="container.lg">
          {cartState.loading ? (
            Array.from(new Array(3)).map((_, idx) => (
              <SkeletonLoader key={idx} />
            ))
          ) : (
            <Box mt={6}>
              {cartState.value?.lineItems.length > 0 ? (
                <>
                  <Flex alignItems="center" justifyContent="center" mb={4}>
                    <Button textAlign="center" variant="outline">
                      <Link href="/">
                        Continue shopping
                      </Link>
                    </Button>
                  </Flex>
                  <CartItemTable />
                  <CartFooter />
                </>
              ) : (
                <>
                  <Text mb={4} textAlign="center">There are no products in the cart</Text>
                  <Flex alignItems="center" justifyContent="center">
                    <Button>
                      <span className="bg-gray-700 flex-grow inline-block px-4 py-3 text-sm text-white">
                        <Link
                          href="/"
                        >
                          Continue shopping
                        </Link>
                      </span>
                    </Button>
                  </Flex>
                </>
              )}
            </Box>
          )}
        </Container>
      </article>
    </CartContext.Provider>
  );
};

export default CartPage;

const SkeletonLoader = () => (
  <div className="flex justify-center mb-5">
    <div className="flex justify-center w-full items-start">
      <div className="flex-grow-0 flex-shrink-0 mr-4 md:mr-6 w-16 md:w-24">
        <div
          className="h-0 overflow-hidden relative"
          style={{ paddingTop: "100%" }}
        >
          <Skeleton
            height='20px'
          />
        </div>
      </div>
      <div className="flex-grow-1 w-full">
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
      </div>
    </div>
    <div className="px-2 md:w-1/6 w-2/6">
      <Skeleton height='20px' />
      <Skeleton height='20px' className="md:hidden" />
    </div>
    <div className="hidden px-2 md:block w-1/6">
      <Skeleton height='20px' />
    </div>
    <div className="hidden px-2 md:block w-1/6">
      <Skeleton height='20px' />
    </div>
  </div>
);
