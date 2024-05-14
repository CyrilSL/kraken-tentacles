import { Suspense } from "react"

import { listRegions } from "@lib/data"
import Link from 'next/link'
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

import { getValidSubdomain } from "@lib/util/subdomain"
//import { fetchStoreDetails } from "@lib/util/fetch-store-details"



export default async function Nav({ subdomain }) {
 // const subdomain = getValidSubdomain() || 'test' // Default to 'Cyril' if subdomain is null

  const regions = await listRegions().then((regions) => regions)

  //const storeDetails = await fetchStoreDetails(subdomain);
  //const storeName = storeDetails.store?.name || "Store not found";
  const storeName = "Store not found";
  
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <Link
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
                   {/* Display store name from API or "Loading..." or "Error" */}
                   {storeName}
            </Link>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && (
                <Link
                  className="hover:text-ui-fg-base"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Search
                </Link>
              )}
              <Link
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </Link>
            </div>
            <Suspense
              fallback={
                <Link
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </Link>
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
