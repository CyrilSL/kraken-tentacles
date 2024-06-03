import React, { useState } from "react";
import { useAdminUpdateVariant } from "medusa-react";
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
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface PriceCardProps {
  initialPrice: number;
  productId: string;
  variantId: string;
}

const PriceCard: React.FC<PriceCardProps> = ({
  initialPrice,
  productId,
  variantId,
}) => {
  const [updatedPrice, setUpdatedPrice] = useState<number>(initialPrice || 0);
  const updateVariant = useAdminUpdateVariant(productId);

  const handlePriceUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      setUpdatedPrice(newPrice);
    }
  };

  const handleUpdatePrice = () => {
    updateVariant.mutate(
      {
        variant_id: variantId,
        prices: [
          {
            amount: updatedPrice,
            currency_code: "usd", // Replace with the appropriate currency code
          },
        ],
      },
      {
        onSuccess: ({ product }) => {
          console.log("Price updated successfully:", product.variants);
        },
        onError: (error) => {
          console.error("Error updating price:", error);
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price</CardTitle>
        <CardDescription>
          Update the price of the product variant
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
                  value={updatedPrice.toString()}
                  onChange={handlePriceUpdate}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button size="sm" onClick={handleUpdatePrice}>
          Set Price
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PriceCard;