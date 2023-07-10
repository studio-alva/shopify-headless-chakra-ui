import React, { useContext } from "react";
import { CartContext } from "pages/cart";
import CartItemRow from "components/cart/CartItemRow";
import { Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

const CartItemTable = () => {
  const { cartState } = useContext(CartContext);

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>List Product in Cart</TableCaption>
        <Thead>
          <Tr>
            <Th>
              Product name
            </Th>
            <Th>
              Price
            </Th>
            <Th>
              Qty
            </Th>
            <Th>
              total
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {cartState.value?.lineItems.map((item) => (
            <CartItemRow item={item} key={item.id} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CartItemTable;
