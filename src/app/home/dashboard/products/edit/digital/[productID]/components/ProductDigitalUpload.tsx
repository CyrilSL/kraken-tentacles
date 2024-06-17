import React, { useState } from "react";
import {
  useAdminUpdateProduct,
  useAdminUploadProtectedFile,
  useAdminCustomPost,
} from "medusa-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PlusCircle, Upload } from "lucide-react";

interface Props {
  productId: string;
  variantId: string;
}

export type CreateProductMediaRequest = {
  variant_id: string;
  name: string;
  file_key: string;
  type?: MediaType;
  mime_type: string;
};

export interface ProductMedia {
  id: string;
  name: string;
  type: MediaType;
  file_key: string;
  mime_type: string;
  variant_id: string;
  // Add any other properties needed
}

export type CreateProductMediaResponse = {
  product_media: ProductMedia;
};

export enum MediaType {
  MAIN = "main",
  PREVIEW = "preview",
}

const UpdateDigitalMedia: React.FC<Props> = ({ productId, variantId }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<MediaType>(MediaType.MAIN);
  const [file, setFile] = useState<File | null>(null);

  const updateProduct = useAdminUpdateProduct(productId);
  const uploadFile = useAdminUploadProtectedFile();
  const {
    mutate: createDigitalProduct,
    isLoading,
    error,
    isError,
  } = useAdminCustomPost<CreateProductMediaRequest, CreateProductMediaResponse>(
    "/product-media",
    ["product-media"]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      console.error("No file selected");
      return;
    }

    // Upload the file
    const uploadResult = await uploadFile.mutateAsync(file);

    if (uploadResult && uploadResult.uploads && uploadResult.uploads.length > 0) {
      const firstUpload = uploadResult.uploads[0];

      if (firstUpload && firstUpload.key) {
        // Create the digital product
        createDigitalProduct(
          {
            variant_id: variantId,
            name,
            file_key: firstUpload.key,
            type,
            mime_type: file.type,
          },
          {
            onSuccess: ({ product_media }) => {
              console.log("Digital product created successfully:", product_media);
              // Perform any additional actions if needed
            },
            onError: (error) => {
              console.error("Error creating digital product:", error);
            },
          }
        );
      } else {
        console.log("Handle the case where key is undefined in the first upload");
      }
    } else {
      console.log(
        "Handle the case where uploadResult, uploadResult.uploads, or uploads array is empty"
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Digital Media</CardTitle>
        <CardDescription>
          Upload and manage your product's digital media.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <Label>Media Name</Label>
            <Input
              type="text"
              placeholder="Media Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label>Type</Label>
            <Select
              onValueChange={(value) => setType(value as MediaType)}
              value={type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={MediaType.MAIN}>Main</SelectItem>
                <SelectItem value={MediaType.PREVIEW}>Preview</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0] || null);
              } else {
                setFile(null);
              }
            }}
          />
          <Button type="submit">
            Upload
          </Button>
          {isError && <div className="text-red-500">{error.message}</div>}
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateDigitalMedia;