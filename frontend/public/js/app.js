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
                <div class="card" id="book-card-${book.id}" style="background-image: url('http://localhost:3000/uploads/${book.cover}')" >
                <h1 class="name">
                    ${book.author}
                </h1>
                <div class="bottom">
                    <div class="flagger">
                        <h4>${book.genre}</h4>	
                    </div>
                    <div class="text">
                        <p>${book.title} · ${book.publish_date}</p>
                        <div class="line"></div>
                        <div class="bottom-buttons">
                            <button value="${book.id}" onclick="burnBook(${book.id})" title="Burn book"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-matchstick"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l14 -9" /><path d="M17 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M17 3l3.62 7.29a4.007 4.007 0 0 1 -.764 4.51a4 4 0 0 1 -6.493 -4.464l3.637 -7.336z" /></svg></button>
                            <button value="${book.id}" onclick="modernizeBook(${book.id})" title="Modernize book"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-sparkles"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" /></svg></button>
                        </div>

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

function burnBook(id) {
    fetch(`http://localhost:3000/books/id/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        console.log('The book has been burned:', data);
        getBooks();
    })
    .catch(error => console.error('Error:', error));
}

function modernizeBook(id) {
    // Mostrar el modal
    const modal = document.getElementById('modal');
    modal.style.display = "block";

    // Cambiar el título del formulario
    document.querySelector('#formBook h2').innerText = "Let's modernize this book!";

    // Rellenar los campos del formulario con los datos del libro
    const bookCard = document.getElementById(`book-card-${id}`);
    const title = bookCard.querySelector('.text p').innerText.split(' · ')[0];
    const publishDate = bookCard.querySelector('.text p').innerText.split(' · ')[1];
    const author = bookCard.querySelector('.name').innerText;
    const genre = bookCard.querySelector('.flagger h4').innerText;

    document.getElementById('title').value = title;
    document.getElementById('author').value = author;
    document.getElementById('genre').value = genre;
    document.getElementById('publish_date').value = publishDate;

    // Reemplazar el botón "Add Book" por "Modernize Book"
    const formBook = document.getElementById('formBook');
    let modernizeButton = document.getElementById('modernizeButton');

    // Si ya existe un botón de modernizar, eliminarlo para evitar duplicados
    if (modernizeButton) {
        modernizeButton.remove();
    }

    // Crear un nuevo botón para modernizar
    modernizeButton = document.createElement('button');
    modernizeButton.id = 'modernizeButton';
    modernizeButton.innerText = 'Modernize Book';
    modernizeButton.type = 'button'; // Evitar comportamiento por defecto de envío de formulario

    // Agregar evento al botón para ejecutar la actualización
    modernizeButton.onclick = function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', document.getElementById('title').value);
        formData.append('author', document.getElementById('author').value);
        formData.append('genre', document.getElementById('genre').value);
        
        const coverFile = document.getElementById('cover').files[0];
        if (coverFile) {
            formData.append('cover', coverFile);
        }
    
        formData.append('publish_date', document.getElementById('publish_date').value);
        
        // Asegúrate de incluir el ID del libro
        formData.append('id', id);
    
        fetch(`http://localhost:3000/books/id/${id}`, { // Corrige la URL si es necesario
            method: 'PUT',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log('The book has been modernized:', data);
                getBooks();
                modal.style.display = "none";
            })
            .catch(error => console.error('Error:', error));
    }

    // Reemplazar cualquier botón existente en el formulario por el nuevo botón
    const existingButton = formBook.querySelector('button');
    if (existingButton) {
        existingButton.replaceWith(modernizeButton);
    } else {
        formBook.appendChild(modernizeButton);
    }
}
