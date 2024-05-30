document.addEventListener("DOMContentLoaded", function() {
    const cart = [];
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-button");

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            const product = this.closest(".product");
            const productName = product.getAttribute("data-name");
            const productPrice = parseFloat(product.getAttribute("data-price"));

            addToCart(productName, productPrice);
        });
    });

    function addToCart(name, price) {
        cart.push({ name, price });
        updateCart();
    }

    function updateCart() {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
            cartItems.appendChild(cartItem);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);
        document.getElementById("cart").style.display = cart.length > 0 ? "block" : "none";
    }

    checkoutButton.addEventListener("click", function() {
        if (cart.length > 0) {
            alert("Compra finalizada com sucesso!");
            cart.length = 0;
            updateCart();
        } else {
            alert("Seu carrinho está vazio!");
        }
    });


    function finalizePurchase() {
        window.location.href = 'https://wa.me/5511976835325';
    }

    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        alert(`Obrigado por entrar em contato, ${name}!\nResponderemos em breve no email ${email}.`);
        document.getElementById("contactForm").reset();
    });

    // Filtro de categoria
    window.filterCategory = function(category) {
        document.querySelectorAll(".product").forEach(product => {
            if (category === "todos" || product.getAttribute("data-category") === category) {
                product.style.display = "inline-block";
            } else {
                product.style.display = "none";
            }
        });
    };

    function openComments() {
        var modal = document.getElementById('comments-modal');
        modal.style.display = 'block';
    }
    
    // Fecha o modal de comentários
    function closeComments() {
        var modal = document.getElementById('comments-modal');
        modal.style.display = 'none';
    }
    
    // Quando o usuário clicar em qualquer lugar fora do modal, ele será fechado
    window.onclick = function(event) {
        var modal = document.getElementById('comments-modal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    
    // Barra de busca
    document.getElementById("search").addEventListener("input", function() {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll(".product").forEach(product => {
            const productName = product.getAttribute("data-name").toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = "inline-block";
            } else {
                product.style.display = "none";
            }
        });
    });
});
