const Client = require("../model/Client");
const User = require("../model/User");
const Psychologist = require("../model/Psychologist");
const { QueryTypes } = require("sequelize");

module.exports = {
  async createClient(req, res) {
    const { id_user } = req.params;
    const { endereco, flagLat, latitude, flagLong, longitude } = req.body;

    const user = await User.findByPk(id_user);

    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    const client = await Client.create({
      endereco,
      latitude,
      longitude,
      id_user,
    });
    return res.send(client);
  },

  async findPsychologistProfileWithUserName(req, res) {
    const {
      abordagem,
      tipoAtendimento,
      valor,
      genero,
      faixaEtaria,
      tempoSessao,
    } = req.query;

    const profiles = await Psychologist.sequelize.query(
      `SELECT p.id as id, 
					p.tipoAtendimento as tipo, 
					u.nome as nome, 
					u.genero as genero, 
					p.metodologia as metodologia, 
					p.prefFaixaEtaria as faixaEtaria, 
					p.valorConsulta as valor, 
					p.tempoSessao as tempoSessao 
			FROM psychologists p 
			INNER JOIN clients c ON (c.id = p.id_cliente) 
			INNER JOIN users u ON (u.id = c.id_user)
			WHERE u.perfil= 2 
			AND IF('${abordagem}' != '', p.metodologia = '${abordagem}', p.metodologia IS NOT NULL)
			AND IF('${tipoAtendimento}' != '', p.tipoAtendimento = '${tipoAtendimento}', p.tipoAtendimento IS NOT NULL)
			AND IF('${valor}' != '', p.valorConsulta = '${valor}', p.valorConsulta IS NOT NULL)
			AND IF('${genero}' != '', u.genero = '${genero}', u.genero IS NOT NULL)
			AND IF('${faixaEtaria}' != '', p.prefFaixaEtaria = '${faixaEtaria}', p.prefFaixaEtaria IS NOT NULL)
			AND IF('${tempoSessao}' != '', p.tempoSessao = '${tempoSessao}', p.tempoSessao IS NOT NULL);`,
      { type: QueryTypes.SELECT }
    );
    return res.send(profiles);
  },

  async findAllPsychologistClientsFilter(req, res) {
    const {
      abordagem,
      tipoAtendimento,
      valor,
      genero,
      faixaEtaria,
      tempoSessao,
    } = req.query;

    const profiles = await Psychologist.sequelize.query(
      		`SELECT c.* 
			FROM clients c 
			INNER JOIN users u ON (u.id = c.id_user) 
			INNER JOIN psychologists p ON (p.id_cliente = c.id)
			WHERE u.perfil= 2 
			AND IF('${abordagem}' != '', p.metodologia = '${abordagem}', p.metodologia IS NOT NULL)
			AND IF('${tipoAtendimento}' != '', p.tipoAtendimento = '${tipoAtendimento}', p.tipoAtendimento IS NOT NULL)
			AND IF('${valor}' != '', p.valorConsulta = '${valor}', p.valorConsulta IS NOT NULL)
			AND IF('${genero}' != '', u.genero = '${genero}', u.genero IS NOT NULL)
			AND IF('${faixaEtaria}' != '', p.prefFaixaEtaria = '${faixaEtaria}', p.prefFaixaEtaria IS NOT NULL)
			AND IF('${tempoSessao}' != '', p.tempoSessao = '${tempoSessao}', p.tempoSessao IS NOT NULL);`,
      { type: QueryTypes.SELECT }
    );
    return res.send(profiles);
  },
};
