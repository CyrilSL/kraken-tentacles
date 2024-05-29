import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProductDetailsProps {
    product: any;
    onUpdate: (title: string, description: string) => void;
  }
  
  const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onUpdate }) => {
    const [description, setDescription] = useState(product?.description || "");
    const [title, setTitle] = useState(product?.title || "");
  
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      onUpdate(e.target.value, description);
    };
  
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
      onUpdate(title, e.target.value);
    };
  
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
        id="name"
        type="text"
        className="w-full"
        value={title}
        onChange={handleTitleChange}
      />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
        id="description"
        value={description}
        onChange={handleDescriptionChange}
        className="min-h-32"
      />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;