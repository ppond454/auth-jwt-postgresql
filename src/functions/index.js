const bcrypt = require("bcrypt")
const { pool } = require("../models/user.model")

const checkEmail = async (email) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE email = $1", [email], (err, res) => {
      if (err) return reject(err)
      if (res.rowCount !== 0) return resolve(false)
      return resolve(true)
    })
  })
}

const hashPwd = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      resolve(hash)
    } catch (err) {
      reject(err)
    }
  })
}

const checkPwd = async (password, hash) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await bcrypt.compare(password, hash)
      if (result) return resolve(true)
      return resolve(false)
    } catch (err) {
      reject(err)
    }
  })
}

const isValidEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

module.exports = { checkPwd, checkEmail, hashPwd ,isValidEmail }
