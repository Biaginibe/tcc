const User = require("../model/User");
const { QueryTypes } = require("sequelize");

module.exports = {
  async findAllPatientes(req, res) {
    const Patientes = await User.findAll({
      where: {
        perfil: 3,
      },
    });
    return res.json(Patientes);
  },
  async disable_enableUser(req, res) {
    const { id_user } = req.params;
    const patiente = await User.findOne({
      where: {
        id: id_user,
      },
    });
    //console.log(user.dataValues.ativo)
    if (patiente.dataValues.ativo) {
      await User.update(
        { ativo: false },
        {
          where: {
            id: id_user,
          },
        }
      );
      const change = `Patiente whith id ${id_user} has been successfully disabled`;
      return res.json(change);
    } else {
      await User.update(
        { ativo: true },
        {
          where: {
            id: id_user,
          },
        }
      );
      const change = `Patiente whith id ${id_user} has been successfully actived`;
      return res.json(change);
    }
  },
  async deletePatiente(req, res) {
    const { id_user } = req.params;
    await User.destroy({
      where: {
        id: id_user,
      },
    });
    success = `Patiente whith id ${id_user} has been successfully deleted`;
    return res.json(success);
  },
  async findPacientejoinUsers(req, res) {
    const { id_user } = req.params;
    const patiente = await User.findAll({
      where: {
        id: id_user,
      },
      include: [
        {
          model: Client,
          as: "client",
          include: {
            model: User,
            as: "user",
          },
        },
      ],
    });
    success = `Sucesso`;
    return res.json(patiente);
  },
  async findOnebyIDPatientes(req, res) {
    const { id_user } = req.params;
    const Patientes = await User.findOne({
      where: {
        id: id_user,
      },
    });
    return res.json(Patientes);
  },

  async updatePatientes(req, res) {
    const { id_user } = req.params;
    const { nome, cpf, idade, email, senha } = req.query;
    console.log(nome);
    const updateUser = await User.findOne({
      where: {
        id: id_user,
      },
    });
    // const updateUser = await User.sequelize.query(
    //   `UPDATE users set nome=${nome} cpf=${cpf} idade=${idade} email=${email} senha=${senha} WHERE id=${id_user}`,
    //   { type: QueryTypes.UPDATE }
    // );
     await User.update(
      {
        nome: nome,
        cpf: cpf,
        idade: idade,
        email: email,
        senha: senha,
      },
      {
        where: {
          id: id_user,
        },
      }
    );

    return res.json(updateUser);
  },
};
