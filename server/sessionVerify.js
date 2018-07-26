// module.exports = function(req,res,next){
//     const { session } = req

//     if(!session.user){
//         session.user = {
//             id: 0,
//             firstname: '',
//             bag: [],
//             total: 0,
//             admin: false
//         };
//     }
//     next();
// }