"use client"
import React, { useState } from "react"
import { useAdminProduct } from "medusa-react"
import { useAdminUpdateProduct } from "medusa-react"
import { useAdminUploadFile } from "medusa-react"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"

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
//import ProductPrice from "./components/ProductPrice"
import UpdateDigitalMedia from "./components/ProductDigitalUpload"
import ProductDetails from "./components/ProductDetails"

export default function Page({ params }: { params: { productID: string } }) {
  const { product, isLoading } = useAdminProduct(params.productID)
  console.log(product?.variants)
  console.log("Product : ", product)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const uploadFile = useAdminUploadFile()
  const [uploadStatus, setUploadStatus] = useState<boolean | null>(null)
  const [description, setDescription] = useState(product?.description || "")
  const [title, setTitle] = useState(product?.title || "")
  const [updatedTitle, setUpdatedTitle] = useState(product?.title || "")
  const [updatedDescription, setUpdatedDescription] = useState(
    product?.description || ""
  )

  const updateProduct = useAdminUpdateProduct(params.productID)

  const variantPrice = product?.variants?.[0]?.prices?.[0]?.amount

  const handleFileSelect = (file: File) => {
    console.log(file)
    setSelectedFile(file)
  }

  const handleFileUpload = () => {}

  const handleProductUpdate = (title: string, description: string) => {
    setUpdatedTitle(title)
    setUpdatedDescription(description)
  }

  const handleUpdate = () => {
    updateProduct.mutate(
      {
        title: updatedTitle,
        description: updatedDescription,
      },
      {
        onSuccess: ({ product }) => {
          console.log(product.id)
          // Update the product state with the updated data if needed
          // setProduct(product);
        },
      }
    )
  }

  return (
    <div>
      {/* {isLoading && <span>Loading...</span>} */}

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
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
              <Button size="sm" onClick={handleUpdate}>
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

              <ProductPriceVariant price={variantPrice} />
              <UpdateDigitalMedia productId={params.productID} />
              <Card x-chunk="dashboard-07-chunk-2">
                <CardHeader>
                  <CardTitle>Product Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <div className="grid gap-3">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger
                          id="category"
                          aria-label="Select category"
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="electronics">
                            Electronics
                          </SelectItem>
                          <SelectItem value="accessories">
                            Accessories
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="subcategory">
                        Subcategory (optional)
                      </Label>
                      <Select>
                        <SelectTrigger
                          id="subcategory"
                          aria-label="Select subcategory"
                        >
                          <SelectValue placeholder="Select subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="t-shirts">T-Shirts</SelectItem>
                          <SelectItem value="hoodies">Hoodies</SelectItem>
                          <SelectItem value="sweatshirts">
                            Sweatshirts
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
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

              <ProductImageUpload thumbnail={product?.thumbnail || null} />
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
            <Button size="sm" onClick={handleUpdate}>
              Save Product
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
