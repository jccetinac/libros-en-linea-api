const express = require("express");
const router = express.Router();
const books = require("../services/booksService");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await books.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting book `, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    res.json(await books.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting book by id `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post("/", async function (req, res, next) {
  try {
    res.json(await books.create(req.body));
  } catch (err) {
    console.error(`Error while creating book`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await books.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating book`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await books.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting book`, err.message);
    next(err);
  }
});

module.exports = router;
