document.addEventListener("DOMContentLoaded", () => {
    const cardRadio = document.getElementById("card");
    const cashRadio = document.getElementById("cash");
    const cardDetails = document.getElementById("card-details");
    const orderForm = document.getElementById("order-form");
    const deliveryInfo = document.getElementById("delivery-info");
    const deliveryDateElement = document.querySelector('#delivery-date');
    const cardExpiryInput = document.getElementById("card-expiry");
    const orderDetailsTable = document.getElementById("order-details"); // Table body to display cart items
    const totalPriceElement = document.getElementById("total-price");

    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('favourites')) || [];

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

            total += parseFloat(item.totalPrice); // Calculate the total price
        });

        totalPriceElement.textContent = total.toFixed(2); // Display the total price
    }

    // Event listener for "Card" radio button
    cardRadio.addEventListener("change", () => {
        if (cardRadio.checked) {
            cardDetails.style.display = "block";
        }
    });

    // Event listener for "Cash On Delivery" radio button
    cashRadio.addEventListener("change", () => {
        if (cashRadio.checked) {
            cardDetails.style.display = "none";
        }
    });

    // Handle form submission
    orderForm.addEventListener("submit", (event) => {
        // Check if card payment is selected
        if (cardRadio.checked) {
            const expiryDate = new Date(cardExpiryInput.value + "-01");
            const today = new Date();
            today.setDate(1); // Set to the first day of the current month

            if (expiryDate <= today) {
                alert("The card expiry date must be after the current month.");
                event.preventDefault(); // Prevent form submission
                return;
            }
        }

        // Prevent form refresh and display delivery details
        event.preventDefault();
        deliveryInfo.style.display = "block";
        deliveryDateElement.textContent = calculateDeliveryDate();
    });

    // Function to calculate the delivery date (e.g., 2 days from now)
    function calculateDeliveryDate() {
        const today = new Date();
        today.setDate(today.getDate() + 2); // Add 2 days to the current date
        return today.toDateString(); // Format the date as a readable string
    }

    // Display the cart items when the page loads
    displayCartItems();
});
