import { Suspense } from "react"

<<<<<<< HEAD
<<<<<<< HEAD
import { useMobileMenu } from "@lib/context/mobile-menu-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
=======
import { listRegions } from "@lib/data"
import Link from 'next/link'
import CartButton from "@modules/layout/components/cart-button"
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
import { listRegions } from "@lib/data"
import Link from 'next/link'
import CartButton from "@modules/layout/components/cart-button"
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

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
<<<<<<< HEAD
<<<<<<< HEAD
            <Link href="/" className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase">
              {/* Display store name from API or "Loading..." or "Error" */}
              {isLoading ? 'Loading...' : error ? 'Error' : storeName || 'Medusa Store'}
=======
=======
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
            <Link
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              Medusa Store
<<<<<<< HEAD
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
            </Link>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && (
<<<<<<< HEAD
<<<<<<< HEAD
                <DesktopSearchModal
                  state={searchModalState}
                  close={searchModalClose}
                  open={searchModalOpen}
                />
              )}
              <Link className="hover:text-ui-fg-base" href="/account">
                Account
              </Link>
            </div>
            <CartDropdown />
=======
=======
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
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
<<<<<<< HEAD
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
          </div>
        </nav>
      </header>
    </div>
  )
}
