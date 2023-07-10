import React, { useContext } from "react";
import Image from "next/legacy/image";
import { ProductContext } from "pages/products/[handle]";
import { closeIcon } from "components/utils/Icon";
import { CartState } from "lib/useCart";
import { Drawer, DrawerContent, DrawerOverlay, Flex, IconButton, Box, Text, Button } from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  cartState: CartState;
};

const CartDrawer: React.FC<Props> = ({ isOpen, setIsOpen, cartState }) => {
  const closeDrawer = () => {
    setIsOpen(false);
  };

  const { product, imageId, variant } = useContext(ProductContext);
  const selectedImage = product.images.find((image) => image.id === imageId);

  const reducer = (accumulator, currentValue) => {
    accumulator += currentValue.quantity;
    return accumulator;
  };
  const totalQuqntity = cartState.value?.lineItems.reduce(reducer, 0);

  return (
    <Drawer
      placement='right'
      isOpen={isOpen}
      onClose={closeDrawer}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Box p={4}>
          <Flex alignItems="center" justifyContent="space-between">
            <Text>Added to cart</Text>
            <Box>
              <IconButton aria-label="close-button" variant="ghost" onClick={closeDrawer}>
                {closeIcon}
              </IconButton>
            </Box>
          </Flex>
          <div className="cart-drawer__content flex mt-4">
            <figure
              className="cart-drawer__image mr-4"
            >
              <Image alt={selectedImage.id} src={selectedImage.src} height={200} width={200} />
            </figure>
            <div className="cart-drawer__info flex-1">
              <Text fontWeight="semibold" mb={3}>
                {product.title}
              </Text>
              <div className="cart-drawer__option mt-2">
                {(variant ? variant : product.variants[0]).selectedOptions.map(
                  (opt, idx) => (
                    <div className="text-sm" key={idx}>
                      <span>{opt.name}:</span>
                      <span>{opt.value}</span>
                    </div>
                  )
                )}
              </div>
            </div>
            <div
              className="cart-drawer__quantity ml-4 text-gray-600 text-right text-sm"
              style={{ flexBasis: "20%" }}
            >
              Qty: 1
            </div>
          </div>
          <div className="cart-drawer__cart-link mt-4">
            <a
              className="border border-gray-900 font-semibold inline-block text-gray-700 rounded-sm px-4 py-3 text-center text-sm w-full"
              href="/cart"
            >
              See the cart {String(totalQuqntity)}
            </a>
          </div>
          <Box mt={6}>
            <Button
              w="full"
              onClick={closeDrawer}
            >
              Continue shopping
            </Button>
          </Box>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
