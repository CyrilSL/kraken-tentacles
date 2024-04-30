'use client'
import React, {useState} from "react"
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
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ProductOption, ProductStatus } from "@medusajs/medusa"
import { ProductProductCategoryReq, ProductSalesChannelReq, ProductTypeReq } from "@medusajs/medusa/dist/types/product"
import { ProductVariant } from "@medusajs/product"
import { ProductVariantPricesCreateReq } from "@medusajs/medusa/dist/types/product-variant"


type CreateProductData = {
  title: string;
  is_giftcard: boolean;
  discountable: boolean;
  subtitle?: string;
  description?: string;
   images: string[];
   thumbnail: string;
   handle: string;
 // status: ProductStatus; // You need to define ProductStatus type
  // type: {
  //   value:string,
  //   id:string,
  // }; // You need to define ProductType type
  // collection_id: string;
  //tags: ProductTagReq[]
    
  
  sales_channels: ProductSalesChannelReq[];
  categories: ProductProductCategoryReq[];
  options: ProductOption[];
  variants: {
    title:string;
    prices: ProductVariantPricesCreateReq[];
  }[];
  weight: number;
  length: number;
  height: number;
  width: number;
  hs_code: string;
  origin_country: string;
  mid_code: string;
  material: string;
  metadata: Record<string, unknown>;
};
 

const initialFormData: CreateProductData = {
   title: "",
   is_giftcard: false,
   discountable: true,
   subtitle:"",
   description:"",
   images: [],
   thumbnail: "",
   handle: "",
   //status: ProductStatus.DRAFT,
  // type: {
  //   value: "",
  //   id: "",
  // },
  // collection_id: "",
 // tags: [],

  sales_channels: [],
  categories: [],
  options: [],
  variants: [],
  weight: 0,
  length: 0,
  height: 0,
  width: 0,
  hs_code: "",
  origin_country: "",
  mid_code: "",
  material: "",
  metadata: {},
};
 

export default function AddProduct() {
  const [formData, setFormData] = useState<CreateProductData>(initialFormData)
  const createProduct = useAdminCreateProduct()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleCreate = () => {
    // Basic validation example: check if the title is not empty
    if (!formData.title) {
       console.error("Title is required.");
       return; // Prevent submission if validation fails
    }
   
    // Proceed with form submission if validation passes
    createProduct.mutate(formData, {
       onSuccess: ({ product }) => {
         console.log(product.id);
         setFormData(initialFormData);
       },
       onError: (error) => {
         console.error("Error creating product:", error);
       },
    });
   };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
            <label htmlFor="title">Title</label>
      <input
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

      {/* Add other form sections for variants, attributes, thumbnail, media, etc. */}

      <Button onClick={handleCreate} >
        Create Product
      </Button>
    </div>
  )
}