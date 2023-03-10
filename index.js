const express = require("express");
const app = express();
const port = 3000;
const Router = require("./routes/booksRoute");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/books", Router);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen((process.env.PORT || 5000), () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
