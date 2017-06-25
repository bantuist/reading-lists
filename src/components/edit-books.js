import base from '../rebase';

export function addBook(newBook, currentList) {
  let bookId = newBook.id;
  let listId = currentList.id;
  // Make sure books isn't empty
  let books = {};
  if (currentList.books) {
    books = currentList.books;
  }
  // Check for duplicate book before adding
  if (books[`${bookId}`]) {
    console.log('Already added');
    return;
  }

  // Add new book
  books[`${bookId}`] = newBook;

  // Update books and bookCount
  currentList.books = books;
  currentList.bookCount++;

  base.post(`${listId}`, {
    data: currentList,
    context: this,
    then: () => {
      console.log('Posted to Firebase');
    }
  });
}

export function removeBook(bookId, currentList) {
  const { books } = currentList;
  const listId = currentList.id

  delete books[`${bookId}`];
  currentList.bookCount--;

  // vs. base.remove
  base.post(`${listId}`, {
    data: currentList,
    context: this,
    then: () => {
      console.log('Removed book');
    }
  });
}

export function updateBook(book, currentList) {
  const bookId = book.id;
  const listId = currentList.id;
  
  if (book.isRead) {
    currentList.books[`${bookId}`].isRead = false;
    currentList.doneCount--;
  } else {
    currentList.books[`${bookId}`].isRead = true;
    currentList.doneCount++;
  }

  base.update(`/${listId}`, {
    data: currentList,
    then(err) {
      if (!err) {
        console.log(`Updated book`);
      }
    }
  });

}