import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

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

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div
        data-testid="product-wrapper"
        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
      >
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="p-4 text-center">
          <Text
            className="text-gray-800 font-medium text-sm line-clamp-2 min-h-[40px] mb-2"
            data-testid="product-title"
          >
            {product.title}
          </Text>
          <div className="flex items-center justify-center gap-x-2 mb-3">
            {cheapestPrice && (
              <span className="text-purple-700 font-bold text-lg">
                <PreviewPrice price={cheapestPrice} />
              </span>
            )}
          </div>
          <div className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 font-semibold text-sm transition-colors">
            VER PRODUCTO
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
