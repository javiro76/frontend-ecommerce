import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-18 mx-auto border-b duration-200 bg-white/95 backdrop-blur-md border-amber-100 shadow-sm">
        <nav className="content-container txt-xsmall-plus text-gray-600 flex items-center justify-between w-full h-full text-small-regular py-4">
          {/* Menu lateral */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          {/* Logo central */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="flex flex-col items-center group/logo"
              data-testid="nav-store-link"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 bg-clip-text text-transparent tracking-wider group-hover/logo:from-amber-700 group-hover/logo:to-amber-500 transition-all duration-300">
                JOYERÍA
              </span>
              <span className="text-[10px] tracking-[0.25em] text-amber-500 uppercase">
                Elegancia & Estilo
              </span>
            </LocalizedClientLink>
          </div>

          {/* Botones derecha */}
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {/* Link a tienda */}
              <LocalizedClientLink
                className="hover:text-amber-600 transition-colors flex items-center gap-1"
                href="/store"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Tienda
              </LocalizedClientLink>
              
              {/* Link a cuenta */}
              <LocalizedClientLink
                className="hover:text-amber-600 transition-colors flex items-center gap-1"
                href="/account"
                data-testid="nav-account-link"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Cuenta
              </LocalizedClientLink>
            </div>
            
            {/* Carrito */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-amber-600 transition-colors flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-full"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-amber-700 font-medium">0</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
