let Classroom = require('../Models/classroom')
let Teacher = require('../Models/teacher')
let router = require('express').Router()

router.get('', (req, res, next) => {
  Classroom.find({})
    .then(classrooms => res.send(classrooms))
    .catch(err => res.send(err))
})

router.get('/:id', (req, res, next) => {
  Classroom.findById(req.params.id)
    .then(classrooms => res.send(classrooms))
    .catch(err => res.status(400).send(err))
})

router.get('/:id/teachers', (req, res, next) => {
  Teacher.find({ classroom: req.params.id })
    .then(teachers => res.send(teachers))
    .catch(err => res.status(400).send(err))
})
router.post('', (req, res, next) => {
  Classroom.create(req.body)
    .then(classroom => res.send(classroom))
    .catch(err => res.status(400).send(err))
})
router.put("/:id", async (req, res, next) => {
  try {
    let classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(classroom)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.delete("/:id", (req, res, next) => {
  Classroom.findByIdAndDelete(req.params.id)
    .then(() => res.send("great story you killed the classroom"))
    .catch(err => res.status(400).send(err))
})
module.exports = { router }