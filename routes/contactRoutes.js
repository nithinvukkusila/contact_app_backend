const {
  getContact,
  updateContact,
  deleteContact,
  getContacts,
  createContact,
} = require("../controllers/contactController");
const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
