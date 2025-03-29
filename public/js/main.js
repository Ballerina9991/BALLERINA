document.addEventListener("DOMContentLoaded", function () {
    // Menampilkan spinner saat loading
    document.getElementById("loading-spinner").style.display = "block";

    fetch('http://127.0.0.1:5000/api/products')
        .then(response => {
            // Cek status respons
            if (!response.ok) {
                throw new Error('Gagal memuat produk: ' + response.statusText);
            }
            return response.json();
        })
        .then(products => {
            // Menyembunyikan spinner setelah produk dimuat
            document.getElementById("loading-spinner").style.display = "none";

            let productsContainer = document.getElementById("products-container");
            productsContainer.innerHTML = ""; // Kosongkan dulu sebelum isi ulang

            products.forEach(product => {
                let productElement = document.createElement("div");
                productElement.classList.add("product");
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" width="150">
                    <h3>${product.name}</h3>
                    <p>Harga: Rp${product.price.toLocaleString()}</p>
                    <button onclick="alert('Anda membeli ${product.name}')">Beli</button>
                `;
                productsContainer.appendChild(productElement);
            });
        })
        .catch(error => {
            // Menyembunyikan spinner dan menampilkan pesan error
            document.getElementById("loading-spinner").style.display = "none";
            let productsContainer = document.getElementById("products-container");
            productsContainer.innerHTML = `<p>Gagal memuat produk: ${error.message}. Silakan coba lagi nanti.</p>`;
            console.error("Gagal memuat produk:", error);
        });
});

