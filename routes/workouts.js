const express=require("express");
const router=express.Router();
const{updateworkout,deleteworkout,createworkout, getworkout,getworkouts }=require("../controllers/workoutcontroller")
//get all workouts
router.get("/",getworkouts)

//get a single workout
router.get("/:id",getworkout)

//post a new workout
router.post("/",createworkout)



//delete workout
router.delete("/:id",deleteworkout)

//update workout
router.patch("/:id",updateworkout)
module.exports=router;