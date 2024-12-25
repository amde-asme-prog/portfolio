const express = require("express");
const router = express.Router();
const {
  getServices,
  addService,
  updateService,
  deleteService,
} = require("../controllers/servicesController");

router.get("/", getServices);
router.post("/", addService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;
