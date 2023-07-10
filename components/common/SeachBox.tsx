import React, { useRef } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

export const SearchBox: React.FC = () => {
  const formEl = useRef<HTMLFormElement | null>(null);

  const onClickHandler = (event) => {
    event.preventDefault();
    const form = formEl.current;
    const formData = new FormData(form);
    const text = formData.get("q");
    form.action = `/search?${text}`;
    form.submit();
  };

  return (
    <form action="/search" method="get" ref={formEl}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          onClick={onClickHandler}
          ml={2}
          py={6}
        >
          <Search2Icon w={19} h={19} alignItems={"center"} />
        </InputLeftElement>
        <Input
          size="md"
          type="text"
          placeholder="Search ..."
          autoFocus
          name="q"
          rounded={"full"}
          bg={"neutral.100"}
          w={"full"}
          fontSize={14}
          pl={12}
          py={6}
        />
      </InputGroup>
      {/* <Button onClick={onClickHandler}>
          <Search2Icon w={18}/>
        </Button> */}
    </form>
  );
};
