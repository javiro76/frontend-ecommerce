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

  const category = product.categories?.[0]
  const collection = product.collection

  return (
    <div className="bg-gradient-to-b from-gray-50/50 to-white min-h-screen">
      {/* Miga de pan mejorada */}
      <div className="content-container py-6">
        <nav className="flex items-center text-sm" aria-label="Breadcrumb">
          <LocalizedClientLink 
            href="/store" 
            className="text-gray-500 hover:text-amber-600 font-medium transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Tienda
          </LocalizedClientLink>
          <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          {category ? (
            <>
              <LocalizedClientLink 
                href={`/categories/${category.handle}`} 
                className="category-badge hover:bg-amber-200 transition-colors"
              >
                {category.name}
              </LocalizedClientLink>
              <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          ) : collection ? (
            <>
              <LocalizedClientLink 
                href={`/collections/${collection.handle}`} 
                className="category-badge hover:bg-amber-200 transition-colors"
              >
                {collection.title}
              </LocalizedClientLink>
              <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          ) : null}
          <span className="font-semibold text-gray-800 truncate max-w-[250px]">{product.title}</span>
        </nav>
      </div>

      {/* Contenido principal del producto */}
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-8 relative gap-8"
        data-testid="product-container"
      >
        {/* Columna izquierda - Info del producto */}
        <div className="flex flex-col small:sticky small:top-32 small:py-0 small:w-[320px] small:min-w-[320px] w-full gap-y-6">
          {/* Card de información */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            {category && (
              <span className="category-badge mb-4 inline-block">
                {category.name}
              </span>
            )}
            <ProductInfo product={product} />
          </div>
          
          {/* Tabs de información */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <ProductTabs product={product} />
          </div>
        </div>

        {/* Columna central - Galería de imágenes */}
        <div className="flex-1 w-full small:max-w-[550px] mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 sticky top-32">
            <ImageGallery images={images} />
          </div>
        </div>

        {/* Columna derecha - Acciones */}
        <div className="flex flex-col small:sticky small:top-32 small:py-0 small:w-[320px] small:min-w-[320px] w-full gap-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
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

          {/* Garantías y beneficios */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-5 border border-amber-200/50">
            <h4 className="font-semibold text-amber-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Compra Segura
            </h4>
            <div className="space-y-3 text-sm text-amber-700">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Envío gratis en pedidos +$100.000</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Garantía de 30 días</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Pago 100% seguro</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div
          className="content-container"
          data-testid="related-products-container"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">También te puede gustar</h2>
            <p className="text-gray-500 max-w-md mx-auto">Descubre más joyas que complementan tu estilo</p>
            <div className="divider-gold w-24 mx-auto mt-6"></div>
          </div>
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate
