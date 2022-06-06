const jwt = require("jsonwebtoken")
const express = require("express")

const { checkPwd , } = require("../../functions")
const {pool} = require("../../models/user.model")

const router = express.Router()

router.post("/login", async (req, res) => {
  const { email, password } = await req.body
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email =$1`, [
      email,
    ])
    if (result.rowCount === 0)
      return res.status(404).json({ message: "this email is not valid" })

    if ((await checkPwd(password, result.rows[0].password)) === false)
      return res.status(404).json({ message: "username or password is wrong" })

    const token = jwt.sign(
      {
        email: result.rows[0].email,
        id: result.rows[0].id,
      },
      "secret",
      { expiresIn: "1m" }
    )
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 1000,
    })
    return res.status(200).json({ message: "login success", token: token })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})
module.exports = router
