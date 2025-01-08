document.addEventListener("DOMContentLoaded", () => {
    const cardRadio = document.getElementById("card");
    const cashRadio = document.getElementById("cash");
    const cardDetails = document.getElementById("card-details");
    const deliveryInfo = document.getElementById("delivery-info");
    const deliveryDateElement = document.querySelector('#delivery-date');
    const cardExpiryInput = document.getElementById("card-expiry");
    const cardNumberInput = document.getElementById("card-number");
    const cardCVVInput = document.getElementById("card-cvv");
    const customerNameInput = document.getElementById("customer-name");
    const customerEmailInput = document.getElementById("customer-email");
    const customerPhoneInput = document.getElementById("customer-phone");
    const deliveryAddressInput = document.getElementById("delivery-address");
    const districtInput = document.getElementById("District");
    const orderDetailsTable = document.getElementById("order-details");
    const totalPriceElement = document.getElementById("total-price");
    const submitBtn = document.getElementById("submitbb");

    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('pushtopaymentpage')) || [];

    // Display the cart items in the table
    function displayCartItems() {
        if (cartItems.length === 0) {
            orderDetailsTable.innerHTML = '<tr><td colspan="4">Your cart is empty.</td></tr>';
            totalPriceElement.textContent = '0.00';
            return;
        }

        let total = 0;
        cartItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.productName}</td>
                <td>${item.quantity}</td>
                <td>${item.pricePerUnit}</td>
                <td>${item.totalPrice}</td>
            `;
            orderDetailsTable.appendChild(row);

            total += parseFloat(item.totalPrice);
        });

        totalPriceElement.textContent = total.toFixed(2);
    }

    // Event listener for "Card" radio button
    cardRadio.addEventListener("change", () => {
        if (cardRadio.checked) {
            cardDetails.style.display = "block";
            deliveryInfo.style.display = "none";
        }
    });

    cashRadio.addEventListener("change", () => {
        if (cashRadio.checked) {
            cardDetails.style.display = "none";
            deliveryInfo.style.display = "none";
        }
    });

    // Function to calculate the delivery date (e.g., 2 days from now)
    function calculateDeliveryDate() {
        const today = new Date();
        today.setDate(today.getDate() + 2);
        return today.toDateString();
    }

    // Function to validate all form fields
    function validateFields() {
        // Validate customer details
        if (!customerNameInput.value.trim()) {
            alert("Please enter your name.");
            return false;
        }
        if (!customerEmailInput.value.trim()) {
            alert("Please enter your email address.");
            return false;
        }
        if (!customerPhoneInput.value.trim() || !customerPhoneInput.checkValidity()) {
            alert("Please enter a valid phone number.");
            return false;
        }

        // Validate delivery details
        if (!deliveryAddressInput.value.trim()) {
            alert("Please enter your delivery address.");
            return false;
        }
        if (!districtInput.value.trim()) {
            alert("Please enter your district.");
            return false;
        }

        // Validate payment method
        if (!cashRadio.checked && !cardRadio.checked) {
            alert("Please select a payment method.");
            return false;
        }

        if (cardRadio.checked) {
            const expiryDate = new Date(cardExpiryInput.value + "-01");
            const today = new Date();
            today.setDate(1); // Set to the first day of the current month

            if (!cardNumberInput.value.trim() || !cardNumberInput.checkValidity()) {
                alert("Please enter a valid 16-digit card number.");
                return false;
            }
            if (!cardExpiryInput.value.trim()) {
                alert("Please enter the card expiry date.");
                return false;
            }
            if (expiryDate <= today) {
                alert("The card expiry date must be after the current month.")
                return;
            }
            if (!cardCVVInput.value.trim() || !cardCVVInput.checkValidity()) {
                alert("Please enter a valid 3-digit CVV.");
                return false;
            }
        }

        return true;
    }

    // Function to handle form submission
    function checkPay() {
        if (!validateFields()) {
            return; // Stop submission if validation fails
        }

        // Display delivery information
        deliveryInfo.style.display = "block";
        deliveryDateElement.textContent = calculateDeliveryDate();
        alert("Order confirmed! Your delivery is on its way.");
    }

    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        checkPay();
    });

    // Display the cart items when the page loads
    displayCartItems();
});
