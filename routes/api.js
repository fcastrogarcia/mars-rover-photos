const express = require("express");
const router = express.Router();
const { apiCall } = require("../controllers/api");

router.get("/api/:sol&:camera", apiCall);

module.exports = router;
