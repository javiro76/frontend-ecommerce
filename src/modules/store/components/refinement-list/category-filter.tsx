import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CategoryFilterProps = {
  categories: HttpTypes.StoreProductCategory[]
  currentCategoryId?: string
}

export default function CategoryFilter({
  categories,
  currentCategoryId
}: CategoryFilterProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Categorías
      </h3>
      <ul className="space-y-1">
        <li>
          <LocalizedClientLink
            href="/store"
            className={`block text-sm py-2 px-3 rounded-lg transition-all duration-200 ${
              !currentCategoryId
                ? "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 font-semibold border-l-4 border-amber-500 shadow-sm"
                : "text-gray-600 hover:text-amber-700 hover:bg-amber-50 hover:pl-4"
            }`}
          >
            Todos los productos
          </LocalizedClientLink>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <LocalizedClientLink
              href={`/categories/${category.handle}`}
              className={`block text-sm py-2 px-3 rounded-lg transition-all duration-200 ${
                currentCategoryId === category.id
                  ? "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 font-semibold border-l-4 border-amber-500 shadow-sm"
                  : "text-gray-600 hover:text-amber-700 hover:bg-amber-50 hover:pl-4"
              }`}
            >
              {category.name}
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
