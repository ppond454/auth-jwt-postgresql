const {config} = require("../configs/db.config")
const Pool = require("pg").Pool
const pool = new Pool({...config})

module.exports = {pool}