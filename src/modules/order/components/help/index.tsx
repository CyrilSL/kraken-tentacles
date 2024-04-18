import { Heading } from "@medusajs/ui"
<<<<<<< HEAD
<<<<<<< HEAD
import Link from "next/link"
=======
import Link from 'next/link'
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
import Link from 'next/link'
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
import React from "react"

const Help = () => {
  return (
    <div className="mt-6">
      <Heading className="text-base-semi">Need help?</Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
<<<<<<< HEAD
<<<<<<< HEAD
            <Link href="/contact">Returns & Exchanges</Link>
=======
            <Link href="/contact">
              Returns & Exchanges
            </Link>
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
            <Link href="/contact">
              Returns & Exchanges
            </Link>
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
