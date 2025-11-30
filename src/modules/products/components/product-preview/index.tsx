import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import FavoriteButton from "../favorite-button"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const category = product.categories?.[0]

  return (
    <div className="group block relative">
      {/* Botón de favoritos - visible siempre si es favorito, o en hover si no lo es */}
      <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 [&:has([data-favorite=true])]:opacity-100">
        <FavoriteButton productId={product.id} />
      </div>

      <LocalizedClientLink href={`/products/${product.handle}`} className="block">
        <div
          data-testid="product-wrapper"
          className="product-card relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-amber-200"
        >
          {/* Badge de categoría */}
          {category && (
            <div className="absolute top-3 left-3 z-10">
              <span className="category-badge bg-amber-100/90 backdrop-blur-sm text-amber-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                {category.name}
              </span>
            </div>
          )}

          {/* Imagen del producto */}
          <div className="product-image-wrapper aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
          </div>

          {/* Información del producto */}
          <div className="p-5">
            <Text
              className="text-gray-800 font-semibold text-sm line-clamp-2 min-h-[44px] mb-3 group-hover:text-amber-700 transition-colors"
              data-testid="product-title"
            >
              {product.title}
            </Text>

            {/* Precio */}
            <div className="flex items-center justify-between mb-4">
              {cheapestPrice && (
                <span className="text-amber-600 font-bold text-xl">
                  <PreviewPrice price={cheapestPrice} />
                </span>
              )}
            </div>

            {/* Botón Ver Producto */}
            <div className="flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-sm rounded-xl group-hover:from-amber-600 group-hover:to-amber-700 transition-all duration-300 shadow-md group-hover:shadow-lg">
              <span>VER PRODUCTO</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}
