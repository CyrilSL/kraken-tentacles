import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function StoresPage() {
  return (
    <>

    <Card>
      <CardHeader>
        <CardTitle>Your Stores</CardTitle>
        <CardDescription>Manage and view your e-commerce stores.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>My First Store</CardTitle>
              <CardDescription>Launched on January 1, 2023</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline">View Store</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Clothing Boutique</CardTitle>
              <CardDescription>Launched on April 15, 2023</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline">View Store</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tech Gadgets</CardTitle>
              <CardDescription>Launched on August 5, 2023</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline">View Store</Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
    </>
  );
};
