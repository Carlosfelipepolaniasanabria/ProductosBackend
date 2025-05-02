import { Router } from "express";
import { productsEntity } from "../entity/products.entity.js";
 
 const router = Router();
 
 const productEntity = new productsEntity();
 
 router.get("/", (req, res) => {
     const users = productEntity.findAll();
 
     return res.json({
         data: users,
     });
 });
 
 router.get("/:id", (req, res) => {
     const { id } = req.params;
     const product = productEntity.findOne(+id);
 
     return res.json({
         data: product,
     });
 });
 
 router.post("/", (req, res) => {
     const productCreate = req.body;
 
     const createdProduct = productEntity.create(productCreate);
 
     return res.json({
         data: createdProduct,
     });
 });
 
 router.patch("/:id", (req, res) => {
     const { id } = req.params;
     const productUpdate = req.body;
 
     const updatedProduct = productEntity.update(+id, productUpdate);
 
     return res.json({
         data: updatedProduct,
     });
 });
 router.delete("/:id", (req, res) => {
     const { id } = req.params;
 
     return res.json({
         data: productEntity.delete(+id),
     });
 });
 
 export default router;