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
    <div className="w-full bg-gradient-to-b from-gray-50 to-white min-h-screen" data-testid="category-container">
      {/* Banner elegante de categoría */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800"></div>
        <div className="absolute inset-0 bg-[url('/store-pattern.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10"></div>
        <div className="relative h-full flex flex-col items-center justify-center">
          <span className="text-amber-200 text-sm tracking-[0.3em] uppercase mb-2">Categoría</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wider drop-shadow-lg mb-4" data-testid="category-page-title">
            {category.name}
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300"></div>
            <svg className="w-6 h-6 text-amber-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300"></div>
          </div>
        </div>
      </div>

      <div className="content-container py-10">
        {/* Miga de pan mejorada */}
        <nav className="mb-8 flex items-center text-sm" aria-label="Breadcrumb">
          <LocalizedClientLink 
            href="/" 
            className="text-gray-500 hover:text-amber-600 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Inicio
          </LocalizedClientLink>
          <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <LocalizedClientLink 
            href="/store" 
            className="text-gray-500 hover:text-amber-600 transition-colors"
          >
            Tienda
          </LocalizedClientLink>
          <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          {parents && parents.reverse().map((parent) => (
            <span key={parent.id} className="flex items-center">
              <LocalizedClientLink 
                href={`/categories/${parent.handle}`} 
                className="text-gray-500 hover:text-amber-600 transition-colors"
              >
                {parent.name}
              </LocalizedClientLink>
              <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          ))}
          <span className="category-badge">{category.name}</span>
        </nav>

        {/* Descripción de la categoría si existe */}
        {category.description && (
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <p className="text-gray-600 leading-relaxed">{category.description}</p>
          </div>
        )}

        {/* Subcategorías si existen */}
        {category.category_children && category.category_children.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Subcategorías
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <InteractiveLink 
                    href={`/categories/${c.handle}`} 
                    className="block bg-white rounded-xl p-4 shadow-md hover:shadow-lg border border-gray-100 hover:border-amber-200 transition-all duration-300 text-center group"
                  >
                    <span className="text-gray-700 font-medium group-hover:text-amber-600 transition-colors">
                      {c.name}
                    </span>
                  </InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Filtros y productos */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de ordenamiento */}
          <aside className="w-full lg:w-64 lg:min-w-[250px] shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b-2 border-amber-400 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                Ordenar
              </h2>
              <RefinementList sortBy={sort} data-testid="sort-by-container" />
            </div>
          </aside>

          {/* Grid de productos */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Productos en {category.name}</span>
              </div>
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
      </div>
    </div>
  )
}
