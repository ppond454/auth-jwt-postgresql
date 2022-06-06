const express = require("express")
const authentication = require("../../middleware/auth.middleware")

const router = express.Router()

router.get("/protected", authentication, async (req, res) => {
  return res.status(200).json({
    message: "you are logged in",
    authUser: { email: req.email, id: req.id },
  })
})
module.exports = router
