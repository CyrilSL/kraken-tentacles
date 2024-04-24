import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CreateStoreCard() {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Store</CardTitle>
        <CardDescription>Deploy your new Store in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your Store" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Theme</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Prime</SelectItem>
                  <SelectItem value="sveltekit">Fun</SelectItem>
                  <SelectItem value="astro">Professional</SelectItem>
                  <SelectItem value="nuxt">Radical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
    </div>
  )
}
