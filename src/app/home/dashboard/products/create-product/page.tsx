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
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'


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
  options: {
    title: string;
  }[];
  variants: {
    title: string
    // inventory_quantity: number
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
  options: [
    {
      title: "Type",
    },
  ],
  variants: [
    {
      title: "",
      prices: [
        {
          amount: 108,
          currency_code: "usd",
        },
      ],
      options: [
        {
          value: "",
        },
      ],
    },
  ],
  hs_code: "",
  origin_country: "",
  mid_code: "",
  metadata: {},
}

export default function AddProduct() {
  const { toast } = useToast()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [formData, setFormData] = useState<CreateProductData>(initialFormData)
  const [uploadStatus, setUploadStatus] = useState<boolean | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<ProductStatus>(
    ProductStatus.DRAFT
  )
  const router = useRouter()

  const createProduct = useAdminCreateProduct()
  const uploadFile = useAdminUploadFile()

  const handleFileSelect = (file: File) => {
    console.log(file)
    setSelectedFile(file)
  }

  const handleCardClick = (cardType: string) => {
    setSelectedCard(cardType)
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
      toast({
        variant: "destructive",
        title: "Title is required",
        description: "Title field is necessary to add a product",
      })
      return // Prevent submission if validation fails
    }

    handleFileUpload()

    console.log(formData)
    console.log(formData.images.length)

    

    formData.status = selectedStatus

    createProduct.mutate(formData, {
      onSuccess: ({ product }) => {
        console.log(product.id)
        setFormData(initialFormData)
        console.log("Uploaded Products!")
        router.push(`/dashboard/products/edit/digital/${product.id}`);      },
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
        <Link href="/dashboard">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Link href="/dashboard">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          </Link>
          <Button size="sm" value="Submit" onClick={handleCreate}>
            Create Product
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Create New Product</CardTitle>
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
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card
            onClick={() => handleCardClick("digital")}
            className={`cursor-pointer ${
              selectedCard === "digital" ? "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <CardTitle>Digital Product</CardTitle>
              <CardDescription
                className={`max-w-lg text-balance leading-relaxed ${
                  selectedCard === "digital" ? "text-slate-200"  : ""
                }`}
              >
                Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card
            onClick={() => handleCardClick("physical")}
            className={`cursor-pointer ${
              selectedCard === "physical" ? "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <CardTitle>Physical</CardTitle>
              <CardDescription
                className={`max-w-lg text-balance leading-relaxed ${
                  selectedCard === "physical" ? "text-slate-200" : ""
                }`}
              >              Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.
              </CardDescription>
            </CardHeader>
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
