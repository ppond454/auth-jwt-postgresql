const express = require("express")
const { hashPwd, checkEmail, isValidEmail } = require("../../functions/index")
const { pool } = require("../../models/user.model")
const router = express.Router()
router.post("/signup", async (req, res) => {
  const { email, password } = req.body
  const available = await checkEmail(email)
  if (!available)
    return res.status(400).json({ message: "Email already exists" })
  if (!isValidEmail(email))
    return res.status(400).json({ message: "Email is not valid" })

  try {
    const hash = await hashPwd(password)
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) returning *",
      [email, hash]
    )
    if (result.rowCount === 1)
      return res.status(201).json({ message: "signup success" })
  } catch (error) {
    return res.status(500).json({ message: "something wrong" })
  }
})
module.exports = router
