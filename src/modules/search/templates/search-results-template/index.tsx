import { Heading, Text } from "@medusajs/ui"
import Link from "next/link"

import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
<<<<<<< HEAD
<<<<<<< HEAD
import Link from "next/link"
import { useEffect, useState } from "react"
=======
import PaginatedProducts from "@modules/store/templates/paginated-products"

>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
import PaginatedProducts from "@modules/store/templates/paginated-products"

>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)

type SearchResultsTemplateProps = {
  query: string
  ids: string[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
}

const SearchResultsTemplate = ({
  query,
  ids,
  sortBy,
  page,
  countryCode,
}: SearchResultsTemplateProps) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <>
      <div className="flex justify-between border-b w-full py-6 px-8 small:px-14 items-center">
        <div className="flex flex-col items-start">
          <Text className="text-ui-fg-muted">Search Results for:</Text>
          <Heading>
            {decodeURI(query)} ({ids.length})
          </Heading>
        </div>
        <Link
          href="/store"
          className="txt-medium text-ui-fg-subtle hover:text-ui-fg-base"
        >
          Clear
        </Link>
      </div>
      <div className="flex flex-col small:flex-row small:items-start p-6">
        {ids.length > 0 ? (
          <>
            <RefinementList sortBy={sortBy || "created_at"} search />
            <div className="content-container">
              <PaginatedProducts
                productsIds={ids}
                sortBy={sortBy}
                page={pageNumber}
                countryCode={countryCode}
              />
            </div>
          </>
        ) : (
          <Text className="ml-8 small:ml-14 mt-3">No results.</Text>
        )}
      </div>
    </>
  )
}

export default SearchResultsTemplate
