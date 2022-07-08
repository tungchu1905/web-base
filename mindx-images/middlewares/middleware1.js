function middleware1(req, res, next){
    console.log('middlewarel', req.method)
    next();
}

module.exports = middleware1
