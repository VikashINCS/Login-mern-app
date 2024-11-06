const { json } = require("body-parser");
const ensureAuthenticated = require("../Middlewares/Auth");

const router = require("express").Router(); // Fixed initialization

router.get("/", ensureAuthenticated, (req, res) => {
  console.log(req.user);
  const product = [
    {
      name: "Ps3",
      price: 50000,
    },
    {
      name: "Ps5",
      price: 54677,
    },
  ];
  res.status(200).json(product);
});

module.exports = router;
