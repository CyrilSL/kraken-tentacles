"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
<<<<<<< HEAD
<<<<<<< HEAD
import Link from "next/link"
=======
import { CartWithCheckoutStep } from "types/global"
import DiscountCode from "@modules/checkout/components/discount-code"
import Link from 'next/link'
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
import { CartWithCheckoutStep } from "types/global"
import DiscountCode from "@modules/checkout/components/discount-code"
import Link from 'next/link'
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)

type SummaryProps = {
  cart: CartWithCheckoutStep
}

const Summary = ({ cart }: SummaryProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        Summary
      </Heading>
      <DiscountCode cart={cart} />
      <Divider />
      <CartTotals data={cart} />
<<<<<<< HEAD
<<<<<<< HEAD
      <Link href="/checkout">
=======
      <Link href={"/checkout?step=" + cart.checkout_step} data-testid="checkout-button">
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
      <Link href={"/checkout?step=" + cart.checkout_step} data-testid="checkout-button">
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
        <Button className="w-full h-10">Go to checkout</Button>
      </Link>
    </div>
  )
}

export default Summary
