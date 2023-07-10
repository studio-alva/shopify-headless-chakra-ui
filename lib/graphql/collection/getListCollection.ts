import { gql } from "graphql-request";
import customClient from "lib/graphql/customClient";

export type Collection = {
  id: string,
  title: string;
  handle: string;
};

export type GetCollectionWithProductsResult = {
  collection: Array<Collection>;
};

/**
 * Fetch collection info with products info as a format like liquid object for collection page
 * @param handle collection handle
*/
export const getCollections = async (): Promise<GetCollectionWithProductsResult> => {
  const res = await fetchCollection();
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
const fetchCollection = async (): Promise<any> => {
  const query = gql`
    query {
        collections(first: 10) {
            edges {
                node {
                    id,
                    title,
                    handle
                }
            }
        }
    }
  `;

  const res = await customClient.request(query).catch((err) => {
    throw new Error(err);
  });

  return res;
};

/**
 * Arrange as collection and product object like Liquid object
 * @param res
 * @returns
*/
const adjustIntoResult = (res: any): GetCollectionWithProductsResult => {
  let collection: Array<Collection> = [];
  collection = res.collections.edges.map((node: any) => node.node)

  return { collection };
};
