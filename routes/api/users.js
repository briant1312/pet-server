const express = require('express')
const router = express.Router()

const usersCtrl = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const checkToken = require('../../config/checkToken')

router.post('/', usersCtrl.create)
router.post('/login', usersCtrl.logIn)
router.patch('/save-post/:postId', checkToken, ensureLoggedIn, usersCtrl.savePost)
router.get('/saved-resources', checkToken, ensureLoggedIn, usersCtrl.getSavedResources)

router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken)

module.exports = router
