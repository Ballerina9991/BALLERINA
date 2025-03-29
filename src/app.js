document.addEventListener("DOMContentLoaded", function () {
    fetch("http://127.0.0.1:8080/products")  // Ambil data produk dari backend
        .then(response => response.json())
        .then(data => {
            console.log("Data Produk:", data);
            let productContainer = document.getElementById("product-list");
            if (productContainer) {
                productContainer.innerHTML = data.map(product => `
                    <div class="product">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p>Harga: Rp ${product.price}</p>
                    </div>
                `).join("");
            }
        })
        .catch(error => console.error("Error fetching products:", error));
});

