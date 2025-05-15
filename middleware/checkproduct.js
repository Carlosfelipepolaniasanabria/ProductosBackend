import { Products } from "../entity/products.entity.js";

export const checkProductInDB = async (req, res, next) => {
    const { id } = req.params;

    const user = await Products.findOne({ where: { id: +id } });

    if (!user) {
        return res.status(404).json({
            error: "User doesn't exists",
        });
    }

    next();
};