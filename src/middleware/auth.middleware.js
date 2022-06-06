const jwt = require("jsonwebtoken")

const authentication = async (req, res, next) => {
    const { token } = req.cookies
    if (token === undefined)
      return res.status(401).json({ message: "you are not logged in" })
  
    try {
      const data = jwt.verify(token, "secret")
      req.id = await data.id
      req.email = await data.email
      jwt.sign({ id: req.id, email: req.email }, "secret", { expiresIn: "1m" })
      return next()
    } catch (err) {
      return res.status(401).json({ message: "unauthorized" })
    }
  }

  module.exports = authentication