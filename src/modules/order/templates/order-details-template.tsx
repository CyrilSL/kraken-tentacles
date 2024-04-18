"use client"

import { Order } from "@medusajs/medusa"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
<<<<<<< HEAD
import React from "react"
=======
import Link from 'next/link'
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)

type OrderDetailsTemplateProps = {
  order: Order
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
<<<<<<< HEAD
    <div className=" py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex justify-center">
        <div className="flex flex-col gap-4 max-w-4xl h-full bg-white w-full p-10">
          <OrderDetails order={order} showStatus />
          <Items
            items={order.items}
            region={order.region}
            cartId={order.cart_id}
          />
          <ShippingDetails order={order} />
          <OrderSummary order={order} />

          <Help />
        </div>
=======
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="text-2xl-semi">Order details</h1>
        <Link
          href="/account/orders"
          className="flex gap-2 items-center text-ui-fg-subtle hover:text-ui-fg-base"
          data-testid="back-to-overview-button"
        >
          <XMark /> Back to overview
        </Link>
      </div>
      <div className="flex flex-col gap-4 h-full bg-white w-full">
        <OrderDetails order={order} showStatus />
        <Items items={order.items} region={order.region} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
        <Help />
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
