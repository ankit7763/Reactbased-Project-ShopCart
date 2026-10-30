import initialProducts from "./Product.json";

const STORAGE_KEY = "shopcart-products";

const getStoredProducts = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
        return initialProducts;
    }

    try {
        return JSON.parse(stored);
    } catch {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
        return initialProducts;
    }
};

const saveProducts = (products) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return products;
};

export async function fetchProducts() {
    return getStoredProducts();
}

export async function createProduct(productData) {
    const products = getStoredProducts();
    const newProduct = {
        ...productData,
        id: Date.now(),
        image: productData.image || "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600"
    };

    const updatedProducts = [...products, newProduct];
    return saveProducts(updatedProducts)[updatedProducts.length - 1];
}

export async function updateProduct(id, productData) {
    const products = getStoredProducts();
    const updatedProducts = products.map(product =>
        product.id === Number(id) ? { ...product, ...productData } : product
    );

    saveProducts(updatedProducts);
    return updatedProducts.find(product => product.id === Number(id));
}

export async function deleteProduct(id) {
    const products = getStoredProducts();
    const updatedProducts = products.filter(product => product.id !== Number(id));
    saveProducts(updatedProducts);
    return { success: true };
}
