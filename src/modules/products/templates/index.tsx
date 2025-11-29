import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  // Obtener la categoría o colección del producto si existe
  const category = product.categories?.[0]
  const collection = product.collection

  return (
    <>
      {/* Miga de pan */}
      <div className="content-container py-4">
        <nav className="flex items-center text-sm text-ui-fg-muted" aria-label="Breadcrumb">
          <LocalizedClientLink href="/store" className="hover:text-black font-medium transition-colors">
            Store
          </LocalizedClientLink>
          <span className="mx-2">/</span>
          {category ? (
            <>
              <LocalizedClientLink href={`/categories/${category.handle}`} className="hover:text-black transition-colors">
                {category.name}
              </LocalizedClientLink>
              <span className="mx-2">/</span>
            </>
          ) : collection ? (
            <>
              <LocalizedClientLink href={`/collections/${collection.handle}`} className="hover:text-black transition-colors">
                {collection.title}
              </LocalizedClientLink>
              <span className="mx-2">/</span>
            </>
          ) : null}
          <span className="font-semibold text-black truncate max-w-[200px]">{product.title}</span>
        </nav>
      </div>

      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative gap-x-8"
        data-testid="product-container"
      >
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:w-[280px] small:min-w-[280px] w-full py-8 gap-y-6">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>
        <div className="block w-full small:max-w-[500px] relative mx-auto">
          <ImageGallery images={images} />
        </div>
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:w-[280px] small:min-w-[280px] w-full py-8 gap-y-12">
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate

