const jwt = require('jsonwebtoken')
const promisify = require('util').promisify;

const verify = promisify(jwt.verify).bind(jwt);
const sign = promisify(jwt.sign).bind(jwt);

async function verifyToken(token, secretKey){
	try {
		return await verify(token, secretKey);
	} catch (error) {
		console.log(error);
    return null
  }
}

async function generateToken(payload, secretSignature, tokenLife){
  return sign(
    { payload, },
    secretSignature,
    {
      algorithm: "HS256",
      expiresIn: tokenLife,
    }
  )
}

async function filterInArray(arr1, arr2) {
	return arr1.filter((e) => arr2.includes(e));
}
async function filterOutArray(arr1, arr2)
{
	return arr1.filter((e) => arr2.indexOf(e) === -1);
}

module.exports = {
  verifyToken,
	generateToken,
	filterInArray,
	filterOutArray
}
