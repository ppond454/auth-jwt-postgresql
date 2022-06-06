const app = require("express")()
const cors = require('cors')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
// app.use("/api/", require("./api/index"))
app.use("/", require("./api/signup"))
app.use("/", require("./api/login"))
app.use("/", require("./api/protected"))
app.use("/", require("./api/signout"))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
