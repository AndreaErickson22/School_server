let mongoose = require('mongoose')
let Classroom = require('./classroom')
let Schema = mongoose.Schema

let school = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true }

})

school.pre("remove", function (next) {
  Classroom.remove({ school: this._id })
    .then(() => next())
    .catch(err => next(err))
})

module.exports = mongoose.model("School", school)