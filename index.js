const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
const path = require("path");
let db = null;
const dbPath = path.join(__dirname, "goodreads.db");

const initializeDBandServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server started succesfully..");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBandServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
        SELECT * 
        FROM books
        ORDER BY book_id
    `;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
