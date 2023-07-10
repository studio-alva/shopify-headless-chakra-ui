import React from "react";
import {
  Box,
  Container,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Flex,
} from "@chakra-ui/react";
import Horizontal from "@components/global/Horizontal";

export default function Info() {
  return (
    <>
      <Container maxW="container.xl">
        <Horizontal />
      </Container>
      <Box w={"full"} bg={"#EFEFEF"}>
        <Container
          maxW="container.xl"
          display={{ base: "block", sm: "block", md: "flex" }}
          textAlign={"center"}
          py={"80px"}
          justifyContent="space-evenly"
          gap={20}
        >
          <Box mb={{ base: 10, sm: 10, md: 0, lg: 0 }}>
            <Text fontSize={"16px"} fontWeight={700} mb={"16px"}>
              Jadilah Yang Terdepan
            </Text>
            <Text mb={"24px"}>
              Daftarkan dirimu dan dapatkan penawaran terbaik
            </Text>
            <FormControl
              display={"flex"}
              justifyItems={"center"}
              justifyContent={"center"}
              gap={2}
            >
              <Input
                type="email"
                bg={"white"}
                placeholder={"Email"}
                rounded={"full"}
                fontSize={"sm"}
              />
              <Button
                bg="black"
                color={"white"}
                rounded={"full"}
                px={14}
                py={{ base: 0, sm: 0, md: 6 }}
                fontWeight={400}
              >
                Langganan
              </Button>
            </FormControl>
          </Box>
          <Box>
            <Text fontSize={"16px"} fontWeight={700} mb={"16px"}>
              Lokasi Toko Terdekat
            </Text>
            <Text mb={"24px"}>Cobalah produk kamu di toko terdekatmu!</Text>
            <Button
              bg="black"
              color={"white"}
              rounded={"full"}
              px={10}
              py={{ base: 0, sm: 0, md: 6 }}
              fontWeight={400}
            >
              Cari toko terdekatmu
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
