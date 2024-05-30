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

import { PlusCircle } from "lucide-react";

interface PriceCardProps {
  initialPrice: number;
  onPriceUpdate: (price: number) => void;
}

const PriceCard: React.FC<PriceCardProps> = ({ initialPrice, onPriceUpdate }) => {
  const [updatedPrice, setUpdatedPrice] = useState<number>(initialPrice || 0);

  const handlePriceUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      setUpdatedPrice(newPrice);
      onPriceUpdate(newPrice);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price</CardTitle>
        <CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Label htmlFor="price-2" className="sr-only">
                  Price
                </Label>
                <Input id="price-2" value={updatedPrice.toString()} onChange={handlePriceUpdate} />
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
};

export default PriceCard;