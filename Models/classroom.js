let mongoose = require('mongoose')
let Teacher = require('./teacher')
let Schema = mongoose.Schema

let classroom = new Schema({
  name: { type: String, required: true },
  school: { type: Schema.Types.ObjectId, ref: "School", required: true }

})

classroom.pre("remove", function (next) {
  Teacher.remove({ classroom: this._id })
    .then(() => next())
    .catch(err => next(err))
})

module.exports = mongoose.model("Classroom", classroom)