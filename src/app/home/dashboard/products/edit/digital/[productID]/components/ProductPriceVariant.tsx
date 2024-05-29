import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ProductPriceVariantProps {
  price: number | undefined;
  onPriceUpdate: (price: number) => void;
}

export default function ProductPriceVariant({
  price,
  onPriceUpdate,
}: ProductPriceVariantProps) {
  const [updatedPrice, setUpdatedPrice] = useState<number | undefined>(price);

   const handlePriceUpdate = (e) => {
    setUpdatedPrice(parseFloat(e.target.value));
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Price</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Label htmlFor="price-2" className="sr-only">
                  Price
                </Label>
                <Input
                  id="price-2"
                  value={updatedPrice?.toString() || ""}
                  onChange={handlePriceUpdate}
                />
              </TableCell>
            </TableRow>
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button size="sm" variant="ghost" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Add Variant
        </Button>
      </CardFooter>
    </Card>
  );
}