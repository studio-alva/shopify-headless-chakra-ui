import { List, ListItem, Link } from "@chakra-ui/react";
import { Collection } from "lib/graphql/collection/getListCollection";
import NextLink from "next/link";
import React from "react";

type Props = {
  visibility: string;
  collection: Array<Collection>
};

const MenuList: React.FC<Props> = ({ visibility, collection }) => {
  return (
    <List spacing={3}>
      {collection.map((col, idx) => (
        <ListItem
          className="border-t md:border-t-0 border-gray-20 md:inline-block"
          key={idx}
        >
          <Link
            as={NextLink}
            href={`/collections/${col.handle}`}
            _hover={{
              fontWeight: 600
            }}
          >
            {col.title}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuList;
