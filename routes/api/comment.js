const express = require('express')
const router = express.Router()

const checkToken = require('../../config/checkToken')
const commentCtrl = require('../../controllers/api/comment')
const ensureLoggedIn = require("../../config/ensureLoggedIn")


router.post('/:id', checkToken, ensureLoggedIn, commentCtrl.create)
router.delete('/:id', checkToken, commentCtrl.deleteOne)
router.patch('/:id', checkToken, commentCtrl.update)
router.patch('/likes/:id', checkToken, ensureLoggedIn, commentCtrl.addLike)
router.patch('/dislikes/:id', checkToken, ensureLoggedIn, commentCtrl.addDislike)


module.exports = router
