const book = {
  title: 'Hitchhikers',
  author: 'Some Guy',
};

const bookJSON = JSON.stringify(book);
console.log(bookJSON);

const bookParse = JSON.parse(bookJSON);
console.log(bookParse);
