import { useAccount } from "@lib/context/account-context"
import ChevronDown from "@modules/common/icons/chevron-down"
<<<<<<< HEAD
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
=======
import { signOut } from "@modules/account/actions"
import User from "@modules/common/icons/user"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import Link from 'next/link'
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)

const AccountNav = () => {
  const route = usePathname()
  const { handleLogout } = useAccount()

  return (
    <div>
<<<<<<< HEAD
      <div className="small:hidden">
        {route !== "/account" && (
=======
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
          <Link
            href="/account"
            className="flex items-center gap-x-2 text-small-regular py-2"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>Account</span>
            </>
          </Link>
<<<<<<< HEAD
=======
        ) : (
          <>
            <div className="text-xl-semi mb-4 px-8">
              Hello {customer?.first_name}
            </div>
            <div className="text-base-regular">
              <ul>
                <li>
                  <Link
                    href="/account/profile"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="profile-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <User size={20} />
                        <span>Profile</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account/addresses"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="addresses-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <MapPin size={20} />
                        <span>Addresses</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account/orders"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <Package size={20} />
                      <span>Orders</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8 w-full"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />
                      <span>Log out</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </button>
                </li>
              </ul>
            </div>
          </>
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
        )}
      </div>
      <div className="hidden small:block">
        <div>
          <div className="py-4">
            <h3 className="text-base-semi">Account</h3>
          </div>
          <div className="text-base-regular">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
              <li>
                <AccountNavLink href="/account" route={route!}>
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/profile" route={route!}>
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/addresses" route={route!}>
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/orders" route={route!}>
                  Orders
                </AccountNavLink>
              </li>
              <li className="text-grey-700">
                <button type="button" onClick={handleLogout}>
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
}

const AccountNavLink = ({ href, route, children }: AccountNavLinkProps) => {
  const active = route === href
  return (
    <Link
      href={href}
      className={clsx("text-gray-700", {
        "text-gray-900 font-semibold": active,
      })}
    >
<<<<<<< HEAD
      <>{children}</>
=======
      {children}
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
    </Link>
  )
}

export default AccountNav
