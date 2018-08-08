module.exports = {
    getSession: (req,res) => {
        console.log('-------req.session.user', req.session.user);

        res.status(200).json(req.session.user);
    }
}

