"use client"
import React, { useState } from "react"
import { useAdminProduct } from "medusa-react"
import { useAdminUpdateProduct } from "medusa-react"
import { useAdminUploadFile } from "medusa-react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Upload } from "lucide-react"

import {
  ProductProductCategoryReq,
  ProductSalesChannelReq,
  ProductTypeReq,
} from "@medusajs/medusa/dist/types/product"
import { CardDescription, CardFooter } from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import ProductImageUpload from "./components/ProductImage"
import ProductPriceVariant from "./components/ProductPriceVariant"

import PriceCard from "./components/PriceCard"
import UpdateDigitalMedia from "./components/ProductDigitalUpload"
import ProductDetails from "./components/ProductDetails"

enum ProductStatus {
  DRAFT = "draft",
  PROPOSED = "proposed",
  PUBLISHED = "published",
  REJECTED = "rejected",
}

type CreateProductData = {
  title: string
  is_giftcard: boolean
  discountable: boolean
  subtitle?: string
  description?: string
  images: string[]
  thumbnail: string
  handle: string
  status: ProductStatus // You need to define ProductStatus type
  tags: {
    value: string
  }[]
  sales_channels: ProductSalesChannelReq[]
  categories: ProductProductCategoryReq[]

  variants: {
    title: string
    prices: {
      amount: number
      currency_code: string
    }[]
  }[]
}

export default function Page({ params }: { params: { productID: string } }) {
  const { product, isLoading } = useAdminProduct(params.productID)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const uploadFile = useAdminUploadFile()
  const [uploadStatus, setUploadStatus] = useState<boolean | null>(null)
  const [description, setDescription] = useState(product?.description || "")
  const [title, setTitle] = useState(product?.title || "")
  const [updatedTitle, setUpdatedTitle] = useState(product?.title || "")
  const [updatedDescription, setUpdatedDescription] = useState(
    product?.description || ""
  )

  const [updatedPrice, setUpdatedPrice] = useState<number>(
    product?.variants?.[0]?.prices?.[0]?.amount || 0
  )
  const [uploadedFileKey, setUploadedFileKey] = useState<string | null>(null)
  const updateProduct = useAdminUpdateProduct(params.productID)
  let formData: CreateProductData | undefined;

  if (product) {
    formData = {
      title: product.title,
      is_giftcard: product.is_giftcard,
      discountable: product.discountable,
      subtitle: product.subtitle ?? "",
      description: product.description ?? "",
      images: product.images.map(image => image.url) || [],
      thumbnail: product.thumbnail ?? "",
      handle: product.handle ?? "",
      status: product.status as ProductStatus,
      tags: product.tags.map((tag) => ({ value: String(tag) })),
      sales_channels: product.sales_channels,
      categories: product.categories || [],
      variants: product.variants.map((variant) => ({
        title: variant.title,
        prices: variant.prices.map((price) => ({
          amount: price.amount,
          currency_code: price.currency_code,
        })),
      })),
    }
  }

  const variantPrice = product?.variants?.[0]?.prices?.[0]?.amount

  console.log("Form Data : ",formData)

  const handleFileSelect = (file: File) => {
    console.log(file)
    setSelectedFile(file)
  }

  const handleProductUpdate = (title: string, description: string) => {
    setUpdatedTitle(title)
    setUpdatedDescription(description)
  }

  const handleSubmit = async () => {
    if (!updatedTitle || !updatedDescription || !updatedPrice) {
      alert("Please fill in all required fields.")
      return
    }

    // Wait for file upload to finish
    let uploadedFileUrl: string | null = null
    if (selectedFile) {
      const uploadResult = await uploadFile.mutateAsync(selectedFile)
      const fileUrl = uploadResult.uploads[0].url
      uploadedFileUrl = fileUrl
      setUploadStatus(true)
    }

    console.log("Uploaded Image URL:", uploadedFileUrl)

    updateProduct.mutate(
      {
        title: updatedTitle,
        description: updatedDescription,
        thumbnail: uploadedFileUrl || "",
        images: uploadedFileUrl ? [uploadedFileUrl] : [],
        variants: [
          {
            title: "Digital",
            inventory_quantity: 90,
            prices: [{ amount: updatedPrice, currency_code: "usd" }],
          },
        ],
      },
      {
        onSuccess: ({ product }) => {
          console.log(product.id)
          // Handle success case here
        },
        onError: (error) => {
          console.error(error) // Log errors for debugging
        },
      }
    )
  }
  if (isLoading) {
    return <span>Loading...</span>
  }

  // console.log(product)
  return (
    <div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-m ax gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/products">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {product?.title}
            </h1>
            <Badge variant="outline" className="ml-auto sm:ml-0">
              In stock
            </Badge>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm" onClick={handleSubmit}>
                Save Product
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <ProductDetails
                product={product}
                onUpdate={handleProductUpdate}
              />
              <PriceCard
                initialPrice={product?.variants?.[0]?.prices?.[0]?.amount || 0}
                onPriceUpdate={(price) => setUpdatedPrice(price)}
              />

              <UpdateDigitalMedia productId={params.productID} />
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger id="status" aria-label="Select status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Active</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  {/* <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription> */}
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="300"
                      src={
                        product?.thumbnail && product.thumbnail !== ""
                          ? product.thumbnail
                          : selectedFile
                          ? URL.createObjectURL(selectedFile)
                          : "/placeholder.svg"
                      }
                      width="300"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <label
                        htmlFor="file-upload"
                        className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-md border border-dashed"
                      >
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Upload</span>
                      </label>
                    </div>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0]
                      if (file) {
                        handleFileSelect(file)
                      }
                    }}
                    className="hidden"
                  />
                </CardContent>
              </Card>

              {/* <ProductImageUpload thumbnail={product?.thumbnail || null} /> */}
              <Card x-chunk="dashboard-07-chunk-5">
                <CardHeader>
                  <CardTitle>Archive Product</CardTitle>
                  {/* <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit.
                    </CardDescription> */}
                </CardHeader>
                <CardContent>
                  <div></div>
                  <Button size="sm" variant="secondary">
                    Archive Product
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm" onClick={handleSubmit}>
              Save Product
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
