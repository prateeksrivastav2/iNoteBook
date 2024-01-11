var jwt = require('jsonwebtoken');
const JWT_SECRET = "kalprateek@2692";
const fetchuser=(req,res,next)=>{
    const token= req.header("auth-token");
    if(!token){
        return res.status(401).send({msg:"No Token"});
    }
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        // console.log(decoded)
        req.user=decoded.user;
        next();
        }catch(err){
            return res.status(401).send({msg:"No Token"});
        }

    // next();
}

module.exports=fetchuser;