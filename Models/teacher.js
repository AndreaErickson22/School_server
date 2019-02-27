let mongoose = require('mongoose')
let Student = require('./student')
let Schema = mongoose.Schema

let teacher = new Schema({
  name: { type: String, required: true },
  school: { type: Schema.Types.ObjectId, ref: "School", required: true },
  classroom: { type: Schema.Types.ObjectId, ref: "Classroom", required: true }

})

teacher.pre("remove", function (next) {
  Student.remove({ teacher: this._id })
    .then(() => next())
    .catch(err => next(err))
})

module.exports = mongoose.model("Teacher", teacher)