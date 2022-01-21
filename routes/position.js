const express = require('express')
const controller = require('../controllers/position')
const passport = require("passport");
const router = express.Router()


router.get('/:categoryId',passport.authenticate('jwt', {sesson: false}) ,controller.getByCategoryId)
router.post('/',passport.authenticate('jwt', {sesson: false}) ,controller.create)
router.patch('/:id',passport.authenticate('jwt', {sesson: false}) , controller.update)
router.delete('/:id', passport.authenticate('jwt', {sesson: false}), controller.remove)

module.exports = router