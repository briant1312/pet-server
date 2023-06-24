const express = require('express')
const router = express.Router()

const checkToken = require('../../config/checkToken')
const postCtrl = require('../../controllers/api/post')
const ensureLoggedIn = require("../../config/ensureLoggedIn")


router.post('/',checkToken, ensureLoggedIn, postCtrl.create)
router.get('/', postCtrl.index)
router.get('/:id', postCtrl.show)
router.patch('/:id', checkToken, postCtrl.update)
router.delete('/:id', checkToken, ensureLoggedIn, postCtrl.deleteOne)
router.patch('/likes/:id', checkToken, ensureLoggedIn, postCtrl.addLike)
router.patch('/dislikes/:id',checkToken, ensureLoggedIn, postCtrl.addDislike)


module.exports = router
