import { ProductVariant } from "@medusajs/medusa"
import { Container, Text } from "@medusajs/ui"

import Thumbnail from "@modules/products/components/thumbnail"
<<<<<<< HEAD
<<<<<<< HEAD
import Link from "next/link"
=======
import Link from 'next/link'
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
import Link from 'next/link'
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)

export type ProductHit = {
  id: string
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  variants: ProductVariant[]
  collection_handle: string | null
  collection_id: string | null
}

type HitProps = {
  hit: ProductHit
}

const Hit = ({ hit }: HitProps) => {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <Container
      key={hit.id}
      className="grid grid-cols-[1fr] gap-2 w-full p-4 shadow-elevation-card-rest hover:shadow-elevation-card-hover     items-center justify-center"
    >
      <Thumbnail thumbnail={hit.thumbnail} size="square" className="group" />
      <div className="flex flex-col justify-between group">
        <div className="flex flex-col">
          {hit.collection_id && (
            <Link
              href={`/collections/${hit.collection_handle}`}
              className="text-ui-fg-on-color hover:text-ui-fg-subtle"
            >
              {hit.collection_handle}
            </Link>
          )}
          <Text className="text-ui-fg-subtle">{hit.title}</Text>
        </div>
      </div>
    </Container>
=======
=======
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
    <Link href={`/products/${hit.handle}`}>
      <Container
        key={hit.id}
        className="flex sm:flex-col gap-2 w-full p-4 shadow-elevation-card-rest hover:shadow-elevation-card-hover items-center sm:justify-center"
      >
        <Thumbnail
          thumbnail={hit.thumbnail}
          size="square"
          className="group h-12 w-12 sm:h-full sm:w-full"
        />
        <div className="flex flex-col justify-between group">
          <div className="flex flex-col">
            <Text className="text-ui-fg-subtle">{hit.title}</Text>
          </div>
        </div>
      </Container>
    </Link>
<<<<<<< HEAD
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
=======
>>>>>>> 3aa907a (working branch, builds without error, multi-tenancy)
  )
}

export default Hit
