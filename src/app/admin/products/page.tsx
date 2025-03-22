"use client";

import {
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    Table,
    TableCell,
} from "@/components/ui/table/table";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card/card";

//import { Product } from './product';

//import { SelectProduct } from '@/lib/db';
import { useRouter } from "next/navigation";
//import { ChevronLeft, ChevronRight } from 'lucide-react';
//import { Button } from '@/components/ui/button';

/*import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
  } from '@/components/ui/dropdownMenu/dropdownMenu';*/

//Constants
const CARD_TITLE = "Products";
const CARD_DESCRIPTION = "Manage your products and view their sales performance.";
const PRODUCT_TITLES = ['Name', 'Description'];

export function ProductsPage({
    products = [],
    offset,
    totalProducts,
}: {
    products: any;
    offset: number;
    totalProducts: number;
}) {
    //const router = useRouter();
    const productsPerPage = 5;

    /*function prevPage() {
        router.back();
    }

    function nextPage() {
        router.push(`/?offset=${offset}`, { scroll: false });
    }*/

    return (
        <Card>

            <CardHeader>
                <CardTitle>{CARD_TITLE}</CardTitle>
                <CardDescription>{CARD_DESCRIPTION}</CardDescription>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>

                            {PRODUCT_TITLES?.map((title: string) => (
                                <TableHead key={title}>{title}</TableHead>
                            ))}

                            {/* <TableHead className="hidden md:table-cell">Price</TableHead> */}

                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* {products.map((product) => (
                <Product key={product.id} product={product} />
            ))} */}

<TableRow>
      <TableCell className="hidden sm:table-cell">
        {/* <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.imageUrl}
          width="64"
        /> */}
      </TableCell>
      <TableCell className="font-medium">Light</TableCell>
      <TableCell>
        {/* <Badge variant="outline" className="capitalize"> */}
          Active
        {/* </Badge> */}
      </TableCell>
      {/* <TableCell className="hidden md:table-cell">{`$20`}</TableCell> */}
      {/* <TableCell className="hidden md:table-cell">25</TableCell> */}
      <TableCell className="hidden md:table-cell">
        12-30-33
      </TableCell>
      <TableCell>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteProduct}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </TableCell>
    </TableRow>

    <TableRow>
      <TableCell className="hidden sm:table-cell">
        {/* <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.imageUrl}
          width="64"
        /> */}
      </TableCell>
      <TableCell className="font-medium">Light</TableCell>
      <TableCell>
        {/* <Badge variant="outline" className="capitalize"> */}
          Active
        {/* </Badge> */}
      </TableCell>
      {/* <TableCell className="hidden md:table-cell">{`$20`}</TableCell> */}
      {/* <TableCell className="hidden md:table-cell">25</TableCell> */}
      <TableCell className="hidden md:table-cell">
        12-30-33
      </TableCell>
      <TableCell>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteProduct}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </TableCell>
    </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <form className="flex items-center w-full justify-between">
                    <div className="text-xs text-muted-foreground">
                        Showing{" "}
                        <strong>
                            {Math.max(
                                0,
                                Math.min(offset - productsPerPage, totalProducts) + 1
                            )}
                            -{offset}
                        </strong>{" "}
                        of <strong>{totalProducts}</strong> products
                    </div>
                    <div className="flex">
                        {/* <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === productsPerPage}
            > */}
                        {/* <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + productsPerPage > totalProducts}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button> */}
                    </div>
                </form>
            </CardFooter>
        </Card>
    );
}

export default ProductsPage;
