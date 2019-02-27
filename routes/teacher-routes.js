let Teacher = require('../Models/teacher')
let Student = require('../Models/student')
let router = require('express').Router()

router.get('', (req, res, next) => {
  Teacher.find({})
    .then(teacher => res.send(teacher))
    .catch(err => res.send(err))
})

router.get('/:id', (req, res, next) => {
  Teacher.findById(req.params.id)
    .then(teachers => res.send(teachers))
    .catch(err => res.status(400).send(err))
})

router.get('/:id/students', (req, res, next) => {
  Student.find({ student: req.params.id })
    .then(students => res.send(students))
    .catch(err => res.status(400).send(err))
})
router.post('', (req, res, next) => {
  Teacher.create(req.body)
    .then(teacher => res.send(teacher))
    .catch(err => res.status(400).send(err))
})
router.put("/:id", async (req, res, next) => {
  try {
    let teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(teacher)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.delete("/:id", (req, res, next) => {
  Teacher.findByIdAndDelete(req.params.id)
    .then(() => res.send("great story you killed the teacher"))
    .catch(err => res.status(400).send(err))
})
module.exports = { router }