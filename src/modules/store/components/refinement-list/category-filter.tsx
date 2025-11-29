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
            className={`block text-sm py-1.5 px-2 rounded transition-colors ${
              !currentCategoryId 
                ? "bg-purple-100 text-purple-700 font-semibold" 
                : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
            }`}
          >
            Todos los productos
          </LocalizedClientLink>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <LocalizedClientLink
              href={`/categories/${category.handle}`}
              className={`block text-sm py-1.5 px-2 rounded transition-colors ${
                currentCategoryId === category.id
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
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
