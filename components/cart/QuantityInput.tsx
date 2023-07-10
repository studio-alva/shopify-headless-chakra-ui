import React, { useContext } from "react";
import _ from "lodash";
import { CartContext } from "pages/cart";
import { Input } from "@chakra-ui/react";

type Props = {
  id: string;
  quantity: number;
};

export const QuantityInput: React.FC<Props> = ({ id, quantity }) => {
  const { checkout } = useContext(CartContext);

  const updateQuantity = (event) => {
    const newQuantity = Number(event.target.value);
    if (newQuantity === 0) {
      checkout.removeItem(id);
    } else {
      checkout.updateQuantity(id, newQuantity);
    }
  };

  const onChangeHandler = (event) => updateQuantity(event);

  const debouned = _.debounce(onChangeHandler, 300);

  return (
    <Input
      type="number"
      className="align-middle"
      defaultValue={quantity}
      // inputProps={{
      //   step: 1,
      //   max: 9999,
      //   min: 0,
      //   style: {
      //     textAlign: "center",
      //   },
      // }}
      margin="dense"
      onChange={debouned}
      variant="outlined"
    />
  );
};
