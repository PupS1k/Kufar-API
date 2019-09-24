function changePropertyId(products) {
    const newProducts = products.map(product => {
        delete product._id;
        console.log(product);
        return product
    });
    console.log(newProducts);
    return newProducts;
}

module.exports = changePropertyId;