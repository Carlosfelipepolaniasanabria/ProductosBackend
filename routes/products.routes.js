import { Router } from "express";
import { Products } from "../entity/products.entity.js";
import { validate } from "../middleware/validate.js";
import { body, param} from "express-validator";
import { checkProductInDB } from "../middleware/checkproduct.js";
import { authorize } from "../middleware/auth.js";
 const router = Router();

 router.get("/:id",[
    param("id").isInt().exists(),
    validate,

    checkProductInDB,
    authorize,
 ],

 async(req,res) => {
    const { id } = req.params;
    console.log(req.Products);

    const product = await Products.findOne({
        where: {
            id: +id,
        },
    });

    return res.json({
        data: product,
    })
 }
)



    router.post(
    "/",
    [
        body("id").isEmpty(),
        body("producto").isString().exists(),
        body("precio").isNumeric().exists(),
        validate,
    ],
    async (req,res) => {
        const productCreate = req.body;
        const createProduct = await Products.create(productCreate)
        return res.json({
            data:createProduct,
        })
    })



    router.patch("/:id"
    ,[
        param("id").isInt().exists(),
        body("id").isEmpty(),
        body("producto").isString().optional(),
        body("precio").isNumeric().optional(),
        validate,

        checkProductInDB,
    ],
    async (req, res) => {

        const { id } = req.params;
        const productUpdate = req.body;

        const updateProduct = await Products.update(productUpdate,{
            where: {
                id: +id,
            },
        }) 
        return res.json({
            data: updatedUser,
        });
    }
    )


    router.delete(
        "/:id",
        [
            param("id").isInt().exists(),
            validate,
    
            checkProductInDB,
        ],
        async (req, res) => {
            const { id } = req.params;
    
            return res.json({
                data: await Products.destroy({
                    where: {
                        id: +id,
                    },
                }),
            });
        }
    );
    export default router;