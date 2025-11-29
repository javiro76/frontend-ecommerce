import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  
  // Obtener categorías
  const categories = await listCategories()

  return (
    <div className="w-full">
      {/* Banner estilo Los Galileos */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-purple-700 to-purple-500 mb-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider drop-shadow-lg">
            CATÁLOGO
          </h1>
        </div>
      </div>

      <div className="flex flex-col small:flex-row small:items-start content-container gap-8">
        {/* Sidebar de filtros */}
        <aside className="w-full small:w-64 small:min-w-[250px] shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-500">
              FILTRA TU BÚSQUEDA
            </h2>
            <RefinementList sortBy={sort} categories={categories} />
          </div>
        </aside>

        {/* Grid de productos */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <nav className="text-sm text-gray-500">
              <LocalizedClientLink href="/" className="hover:text-purple-600 transition-colors">
                INICIO
              </LocalizedClientLink>
              <span className="mx-2">/</span>
              <span className="text-gray-800 font-medium">CATÁLOGO</span>
            </nav>
          </div>

          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
