let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let student = new Schema({
  name: { type: String, required: true },
  school: { type: Schema.Types.ObjectId, ref: "School", required: true },
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  classroom: { type: Schema.Types.ObjectId, ref: "Classroom", required: true }

})


module.exports = mongoose.model("Student", student)