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
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Slider from "react-slick";

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

const ProductList: React.FC<Props> = ({ products }) => {
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const top = useBreakpointValue({ base: "40%", md: "40%" });
  const side = useBreakpointValue({ base: "0%", md: "0px" });

  return (
    <Box
      position={"relative"}
      height={"400px"}
      width={"full"}
      overflow={"hidden"}
    >
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

      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {products.map((product, idx) => (
          <ProductCard product={product} key={idx} />
        ))}
      </Slider>
    </Box>
  );
};

export default ProductList;
