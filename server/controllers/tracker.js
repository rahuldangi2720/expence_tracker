const Expense = require("../models/tracker");


exports.addexpence = async (req,res)=>{
    try {
        const expence = new Expense({...req.body,userId:req.params.id})
        const tobeaddedexpence = await expence.save()
        res.send({tobeaddedexpence,msg:"data added"})
    } catch (error) {
        console.log(error);
    }
}

exports.getexpence = async (req,res)=>{
    try {
        const expence = await Expense.find({userId:req.params.id})
        res.send({expence,msg:"data get"})
    } catch (error) {
        console.log(error);
    }
}

exports.deleteexpence = async (req,res)=>{
    try {
        const expence = await Expense.findByIdAndDelete(req.params.id)
        res.send({expence,msg:"data delete"})
    } catch (error) {
        console.log(error);
    }
}
