import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Button,
  // Image,
} from "@chakra-ui/react";
import Image from "next/legacy/image";
// Here we have used react-icons package for the icons
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
const Banner1 = require("../../public/static/heroBanner1.png");
const Banner2 = require("../../public/static/heroBanner2.jpg");
const Banner3 = require("../../public/static/heroBanner3.jpg");

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function HeroBanner() {
  const data = [Banner1, Banner2, Banner3];
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const top = useBreakpointValue({ base: "50%", md: "50%" });
  const side = useBreakpointValue({ base: "0%", md: "40px" });

  return (
    <Box
      position={"relative"}
      height={"full"}
      width={"full"}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
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

      <ChevronLeftIcon
        cursor={"pointer"}
        aria-label="left-arrow"
        width={"50px"}
        height={"50px"}
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      />

      <ChevronRightIcon
        cursor={"pointer"}
        aria-label="right-arrow"
        width={"50px"}
        height={"50px"}
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      />
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {data.map((card, index) => (
          <Box
            key={index}
            height={"540px"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.default.src})`}
            bgColor={"gray.200"}
          >
            <Box
              position={"absolute"}
              display={"flex"}
              gap={"97px"}
              top={"180px"}
              right={{base:"50px",sm:"50px",md:"158px"}}
              zIndex={2}
              fontSize={24}
              fontWeight={500}
            >
              <Box>
                <Text fontWeight={500}>Featured Product</Text>
                <Text fontWeight={500}>Diskon 50%</Text>
                <Button
                  type="submit"
                  marginTop={"60px"}
                  bg="black"
                  color={"white"}
                  rounded={"full"}
                  px={10}
                  py={6}
                  fontWeight={400}
                >
                  Beli Sekarang
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
