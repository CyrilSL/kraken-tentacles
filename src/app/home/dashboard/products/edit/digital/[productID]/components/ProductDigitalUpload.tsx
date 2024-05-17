import React, { useState } from "react";
import {
  useAdminUpdateProduct,
  useAdminUploadProtectedFile,
  useAdminCustomPost,
} from "medusa-react";
import { Button, Container, Input, Label, Select } from "@medusajs/ui";

interface Props {
  productId: string;
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

const UpdateDigitalMedia: React.FC<Props> = ({ productId }) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    // Upload the file
    uploadFile.mutate(
      file,
      {
        onSuccess: ({ uploads }) => {
          if (!("key" in uploads[0])) {
            console.error("Error uploading file");
            return;
          }

          // Update the product with the digital product
          createDigitalProduct(
            {
              variant_id: productId, // Replace with the desired variant ID
              name,
              file_key: uploads[0].key as string,
              type,
              mime_type: file.type,
            },
            {
              onSuccess: () => {
                console.log("Digital Product Uploaded Successfully");
                // Optionally, you can reset the form or navigate to another page
              },
              onError: (err) => {
                console.error("Error creating digital product:", err);
              },
            }
          );
        },
        onError: (err) => {
          console.error("Error uploading file:", err);
        },
      }
    );
  };

  return (
    <Container>
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
            <Select.Trigger>
              <Select.Value placeholder="Type" />
            </Select.Trigger>
            <Select.Content className="z-50">
              <Select.Item value="main">Main</Select.Item>
              <Select.Item value="preview">Preview</Select.Item>
            </Select.Content>
          </Select>
        </div>
        <div className="flex gap-4 items-center">
          <Label>File</Label>
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <Button variant="primary" type="submit" isLoading={isLoading}>
          Upload
        </Button>
        {isError && <div className="text-red-500">{error.message}</div>}
      </form>
    </Container>
  );
};

export default UpdateDigitalMedia;