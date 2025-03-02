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
            document.getElementsByClassName('books')[0].style = "display: flex; flex-wrap: wrap" ;
            document.getElementById('data').innerHTML += `
                <div class="card" style="background-image: url('http://localhost:3000/uploads/${book.cover}')" >
                <h1 class="name">
                    ${book.author}
                </h1>
                <div class="bottom">
                    <div class="flagger">
                        <h4>${book.genre}</h4>	
                    </div>
                    <div class="text">
                        <p>${book.title}</p>
                        <div class="line"></div>
                        <button>${book.publish_date}</button>
                    </div>
                </div>
            </div>
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
