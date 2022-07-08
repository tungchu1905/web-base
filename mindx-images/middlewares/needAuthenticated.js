//Dinh danh nguoiwf ddung
// khong phai user => tra luon ket qua
// user = > next()
const jwt = require('jsonwebtoken')
const UserModel = require('../modules/auth/user')
const HTTPError = require('../common/httpError')
async function  needAuthenticated(req, res, next){
    try {
        // TOKEN
        const token = req.headers.authorization;
        // check co token hay khong
        if (!token) {
            throw new HTTPError(500,'Not found Token')
        }

        const jweToken = token.split(' ')[1];

        //check token co thuoc token cua du an hay khong
        // check token co het han hay khong
        // tra ve payload
        const data = jwt.verify(jweToken, process.env.SECRET_KEY)

        const { userId } = data;
        if (!userId) {
            throw new HTTPError(401,'Authorization fail')
        }

        const existedUser = await UserModel.findById(userId);
        if (!existedUser) {
            throw new HTTPError(401,'Authorization fail')
        }

        // nhet them thong tin vao bien request
        // 
        req.user = existedUser;

        next();
    } catch (error) {
        res.status(401).send({success: 0, message: error.message})
    }
}
module.exports = needAuthenticated