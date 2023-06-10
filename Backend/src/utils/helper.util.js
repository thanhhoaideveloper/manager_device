const jwt = require('jsonwebtoken')
const promisify = require('util').promisify;

const verify = promisify(jwt.verify).bind(jwt);
const sign = promisify(jwt.sign).bind(jwt);

async function verifyToken(token, secretKey){
  try{
    return await verify(token, secretKey)
  }catch(error){
    return null
  }
}

async function generateToken(payload, secretSingature, tokenLife){
  return sign(
    { payload },
    secretSingature,
    {
      algorithm: "HS256",
      expiresIn: tokenLife
    }
  )
}


module.exports = {
  verifyToken,
  generateToken
}
