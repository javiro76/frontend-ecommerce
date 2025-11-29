import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  return (
    <div className="flex flex-col small:flex-row small:items-start py-10 px-4 md:px-8 bg-white min-h-screen content-container rounded-lg shadow-lg" data-testid="category-container">
      <div className="w-full">
        {/* Migas de pan */}

        <nav className="mb-6 flex items-center text-sm text-ui-fg-muted" aria-label="Breadcrumb">
          <LocalizedClientLink href="/store" className="hover:text-black font-medium transition-colors">
            Store
          </LocalizedClientLink>
          <span className="mx-2">/</span>
          {parents && parents.map((parent, idx) => (
            <span key={parent.id} className="flex items-center">
              <LocalizedClientLink href={`/${countryCode}/categories/${parent.handle}`} className="hover:text-black">
                {parent.name}
              </LocalizedClientLink>
              <span className="mx-2">/</span>
            </span>
          ))}
          <span className="font-semibold text-black">{category.name}</span>
        </nav>

        {/* Banner ACTIVADO */}
        <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-100 to-blue-300 p-6 text-center shadow">
          <span className="text-lg font-semibold text-blue-900">Descubre las mejores ofertas en {category.name}!</span>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-ui-fg-base" data-testid="category-page-title">{category.name}</h1>
        {category.description && (
          <div className="mb-8 text-base-regular text-ui-fg-subtle">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && (
          <div className="mb-8 text-base-large">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.category_children?.map((c) => (
                <li key={c.id} className="bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition">
                  <InteractiveLink href={`/categories/${c.handle}`} className="text-lg font-medium text-blue-700 hover:underline">
                    {c.name}
                  </InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mb-8">
          <RefinementList sortBy={sort} data-testid="sort-by-container" />
        </div>
        <Suspense
          fallback={
            <SkeletonProductGrid numberOfProducts={category.products?.length ?? 8} />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
