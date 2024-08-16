const lib = [];
const libDOM = [];

function Book(title, author, pageNo, haveRead, index) {
	this.title = title;
	this.author = author;
	this.pages = pageNo;
	this.read = haveRead;
	this.index = index;

	// methods

	this.readMsg = () => {
 		return (this.read) ? "Already Read" : "Not Read Yet"
	}

	this.info = () => {
		let msg = "";
		let readMsg = this.readMsg();
		msg += this.title + " by " + this.author;
		msg += ", " + this.pages + " pages, " + readMsg;

		return msg;
	}
}

function addBookToLib(title, author, pageNo, haveRead) {
	let index = lib.length;

	let book = new Book(title, author, pageNo, haveRead, index);
	console.log(book.title);

	lib.push(book);

	addBookToDOM(book);
}

function addBookToDOM(book) {
	const libContainer = document.querySelector(".library-display");
	const bookContainer = getBookContainer();

	fillBookContainer(bookContainer, book);

	libContainer.appendChild(bookContainer);

	libDOM.push(bookContainer);
}

function getBookContainer() {
	const title = document.createElement("div");
	title.classList.add("title");

	const author = document.createElement("div");
	author.classList.add("author");

	const pages = document.createElement("div");
	pages.classList.add("pages");

	const read = document.createElement("div");
	read.classList.add("read");

	const remove = document.createElement("img");

	const removeContainer = document.createElement("div");
	removeContainer.classList.add("remove-container");
	removeContainer.appendChild(remove);

	const container = document.createElement("div");
	container.classList.add("container");
	container.appendChild(pages);
	container.appendChild(read);

	const bottomInfo = document.createElement("div");
	bottomInfo.classList.add("bottom");
	bottomInfo.appendChild(removeContainer);
	bottomInfo.appendChild(container);

	const bookContainer = document.createElement("div");
	bookContainer.classList.add("book-container");

	bookContainer.appendChild(title);
	bookContainer.appendChild(author);
	bookContainer.appendChild(bottomInfo);

	return bookContainer;
}

function fillBookContainer(container, book) {
	container.querySelector(".title").textContent = book.title;
	container.querySelector(".author").textContent = book.author;
	container.querySelector(".pages").textContent = "Pages: " + book.pages;
	container.querySelector(".read").textContent = book.readMsg();

	const deleteButton = container.querySelector("img");
	deleteButton.src = "./img/delete.svg";
	deleteButton.addEventListener("click", () => {
		console.log("removing");
		removeBookFromLib(book);
	})
	
	container.addEventListener("click", () => {
		book.read = !book.read;
		container.querySelector(".read").textContent = book.readMsg();
	});
	
}

function removeBookFromLib(book) {
	for (let i = book.index + 1; i < lib.length; i++) {
		lib[i].index--;
	}

	const library = document.querySelector(".library-display");

	library.removeChild(libDOM[book.index]);
	libDOM.splice(book.index, 1);
	lib.splice(book.index, 1);
}

function initLib() {
	addBookToLib("No Longer Human", "Osamu Dazai", 176, false);

	addBookToLib(
		"Avatar, The Last Airbender", "Bryan Konietzko and Michael Dante DiMartino ",
		96, false
	)

	addBookToLib("Project Hail Mary", "Andy Weir", 492, false);
}





initLib();

const popup = document.querySelector("dialog.add-book");
const form = document.querySelector("form.add-book");
const openButton = document.querySelector(".button-container > button");
const closeButton = document.querySelector("dialog.add-book .close-button");
const library = document.querySelector(".library-display");

openButton.addEventListener("click", () => {
	popup.showModal();
})

closeButton.addEventListener("click", () => {
	popup.close();
})

form.addEventListener("submit", (e) => {
	popup.close();

	// adds book to lib
	e.preventDefault();
	const formData = new FormData(e.target);
	const formProps = Object.fromEntries(formData);
	e.target.reset();
	let hasRead = (formProps.read == "on") ? true : false;
	addBookToLib(
		formProps.title,
		formProps.author,
		Number(formProps.pages),
		hasRead,
	);
})
