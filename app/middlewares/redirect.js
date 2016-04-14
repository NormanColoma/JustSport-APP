/**
 * Created by Norman on 09/04/2016.
 */
exports.isLoggedIn= function(req,res,next){
    var url = req.protocol + "://" + req.hostname + ":" + global.port + "/";
    if(localStorage.getItem('token') !== undefined){
        if(localStorage.getItem('token') === null)
            next();
        else
            res.redirect(url);
    }else{
        next();
    }
}