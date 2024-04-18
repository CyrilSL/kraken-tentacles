import { notFound } from "next/navigation"
import { Suspense } from "react"

<<<<<<< HEAD
<<<<<<< HEAD
type CategoryTemplateProps = {
=======
=======
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
import { ProductCategoryWithChildren } from "types/global"
import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import Link from 'next/link'

export default function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
}: {
<<<<<<< HEAD
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
  categories: ProductCategoryWithChildren[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)

  if (!category || !countryCode) notFound()

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="content-container py-6">
      <div className="flex flex-row mb-8 text-2xl-semi gap-4">
        {parents &&
          parents.map((parent) => (
            <span key={parent.id} className="text-gray-500">
              <Link
                className="mr-4 hover:text-black"
                href={`/${parent.handle}`}
              >
                {parent.name}
              </Link>
              /
            </span>
          ))}
        <h1>{category.name}</h1>
      </div>
      {category.description && (
        <div className="mb-8 text-base-regular">
          <p>{category.description}</p>
=======
=======
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container" data-testid="category-container">
      <RefinementList sortBy={sortBy || "created_at"} data-testid="sort-by-container" />
      <div className="w-full">
        <div className="flex flex-row mb-8 text-2xl-semi gap-4">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} className="text-ui-fg-subtle">
                <Link
                  className="mr-4 hover:text-black"
                  href={`/categories/${parent.handle}`}
                  data-testid="sort-by-link"
                >
                  {parent.name}
                </Link>
                /
              </span>
            ))}
          <h1 data-testid="category-page-title">{category.name}</h1>
<<<<<<< HEAD
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
        </div>
        {category.description && (
          <div className="mb-8 text-base-regular">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && (
          <div className="mb-8 text-base-large">
            <ul className="grid grid-cols-1 gap-2">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <InteractiveLink href={`/categories/${c.handle}`}>
                    {c.name}
                  </InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
