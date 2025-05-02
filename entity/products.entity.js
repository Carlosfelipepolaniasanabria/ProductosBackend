export class productsEntity {
    products = [
        { id: "1", producto: "Laptop", precio: "50000" },
        { id: "2", producto: "TV", precio: "20000" },
        { id: "3", producto: "Telefono", precio: "30000" }
    ];

    Encontraruno(id) {
        return this.products.find((product) => String(product.id) === String(id));
    }

    Findall() {
        return this.products;
    }

    create(product) {
        const newID = this.Findall().length + 1;
        product.id = String(newID);
        this.products.push(product);
        return this.Encontraruno(product.id);
    }

    update(id, product) {
        const productDb = this.Encontraruno(id);
        if (!productDb) return null;

        this.products = this.products.filter((u) => String(u.id) !== String(id));

        const updateProduct = {
            ...productDb,
            ...product,
            id: String(id)
        };

        this.products.push(updateProduct);
        return updateProduct;
    }

    delete(id) {
        const productToDelete = this.Encontraruno(id);
        if (productToDelete) {
            this.products = this.products.filter((product) => product.id !== id);
            return productToDelete; 
        }
        return null;  
    }
}


