"use client"
import React, { useEffect, useState } from "react"
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
import ProductTitleDescription from "./components/ProductTitleDescription"

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
  const [updatedPrice, setUpdatedPrice] = useState<number>(0);

  const [uploadedFileKey, setUploadedFileKey] = useState<string | null>(null)
  const updateProduct = useAdminUpdateProduct(params.productID)
  const [formData, setFormData] = useState<CreateProductData | undefined>()

  
  // console.log("Selected Image : ",selectedFile)

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        is_giftcard: product.is_giftcard,
        discountable: product.discountable,
        subtitle: product.subtitle ?? "",
        description: product.description ?? "",
        images: product.images.map((image) => image.url) || [],
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
      })
    }
  }, [product])
  console.log("Form Data : ",formData)

  useEffect(() => {
    if (formData?.variants?.[0]?.prices?.[0]?.amount) {
      setUpdatedPrice(formData.variants[0].prices[0].amount);
    }
  }, [formData]);
 
  const handlePriceUpdate = (price: number) => {
    setUpdatedPrice(price);
  
    if (formData) {
      const updatedFormData = {
        ...formData,
        variants: formData.variants.map((variant, index) => {
          if (index === 0) {
            return {
              ...variant,
              prices: variant.prices.map((variantPrice) => ({
                ...variantPrice,
                amount: price,
              })),
            };
          }
          return variant;
        }),
      };
      setFormData(updatedFormData);
    }
  };
  

  const handleProductTitleUpdate = (updatedTitle: string, updatedDescription: string) => {
    if (formData) {
      setFormData({
        ...formData,
        title: updatedTitle,
        description: updatedDescription,
      });
    }
  };
  

  const handleImageSelected = async (file: File | null) => {
    setSelectedFile(file);
  
    if (file) {
      const uploadResult = await uploadFile.mutateAsync(file);
  
      if (uploadResult && uploadResult.uploads && uploadResult.uploads.length > 0) {
        const firstUpload = uploadResult.uploads[0];
  
        if (firstUpload && firstUpload.url) {
          if (formData) {
            setFormData({
              ...formData,
              thumbnail: firstUpload.url,
              images: [...formData.images, firstUpload.url],
            });
          }
        } else {
          console.log("Handle the case where url is undefined in the first upload");
        }
      } else {
        console.log("Handle the case where uploadResult, uploadResult.uploads, or uploads array is empty");
      }
    }
  };



  const handleSubmit = async () => {
    // if (!updatedTitle || !updatedDescription || !updatedPrice) {
    //   alert("Please fill in all required fields.")
    //   return
    // }

    updateProduct.mutate(
      {
        title: formData?.title,
        description: formData?.description,
        thumbnail: formData?.thumbnail,
        images: formData?.images,
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
  if(formData){
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
                
                {formData?.title}
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
              <ProductTitleDescription
      formData={formData}
      onUpdate={handleProductTitleUpdate}
    />
                   <PriceCard
      initialPrice={formData.variants[0]?.prices[0]?.amount || 0}
      onPriceUpdate={handlePriceUpdate}
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
  
                
  
                <ProductImageUpload
        onFileSelected={handleImageSelected}
        selectedFile={selectedFile}
        productThumbnail={formData.thumbnail}
      />                <Card x-chunk="dashboard-07-chunk-5">
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
  
}
