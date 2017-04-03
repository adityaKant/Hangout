var jwt = require('jwt-simple');
var moment = require('moment');
var bodyParser = require('body-parser');

export function getToken(user)
{
  var expires = moment().add('days', 1).valueOf()
						var token = jwt.encode(
							{
								user: user.userID,
								exp: expires
							},
              'YOUR_SECRET_STRING'
						);
						return token;
}
