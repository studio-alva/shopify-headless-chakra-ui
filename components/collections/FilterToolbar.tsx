import { Flex, Select, Text } from "@chakra-ui/react";
import { SortBy } from "lib/graphql/collection/getCollectionWithProducts";
import React from "react";

type Props = {
  sortBy: SortBy;
};

const FilterToolbar: React.FC<Props> = ({ sortBy }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;
    location.search = `?sort_by=${value}`;
  };

  return (
    <div className="filter-toolbar border-t border-b border-gray--600">
      <div className="filter-toolbar__inner container flex h-full items-center">
        <Flex alignItems="center" py={2} gap={6}>
          <Text fontSize="sm" color="gray.600">
            Short By
          </Text>
          <Select
            id="sort-by"
            value={sortBy}
            onChange={handleChange}
            size="sm"
            w="md"
          >
            <option value="manual">Manual</option>
            <option value="best-selling">Best Selling</option>
            <option value="title-ascending">title asc, A-Z</option>
            <option value="title-descending">title desc, Z-A</option>
            <option value="price-ascending">price asc</option>
            <option value="price-descending">price desc</option>
            <option value="created-ascending">created asc</option>
            <option value="created-descending">created desc</option>
          </Select>
        </Flex>
      </div>
    </div>
  );
};

export default FilterToolbar;