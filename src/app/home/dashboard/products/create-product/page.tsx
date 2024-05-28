"use client"
import {
  ChevronLeft
} from "lucide-react"
import { useAdminCreateProduct } from "medusa-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  ProductProductCategoryReq,
  ProductSalesChannelReq
} from "@medusajs/medusa/dist/types/product"

import { useToast } from "@/components/ui/use-toast"
import { useAdminUploadFile } from "medusa-react"
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
  tags: {
    value: string
  }[]
  sales_channels: ProductSalesChannelReq[]
  categories: ProductProductCategoryReq[]

  variants: {
    title:string
    prices: {
      amount: number
      currency_code: string
    }[]
    
  }[]
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
  tags: [],
  sales_channels: [],
  categories: [],

  variants: [
    {
    title:"One",
      prices: [
        {
          amount: 108,
          currency_code: "usd",
        },
      ],
    },
  ],
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
          const imageUrl = uploads[0]?.url || ""
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
      });
      return; // Prevent submission if validation fails
    }
  
    handleFileUpload();
  
    // Check if variants array is defined and has at least one variant with a title
    if (!formData.variants || formData.variants.length === 0 || !formData.variants[0]?.title) {
      toast({
        variant: "destructive",
        title: "Invalid variant data",
        description: "Please provide at least one variant with a title",
      });
      return; // Prevent submission if variants data is invalid
    }
  
    console.log("formData.variants:", formData.variants);
  
    formData.status = selectedStatus;
  
    createProduct.mutate(formData, {
      onSuccess: ({ product }) => {
        console.log(product.id);
        setFormData(initialFormData);
        console.log("Uploaded Products!");
        router.push(`/dashboard/products/edit/digital/${product.id}`);
      },
      onError: (error) => {
        console.error("Error creating product:", error);
      },
    });
  };
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
