let products = [];

// Fetch products from the API
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    products = data.slice(0, 16); // Obtener solo 16 productos
    loadProducts(products);
    loadFilterOptions(products);
  })
  .catch((error) => console.error("Error fetching products:", error));

// Función para cargar las cards
function loadProducts(productsToShow) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ""; // Limpiar el contenedor

  productsToShow.forEach((product) => {
    const card = `
<div class="col-12 col-md-6 col-lg-3 mb-4 product-card" data-id="${product.id}">
    <div class="card h-100 shadow-sm border border-light" style="transition: transform 0.3s, box-shadow 0.5s;">
        <img src="${product.image}" class="card-img-top" style="border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem; object-fit: cover;" alt="${product.title}">
        <div class="card-body text-center">
            <h5 class="card-title" style="font-size: 1.25rem; font-weight: bold; color: #343a40; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);">${product.title}</h5>
            <p class="card-text" style="font-size: 1.2rem; font-weight: bold; color: #28a745; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);">$${product.price}</p>
        </div>
    </div>
</div>



                `;
    productContainer.innerHTML += card;
  });
}

// Cargar Cartas en el filtro
function loadFilterOptions(products) {
  const productFilter = document.getElementById("productFilter");
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.title;
    productFilter.appendChild(option);
  });
}

// Filtrar Cartas
document
  .getElementById("productFilter")
  .addEventListener("change", function () {
    const selectedValue = this.value;

    if (selectedValue === "all") {
      loadProducts(products); // Mostrar todos los productos
    } else {
      const filteredProduct = products.filter(
        (product) => product.id == selectedValue
      );
      loadProducts(filteredProduct); // Mostrar solo el producto seleccionado
    }
  });
