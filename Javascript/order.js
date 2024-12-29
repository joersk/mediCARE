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

    document.getElementById('save-favourites').addEventListener('click', () => {
        alert('Favourites saved!');
    });

    document.getElementById('apply-favourites').addEventListener('click', () => {
        alert('Favourites applied!');
    });

    document.getElementById('buy-now').addEventListener('click', () => {
        alert('Proceeding to checkout...');
    });
});
