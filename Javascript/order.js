document.addEventListener('DOMContentLoaded', () => {
    const cartTableBody = document.querySelector('table.order tbody');
    const totalPriceElement = document.getElementById('total-price');
    const saveFavourites = document.getElementById('save-favourites');
    const applyFavourites = document.getElementById('apply-favourites');

    // Products data
    const products = {
        analgesics: { 
            Paracetamol: 10, 
            Ibuprofen: 15, 
            Aspirin: 12, 
            Naproxen: 20, 
            Morphine: 50, 
            Codeine: 30 
        },
        antibiotics: { 
            Amoxicillin: 25, 
            Doxycycline: 30, 
            Cephalexin: 20, 
            Erythromycin: 40, 
            Ciprofloxacin: 35, 
            Gentamicin: 45 
        },
        antidepressants: { 
            Sertraline: 15, 
            Fluoxetine: 20, 
            Escitalopram: 25, 
            Venlafaxine: 30, 
            Amitriptyline: 18, 
            Duloxetine: 22 
        },
        antihistamines: { 
            Cetirizine: 5, 
            Loratadine: 6, 
            Diphenhydramine: 7, 
            Fexofenadine: 8, 
            Chlorpheniramine: 9 
        },
        antihypertensives: { 
            Enalapril: 10, 
            Losartan: 15, 
            Metoprolol: 12, 
            Amlodipine: 14, 
            Hydrochlorothiazide: 18, 
            Spironolactone: 22 
        }
    };

    // Add product to the cart
    function addToCart(productCategory, productSelectId, quantityInputId) {
        const productSelect = document.getElementById(productSelectId);
        const quantityInput = document.getElementById(quantityInputId);

        const productName = productSelect.value;
        const quantity = parseInt(quantityInput.value, 10);

        // Validation
        if (!productName) {
            alert('Please select a product.');
            return;
        }
        if (isNaN(quantity) || quantity <= 0) {
            alert('Please enter a valid quantity greater than zero.');
            return;
        }

        const pricePerUnit = products[productCategory][productName];
        const totalPrice = pricePerUnit * quantity;

        // Create a new row for the cart
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${productName}</td>
            <td>${quantity}</td>
            <td>${pricePerUnit.toFixed(2)}</td>
            <td>${totalPrice.toFixed(2)}</td>
            <td><button class="remove-item">Remove</button></td>
        `;

        // Add event listener to remove button
        row.querySelector('.remove-item').addEventListener('click', () => {
            row.remove();
            updateTotalPrice();
        });

        // Append the row to the table body
        cartTableBody.appendChild(row);

        // Update the total price
        updateTotalPrice();

        // Clear the form inputs
        productSelect.value = '';
        quantityInput.value = '';
    }

    // Update the total price of the cart
    function updateTotalPrice() {
        let total = 0;
        cartTableBody.querySelectorAll('tr').forEach(row => {
            const totalPriceCell = row.querySelector('td:nth-child(4)');
            total += parseFloat(totalPriceCell.textContent);
        });
        totalPriceElement.textContent = total.toFixed(2);
    }

    // Check if the cart is empty
    function isCartEmpty() {
        return cartTableBody.querySelectorAll('tr').length === 0;
    }

    // Save cart to localStorage
    function saveFavourites() {
        if (isCartEmpty()) {
            alert('Your cart is empty. Please add items before saving.');
            return;
        }

        const cartItems = [];
        cartTableBody.querySelectorAll('tr').forEach(row => {
            const productName = row.querySelector('td:nth-child(1)').textContent;
            const quantity = row.querySelector('td:nth-child(2)').textContent;
            const pricePerUnit = row.querySelector('td:nth-child(3)').textContent;
            const totalPrice = row.querySelector('td:nth-child(4)').textContent;
            cartItems.push({ productName, quantity, pricePerUnit, totalPrice });
        });

        // Save the cart items to localStorage
        localStorage.setItem('favourites', JSON.stringify(cartItems));
        alert('Favourites saved!');
    }

    // Apply favourites from localStorage
    function applyFavourites() {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    
        // If there are no favourites saved, alert the user.
        if (favourites.length === 0) {
            alert('No saved favourites found!');
            return;
        }
    
        // Clear the current cart before applying the favourites
        cartTableBody.innerHTML = ''; 
    
        // Add items from favourites to the cart
        favourites.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.productName}</td>
                <td>${item.quantity}</td>
                <td>${item.pricePerUnit}</td>
                <td>${item.totalPrice}</td>
                <td><button class="remove-item">Remove</button></td>
            `;
            
            row.querySelector('.remove-item').addEventListener('click', () => {
                row.remove();
                updateTotalPrice();
            });
            
            cartTableBody.appendChild(row);
        });
    
        // Update the total price after applying favourites
        updateTotalPrice();
    
        // Show success alert
        alert('Favourites applied!');
    }

    // Event listeners for adding products to the cart
    document.getElementById('add-analgesics').addEventListener('click', () => {
        addToCart('analgesics', 'analgesics', 'quantity-analgesics');
    });

    document.getElementById('add-antibiotics').addEventListener('click', () => {
        addToCart('antibiotics', 'antibiotics', 'quantity-antibiotics');
    });

    document.getElementById('add-antidepressants').addEventListener('click', () => {
        addToCart('antidepressants', 'antidepressants', 'quantity-antidepressants');
    });

    document.getElementById('add-antihistamines').addEventListener('click', () => {
        addToCart('antihistamines', 'antihistamines', 'quantity-antihistamines');
    });

    document.getElementById('add-antihypertensives').addEventListener('click', () => {
        addToCart('antihypertensives', 'antihypertensives', 'quantity-antihypertensives');
    });

    // Event listeners for saving and applying favourites
    document.getElementById('save-favourites').addEventListener('click', saveFavourites);
    document.getElementById('apply-favourites').addEventListener('click', applyFavourites);

    function savetofav(){
        if (isCartEmpty()) {
            alert('Your cart is empty. Please add items before saving.');
            return;
        }

        const cartItems = [];
        cartTableBody.querySelectorAll('tr').forEach(row => {
            const productName = row.querySelector('td:nth-child(1)').textContent;
            const quantity = row.querySelector('td:nth-child(2)').textContent;
            const pricePerUnit = row.querySelector('td:nth-child(3)').textContent;
            const totalPrice = row.querySelector('td:nth-child(4)').textContent;
            cartItems.push({ productName, quantity, pricePerUnit, totalPrice });
        });

        // Save the cart items to localStorage
        localStorage.setItem('pushtopaymentpage', JSON.stringify(cartItems));
        alert('Proceeding to payment page');

    }
    
    // Buy Now button
    document.getElementById('buy-now').addEventListener('click', () => {
        if (isCartEmpty()) {
            alert('Your cart is empty. Please add items before proceeding.');
        } else {
            // Save the cart items to localStorage before redirecting
            savetofav();
    
            // Redirect to checkout page
            window.location.href = 'paymentpage.html';  // Replace with your checkout URL
        }
    });
});
