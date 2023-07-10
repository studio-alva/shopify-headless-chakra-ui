import React, { useContext } from "react";
// import Image from "next/legacy/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { ProductContext } from "pages/products/[handle]";
import {
  Box,
  Button,
  Flex,
  Skeleton,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";

SwiperCore.use([Navigation]);

const ProductImageList: React.FC = () => {
  const { product, imageId, setImageId } = useContext(ProductContext);

  const initialImageIdx: number = product?.images.findIndex(
    (prd) => prd.id === imageId
  );

  const changeImage = (id: string) => {
    setImageId(id);
  };

  const generateImageChild = (
    id: string,
    src: string,
    isCurrentImage: boolean,
    borderClass: string
  ): JSX.Element => {
    return (
      <figure
        className={"cursor-pointer m-0" + (isCurrentImage ? borderClass : "")}
        key={id}
      >
        <Button
          variant="ghost"
          onClick={() => changeImage(id)}
          data-id={id}
          h={100}
          w={100}
          border={1}
          borderStyle="solid"
          borderColor="#D7D7D7"
        >
          <Image alt={id} src={src} height="full" width="full" />
        </Button>
      </figure>
    );
  };

  const generateImageList = (
    product,
    imageId,
    useSwiper: boolean
  ): JSX.Element[] => {
    const imageList = product.images.map((image) => {
      const { id, src } = image;
      const isCurrentImage = id === imageId;
      const borderClass = " " + "border-1 border-gray-800";
      return useSwiper ? (
        <SwiperSlide key={id}>
          {generateImageChild(id, src, isCurrentImage, borderClass)}
        </SwiperSlide>
      ) : (
        generateImageChild(id, src, isCurrentImage, borderClass)
      );
    });
    return imageList;
  };

  const hiddenSwipper = useBreakpointValue({ xs: false, sm: false, md: false });
  const hiddenSwipperMobile = useBreakpointValue({
    xs: true,
    sm: true,
    md: false,
  });

  return (
    <>
      {product ? (
        <>
          <Flex
            hidden={hiddenSwipperMobile}
            w={"100px"}
            h={"100px"}
            gap={3}
          >
            {generateImageList(product, imageId, false)}
          </Flex>

          <Box hidden={hiddenSwipper} boxSize="sm">
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              navigation={true}
              initialSlide={initialImageIdx}
            >
              {generateImageList(product, imageId, true)}
            </Swiper>
          </Box>
        </>
      ) : (
        <div className="grid grid-cols-4 gap-1 mt-1">
          {Array.from(new Array(4)).map((_, idx) => (
            <div
              className="skelton-container h-0 overflow-hidden relative"
              style={{ paddingTop: "100%" }}
              key={idx}
            >
              <Skeleton height="20px" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductImageList;
