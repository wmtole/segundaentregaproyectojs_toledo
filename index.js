const booksList = document.querySelector('.js-books');
const addButtons = booksList.querySelectorAll('button');
const cart = document.querySelector('.js-cart');


function addBookToCart(event) {
    const bookName = event.target.previousElementSibling.innerText;
    const book = {
        id: event.target.getAttribute('data-id'),
        quantity: 1,
        title: bookName,
    };
    const savedBook = setLocalStorageItem(book);
    renderCart(savedBook);
}

function removeBook(book) {
    const storageBooks = localStorage.getItem('books');
    parsedBooks = JSON.parse(storageBooks);
    const index = parsedBooks.findIndex((parsedBook) => parsedBook.id === book.id);
    parsedBooks.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(parsedBooks));
}

function setLocalStorageItem(book) {
    const books = localStorage.getItem('books');
    if (books) {
        parsedBooks = JSON.parse(books);

        const storedBookIndex = parsedBooks.findIndex((parsedBook) => parsedBook.id === book.id);
        if (storedBookIndex > -1) {
            parsedBooks[storedBookIndex].quantity += 1;
            localStorage.setItem('books', JSON.stringify(parsedBooks));
            return parsedBooks[storedBookIndex];
        } else {
            parsedBooks.push(book)
            localStorage.setItem('books', JSON.stringify(parsedBooks));
            return book;
        }
    } else {
        const bookList = [];
        bookList.push(book);
        localStorage.setItem('books', JSON.stringify(bookList));
        return book;
    }
}


function renderCart(book) {
    console.log('book', book)
    const existingLi = document.getElementById(book.id);
    if (existingLi) {
        existingLi.firstElementChild.innerText = book.title + ': ' + book.quantity;
    } else {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.innerText = book.title + ': ' + book.quantity;
        li.append(span);
        li.id = book.id;
        
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Borrar';
        
        li.append(removeButton);
        
        cart.append(li);

        removeButton.addEventListener('click', function() {
            removeBook(book);
            li.remove();
        })
    }
}


const storageBooks = localStorage.getItem('books');

if (storageBooks) {
    const listOfBooks = JSON.parse(storageBooks);
    for (const book of listOfBooks) {
        renderCart(book);
    };
}

for (const button of addButtons) {
    button.addEventListener('click', addBookToCart)
}


