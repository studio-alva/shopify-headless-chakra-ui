import React, { useContext, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import { ProductContext } from "pages/products/[handle]";
import {
  Box,
  Flex,
  Skeleton,
  Image,
  useBreakpointValue,
  Tab,
  Tabs,
  TabList,
  Button,
  Link,
} from "@chakra-ui/react";

const ProductList: React.FC = () => {
  const { product, imageId, setImageId } = useContext(ProductContext);
  const defaultImageId = product?.images[0].id;
  const [preview, setPreview] = useState("");
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const top = useBreakpointValue({ base: "50%", md: "50%" });
  const side = useBreakpointValue({ base: "-5px", md: "-5px" });

  const changeImage = (id: string) => {
    setPreview(id);
    setImageId(id);
  };

  const settings = {
    dots: false,
    infinite: false,
    autoplay: false,
    speed: 600,
    autoplaySpeed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      }
    ],
  };

  let slide = settings.responsive.filter((set) => set.settings.slidesToShow);

  return (
    <>
      {product ? (
        <>
          <Box position={"relative"} width={"full"}>
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
              display={
                product?.images?.length <= settings.slidesToShow ||
                product?.images?.length <= Number(slide)
                  ? "none"
                  : "flex"
              }
              boxSize={"100px"}
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
              display={
                product?.images?.length <= settings.slidesToShow ||
                product?.images?.length <= Number(slide)
                  ? "none"
                  : "flex"
              }
              boxSize={"100px"}
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

            <Tabs variant="enclosed">
              <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {product.images.map((item, idx) => (
                  <>
                    <Tab
                      p={0}
                      m={0}
                      rounded={0}
                      mx={2}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      border-collapse="collapse"
                      backgroundColor="transparent"
                      cursor="pointer"
                      onMouseEnter={() => setImageId(item.id)}
                      onMouseLeave={() =>
                        setImageId(preview ? preview : defaultImageId)
                      }
                      onClick={() => changeImage(item.id)}
                      _selected={
                        setImageId
                          ? {
                              border: "1px solid black",
                            }
                          : { border: "0px solid black" }
                      }
                    >
                      <Image
                        key={idx}
                        src={item.src}
                        alt={item.id}
                        width={{
                          base: 100,
                          sm: 200,
                          md: 200,
                          lg: 200,
                          xl: 100,
                        }}
                        height={{
                          base: 100,
                          sm: 100,
                          md: 200,
                          lg: 200,
                          xl: 100,
                        }}
                        // objectFit="cover"
                        cursor="pointer"
                      />
                    </Tab>
                  </>
                ))}
              </Slider>
            </Tabs>
          </Box>
        </>
      ) : (
        <>
          {Array.from(new Array(4)).map((_, idx) => (
            <Box key={idx}>
              <Skeleton height="20px" />
            </Box>
          ))}
        </>
      )}
    </>
  );
};

export default ProductList;
