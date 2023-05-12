import jwt from "jsonwebtoken";

export default function(req,res,next){
    
    const token = req.header("x-auth-token");

    if(!token) return res.status(401).send("Access Denied! (Token Not to be found)");
    try{
        const user = jwt.verify(token, process.env.JWTSECRET);
        req.user = user;
        console.log(req.user);
        next();
    }catch(error){
        res.status(404).send("Invalid Token");
    }

}