"use client"

import { Order } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"

import OrderCard from "../order-card"
<<<<<<< HEAD
<<<<<<< HEAD
=======
import Link from 'next/link'
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)

const OrderOverview = () => {
  const { orders, isLoading } = useCustomerOrders()

  if (isLoading) {
    return (
      <div className="text-gray-900 w-full flex justify-center pt-12">
        <Spinner size={36} />
      </div>
    )
  }
=======
import Link from 'next/link'
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)

const OrderOverview = ({ orders }: { orders: Order[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-8 w-full">
        {orders.map((o) => (
          <div
            key={o.id}
            className="border-b border-gray-200 pb-6 last:pb-0 last:border-none"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center gap-y-4" data-test="no-orders-container">
      <h2 className="text-large-semi">Nothing to see here</h2>
      <p className="text-base-regular">
        You don&apos;t have any orders yet, let us change that {":)"}
      </p>
      <div className="mt-4">
        <Link href="/" passHref>
<<<<<<< HEAD
<<<<<<< HEAD
          <Button>Continue shopping</Button>
=======
          <Button data-testid="continue-shopping-button">Continue shopping</Button>
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
          <Button data-testid="continue-shopping-button">Continue shopping</Button>
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
        </Link>
      </div>
    </div>
  )
}

export default OrderOverview
