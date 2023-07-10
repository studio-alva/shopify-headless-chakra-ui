import React from "react";
import { Product } from "@lib/graphql/collection/getCollectionWithProducts";
import ProductCard from "components/collections/ProductCard";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Button,
  SimpleGrid,
  Flex,
  Img,
} from "@chakra-ui/react";
import Image from "next/legacy/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import BannerLeft from "../../public/static/OlahragaPetualangan.svg";
import BannerRight from "../../public/static/HidupKenyamanan.svg";

type Props = {
  products: Product[] | null;
};

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const NewProductList: React.FC<Props> = ({ products }) => {
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const top = useBreakpointValue({ base: "40%", md: "40%" });
  const side = useBreakpointValue({ base: "0%", md: "0px" });

  return (
    <Box width={"full"} overflow={"hidden"}>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <Box
        display={{ sm: "block", md: "flex" }}
        justifyContent={"space-between"}
        gap={"35px"}
        mx={"20px"}
      >
        <Box
          position="relative"
          w="full"
          height={{ base: "400px", sm: "400px", md: "495px" }}
          backgroundSize="cover"
          backgroundImage={`url(${BannerLeft.src})`}
          bgColor={"gray.200"}
        >
          <Box position={"absolute"} bottom={"35px"} left={"40px"}>
            <Text fontWeight={500} fontSize={17}>
              Untuk Olahraga & Petualanganmu
            </Text>
            <Button
              marginTop={"13px"}
              type="submit"
              bg="black"
              color={"white"}
              rounded={"full"}
              px={10}
              py={6}
              fontWeight={400}
            >
              Lihat Koleksi
            </Button>
          </Box>
        </Box>

        <Box
          position="relative"
          w="full"
          height={{ base: "400px", sm: "400px", md: "495px" }}
          backgroundSize="cover"
          backgroundImage={`url(${BannerRight.src})`}
          bgColor={"gray.200"}
        >
          <Box
            position={"absolute"}
            top={{ md: "35px" }}
            bottom={{ base: "35px", sm: "35px" }}
            left={"40px"}
          >
            <Text fontWeight={500} fontSize={17}>
              Gaya Hidup & Kenyamanan
            </Text>
            <Button
              marginTop={"13px"}
              type="submit"
              bg="black"
              color={"white"}
              rounded={"full"}
              px={10}
              py={6}
              fontWeight={400}
            >
              Lihat Koleksi
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt={"30px"} pb={"35px"} position={"relative"} height={"400px"}>
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {products.map((product, idx) => (
            <ProductCard product={product} key={idx} />
          ))}
        </Slider>
        <ChevronLeftIcon
          boxSize={"100px"}
          background={"gray.100"}
          rounded={"full"}
          cursor={"pointer"}
          aria-label="left-arrow"
          width={"40px"}
          height={"40px"}
          position={"absolute"}
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        />

        <ChevronRightIcon
          boxSize={"100px"}
          background={"gray.100"}
          rounded={"full"}
          cursor={"pointer"}
          aria-label="right-arrow"
          width={"40px"}
          height={"40px"}
          position={"absolute"}
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        />
      </Box>
    </Box>
  );
};

export default NewProductList;
