import React from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Flex,
  List,
  ListItem,
  Text,
  Button,
  Input,
  InputGroup,
} from "@chakra-ui/react";

const Footer: React.FC = () => {
  const onClickHandler = () => {
    alert("Sorry, newsletter subscription feature is not implemented");
  };

  const Layanan = [
    "Kontak Kami",
    "Status Pesanan",
    "FAQs",
    "Panduan Ukuran",
    "Pengembalian",
  ];

  const Tentang = ["Tentang Kami", "Syarat dan Ketentuan", "Kebijakan Privasi"];

  const Temukan = ["Facebook", "Instagram", "Tiktok"];

  return (
    <>
      <Container
        maxW="container.xl"
        display={{ base: "block", sm: "block", md: "flex", lg: "flex" }}
        py={65}
      >
        <Box
          w="full"
          pr={{
            base: "25px",
            sm: "25px",
            md: "50px",
            lg: "100px",
            xl: "250px",
          }}
          mb={{base:10,sm:10,md:5}}
        >
          <Text fontSize={"14px"} mb={5} fontWeight={700}>
            Layanan Pelanggan
          </Text>
          <List fontSize={"12px"}>
            {Layanan.map((item, idx) => (
              <ListItem fontSize={"12px"} my={2} key={idx}>
                {item}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          w="full"
          pr={{
            base: "25px",
            sm: "50px",
            md: "100px",
            lg: "250px",
            xl: "250px",
          }}
          mb={{base:10,sm:10,md:5}}
        >
          <Text fontSize={"14px"} mb={5} fontWeight={700}>
            Tentang Kami
          </Text>
          <List fontSize={"12px"}>
            {Tentang.map((item, idx) => (
              <ListItem fontSize={"12px"} my={2} key={idx}>
                {item}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          w="full"
          pr={{
            base: "25px",
            sm: "50px",
            md: "100px",
            lg: "250px",
            xl: "250px",
          }}
          mb={{base:10,sm:10,md:5}}
        >
          <Text fontSize={"14px"} mb={5} fontWeight={700}>
            Tentang Kami
          </Text>
          <List fontSize={"12px"}>
            {Temukan.map((item, idx) => (
              <ListItem fontSize={"12px"} my={2} key={idx}>
                {item}
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>

      <Box
        bg={"black"}
        textColor={"white"}
        className="container"
        fontSize="sm"
        py={22}
      >
        <Container maxW="container.xl">
          &copy; {new Date().getFullYear()} - Shoes Shop Powered by Shopify
        </Container>
      </Box>
    </>
  );
};

export default Footer;
