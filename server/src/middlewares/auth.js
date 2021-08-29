const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		console.log(authHeader + ' Não possui token, logue novamente.')
		return res
			.status(401)
			.send({ error: 'Não possui token, logue novamente.' });
	}

	const parts = authHeader.split(' ');
	if (!parts.length === 2) {
		console.log(authHeader + ' Erro no token, logue novamente.')

		return res
			.status(401)
			.send({ error: 'Erro no token, logue novamente.' });
	}

	const [scheme, token] = parts;

	if (!/^Bearer$/i.test(scheme)) {
		console.log(authHeader + ' Token mal formatado, logue novamente.')

		return res
			.status(401)
			.send({ error: 'Token mal formatado, logue novamente.' });
	}

	jwt.verify(token, authConfig.secret, (err, decoded) => {
		if (err) {
		console.log(authHeader + ' Token invalido, logue novamente.')

			return res
				.status(401)
				.send({ error: 'Token invalido, logue novamente.' });
		}

        req.userId = decoded.id;
        
        return next();
	});
};
