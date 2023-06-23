const express = require('express')
const router = express.Router()

const checkToken = require('../../config/checkToken')
const postCtrl = require('../../controllers/api/post')


router.post('/',checkToken, postCtrl.create)
router.get('/', postCtrl.index)
router.get('/:id', postCtrl.show)
router.patch('/:id', checkToken, postCtrl.update)
router.delete('/:id', checkToken, postCtrl.deleteOne)
router.patch('/likes/:id', checkToken ,postCtrl.addLike)
router.patch('/dislikes/:id',checkToken ,postCtrl.addDislike)


module.exports = router