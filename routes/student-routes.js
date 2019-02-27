
let Students = require('../Models/student')
let router = require('express').Router()

router.get('', (req, res, next) => {
  Students.find({})
    .then(students => res.send(students))
    .catch(err => res.send(err))
})

router.get('/:id', (req, res, next) => {
  Students.findById(req.params.id).populate("teacher")
    .then(student => res.send(student))
    .catch(err => res.status(400).send(err))
})

router.get('/:id/students', (req, res, next) => {
  Students.find({ student: req.params.id })
    .then(students => res.send(students))
    .catch(err => res.status(400).send(err))
})
router.post('', (req, res, next) => {
  Students.create(req.body)
    .then(student => res.send(student))
    .catch(err => res.status(400).send(err))
})
router.put("/:id", async (req, res, next) => {
  try {
    let student = await Students.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(student)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.delete("/:id", (req, res, next) => {
  Students.findByIdAndDelete(req.params.id)
    .then(() => res.send("great story you killed the student"))
    .catch(err => res.status(400).send(err))
})
module.exports = { router }