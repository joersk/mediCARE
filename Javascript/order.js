document.addEventListener('DOMContentLoaded', () => {
    const cartTableBody = document.querySelector('table.order tbody');
    const totalPriceElement = document.getElementById('total-price');

    const products = {
        analgesics: { Paracetamol: 10, Ibuprofen: 15, Aspirin: 12, Naproxen: 20, Morphine: 50, Codeine: 30 },
        antibiotics: { Amoxicillin: 25, Doxycycline: 30, Cephalexin: 20, Erythromycin: 40, Ciprofloxacin: 35, Gentamicin: 45 },
        antidepressants: { Sertraline: 15, Fluoxetine: 20, Escitalopram: 25, Venlafaxine: 30, Amitriptyline: 18, Duloxetine: 22 },
        antihistamines: { Cetirizine: 5, Loratadine: 6, Diphenhydramine: 7, Fexofenadine: 8, Chlorpheniramine: 9 },
        antihypertensives: { Enalapril: 10, Losartan: 15, Metoprolol: 12, Amlodipine: 14, Hydrochlorothiazide: 18, Spironolactone: 22 },
    };

    function addToCart(productCategory, productSelectId, quantityInputId) {
        const productSelect = document.getElementById(productSelectId);
        const quantityInput = document.getElementById(quantityInputId);

        const productName = productSelect.value;
        const quantity = parseInt(quantityInput.value, 10);

        if (!productName || isNaN(quantity) || quantity <= 0) {
            alert('Please select a valid product and quantity.');
            return;
        }

        const pricePerUnit = products[productCategory][productName];
        const totalPrice = pricePerUnit * quantity;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${productName}</td>
            <td>${quantity}</td>
            <td>${pricePerUnit.toFixed(2)}</td>
            <td>${totalPrice.toFixed(2)}</td>
            <td><button class="remove-item">Remove</button></td>
        `;

        row.querySelector('.remove-item').addEventListener('click', () => {
            row.remove();
            updateTotalPrice();
        });

        cartTableBody.appendChild(row);
        updateTotalPrice();

        // Reset inputs
        productSelect.value = '';
        quantityInput.value = '';
    }

    function updateTotalPrice() {
        let total = 0;
        cartTableBody.querySelectorAll('tr').forEach(row => {
            const totalPriceCell = row.querySelector('td:nth-child(4)');
            total += parseFloat(totalPriceCell.textContent);
        });
        totalPriceElement.textContent = total.toFixed(2);
    }

    function addToFavourites() {
        const rows = Array.from(cartTableBody.querySelectorAll('tr'));
        if (rows.length === 0) {
            alert('Cart is empty. Add items to cart before saving favourites.');
            return;
        }

        const favouritesData = rows.map(row => {
            const productName = row.querySelector('td:nth-child(1)').textContent;
            const quantity = parseInt(row.querySelector('td:nth-child(2)').textContent, 10);
            return { productName, quantity };
        });

        // Save to local storage
        localStorage.setItem('favourites', JSON.stringify(favouritesData));
        alert('Favourites saved successfully!');
    }
    
    function applyFavourites() {
        const favouritesData = JSON.parse(localStorage.getItem('favourites'));
        if (!favouritesData || favouritesData.length === 0) {
            alert('No favourites saved. Please add favourites first.');
            return;
        }
    
        favouritesData.forEach(fav => {
            // Identify the category based on the product name
            const productCategory = Object.keys(products).find(category =>
                Object.keys(products[category]).includes(fav.productName)
            );
    
            if (productCategory) {
                const pricePerUnit = products[productCategory][fav.productName];
                const totalPrice = pricePerUnit * fav.quantity;
    
                // Add item to the cart table
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${fav.productName}</td>
                    <td>${fav.quantity}</td>
                    <td>${pricePerUnit.toFixed(2)}</td>
                    <td>${totalPrice.toFixed(2)}</td>
                    <td><button class="remove-item">Remove</button></td>
                `;
    
                row.querySelector('.remove-item').addEventListener('click', () => {
                    row.remove();
                    updateTotalPrice();
                });
    
                cartTableBody.appendChild(row);
            }
        });
    
        updateTotalPrice();
        alert('Favourites applied to the cart!');
    }
    
    document.getElementById('buy-now').addEventListener('click', () => {
        const cartData = [];
        cartTableBody.querySelectorAll('tr').forEach(row => {
            const productName = row.querySelector('td:nth-child(1)').textContent;
            const quantity = parseInt(row.querySelector('td:nth-child(2)').textContent, 10);
            const price = parseFloat(row.querySelector('td:nth-child(3)').textContent);
            const totalPrice = parseFloat(row.querySelector('td:nth-child(4)').textContent);

            cartData.push({ productName, quantity, price, totalPrice });
        });

        if (cartData.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Save cart data to localStorage
        localStorage.setItem('cartData', JSON.stringify(cartData));
        // Redirect to payment page
        window.location.href = 'paymentpage.html';
    });

    document.getElementById('save-favourites').addEventListener('click', addToFavourites);
    document.getElementById('apply-favourites').addEventListener('click', applyFavourites);

    document.getElementById('add-analgesics').addEventListener('click', () => addToCart('analgesics', 'analgesics', 'quantity-analgesics'));
    document.getElementById('add-antibiotics').addEventListener('click', () => addToCart('antibiotics', 'antibiotics', 'quantity-antibiotics'));
    document.getElementById('add-antidepressants').addEventListener('click', () => addToCart('antidepressants', 'antidepressants', 'quantity-antidepressants'));
    document.getElementById('add-antihistamines').addEventListener('click', () => addToCart('antihistamines', 'antihistamines', 'quantity-antihistamines'));
    document.getElementById('add-antihypertensives').addEventListener('click', () => addToCart('antihypertensives', 'antihypertensives', 'quantity-antihypertensives'));
});
