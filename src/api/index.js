const express = require("express")
const {pool} = require("../models/user.model")

const router = express.Router()
router.get("/", (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) return res.status(400).json({ msg: error })
    return res.status(200).json({ result: results.rows })
  })
})

router.get("/searchById", (req, res) => {
  const { id } = req.query
  if (id === undefined)
    return res.status(400).json({ msg: "Please enter all fields" })
  pool.query(`SELECT * FROM users WHERE id =$1`, [id], (error, results) => {
    if (error) return res.status(400).json({ msg: error })
    if (results.rows.length === 0)
      return res.status(400).json({ msg: "User not found" })
    return res.status(200).json({ result: { ...results.rows[0] } })
  })
})

router.delete("/deleteById", (req, res) => {
  const { id } = req.query
  if (id === undefined)
    return res.status(400).json({ msg: "Please enter all fields" })
  pool.query(
    `DELETE FROM users WHERE id =$1 returning *`,
    [id],
    (error, results) => {
      if (error) return res.status(400).json({ msg: error })
      if (results.rowCount === 0)
        return res.status(404).json({ msg: "Not found" })
      return res.status(200).json({ result: "delete success" })
    }
  )
})

router.put("/changePwdById", (req, res) => {
  const { id, pwd } = req.body
  if (id === "" || pwd === "")
    return res.status(400).json({ msg: "Please enter all fields" })
  pool.query(
    `UPDATE users SET pwd =$1 WHERE id =$2 returning *`,
    [pwd, id],
    (error, results) => {
      if (error) return res.status(400).json({ msg: error })
      if (results.rowCount === 0)
        return res.status(404).json({ msg: "Not found" })
      return res.status(200).json({ result: `update success` })
    }
  )
})

router.post("/adduser", (req, res) => {
  const { email, pwd } = req.body
  if (email === "" || pwd === "")
    return res.status(400).json({ msg: "Please enter all fields" })
  pool.query(
    `INSERT INTO users(email, pwd) VALUES($1, $2)`,
    [email, pwd],
    (error, results) => {
      if (error) return res.status(400).json({ msg: error })
      return res.status(200).json({ msg: "success" })
    }
  )
})

router.get("/injection", (req, res) => {
  const { id } = req.body
  if (id === "") return res.status(400).json({ msg: "Please enter all fields" })
  pool.query("SELECT * FROM users WHERE id =$1", [id], (error, results) => {
    if (error) return res.status(400).json({ msg: error })
    if (results.rows.length === 0)
      return res.status(400).json({ msg: "User not found" })
    return res.status(200).json({ result: { ...results.rows[0] } })
  })
})
module.exports = router
