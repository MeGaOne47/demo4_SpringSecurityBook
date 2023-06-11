$(document).ready(function() {
    // Initialize form validation
    $('#addBookForm').validate({
        rules: {
            title: {
                required: true,
                maxlength: 50
            },
            author: {
                required: true,
                maxlength: 50
            },
            price: {
                required: true,
                min: 0
            },
            category: {
                required: true,
                maxlength: 50
            }
        },
        messages: {
            title: {
                required: "Title is required",
                maxlength: "Title must be less than 50 characters"
            },
            author: {
                required: "Author is required",
                maxlength: "Author must be less than 50 characters"
            },
            price: {
                required: "Price is required",
                min: "Price must be greater than or equal to 0"
            },
            category: {
                required: "Category is required",
                maxlength: "Category must be less than 50 characters"
            }
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.next('.error-message'));
        }
    });

    // Handle the "Add" button click event
    $('#addBookForm').submit(function(e) {
        e.preventDefault();

        // Check the form's validity
        if ($('#addBookForm').valid()) {
            // Get book information from the form
            var bookTitle = $('#title').val();
            var bookAuthor = $('#author').val();
            var bookPrice = $('#price').val();
            var bookCategory = $('#category').val();

            // Create a new book object
            var newBook = {
                title: bookTitle,
                author: bookAuthor,
                price: bookPrice,
                category: bookCategory
            };

            // Send a POST request to add the book
            $.ajax({
                url: 'http://localhost:8080/api/v1/books',
                type: 'POST',
                dataType: 'text',
                contentType: 'application/json',
                data: JSON.stringify(newBook),
                success: function() {
                    alert('Book added successfully!');
                    window.location.href = '/books'; // Redirect to the book list page
                },
                error: function(xhr) {
                    if (xhr.status === 200) {
                        alert('Book added successfully!');
                        window.location.href = '/books';
                    } else {
                        alert('Error adding book.');
                    }
                }
            });
        }
    });
});
