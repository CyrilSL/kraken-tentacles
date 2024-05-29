import Image from "next/image";
import { Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface ProductImageUploadProps {
  thumbnail: string | null;
}

const ProductImageUpload = ({ thumbnail }: ProductImageUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    console.log(file);
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    // Implement file upload logic here
  };

  return (
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
                        thumbnail && thumbnail !== ""
                          ? thumbnail
                          : selectedFile
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
  );
};

export default ProductImageUpload;