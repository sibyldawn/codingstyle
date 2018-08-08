module.exports = function(req,res,next){
    const { session } = req

    if(!session.user){
        session.user = {
            id: '',
            first_name: '',
            last_name: '',
            picture: '',
            email: '',
            admin: false,
            total: 0,
        };
    }
    next();
}