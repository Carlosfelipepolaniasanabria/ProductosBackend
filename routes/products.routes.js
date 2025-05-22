import { Router } from "express";
import { Products } from "../entity/products.entity.js";
import { validate } from "../middleware/validate.js";
import { body, param} from "express-validator";
import { checkProductInDB } from "../middleware/checkproduct.js";
import { authorize } from "../middleware/auth.js";
import { cacheValkey } from "../config/cacheValkey.js";
import dotenv from "dotenv";

dotenv.configDotenv();

const router = Router();

 router.get("/", async (req, res) => {
    const productsCache = await cacheValkey.get("products");

    if (productsCache ) {
        return res.json({
            data: JSON.parse(productsCache ),
        });
    }

    const products = await Products.findAll();

    await cacheValkey.set("products", JSON.stringify(products), "EX", 60);

    return res.json({
        data: products,
    });
});


 router.get("/:id",
    [
    param("id").isInt().exists(),
    validate,

    checkProductInDB,
    authorize,
 ],

 async(req,res) => {
    const { id } = req.params;
    console.log(req.Products);


    const productCache = await cacheValkey.get(`product_${id}`);
    if (productCache) {

            return res.json({
                data: JSON.parse(productCache),
            });
        }
    const product = await Products.findOne({
        where: {
            id: +id,
        },
    });

        await cacheValkey.set(`prodcut_${id}`, JSON.stringify(product), "EX", 60);

    return res.json({
        data: product,
    })
 }
)


router.post('/', async (req, res) => {
  try {
    const { nombre, precio } = req.body;

    // Crear producto en la base de datos con Sequelize
    const nuevoProducto = await Products.create({
      nombre,
      precio
    });

    // Emitir evento usando Socket.io
    req.io.emit('nuevo_producto', nuevoProducto);

    // Responder al cliente
    res.status(201).json({
      mensaje: 'Producto agregado correctamente',
      producto: nuevoProducto
    });
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});


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
    
            await res.json({
                data: await Products.destroy({
                    where: {
                        id: +id,
                    },
                }),
            });

            await cacheValkey.del(`product_${id}`);
            await cacheValkey.del("products");


            return res.json({
                message: "User deleted successfully",
            });
        }
    );
    export default router;