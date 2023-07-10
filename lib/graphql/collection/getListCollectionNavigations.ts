import { gql } from "graphql-request";
import customClient from "lib/graphql/customClient";

export type GetCollectionResult = {
  collection: any;
  size: any;
  value: any;
};

/**
 * Fetch collection info with products info as a format like liquid object for collection page
 * @param handle collection handle
 */

export const getDataCollections = async (
  slug: String
): Promise<GetCollectionResult> => {
  const res = await fetchDataCollection(slug);
  return adjustIntoResult(res);
};

/**
 * Fetch collection info with products from shopify store front api
 * @param handle collection handle
 * @param numOfDisplays num of collection products to retrieve at once
 * @param sortKey sortKey defined at ProductCollectionSortKeys(https://shopify.dev/api/storefront/reference/products/productcollectionsortkeys)
 * @param reverse sort reverse
 * @param cursor product cursor at store front api
 * @returns
 */

const fetchDataCollection = async (slug: String): Promise<any> => {
  const query = gql`
    query getDataSlug($slug: String!) {
      collections(first: 1, query: $slug) {
        edges {
          node {
            products(first: 10) {
              edges {
                node {
                  id
                  title
                  vendor
                  tags
                  handle
                  description
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                    maxVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  images(first: 1) {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        originalSrc
                        altText
                        width
                        height
                      }
                    }
                  }
                  options {
                    name
                    values
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    slug: slug,
  };

  const res = await customClient.request(query, variables).catch((err) => {
    throw new Error(err);
  });

  return res;
};

/**
 * Arrange as collection and product object like Liquid object
 * @param res
 * @returns
 */
const adjustIntoResult = (res: any): GetCollectionResult => {
  let collection: any = {};
  collection = res.collections.edges.map((node: any) => node.node);

  let size: any = [];
  size = collection[0].products.edges.map((edge) =>
    edge.node.options.filter((e: any) => {
      return e.name.toLowerCase() === "color";
    })
  );
  // console.log(size);

  // let value = new Array<object>();
  let value = [];
  size?.map((item: any) => {
    item.map((data: any) => {
      if (value.indexOf(data) < 0) {
        value.push([...new Set(data.values)]);
      }
    });
  });
  // console.log(value);

  return { collection, size, value };
};
