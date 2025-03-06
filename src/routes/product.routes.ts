import { Request, Response, Router } from "express";
import { Product } from "../types/product";
import { v4 as uuidv4 } from "uuid";

const productRouter = Router();

const productsList: Product[] = [
  {
    id: "2asdafd",
    productName: "Mug",
    productDescription: "Super Huge Mug I've ever seen",
    productPrice: 3000,
  },
  {
    id: "eiradpfkaldkf",
    productName: "Running shoe",
    productDescription: "Only one shoe, you need to buy another one separately",
    productPrice: 400,
  },
];

// Browse
productRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(productsList);
});

// Add
productRouter.post(
  "/",
  (req: Request<{}, {}, Omit<Product, "id">>, res: Response) => {
    const { productName, productDescription, productPrice } = req.body;
    const newProduct: Product = {
      id: uuidv4(),
      productName,
      productDescription,
      productPrice,
    };
    productsList.push(newProduct);
    res.status(201).json(newProduct);
  }
);

// Read
productRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const product = productsList.find((product) => product.id === id);
  res.status(200).json(product);
});

productRouter.put(
  "/:id",
  (req: Request<{ id: string }, {}, Partial<Product>>, res: Response) => {
    const { id } = req.params;
    const foundIndex = productsList.findIndex((product) => product.id === id);
    if (foundIndex === -1) {
      res.status(404).send("Product not found!");
      return;
    }
    const updatedProduct: Product = {
      ...productsList[foundIndex],
      productName: req.body.productName ?? productsList[foundIndex].productName,
      productDescription:
        req.body.productDescription ??
        productsList[foundIndex].productDescription,
      productPrice:
        req.body.productPrice ?? productsList[foundIndex].productPrice,
    };
    productsList[foundIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
  }
);

// Delete
productRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.body;
  const foundIndex = productsList.findIndex((product) => product.id === id);
  if (foundIndex === -1) {
    res.status(404).send("Product not found!");
    return;
  }
  productsList.splice(foundIndex, 1);
  res.status(200).send("Product was deleted succesfully.");
});

export default productRouter;
