const artSearch = document.getElementById("artSearch");
const categoryFilter = document.getElementById("categoryFilter");
const galleryCards = document.querySelectorAll(".gallery-card");
const noResults = document.getElementById("noResults");

function filterGallery() {
    if (!artSearch || !categoryFilter) {
        return;
    }

    const searchValue = artSearch.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    let visibleCount = 0;

    galleryCards.forEach((card) => {
        const cardText = card.dataset.title.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesSearch = cardText.includes(searchValue);
        const matchesCategory =
            selectedCategory === "all" ||
            cardCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    if (noResults) {
        noResults.style.display = visibleCount === 0 ? "block" : "none";
    }
}

if (artSearch && categoryFilter) {
    artSearch.addEventListener("input", filterGallery);
    categoryFilter.addEventListener("change", filterGallery);
}const eventButtons = document.querySelectorAll(".event-details-btn");
const eventModal = document.getElementById("eventModal");
const eventModalText = document.getElementById("eventModalText");
const closeEventModal = document.getElementById("closeEventModal");

eventButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (!eventModal || !eventModalText) {
            return;
        }

        eventModalText.textContent = button.dataset.details;
        eventModal.classList.add("show");
    });
});

if (closeEventModal && eventModal) {
    closeEventModal.addEventListener("click", () => {
        eventModal.classList.remove("show");
    });

    eventModal.addEventListener("click", (event) => {
        if (event.target === eventModal) {
            eventModal.classList.remove("show");
        }
    });
}const artSubmissionForm = document.getElementById("artSubmissionForm");

if (artSubmissionForm) {
    artSubmissionForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const artistName = document.getElementById("artistName");
        const artistEmail = document.getElementById("artistEmail");
        const artworkTitle = document.getElementById("artworkTitle");
        const artworkCategory = document.getElementById("artworkCategory");
        const artworkPrice = document.getElementById("artworkPrice");
        const artworkDescription = document.getElementById("artworkDescription");
        const formSuccess = document.getElementById("formSuccess");

        const fields = [
            artistName,
            artistEmail,
            artworkTitle,
            artworkCategory,
            artworkPrice,
            artworkDescription
        ];

        fields.forEach((field) => {
            field.classList.remove("input-error");
        });

        document.querySelectorAll(".error-message").forEach((message) => {
            message.textContent = "";
        });

        if (formSuccess) {
            formSuccess.classList.remove("show");
        }

        let isValid = true;

        if (artistName.value.trim() === "") {
            showFieldError(artistName, "artistNameError", "Artist name is required.");
            isValid = false;
        }

        if (artistEmail.value.trim() === "") {
            showFieldError(artistEmail, "artistEmailError", "Email address is required.");
            isValid = false;
        } else if (!isValidEmail(artistEmail.value.trim())) {
            showFieldError(artistEmail, "artistEmailError", "Enter a valid email address.");
            isValid = false;
        }

        if (artworkTitle.value.trim() === "") {
            showFieldError(artworkTitle, "artworkTitleError", "Artwork title is required.");
            isValid = false;
        }

        if (artworkCategory.value === "") {
            showFieldError(
                artworkCategory,
                "artworkCategoryError",
                "Select an artwork category."
            );
            isValid = false;
        }

        if (artworkPrice.value.trim() === "") {
            showFieldError(artworkPrice, "artworkPriceError", "Price is required.");
            isValid = false;
        } else if (Number(artworkPrice.value) < 0) {
            showFieldError(
                artworkPrice,
                "artworkPriceError",
                "Price cannot be negative."
            );
            isValid = false;
        }

        if (artworkDescription.value.trim() === "") {
            showFieldError(
                artworkDescription,
                "artworkDescriptionError",
                "Artwork description is required."
            );
            isValid = false;
        }

        if (isValid) {
            artSubmissionForm.reset();

            if (formSuccess) {
                formSuccess.classList.add("show");
            }
        }
    });
}

function showFieldError(field, errorId, message) {
    field.classList.add("input-error");

    const errorElement = document.getElementById(errorId);

    if (errorElement) {
        errorElement.textContent = message;
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {

    question.addEventListener("click", () => {

        const answer = question.nextElementSibling;

        answer.classList.toggle("show");

    });

});