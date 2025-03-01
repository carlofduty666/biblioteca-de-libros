const modal = document.getElementById('modal');
const newBook = document.getElementById('newBook');
const closeButton = document.getElementById('close');

newBook.onclick = function(e) {
    e.preventDefault();
    modal.style.display = "block";
}

closeButton.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function getBooks() {
    document.getElementById('data').innerHTML = "";
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => {
        data.forEach(book => {
            document.getElementById('data').innerHTML += `
            <p>${book.title}</p>
            <img src="/uploads/${book.cover}" alt="${book.title}" width="90" height="90">
            `
        })
    })

}

getBooks();

const addButton = document.getElementById('addButton');
addButton.onclick = function(e) {
    e.preventDefault();
    addBook();
}

function addBook() {
    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('author', document.getElementById('author').value);
    formData.append('genre', document.getElementById('genre').value);
    formData.append('cover', document.getElementById('cover').files[0]);
    formData.append('publish_date', document.getElementById('publish_date').value);

    fetch('http://localhost:3000/books', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        getBooks();
        modal.style.display = "none";
    })
    .catch(error => console.error('Error:', error));
}
