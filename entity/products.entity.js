import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Products = sequelize.define("Products", {
    producto: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "name",
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
});

Products.sync();


