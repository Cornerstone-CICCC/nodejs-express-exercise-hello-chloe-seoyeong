"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
const productsList = [
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
productRouter.get("/", (req, res) => {
    res.status(200).json(productsList);
});
// Add
productRouter.post("/", (req, res) => {
    const { productName, productDescription, productPrice } = req.body;
    const newProduct = {
        id: (0, uuid_1.v4)(),
        productName,
        productDescription,
        productPrice,
    };
    productsList.push(newProduct);
    res.status(201).json(newProduct);
});
// Read
productRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const product = productsList.find((product) => product.id === id);
    res.status(200).json(product);
});
productRouter.put("/:id", (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const foundIndex = productsList.findIndex((product) => product.id === id);
    if (foundIndex === -1) {
        res.status(404).send("Product not found!");
        return;
    }
    const updatedProduct = Object.assign(Object.assign({}, productsList[foundIndex]), { productName: (_a = req.body.productName) !== null && _a !== void 0 ? _a : productsList[foundIndex].productName, productDescription: (_b = req.body.productDescription) !== null && _b !== void 0 ? _b : productsList[foundIndex].productDescription, productPrice: (_c = req.body.productPrice) !== null && _c !== void 0 ? _c : productsList[foundIndex].productPrice });
    productsList[foundIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
});
// Delete
productRouter.delete("/:id", (req, res) => {
    const { id } = req.body;
    const foundIndex = productsList.findIndex((product) => product.id === id);
    if (foundIndex === -1) {
        res.status(404).send("Product not found!");
        return;
    }
    productsList.splice(foundIndex, 1);
    res.status(200).send("Product was deleted succesfully.");
});
exports.default = productRouter;
