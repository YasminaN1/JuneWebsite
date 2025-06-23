// Wait for the webpage to fully load before running this code
document.addEventListener('DOMContentLoaded', function () {
    
    // Create an object that stores information about different toy products
    const productData = {
        // Information about toy cars
        "cars": {
            description: "Handcrafted from domestic and exotic hardwoods with a clear lacquer finish, this unique car will inspire generations of imaginative play. Please note potential choking hazards for small children.",
            dimensions: "H: 3.5' x L: 7' x W: 7'",
            details: "This heirloom-quality wooden car is a timeless treasure."
        },
        // Information about toy planes
        "planes": {
            description: "Soar through imaginative skies with this classic wooden airplane.",
            dimensions: "H: 3.5' x L: 7' x W: 7'",
            details: "Handcrafted from sustainable Baltic birch wood with a safe, natural harvest finish and a spinning propeller."
        },
        // Information about toy trains
        "trains": {
            description: "Embark on a charming journey with this beautiful handcrafted wooden train set. Engine and three interchangeable cars boast intricate details made from real beech wood.",
            dimensions: "L: 84cm x H: 11cm x W: 13cm",
            details: "Comes with moving wheels and a fully ecological design."
        },
        // Information about toy boats
        "boats": {
            description: "Set sail for bathtub adventures with this adorable wooden boat.",
            dimensions: "W: 10.5' x H: 3.5'",
            details: "Made from solid Maine white pine, this handcrafted toy floats and features rounded edges for safety. Includes two peg 'lobster people.'"
        }
    };

    // FILTER FUNCTIONALITY - Code that lets users sort products by type

    // Find all the filter buttons on the page (like "All", "Cars", "Planes", etc.)
    const filterButtons = document.querySelectorAll('.filter-button');
    // Find all the product cards that show the toys
    const productCards = document.querySelectorAll('.product-card');

    // Go through each filter button and add a click event
    filterButtons.forEach(button => {
        // When someone clicks a filter button, do this:
        button.addEventListener('click', function () {
            // Get the filter type from the button (like "cars" or "planes")
            const filter = this.getAttribute('data-filter');

            // Remove the "active" class from all filter buttons (makes them not highlighted)
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add the "active" class to the button that was clicked (highlights it)
            this.classList.add('active');

            // Go through each product card and decide if it should be shown or hidden
            productCards.forEach(card => {
                // If the filter is "all" OR the card matches the selected category
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    // Show the product card
                    card.style.display = 'block';
                } else {
                    // Hide the product card
                    card.style.display = 'none';
                }
            });
        });
    });

    // QUICK VIEW MODAL FUNCTIONALITY - Code for the popup window that shows product details

    // Find the popup window (modal) and its parts
    const modal = document.querySelector('.quick-view-modal');
    const modalClose = document.querySelector('.quick-view-close');
    const modalName = document.querySelector('.quick-view-name');
    const modalMaterial = document.querySelector('.quick-view-material');
    const modalDimensions = document.querySelector('.quick-view-dimensions');
    const modalPrice = document.querySelector('.quick-view-price');
    const modalDescription = document.querySelector('.quick-view-description');
    const modalImage = document.querySelector('.quick-view-image');
    const modalAddButton = document.querySelector('.quick-view-add');
    const modalSaveButton = document.querySelector('.quick-view-save');

    // Add click events to each product card to open the popup
    productCards.forEach(card => {
        // When someone clicks on a product card, do this:
        card.addEventListener('click', function (e) {
            // But only if they didn't click the "add to cart" button
            if (!e.target.classList.contains('add-to-cart')) {
                // Get information from the clicked product card
                const name = this.querySelector('.product-name').textContent;
                const material = this.querySelector('.product-material').textContent;
                const price = this.querySelector('.product-price').textContent;
                const imgSrc = this.querySelector('.product-image img').src;
                const identifier = this.getAttribute('data-category');

                // Put the product information into the popup window
                modalName.textContent = name;
                modalMaterial.textContent = material;
                modalDimensions.textContent = productData[identifier].dimensions;
                modalPrice.textContent = price;
                modalDescription.textContent = productData[identifier].description;
                modalImage.src = imgSrc;
                modalImage.alt = this.querySelector('.product-image img').alt;

                // Show the popup window
                modal.classList.add('active');
                // Stop the page from scrolling while the popup is open
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // When someone clicks the X button, close the popup
    modalClose.addEventListener('click', function () {
        // Hide the popup window
        modal.classList.remove('active');
        // Let the page scroll again
        document.body.style.overflow = '';
    });

    // When someone clicks outside the popup content, close the popup
    modal.addEventListener('click', function (e) {
        // Check if they clicked on the background (not the popup content)
        if (e.target === modal) {
            // Hide the popup window
            modal.classList.remove('active');
            // Let the page scroll again
            document.body.style.overflow = '';
        }
    });

    // ADD TO CART FUNCTIONALITY - Code that handles adding items to shopping cart

    // Find all the "add to cart" buttons on the page
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    // Find the notification area that shows messages to users
    const notification = document.querySelector('.notification');

    // Function that shows a message to the user
    function showNotification(message) {
        // Put the message text in the notification area
        notification.textContent = message;
        // Make the notification visible
        notification.classList.add('show');

        // After 3 seconds (3000 milliseconds), hide the notification
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Add click events to all "add to cart" buttons
    addToCartButtons.forEach(button => {
        // When someone clicks an "add to cart" button, do this:
        button.addEventListener('click', function (e) {
            // Stop the click from also opening the product popup
            e.stopPropagation();
            // Get the name of the product
            const productName = this.closest('.product-details').querySelector('.product-name').textContent;
            // Show a message saying the item was added to cart
            showNotification(`${productName} added to your cart`);
        });
    });

    // When someone clicks "add to cart" in the popup window
    modalAddButton.addEventListener('click', function () {
        // Get the product name from the popup
        const productName = modalName.textContent;
        // Show a message saying the item was added to cart
        showNotification(`${productName} added to your cart`);
        // Close the popup window
        modal.classList.remove('active');
        // Let the page scroll again
        document.body.style.overflow = '';
    });

    // When someone clicks "save for later" in the popup window
    modalSaveButton.addEventListener('click', function () {
        // Get the product name from the popup
        const productName = modalName.textContent;
        // Show a message saying the item was saved
        showNotification(`${productName} saved for later`);
        // Close the popup window
        modal.classList.remove('active');
        // Let the page scroll again
        document.body.style.overflow = '';
    });
});