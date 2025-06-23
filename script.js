document.addEventListener('DOMContentLoaded', function () {
    // Product data
    const productData = {
        "cars": {
            description: "Handcrafted from domestic and exotic hardwoods with a clear lacquer finish, this unique car will inspire generations of imaginative play. Please note potential choking hazards for small children.",
            dimensions: "H: 3.5' x L: 7' x W: 7'",
            details: "This heirloom-quality wooden car is a timeless treasure."
        },
        "planes": {
            description: "Soar through imaginative skies with this classic wooden airplane.",
            dimensions: "H: 3.5' x L: 7' x W: 7'",
            details: "Handcrafted from sustainable Baltic birch wood with a safe, natural harvest finish and a spinning propeller."
        },
        "trains": {
            description: "Embark on a charming journey with this beautiful handcrafted wooden train set. Engine and three interchangeable cars boast intricate details made from real beech wood.",
            dimensions: "L: 84cm x H: 11cm x W: 13cm",
            details: "Comes with moving wheels and a fully ecological design."
        },
        "boats": {
            description: "Set sail for bathtub adventures with this adorable wooden boat.",
            dimensions: "W: 10.5' x H: 3.5'",
            details: "Made from solid Maine white pine, this handcrafted toy floats and features rounded edges for safety. Includes two peg 'lobster people.'"
        }
    };

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter products
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Quick view modal functionality
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

    // Open quick view modal when clicking on product card
    productCards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (!e.target.classList.contains('add-to-cart')) {
                const name = this.querySelector('.product-name').textContent;
                const material = this.querySelector('.product-material').textContent;
                const price = this.querySelector('.product-price').textContent;
                const imgSrc = this.querySelector('.product-image img').src;
                const identifier = this.getAttribute('data-category');

                modalName.textContent = name;
                modalMaterial.textContent = material;
                modalDimensions.textContent = productData[identifier].dimensions;
                modalPrice.textContent = price;
                modalDescription.textContent = productData[identifier].description;
                modalImage.src = imgSrc;
                modalImage.alt = this.querySelector('.product-image img').alt;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    modalClose.addEventListener('click', function () {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside content
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const notification = document.querySelector('.notification');

    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const productName = this.closest('.product-details').querySelector('.product-name').textContent;
            showNotification(`${productName} added to your cart`);
        });
    });

    modalAddButton.addEventListener('click', function () {
        const productName = modalName.textContent;
        showNotification(`${productName} added to your cart`);
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modalSaveButton.addEventListener('click', function () {
        const productName = modalName.textContent;
        showNotification(`${productName} saved for later`);
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
});