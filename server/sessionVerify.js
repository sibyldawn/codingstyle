module.exports = function(req,res,next){
    const { session } = req

    if(!session.user){
        session.user = {
            id: '',
            name: '',
            bag: {},
            total: 0,
            isAdmin: false
        };
    }
    next();
}