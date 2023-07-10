import React from "react";
import {
  Box,
  CircularProgress,
  Container,
  Skeleton,
  Text,
  Center,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import Truck from "../../public/icons/truck.svg";
import ArrowLeft from "../../public/icons/arrow-left.svg";
import Headphones from "../../public/icons/headphones.svg";
import Image from "next/legacy/image";

const Delivery: React.FC = () => {
  return (
    <Box
      display={{ md: "flex" }}
      w={"full"}
      justifyContent={"space-between"}
      gap={10}
      textAlign={"center"}
    >
      <Box w={{ sm: "full", md: "262px" }} mb={{ base: 10, sm: 10, md: 0 }}>
        <Box display={"flex"} justifyContent={"center"} mb={"14px"}>
          <Image
            src={Truck}
            alt="Nike"
            width={30}
            height={30}
            objectFit="cover"
          />
        </Box>
        <Text
          mb={"14px"}
          textTransform={"uppercase"}
          fontSize={"16px"}
          fontWeight={700}
        >
          Pengiriman Cepat
        </Text>
        <Text textColor={"gray.500"} fontSize={"14px"}>
          Kurir pengiriman handal menjamin produk datang tepat waktu.
        </Text>
      </Box>
      <Box w={{ sm: "full", md: "262px" }} mb={{ base: 10, sm: 10, md: 0 }}>
        <Box display={"flex"} justifyContent={"center"} mb={"14px"}>
          <Image
            src={ArrowLeft}
            alt="Nike"
            width={30}
            height={30}
            objectFit="cover"
          />
        </Box>
        <Text
          mb={"14px"}
          textTransform={"uppercase"}
          fontSize={"16px"}
          fontWeight={700}
        >
          Pengembalian Gratis
        </Text>
        <Text textColor={"gray.500"} fontSize={"14px"}>
          Pengembalian mudah hingga 30 hari setelah pembelian.
        </Text>
      </Box>
      <Box w={{ sm: "full", md: "262px" }}>
        <Box display={"flex"} justifyContent={"center"} mb={"14px"}>
          <Image
            src={Headphones}
            alt="Nike"
            width={30}
            height={30}
            objectFit="cover"
          />
        </Box>
        <Text
          mb={"14px"}
          textTransform={"uppercase"}
          fontSize={"16px"}
          fontWeight={700}
        >
          Bantuan
        </Text>
        <Text textColor={"gray.500"} fontSize={"14px"}>
          Admin yang ramah dan bersahabat siap membantu.
        </Text>
      </Box>
    </Box>
  );
};
export default Delivery;
