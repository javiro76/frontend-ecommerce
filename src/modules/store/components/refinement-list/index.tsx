"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { HttpTypes } from "@medusajs/types"

import SortProducts, { SortOptions } from "./sort-products"
import CategoryFilter from "./category-filter"

type RefinementListProps = {
  sortBy: SortOptions
  categories?: HttpTypes.StoreProductCategory[]
  currentCategoryId?: string
  search?: boolean
  "data-testid"?: string
}

const RefinementList = ({ 
  sortBy, 
  categories,
  currentCategoryId,
  "data-testid": dataTestId 
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="flex flex-col gap-6">
      {categories && categories.length > 0 && (
        <CategoryFilter 
          categories={categories} 
          currentCategoryId={currentCategoryId}
        />
      )}
      <div className="border-t border-gray-200 pt-4">
        <SortProducts 
          sortBy={sortBy} 
          setQueryParams={setQueryParams} 
          data-testid={dataTestId} 
        />
      </div>
    </div>
  )
}

export default RefinementList
