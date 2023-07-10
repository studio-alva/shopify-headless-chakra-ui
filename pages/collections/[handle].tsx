import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Collection,
  getCollectionWithProducts,
  GetCollectionWithProductsResult,
  Product,
  SortBy,
} from "lib/graphql/collection/getCollectionWithProducts";
import FilterToolbar from "components/collections/FilterToolbar";
import ProductList from "components/collections/ProductList";
import {
  Box,
  CircularProgress,
  Container,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Brands from "@components/brands/Brands";
import Delivery from "@components/delivery/Delivery";
import Horizontal from "@components/global/Horizontal";
import NewProductList from "@components/collections/NewProductList";
import HeroBanner from "@components/hero/HeroBanner";

type Props = {
  handle: string;
  /* Best - Paling Populer */
  sortByBest: SortBy;
  /* New Created - Koleksi Terbaru */
  sortByNew: SortBy;
};

const CollectionPage: React.FC<Props> = ({ handle, sortByBest, sortByNew }) => {
  /* Best - Paling Populer */
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);

  /* New Created - Koleksi Terbaru */
  const [collectionNew, setCollectionNew] = useState<Collection | null>(null);
  const [productsNew, setProductsNew] = useState<Product[] | null>(null);

  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const numOfDisplays: number = 16;

  const fetchDataBest = async (cursor?: string) => {
    let result: GetCollectionWithProductsResult;
    try {
      result = await getCollectionWithProducts(
        handle,
        numOfDisplays,
        sortByBest,
        cursor
      );
    } catch (err) {
      alert("No products Best Popular found.");
      return;
    }

    if (!collection) {
      setCollection(result.collection);
    }

    if (products) {
      setProducts([...products, ...result.products]);
    } else {
      setProducts([...result.products]);
    }

    setCursor(result.cursor);
    setHasNextPage(result.hasNextPage);
  };

  const fetchDataNew = async (cursor?: string) => {
    let resultNew: GetCollectionWithProductsResult;
    try {
      resultNew = await getCollectionWithProducts(
        handle,
        numOfDisplays,
        sortByNew,
        cursor
      );
    } catch (err) {
      alert("No products New Collection found.");
      return;
    }

    if (!collectionNew) {
      setCollectionNew(resultNew.collection);
    }

    if (productsNew) {
      setProductsNew([...productsNew, ...resultNew.products]);
    } else {
      setProductsNew([...resultNew.products]);
    }

    setCursor(resultNew.cursor);
    setHasNextPage(resultNew.hasNextPage);
  };

  useEffect(() => {
    fetchDataBest() && fetchDataNew();
  }, []);

  return (
    <article className="collection">
      {/* <Box
        borderTop={1}
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.100"
      >
        <Text textAlign="center" fontWeight="semibold" fontSize="3xl" mt={10}>
          {collection && collection.title}
        </Text>
        <Box borderTop={1} borderStyle="solid" borderColor="gray.100" mt={10}>
          <Container maxW={"container.xl"}>
            <FilterToolbar sortBy={sortByBest} />
          </Container>
        </Box>
      </Box> */}

      <Box
        position={"relative"}
        w={"full"}
        display={"flex"}
        justifyContent={"center"}
      >
        <HeroBanner />
      </Box>

      <Box mt={"80px"}>
        {products ? (
          <InfiniteScroll
            dataLength={products.length}
            next={() => fetchDataBest(cursor)}
            hasMore={hasNextPage}
            loader={<Loader />}
          >
            <Text
              textAlign={"center"}
              mb={"24px"}
              fontSize={"24px"}
              fontWeight={500}
            >
              Paling Populer
            </Text>
            <ProductList products={products} />
          </InfiniteScroll>
        ) : (
          <SkeltonLoader numOfDisplays={8} />
        )}
      </Box>

      <Box mt={"80px"}>
        {productsNew ? (
          <InfiniteScroll
            dataLength={productsNew.length}
            next={() => fetchDataNew(cursor)}
            hasMore={hasNextPage}
            loader={<Loader />}
          >
            <Text
              textAlign={"center"}
              mb={"24px"}
              fontSize={"24px"}
              fontWeight={500}
            >
              Koleksi Terbaru
            </Text>
            <NewProductList products={productsNew} />
          </InfiniteScroll>
        ) : (
          <SkeltonLoader numOfDisplays={8} />
        )}
      </Box>

      <Box
        position={"relative"}
        display={"flex"}
        justifyContent={"center"}
        mt={"80px"}
      >
        <Brands />
      </Box>

      <Box mt={"80px"} mb={"46px"}>
        <Horizontal />
      </Box>

      <Box
        mb={10}
        position={"relative"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Delivery />
      </Box>
    </article>
  );
};

const SkeltonLoader: React.FC<{ numOfDisplays: number }> = ({
  numOfDisplays,
}) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-9 py-9 md:py-14 md:py-12">
    {Array.from(new Array(numOfDisplays)).map((_, idx) => (
      <Box py={2} key={idx}>
        <Box>
          <Skeleton height="20px" />
        </Box>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Box>
    ))}
  </div>
);

const Loader = () => (
  <div className="text-center">
    <CircularProgress size="1.25rem" thickness={6} />
  </div>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const handle: string = context.params.handle as string;
  /* Default Best - Paling Populer */
  const sortByBest: SortBy =
    (context.query?.sort_by as SortBy) || "best-selling";
  /* Default New Created - Koleksi Terbaru */
  const sortByNew: SortBy =
    (context.query?.sort_by as SortBy) || "created-descending";

  return {
    props: {
      handle,
      sortByBest,
      sortByNew,
    },
  };
};

export default CollectionPage;
