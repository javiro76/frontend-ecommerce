"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const selectedImage = images[selectedIndex]

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center aspect-square bg-ui-bg-subtle rounded-lg">
        <span className="text-ui-fg-muted">Sin imágenes</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-[500px] mx-auto">
      {/* Imagen principal */}
      <div className="relative">
        <Container
          className="relative aspect-square w-full max-h-[500px] overflow-hidden bg-ui-bg-subtle rounded-lg cursor-zoom-in"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          {!!selectedImage?.url && (
            <Image
              src={selectedImage.url}
              priority
              className={`absolute inset-0 rounded-lg transition-transform duration-300 ${isZoomed ? "scale-150 cursor-zoom-out" : "scale-100"
                }`}
              alt={`Product image ${selectedIndex + 1}`}
              fill
              sizes="(max-width: 576px) 100vw, (max-width: 768px) 80vw, (max-width: 992px) 60vw, 600px"
              style={{
                objectFit: "contain",
              }}
            />
          )}
        </Container>

        {/* Flechas de navegación */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all hover:scale-110"
              aria-label="Imagen anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all hover:scale-110"
              aria-label="Siguiente imagen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        {/* Indicador de imagen actual */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedIndex === index
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-transparent hover:border-gray-300"
                }`}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  alt={`Miniatura ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
