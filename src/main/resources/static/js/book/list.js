$(document).ready(function () {
    loadBooks();

    $('#searchButton').click(function () {
        var keyword = $('#searchInput').val();
        searchBooks(keyword);
    });
});

function loadBooks() {
    $.ajax({
        url: 'http://localhost:8080/api/v1/books',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            renderBooks(data);
        }
    });
}

function searchBooks(keyword) {
    $.ajax({
        url: 'http://localhost:8080/api/v1/books/search',
        type: 'GET',
        dataType: 'json',
        data: {
            keyword: keyword
        },
        success: function (data) {
            renderBooks(data);
        }
    });
}

function renderBooks(books) {
    var tableBody = $('#book-table-body');
    tableBody.empty();

    if (books.length === 0) {
        tableBody.append('<tr><td colspan="6">No books found</td></tr>');
    } else {
        $.each(books, function (i, book) {
            var row = '<tr id="book-' + book.id + '">' +
                '<td>' + book.id + '</td>' +
                '<td>' + book.title + '</td>' +
                '<td>' + book.author + '</td>' +
                '<td>' + book.price + '</td>' +
                '<td>' + book.categoryName + '</td>' +
                '<td>';

            if (hasAdminAuthority()) {
                row += '<a href="/books/edit/' + book.id + '" class="text-primary edit-link" data-id="' + book.id + '">Edit</a> | ';
                row += '<a href="/books/' + book.id + '" class="text-danger" onclick="apiDeleteBook(' + book.id + '); return false;">Delete</a>';
            }

            row += '</td>' +
                '</tr>';

            tableBody.append(row);
        });

        // Edit book - Handle click event on "Edit" link
        $('.edit-link').click(function (e) {
            e.preventDefault();
            var bookId = $(this).data('id');
            editBook(bookId);
        });
    }
}

function hasAdminAuthority() {
    // Perform user access rights check
    // Example: Check if the user has admin authority
    var isAdmin = false;

    // Perform actual access rights check logic
    // Example: Check through the current user's data or through another AJAX request

    // Example: If the user has admin authority, set isAdmin to true
    if (currentUser && currentUser.authorities && currentUser.authorities.length > 0) {
        for (var i = 0; i < currentUser.authorities.length; i++) {
            if (currentUser.authorities[i].authority === 'ADMIN') {
                isAdmin = true;
                break;
            }
        }
    }

    return isAdmin;
}

function editBook(bookId) {
    window.location.href = '/books/edit/' + bookId;
}

function apiDeleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        $.ajax({
            url: 'http://localhost:8080/api/v1/books/' + id,
            type: 'DELETE',
            success: function () {
                alert('Book deleted successfully!');
                $('#book-' + id).remove();
            }
        });
    }
}
