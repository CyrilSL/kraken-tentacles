"use client"

import { Customer } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"

import ChevronDown from "@modules/common/icons/chevron-down"
<<<<<<< HEAD
<<<<<<< HEAD
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
=======
=======
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
import { signOut } from "@modules/account/actions"
import User from "@modules/common/icons/user"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import Link from 'next/link'
<<<<<<< HEAD
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)

const AccountNav = ({
  customer,
}: {
  customer: Omit<Customer, "password_hash"> | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signOut(countryCode)
  }

  return (
    <div>
<<<<<<< HEAD
<<<<<<< HEAD
      <div className="small:hidden">
        {route !== "/account" && (
=======
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
          <Link
            href="/account"
            className="flex items-center gap-x-2 text-small-regular py-2"
            data-testid="account-main-link"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>Account</span>
            </>
          </Link>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
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
<<<<<<< HEAD
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
        )}
      </div>
      <div className="hidden small:block" data-testid="account-nav">
        <div>
          <div className="pb-4">
            <h3 className="text-base-semi">Account</h3>
          </div>
          <div className="text-base-regular">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
              <li>
                <AccountNavLink
                  href="/account"
                  route={route!}
                  data-testid="overview-link"
                >
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/profile"
                  route={route!}
                  data-testid="profile-link"
                >
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/addresses"
                  route={route!}
                  data-testid="addresses-link"
                >
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/orders"
                  route={route!}
                  data-testid="orders-link"
                >
                  Orders
                </AccountNavLink>
              </li>
              <li className="text-grey-700">
                <button
                  type="button"
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
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
  'data-testid'?: string
}

const AccountNavLink = ({ href, route, children, 'data-testid': dataTestId }: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href
  return (
    <Link
      href={href}
      className={clx("text-ui-fg-subtle hover:text-ui-fg-base", {
        "text-ui-fg-base font-semibold": active,
      })}
      data-testid={dataTestId}
    >
<<<<<<< HEAD
<<<<<<< HEAD
      <>{children}</>
=======
      {children}
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
      {children}
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
    </Link>
  )
}

export default AccountNav
