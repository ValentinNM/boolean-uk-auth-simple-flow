const express = require("express")

const router = express.Router()

const { getPostsByid, getPosts } = require("./controller")

router.get("/", getPosts)
router.get("/:id", getPostsByid)

module.exports = router;