module.exports = {
    getSession: (req,res) => {
        console.log('-------req.session.user', req.session.user);
        res.status(200).json(req.session.user({
            auth0id: req.session.user.id,
            first_name:req.session.user.given_name,
            last_name:req.session.user.family_name,
            picture: req.session.user.picture,
            email: req.session.user.email
        }));
    }
}

