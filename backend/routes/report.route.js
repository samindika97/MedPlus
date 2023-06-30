const express = require("express");
const router = express.Router();

// Load Book model
const Report = require("../../models/Reports");

// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test", (req, res) => res.send("book route testing!"));

// @route GET api/books
// @description Get all books
// @access Public
router.get("/", (req, res) => {
  Report.find()
    .then((reports) => res.json(reports))
    .catch((err) =>
      res.status(404).json({ norportsfound: "No Reports found" })
    );
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get("/:id", (req, res) => {
  Report.findById(req.params.id)
    .then((report) => res.json(report))
    .catch((err) => res.status(404).json({ noreportfound: "No Report found" }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post("/", (req, res) => {
  Report.create(req.body)
    .then((report) => res.json({ msg: "Report added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this report" })
    );
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put("/:id", (req, res) => {
  Report.findByIdAndUpdate(req.params.id, req.body)
    .then((report) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete("/:id", (req, res) => {
  Report.findByIdAndRemove(req.params.id, req.body)
    .then((report) => res.json({ mgs: "Report entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a report" }));
});

module.exports = router;
