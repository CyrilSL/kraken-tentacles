// ProductImageUpload.tsx
import Image from "next/image";
import { Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductImageUploadProps {
  onFileSelected: (file: File | null) => void;
  selectedFile: File | null;
  productThumbnail: string;
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  onFileSelected,
  selectedFile,
  productThumbnail, // Add this line
}) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileSelected(file);
  };

  console.log("Thumbnail : ",productThumbnail)
  return (
    <Card className="overflow-hidden">
  <CardHeader>
    <CardTitle>Product Images</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid gap-2">
      {productThumbnail ? (
        <Image
          alt="Product image"
          className="aspect-square w-full rounded-md object-cover"
          height={300}
          src={productThumbnail}
          width={300}
        />
      ) : (
        <Image
          alt="Product image"
          className="aspect-square w-full rounded-md object-cover"
          height={300}
          src={"/placeholder.svg"}
          width={300}
        />
      )}
      <div className="grid grid-cols-3 gap-2">
        <label className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-md border border-dashed">
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>
    </div>
  </CardContent>
</Card>
  );
};

export default ProductImageUpload;