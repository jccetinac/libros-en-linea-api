const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, description, image 
    FROM books LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getById(id) {
  const rows = await db.query(
    `SELECT * FROM books
    WHERE id=${id} `
  );
  const data = helper.emptyOrRows(rows);
  return {
    data
  };
}

async function create(book) {
  const result = await db.query(
    `INSERT INTO books
    (id, name, description, image) 
    VALUES (NULL, '${book.name}', '${book.description}', '${book.image}')`
  );
  let message = "Error in creating book";

  if (result.affectedRows) {
    message = "Book created successfully";
  }

  return { message };
}

async function update(id, books) {
  const result = await db.query(
    `UPDATE books
    SET name='${books.name}', description='${books.description}', image='${books.image}' 
    WHERE id=${id}`
  );

  let message = "Error in updating book";

  if (result.affectedRows) {
    message = "Book updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM books WHERE id=${id}`
  );

  let message = "Error in deleting book";

  if (result.affectedRows) {
    message = "Book deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  getById,
  create,
  update,
  remove,
};
