import React, { useEffect, useState, createContext } from "react";
import { GetServerSideProps } from "next";
import {
  getProductByHandle,
  getProductResult,
  Product,
  Variant,
} from "lib/graphql/product/getProductByHandle";
import Layout from "components/common/Layout";
import ProductMainImage from "@components/product/ProductMainImage";
import ProductImageList from "@components/product/ProductImageList";
import ProductDetail from "@components/product/ProductDetail";
import SEO from "@components/common/SEO";
import { Box, Container, Flex, Skeleton } from "@chakra-ui/react";
import ProductList from "@components/product/ProductList";

type Props = {
  handle: string;
  variantId: string | null;
};

type ProductContext = {
  product: Product;
  variant: Variant | null;
  setVariant: (variant: Variant) => void;
  imageId: string;
  setImageId: (imageId: string) => void;
};

export const ProductContext = createContext({} as ProductContext);

const ProductPage: React.FC<Props> = ({ handle, variantId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  console.log(product);
  
  const [variant, setVariant] = useState<Variant | null>(null);
  const [imageId, setImageId] = useState<string>(null);

  const ProductContextValue: ProductContext = {
    product,
    variant,
    setVariant,
    imageId,
    setImageId,
  };

  const fetchData = async () => {
    const result: getProductResult = await getProductByHandle(handle);
    const prd = result.product;

    let initialVariant: Variant;
    if (variantId) {
      initialVariant = prd.variants.find((v) => v.id === variantId);
      setVariant(initialVariant);
    }

    const initialImageId: string = (initialVariant?.image?.id ||
      prd.images[0].id) as string;

    setImageId(initialImageId);

    setProduct(prd);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SEO
        title={product?.title}
        description={product?.descriptionHtml}
        openGraph={{
          type: "website",
          title: product?.title,
          description: product?.descriptionHtml,
          images: [
            {
              url: product?.images[0]?.src!,
              width: "800",
              height: "600",
              alt: product?.title,
            },
          ],
        }}
      />
      <ProductContext.Provider value={ProductContextValue}>
        <Box
          display={{ base: "block", md: "block", lg: "block", xl: "flex" }}
          mt={10}
          gap={10}
          mb={"30vh"}
        >
          <Box
            w={{
              base: "full",
              sm: "full",
              md: "full",
              lg: "full",
              xl: "588px",
            }}
            mb={20}
          >
            <Box mb={5} mx={2}>
              {product ? <ProductMainImage /> : <Skeleton height="20px" />}
            </Box>
            <Box>
              <ProductList />
              {/* <ProductImageList /> */}
            </Box>
          </Box>
          <Box w="full">
            {product ? (
              <ProductDetail />
            ) : (
              Array.from(new Array(10)).map((_, idx) => (
                <Skeleton height="20px" key={idx} />
              ))
            )}
          </Box>
        </Box>
      </ProductContext.Provider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const handle = context.params.handle as string;
  const variantId: string | null = (context.query.variant as string) || null;

  return {
    props: {
      handle,
      variantId,
    },
  };
};

export default ProductPage;
