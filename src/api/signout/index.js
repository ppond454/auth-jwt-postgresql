const express = require("express")

const router = express.Router()

router.delete("/signout", async (req, res) => {
  const { token } = req.cookies
  if (token === undefined)
    return res.status(401).json({ message: "you are not logged in" })
  try {
    return res
      .clearCookie("token")
      .status(200)
      .json({ message: "you are logged out" })
  } catch (err) {
    return res.status(500).json({ message: "something wrong" })
  }
})
module.exports = router
