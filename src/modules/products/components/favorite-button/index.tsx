"use client"

import { useState, useEffect } from "react"

interface FavoriteButtonProps {
  productId: string
  className?: string
}

export default function FavoriteButton({ productId, className = "" }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setIsFavorite(favorites.includes(productId))
  }, [productId])

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsAnimating(true)
    const newIsFavorite = !isFavorite
    setIsFavorite(newIsFavorite)
    
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    if (newIsFavorite) {
      favorites.push(productId)
    } else {
      const index = favorites.indexOf(productId)
      if (index > -1) favorites.splice(index, 1)
    }
    localStorage.setItem("favorites", JSON.stringify(favorites))
    
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <button
      onClick={handleToggleFavorite}
      data-favorite={isFavorite}
      className={`favorite-button w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-amber-50 hover:scale-110 transition-all duration-200 ${className} ${isAnimating ? "scale-125" : ""}`}
      aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <svg 
        className={`w-5 h-5 transition-all duration-300 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-amber-500"}`}
        fill={isFavorite ? "currentColor" : "none"} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  )
}
