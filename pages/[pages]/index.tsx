import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  GetCollectionWithProductsResult,
  getCollections,
  Collection,
} from "lib/graphql/collection/getListCollection";
import {
  getDataCollections,
  GetCollectionResult,
} from "lib/graphql/collection/getListCollectionNavigations";
import { useRouter } from "next/router";
import CategoryCards from "@components/category/CategoryCards";
import { GetServerSideProps } from "next";
import { SortBy } from "@lib/graphql/collection/getCollectionWithProducts";

type Props = {
  pages: string;
  /* Best - Paling Populer */
  sortByBest: SortBy;
  /* New Created - Koleksi Terbaru */
  sortByNew: SortBy;
};

const CategoryPage: React.FC<Props> = ({ pages }) => {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [dataCollection, setDataCollection] = useState<any | null>(null);
  let [categoryFilters, setcategoryFilters] = useState(new Set<string>());

  const filter = [
    {
      title: "Brands",
      option: ["Nike", "Under Armour", "Puma", "Converse", "Air Jordan"],
    },
    {
      title: "Colors",
      option: ["WHITE", "BLACK", "PINK", "MULTICOLOR"],
    },
    {
      title: "Size",
      option: [
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
      ],
    },
  ];

  const fetchData = async (category) => {
    let result: GetCollectionWithProductsResult;
    let data: GetCollectionResult;
    try {
      result = await getCollections();
      data = await getDataCollections(category);
      const categoryResult = result?.collection.filter(
        (i) => i.title.toLowerCase() == category.toLowerCase()
      );

      setCollection(categoryResult[0]);
      setDataCollection(data.collection[0]);
    } catch (err) {
      console.log(err);
      alert("No collections found.");
      return;
    }
  };

  const filteredProducts =
    categoryFilters.size === 0
      ? dataCollection?.products?.edges
      : dataCollection?.products?.edges.filter(
          (e) =>
            categoryFilters.has(e.node.vendor) ||
            categoryFilters.has(e.node.options[2].values.toString()) ||
            categoryFilters.has(e.node.options[0].values.toString())
        );

  const handleChecked = (checked, data) => {
    console.log(data);

    checked
      ? setcategoryFilters((prev) => new Set(prev).add(data))
      : setcategoryFilters((prev) => {
          const next = new Set(prev);
          next.delete(data);
          return next;
        });
  };

  useEffect(() => {
    fetchData(pages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages]);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      {/* left */}
      <GridItem colSpan={1}>
        <Flex justifyContent="space-between" alignItems="center" mb={"32px"}>
          <Text fontWeight={600} fontSize={32}>
            {collection && collection.title}’s shoes
          </Text>
          <Link fontWeight={500} fontSize={18}>
            Reset
          </Link>
        </Flex>

        <Accordion defaultIndex={[0]} allowMultiple>
          {filter.map((filters, idx) => {
            return (
              <div key={idx}>
                <AccordionItem>
                  <AccordionButton
                    _expanded={{ bg: "gray.300", color: "black" }}
                  >
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      fontWeight={500}
                      fontSize={18}
                    >
                      {filters.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    {filters.option.map((item, idx) => {
                      return (
                        <CheckboxGroup colorScheme="green" key={idx}>
                          <Stack spacing={[1, 5]} direction={["column"]} py={2}>
                            <Checkbox
                              key={idx}
                              fontWeight={500}
                              onChange={(e) =>
                                handleChecked(e.target.checked, item)
                              }
                            >
                              {item}
                            </Checkbox>
                          </Stack>
                        </CheckboxGroup>
                      );
                    })}
                  </AccordionPanel>
                </AccordionItem>
              </div>
            );
          })}
        </Accordion>
      </GridItem>

      {/* right */}
      <GridItem colSpan={2}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {filteredProducts
            ? filteredProducts?.map((x, idx) => {
                return <CategoryCards items={x} key={idx} />;
              })
            : "Loading..."}
        </Grid>
      </GridItem>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pages: string = context.params.pages as string;
  /* Default Best - Paling Populer */
  const sortByBest: SortBy =
    (context.query?.sort_by as SortBy) || "best-selling";
  /* Default New Created - Koleksi Terbaru */
  const sortByNew: SortBy =
    (context.query?.sort_by as SortBy) || "created-descending";

  return {
    props: {
      pages,
      sortByBest,
      sortByNew,
    },
  };
};

export default CategoryPage;
