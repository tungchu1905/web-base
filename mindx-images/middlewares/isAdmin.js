
const HTTPError = require('../common/httpError')

async function  isAdmin(req, res, next){
    try {
        const senderUser = req.user;

        if(senderUser.role === 'admin'){
            next();
        }
        throw new HTTPError(403,'Only admin can delete posts')
    } catch (error) {
        res.status(403).send({success: 0, message: error.message})
    }
}
module.exports = isAdmin