var jwt = require('jwt-simple');

export function decode(req,res,next)
{

	var decoded = jwt.decode(req.headers.token, 'YOUR_SECRET_STRING');
	if (decoded.exp <= Date.now()) {
				res.end('Access token has expired', 400)
	}
	req.userID = decoded.user;
	next();
}
