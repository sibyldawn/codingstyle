module.exports = function(req,res,next){
    const { session } = req

    if(!session.user){
        session.user = {
            bag: {},
            total: 0,
            admin: false
        };
    }
    next();
}