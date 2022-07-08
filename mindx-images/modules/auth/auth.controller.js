const UserModel = require('./user');
const bcrypt = require('bcryptjs');
const jwebtoken = require('jsonwebtoken')
const HTTPError = require('../../common/httpError')
const validation = require('../auth/auth.validation')
//DANG KI
const register = async (req, res) => {
    try {
        // Bat dau dang ki
        const { username, password } = req.body;

        const existedUser = await UserModel.findOne({ username })
        if (existedUser) {
            throw new HTTPError(400, 'Username duplicate')
        }

        //ma hoa password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await UserModel.create({
            username,
            password: hashPassword
        });

        // send => JSON.stringify({})
        // hydrate document => JSON hoa => bo cac truong ko can thiet trong mongoose
        res.send({
            success: 1,
            data: {
                _id: newUser.id,
                username: newUser.username
            }
        })
    } catch (error) {
        res.status(400).send({ success: 0, message: error.message })
    }

}

// DANG NHAP
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existedUser = await UserModel.findOne({
            username
        });
        if (!existedUser) {
            throw new HTTPError(400, 'Username hoac password khong dung')
        }

        // so sanh voi password da ma hoa
        const matchedPassword = await bcrypt.compare(password, existedUser.password)
        if (!matchedPassword) {
            throw new HTTPError(400, 'Username hoac password khong dung')
        }

        const userId = existedUser._id;
        //token
        //header: dinh danh thuat toan sha256
        //payload: thong tin ma hoa => base64
        //signature: sha256(hder + payload) 
        //=> co 2 key: public, private(chi server biet)

        const token = jwebtoken.sign({
            userId,
        }, process.env.SECRET_KEY, {
            expiresIn: 60 * 60 * 24 * 7
        }
        );

        res.send({
            success: 1,
            data: { username: username, _id: userId, token }
        });
    } catch (error) {
        res.status(400).send({ success: 0, message: error.message })
    }
}


module.exports = {
    register, login
}