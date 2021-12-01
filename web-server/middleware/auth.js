const jwt = require ("jsonwebtoken");
const config = require ("config");

// exports.authUser =  async function(req, res, next) {
//   //get the token from the header if present
//   const token = req.headers["x-access-token"] || req.headers["authorization"];
//   console.log(token,"hhhhhhhhhhhhhhhhhhhhhhhhh")

//   //if no token found, return response (without going to the next middelware)
//   if (!token) return res.status(401).send("Access denied, No token provided.");

//   try {
//     const decoded = jwt.verify(token, "mySecret");
//     console.log(decoded,"ddddddddddddddddd")
//     req.user = decoded;
//     next();
//   } catch (error) {
//     //if invalid token
//     res.status(400).send("Invalid token.");
//   }
// };

exports.authUser = async (req,res,next) => {
  try{
    
    var toeken
        const authHeader = req.headers.authorization
        if(typeof(authHeader) == 'undefined'){
          console.log("NOT DEFINED HEADER")
          return 0
        }
        if (authHeader.startsWith("Bearer ")){
          toeken = authHeader.substring(7, authHeader.length);
     } else {
        //Error
        console.log("ERR")
     }
  
const token = toeken
  // decode token
  if (token) {
    // verifies secret and checks exp
  const a =await  jwt.verify(token, "mySecret" ,function(err, decoded) {
        if (err) {
          console.log(err,"++===+++")
            return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
        }

        req.user = decoded;
        console.log(decoded,"+++______++")
    next();
    });
    return a
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
    });
  }
}catch(error){
  console.log(error,"Error at line no. 50 in decode.js")
  return 0;
}
}
