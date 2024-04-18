import { Heading } from "@medusajs/ui"
<<<<<<< HEAD
import Link from "next/link"
=======
import Link from 'next/link'
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
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
            <Link href="/contact">Returns & Exchanges</Link>
=======
            <Link href="/contact">
              Returns & Exchanges
            </Link>
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
