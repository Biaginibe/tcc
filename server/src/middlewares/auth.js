const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res
			.status(401)
			.send({ error: 'Não possui token, logue novamente.' });
	}

	const parts = authHeader.split(' ');
	if (!parts.length === 2) {
		return res
			.status(401)
			.send({ error: 'Erro no token, logue novamente.' });
	}

	const [scheme, token] = parts;

	if (!/^Bearer$/i.test(scheme)) {
		return res
			.status(401)
			.send({ error: 'Token mal formatado, logue novamente.' });
	}

	jwt.verify(token, authConfig.secret, (err, decoded) => {
		if (err) {
			return res
				.status(401)
				.send({ error: 'Token invalido, logue novamente.' });
		}

        req.userId = decoded.id;
        
        return next();
	});
};
