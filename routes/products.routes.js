import { Router } from "express";
import { productsEntity } from "../entity/products.entity.js";


const router = Router();

const ProductsEntity = new productsEntity();

    router.get("/", (req, res) => {
        const products = ProductsEntity.Findall();
    res.json({
        data: products,
    });
    })

    
    router.get("/:id", (req, res) => {
        const { id }  = req.params;
        const products = ProductsEntity.Encontraruno(+id);
        console.log(products);

        return res.json({
            data: products,
        })
    })


    router.post("/", (req, res) => {

        const productCreate = req.body;
        const createProduct = ProductsEntity.create(productCreate);

        return res.json({
            data: createProduct,
        });
    })

    router.patch("/:id", (req, res) => {

        const { id }  = req.params;
        const productUpdate = req.body;

        const updateproducts = ProductsEntity.update(+id, productUpdate);

        return res.json({
            data: updateproducts,
        })
    })
    
    router.delete("/:id", (req, res) => {

        const { id } = req.params;

        const deletedProduct = ProductsEntity.delete(id);
    
        res.json({
            data: deletedProduct,
        });
    })


export default router;