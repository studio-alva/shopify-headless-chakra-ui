import React, { useContext } from "react";
// import Image from "next/legacy/image";
import { ProductContext } from "pages/products/[handle]";
import { Box, Text, Img, Image } from "@chakra-ui/react";

const ProductMainImage: React.FC = () => {
  const { product, imageId } = useContext(ProductContext);

  const selectedImage = product.images.find((image) => image.id === imageId);

  return (
    <>
      {product ? (
        <Image
          alt={selectedImage.id}
          src={selectedImage.src}
          minW={{
            base: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "572px",
          }}
          maxW={{
            base: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "572px",
          }}
          minH={{
            base: "400px",
            sm: "700px",
            md: "700px",
            lg: "800px",
            xl: "572px",
          }}
          maxH={{
            base: "400px",
            sm: "700px",
            md: "700px",
            lg: "800px",
            xl: "572px",
          }}
          objectFit="cover"
        />
      ) : (
        <Text>Image Product Not Found</Text>
      )}
    </>
  );
};

export default ProductMainImage;
