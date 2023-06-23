const express = require('express')
const router = express.Router()

const checkToken = require('../../config/checkToken')
const postCtrl = require('../../controllers/api/post')


router.post('/', postCtrl.create)
router.get('/', postCtrl.index)
router.get('/:id', postCtrl.show)
router.patch('/:id', postCtrl.update)
router.delete('/:id', postCtrl.deleteOne)
router.patch('/likes/:id', checkToken ,postCtrl.addLike)
router.patch('/dislikes/:id',checkToken ,postCtrl.addDislike)


module.exports = router