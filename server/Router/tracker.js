const express = require("express")
const { getexpence, addexpence, deleteexpence } = require("../controllers/tracker")
const expenceRouter = express.Router()

expenceRouter.get("/getexpence/:id",getexpence)
expenceRouter.post("/addexpence/:id",addexpence)
expenceRouter.delete("/deleteexpence/:id",deleteexpence)



module.exports = expenceRouter