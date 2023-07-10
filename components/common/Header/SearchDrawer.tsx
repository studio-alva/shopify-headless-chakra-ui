import React from "react";
import { searchIcon, closeIcon } from "components/utils/Icon";
import { SearchBox } from "components/common/SeachBox";
import { Drawer, DrawerContent, DrawerOverlay, Flex, IconButton, useDisclosure } from "@chakra-ui/react";

const SearchDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const btnRef = React.useRef()

  return (
    <>
      <IconButton
        aria-label="search-icon"
        variant="ghost"
        size="sm"
        onClick={onOpen}
        // ref={btnRef}
      >
        {searchIcon}
      </IconButton>
      <Drawer
        // finalFocusRef={btnRef}
        placement='top'
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Flex justifyContent="center" alignItems="center" p={4}>
            <div className="search__wrapper flex-grow max-w-screen-md relative">
              <SearchBox />
            </div>
            <button
              className="drawer__close inline-block p-2"
              onClick={onClose}
            >
              {closeIcon}
            </button>
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchDrawer;
