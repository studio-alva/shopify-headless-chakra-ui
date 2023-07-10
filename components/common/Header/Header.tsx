import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import {
  GetCollectionWithProductsResult,
  getCollections,
  Collection,
} from "lib/graphql/collection/getListCollection";
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchBox } from "../SeachBox";
import Basket from "../../../public/icons/shopping-cart.svg";
import Image from "next/legacy/image";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [collection, setCollection] = useState<Collection | null>(null);

  const fetchData = async () => {
    let result: GetCollectionWithProductsResult;
    try {
      result = await getCollections();
      setCollection(result.collection[0]);
    } catch (err) {
      alert("No collections found.");
      return;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const listSection = [
    {
      name: "Pria",
      url: "/men",
    },
    {
      name: "Wanita",
      url: "/women",
    },
    {
      name: "Anak",
      url: "/child",
    },
  ];

  return (
    <header>
      {/* Dekstop */}
      <SimpleGrid
        columns={3}
        spacing={"69px"}
        display={{ base: "none", sm: "none", md: "grid", lg: "grid" }}
      >
        <Box w={{ base: "250px", sm: "250px", md: "250px", lg: "300px" }}>
          <SearchBox />
        </Box>

        <Box w={"2/6"} textAlign={"center"} h={"full"}>
          <Link href="/" as={NextLink}>
            <Text fontSize={"3xl"} fontWeight={600}>
              {/* {collection && collection.title} */}
              Shoes Shop
            </Text>
          </Link>
        </Box>

        <Flex justify={"flex-end"} display={"flex"} gap={4} h={35}>
          <Link as={NextLink} href={`/cart`}>
            <Image src={Basket} alt="Basket" width={35} height={35} />
          </Link>
        </Flex>
      </SimpleGrid>

      <List
        display={{ base: "none", sm: "none", md: "flex", lg: "flex" }}
        justifyContent={"center"}
        alignItems={"center"}
        gap={30}
        w={"full"}
        mt={3}
      >
        {listSection.map((section) => (
          <ListItem fontWeight={400}>
            <Link href={section.url} as={NextLink}>
              {" "}
              {section.name}
            </Link>
          </ListItem>
        ))}
      </List>

      {/* Mobile */}
      <Box
        w={"full"}
        h={"full"}
        display={{ base: "flex", sm: "flex", md: "none", lg: "none" }}
        textAlign={"center"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href="/" as={NextLink}>
          <Text fontSize={"3xl"} fontWeight={600}>
            {collection && collection.title}
          </Text>
        </Link>
        <Flex justifyContent="center" cursor="pointer">
          <IconButton
            variant="ghost"
            colorScheme="ink"
            aria-label="Call Sage"
            fontSize="30px"
            boxSize={10}
            icon={<HamburgerIcon />}
            ref={btnRef}
            onClick={onOpen}
          />

          <Drawer
            finalFocusRef={btnRef}
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            size="full"
          >
            <DrawerOverlay>
              <DrawerContent>
                <Box pt={28} px={10} position="relative">
                  <IconButton
                    variant="ghost"
                    colorScheme="ink"
                    aria-label="Call Sage"
                    fontSize="25px"
                    boxSize={10}
                    position="absolute"
                    zIndex={100}
                    top={0}
                    right={10}
                    mt={9}
                    icon={<CloseIcon />}
                    ref={btnRef}
                    onClick={onClose}
                  />
                  <Stack display="block" textAlign="start" spacing={5}>
                    <SearchBox />

                    <Flex w="full" justifyContent="space-between" pb={8}>
                      <Flex h={35}>
                        <Link as={NextLink} href={`/cart`}>
                          <Image
                            src={Basket}
                            alt="Basket"
                            width={35}
                            height={35}
                          />
                        </Link>
                      </Flex>
                    </Flex>

                    {listSection.map((item, idx) => (
                      <>
                        <Box>
                          <Link
                            as={NextLink}
                            href={item.url}
                            fontWeight={500}
                            key={idx}
                          >
                            {item.name}
                          </Link>
                        </Box>
                      </>
                    ))}
                  </Stack>
                </Box>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Flex>
      </Box>
    </header>
  );
};

export default Header;
