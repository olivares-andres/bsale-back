const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database.js");

// GET all Product

router.get("/api/products", (req, res) => {
  
  mysqlConnection.query("SELECT * FROM product", (err, rows,) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
  
});

//Query parameters express

router.get("/api/filter", (req, res) => {
    let category = req.query.category;

   mysqlConnection.query("SELECT * FROM product WHERE category in (" +
    "SELECT id FROM category WHERE name LIKE '%"+category+"%')" , (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }

   
  });

})




// GET all category
router.get("/api/category", (req, res) => {
  mysqlConnection.query("SELECT * FROM category", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An Product
router.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT * FROM product WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
