$(document).ready(function() {
    // Handle click event on "Update" button
    $('#editBookForm').submit(function(e) {
        e.preventDefault();

        // Get book information from the form
        var bookId = $(this).attr('action').split('/').pop();
        var bookTitle = $('#title').val();
        var bookAuthor = $('#author').val();
        var bookPrice = $('#price').val();
        var bookCategory = $('#category').val();

        // Create a new book object
        var updatedBook = {
            title: bookTitle,
            author: bookAuthor,
            price: bookPrice,
            category: bookCategory
        };

        // Send a PUT request to update the book
        $.ajax({
            url: 'http://localhost:8080/api/v1/books/' + bookId,
            type: 'PUT',
            dataType: 'text',
            contentType: 'application/json',
            data: JSON.stringify(updatedBook)
        })
            .then(function() {
                alert('Book updated successfully!');
                window.location.href = '/books'; // Redirect to the book list page
            })
            .catch(function(xhr) {
                if(xhr.status === 200)
                {
                    alert('Book updated successfully!');
                    window.location.href = '/books';
                }
            });
    });
});
