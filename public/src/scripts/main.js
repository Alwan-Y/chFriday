    const getBook = () => {
        const xhr = new XMLHttpRequest();
            
        xhr.onload = function() {
            const responseJson = JSON.parse(this.responseText);
            if(responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                renderAllBooks(responseJson.data);
            }
        }
    
        xhr.onerror = function() {
            showResponseMessage();
        }
    
        xhr.open("GET", "http://localhost:5000/apis/posts");
        xhr.send();
    };


    const insertBook = (book) => {
        const xhr = new XMLHttpRequest();
    
        xhr.onload = function() {
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            getBook();
        }
    
        xhr.onerror = function() {
            showResponseMessage();
        }
    
        xhr.open("POST", "http://localhost:5000/apis/posts");
            
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.send(JSON.stringify(book));
    };

    const updateBook = (book) => {
        const xhr = new XMLHttpRequest();
        console.log(`${book.id}`)
        xhr.onload = function() {
        const responseJson = JSON.parse(this.responseText);
        showResponseMessage(responseJson.message);
        getBook();
        }
    
        xhr.onerror = function() {
            showResponseMessage();
        }
    
        xhr.open("PUT", `http://localhost:5000/apis/posts/${book.id}`);
            
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.send(JSON.stringify(book));
    };

    const removeBook = (bookId) => {
        const xhr = new XMLHttpRequest();
        console.log(`${bookId}`)
    
        xhr.onload = function() {
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            getBook();
        }
    
        xhr.onerror = function() {
            showResponseMessage();
        }
    
        xhr.open("DELETE", `http://localhost:5000/apis/posts/${bookId}`);
    
        xhr.send();
    };


    const renderAllBooks = (books) => {
        const listBookElement = document.querySelector("#listBook");
        listBookElement.innerHTML = "";

        books.forEach(book => {
            listBookElement.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-body">
                            <h5>(${book.id}) ${book.title}</h5>
                            <p>${book.author}</p>
                            <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
                        </div>
                    </div>
                </div>
            `;
        });

        const buttons = document.querySelectorAll(".button-delete");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const bookId = event.target.id;
                removeBook(bookId);
            })
        })
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };



        const inputBookId = document.querySelector("#inputBookId");
        const inputBookTitle = document.querySelector("#inputBookTitle");
        const inputBookAuthor = document.querySelector("#inputBookAuthor");
        const buttonSave = document.querySelector("#buttonSave");
        const buttonUpdate = document.querySelector("#buttonUpdate");

        buttonSave.addEventListener("click", function () {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };
            insertBook(book)
        });

        buttonUpdate.addEventListener("click", function () {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };

            updateBook(book)
        });
        getBook();

