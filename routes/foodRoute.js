const express = require("express");
const { foodModel } = require("../models/foodModel");
const { authorization } = require("../middleware/authMiddleware");

const foodRouter= express.Router();
 
foodRouter.get('/',  async (req, res)=> {
    try {
      const foods = await foodModel.find();
      res.send(foods);
    } catch (error) {
        res.send(404).send({ message: error.message });
    }
});

foodRouter.post('/addnew' ,  async (req, res)=> {
    try {
      const food = new foodModel(req.body)
      await food.save()
      res.status(200).send({ "message" : "new Food created Successfully !"});

    } catch (error) {
        res.send(404).send({ message: error.message });
    }
});


foodRouter.delete("/delete/:id",  async (req, res)=> {
    const id = req.params.id
    try {
        const foods = await foodModel.findOne({_id : id });
         if(foods){
             await foodModel.deleteOne({_id : id});
             res.status(200).send({ "message" : "Food deleted Successfully !"});
         }else{
             res.status(404).send({ "message" : "Food not found !"});
         }
   
    } catch (error) {
        res.send(404).send({"message" : "Food not found !"});       
    }
})

foodRouter.patch("/update/:id", async (req, res)=> {
    const id = req.params.id
    try {
        const foods = await foodModel.findOne({_id : id });
        if(foods){
            await foodModel.updateOne({_id : id}, req.body);
            res.status(200).send({ "message" : "Food Updated Successfully !"});
        }else{
            res.status(404).send({ "message" : "Food not found !"});
        }
    } catch (error) {
        res.send(404).send({"message" : "Food not found !"});
    }
})

module.exports = {
    foodRouter
}