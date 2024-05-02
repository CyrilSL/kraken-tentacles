"use client"
import React, { useState } from "react"
import { useAdminProduct } from "medusa-react"
import { useAdminCreateProduct } from "medusa-react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  ProductProductCategoryReq,
  ProductSalesChannelReq,
  ProductTypeReq,
} from "@medusajs/medusa/dist/types/product"
import { ProductVariant } from "@medusajs/product"
import { ProductVariantPricesCreateReq } from "@medusajs/medusa/dist/types/product-variant"
import { useAdminUploadFile } from "medusa-react"

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
  // type: {
  //   value:string,
  //   id:string,
  // }; // You need to define ProductType type
  // collection_id: string;
  tags: {
    value: string
  }[]
  sales_channels: ProductSalesChannelReq[]
  categories: ProductProductCategoryReq[]
  // options: ProductOption[]
  variants: {
    title: string
    inventory_quantity: number
    prices: {
      amount: number
      currency_code: string
    }[]
    options: {
      value: string
    }[]
  }[]
  // weight: number;
  // length: number;
  // height: number;
  // width: number;
  hs_code: string
  origin_country: string
  mid_code: string
  // material: string;
  metadata: Record<string, unknown>
}

const initialFormData: CreateProductData = {
  title: "",
  is_giftcard: false,
  discountable: true,
  subtitle: "",
  description: "",
  images: [],
  thumbnail: "",
  handle: "",
  status: ProductStatus.DRAFT,
  // type: {
  //   value: "",
  //   id: "",
  // },
  // collection_id: "",
  tags: [],

  sales_channels: [],
  categories: [],
  // options: [],
  variants: [],
  // weight: 0,
  // length: 0,
  // height: 0,
  // width: 0,
  hs_code: "",
  origin_country: "",
  mid_code: "",
  // material: "",
  metadata: {},
}

export default function AddProduct() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState<CreateProductData>(initialFormData)
  const [uploadStatus, setUploadStatus] = useState<boolean | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<ProductStatus>(
    ProductStatus.DRAFT
  )

  const createProduct = useAdminCreateProduct()
  const uploadFile = useAdminUploadFile()

  const handleFileSelect = (file: File) => {
    console.log(file)
    setSelectedFile(file)
  }

  const handleFileUpload = () => {
    if (selectedFile) {
      uploadFile.mutate(selectedFile, {
        onSuccess: ({ uploads }) => {
          const imageUrl = uploads[0].url
          setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, imageUrl],
          }))
          setUploadStatus(true)
        },
        onError: (error) => {
          console.error("Error uploading file:", error)
          setUploadStatus(false)
        },
      })
    } else {
      console.log("No Images Selected!")
      return false
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleCreate = () => {
    // Basic validation example: check if the title is not empty
    if (!formData.title) {
      console.error("Title is required.")
      return // Prevent submission if validation fails
    }

    handleFileUpload()

    console.log(formData)
    console.log(formData.images.length)

    // Proceed with form submission if validation passes
    if (formData.images.length === 0) {
      console.log("No Images")
      return
    }

    formData.status = selectedStatus

    createProduct.mutate(formData, {
      onSuccess: ({ product }) => {
        console.log(product.id)
        setFormData(initialFormData)
        console.log("Uploaded Products!")
      },
      onError: (error) => {
        console.error("Error creating product:", error)
      },
    })
  }
  console.log("Selected Status ", selectedStatus)
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/products">
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          {/* <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            ""
          </h1> */}
          {/* <Badge variant="outline" className="ml-auto sm:ml-0">
            In stock
          </Badge> */}
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm" value="Submit" onClick={handleCreate}>
              Create Product
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Create New Product</CardTitle>
                {/* <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription> */}
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      onChange={handleInputChange}
                      className="min-h-32"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Product Variants</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                    {/* <TableHead className="w-[100px]">SKU</TableHead> */}
                          <TableHead>Quantity</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Prize</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
  {formData.variants.map((variant, index) => (
    <TableRow key={index}>
      <TableCell>
        <Input
          name={`variants[${index}].inventory_quantity`}
          type="number"
          value={variant.inventory_quantity}
          onChange={(e) =>
            setFormData((prevData) => {
              const updatedVariants = [...prevData.variants];
              updatedVariants[index].inventory_quantity = parseInt(e.target.value, 10);
              return {
                ...prevData,
                variants: updatedVariants,
              };
            })
          }
        />
      </TableCell>
      <TableCell>
        <Input
          name={`variants[${index}].title`}
          value={variant.title}
          onChange={(e) =>
            setFormData((prevData) => {
              const updatedVariants = [...prevData.variants];
              updatedVariants[index].title = e.target.value;
              return {
                ...prevData,
                variants: updatedVariants,
              };
            })
          }
        />
      </TableCell>
      <TableCell>
        <Input
          name={`variants[${index}].prices[0].amount`}
          type="number"
          value={variant.prices[0]?.amount || ""}
          onChange={(e) =>
            setFormData((prevData) => {
              const updatedVariants = [...prevData.variants];
              updatedVariants[index].prices[0] = {
                amount: parseFloat(e.target.value),
                currency_code: "USD", // You can change this as needed
              };
              return {
                ...prevData,
                variants: updatedVariants,
              };
            })
          }
        />
      </TableCell>
    </TableRow>
  ))}
</TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1"
                  onClick={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      variants: [
                        ...prevData.variants,
                        {
                          title: "",
                          inventory_quantity: 0, // Add inventory_quantity property
                          prices: [{ amount: 0, currency_code: "USD" }],
                          options: [],
                        },
                      ],
                    }))
                  }
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Variant
                </Button>
              </CardFooter>
            </Card>

            <Card x-chunk="dashboard-07-chunk-2">
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category" aria-label="Select category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="subcategory">Subcategory (optional)</Label>
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
                        <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
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
                    <Select
                      value={selectedStatus}
                      onValueChange={(value) =>
                        setSelectedStatus(value as ProductStatus)
                      }
                    >
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ProductStatus.DRAFT}>
                          Draft
                        </SelectItem>
                        <SelectItem value={ProductStatus.PUBLISHED}>
                          Published
                        </SelectItem>
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
                      selectedFile
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
          <Button onClick={handleCreate}>Create Product</Button>
        </div>
      </div>
    </main>
  )
}
