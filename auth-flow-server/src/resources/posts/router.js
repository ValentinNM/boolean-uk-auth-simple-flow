const express = require("express")

const router = express.Router()

const { getPosts, oneUserPosts } = require("./controller")

// router.get("/", getPosts)

router.get("/", oneUserPosts)
// router.get("/:id",oneUserPosts)

module.exports = router;