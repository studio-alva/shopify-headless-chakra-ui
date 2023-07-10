import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Product,
  getProductsByTitle,
  GetProductsByTitleResult,
} from "lib/graphql/product/getProductsByTitle";
import Layout from "components/common/Layout";
import { SearchBox } from "components/common/SeachBox";
import { SearchItemRow } from "@components/search/SearchItemRow";
import { CircularProgress, Skeleton } from "@chakra-ui/react";

type Props = {
  queryWord: string | null;
};

const SearchPage: React.FC<Props> = ({ queryWord }) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const fetchData = async (queryWord: string, cursor: string) => {
    const numOfDisplays: number = 16;
    let result: GetProductsByTitleResult;
    try {
      result = await getProductsByTitle(queryWord, numOfDisplays, cursor);
    } catch {
      alert("Failed to get product information.");
      return;
    }

    if (products) {
      setProducts([...products, ...result.products]);
    } else {
      setProducts([...result.products]);
    }

    setCursor(result.cursor);
    setHasNextPage(result.hasNextPage);
  };

  useEffect(() => {
    if (queryWord) {
      fetchData(queryWord, cursor);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article>
      <header className="pb-8 md:pb-14">
        <div className="container">
          <h2 className="font-semibold mb-4 text-center text-gray-700 text-xl">
            {queryWord ? `"${queryWord}"search result of` : "Search for products"}
          </h2>
          <div className="max-w-screen-sm relative mx-auto my-0 md:w-7/12 w-full">
            <SearchBox />
          </div>
        </div>
      </header>
      {queryWord && (
        <section className="container border-t pt-8 md:pt-14">
          {products ? (
            products.length > 0 ? (
              <InfiniteScroll
                dataLength={products.length}
                next={() => fetchData(queryWord, cursor)}
                hasMore={hasNextPage}
                loader={<Loader />}
              >
                {products.map((product: Product) => (
                  <SearchItemRow product={product} key={product.id} />
                ))}
              </InfiniteScroll>
            ) : (
              <div className="text-center">No products found.</div>
            )
          ) : (
            Array.from(new Array(6)).map((_, idx) => (
              <SkeltonLoader key={idx} />
            ))
          )}
        </section>
      )}
    </article>
  );
};

export default SearchPage;

const SkeltonLoader = () => {
  return (
    <div className="flex items-center justify-center mb-5">
      <div className="flex items-center justify-center w-full">
        <div className="flex-grow-0 flex-shrink-0 mr-4 md:mr-6 w-16 md:w-24">
          <div
            className="h-0 overflow-hidden relative"
            style={{ paddingTop: "100%" }}
          >
            <Skeleton
              height='20px'
            />
          </div>
        </div>
        <div className="flex-grow-1 w-full">
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />
        </div>
      </div>
      <div className="ml-4 md:ml-6 w-1/5">
        <Skeleton height='20px' />
      </div>
    </div>
  );
};

const Loader = () => (
  <div className="text-center">
    <CircularProgress
      size="1.25rem"
      thickness={6}
    />
  </div>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryWord = (context.query?.q as string) || null;

  return {
    props: {
      queryWord,
    },
  };
};
