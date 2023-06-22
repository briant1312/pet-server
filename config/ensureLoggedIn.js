function ensureLoggedIn(req, res, next) {
    if (!req.user){
        res.status(401).json('Unathorized')
    } else {
        next()
    }
}

module.exports = ensureLoggedIn