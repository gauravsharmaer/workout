const Workout = require("../models/workoutmodels.js");
const mongoose = require("mongoose");


//get all workouts//
const getworkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};



//get a single workout//
const getworkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};


//create new workout//
const createworkout = async (req, res) => {
  const { title, load, reps } = req.body;


let emptyFields=[]
if(!title){
  emptyFields.push("title")
}

if(!load){
  emptyFields.push("load")
}

if(!reps){
  emptyFields.push("reps")
}

if(emptyFields.length>0){
  return res.status(400).json({error:"please fill all fields", emptyFields})
}


//add data to db//
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: "SOMETHING WENT WRONG" });
  }
};













//delete a workout//
const deleteworkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  const workout = await Workout.findOneAndDelete({_id:id});
  if (!workout) {
    return res.status(404).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};


//update a workout//
const updateworkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    return res.status(404).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};

module.exports={updateworkout,deleteworkout,createworkout, getworkout,getworkouts }