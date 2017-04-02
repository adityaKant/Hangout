var jwt = require('jwt-simple');

console.log(decoded);

export function decode(req,res,next)
{

	var decoded = jwt.decode(token, 'YOUR_SECRET_STRING');
	if (decoded.exp <= Date.now()) {
				res.end('Access token has expired', 400)
	}
	req.userID = decoded.user;
	next();
}
