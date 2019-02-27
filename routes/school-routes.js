let School = require('../Models/school')
let Classroom = require('../Models/classroom')
let router = require('express').Router()

router.get('', (req, res, next) => {
  School.find({})
    .then(schools => res.send(schools))
    .catch(err => res.send(err))
})

router.get('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(schools => res.send(schools))
    .catch(err => res.status(400).send(err))
})

router.get('/:id/classrooms', (req, res, next) => {
  Classroom.find({ school: req.params.id })
    .then(classrooms => res.send(classrooms))
    .catch(err => res.status(400).send(err))
})
router.post('', (req, res, next) => {
  School.create(req.body)
    .then(school => res.send(school))
    .catch(err => res.status(400).send(err))
})

router.put("/:id", async (req, res, next) => {
  try {
    let school = await School.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(school)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.delete("/:id", (req, res, next) => {
  School.findByIdAndDelete(req.params.id)
    .then(() => res.send("great story you killed the school"))
    .catch(err => res.status(400).send(err))
})
module.exports = { router }