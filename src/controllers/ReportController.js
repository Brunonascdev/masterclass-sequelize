const { Op } = require("sequelize");
const User = require("../models/User");

module.exports = {
  async show(req, res) {
    // return res.json({ report: true });

    const users = await User.findAll({
      attributes: ["name", "email"],
      where: {
        email: {
          [Op.iLike]: "%@gmail.com",
        },
      },
      include: [
        { association: "addresses", where: { street: "Rua Outra" } }, //enderecos
        {
          association: "techs",
          required: false,
          where: {
            name: {
              [Op.iLike]: "React%",
            },
          },
        }, //techs
      ],
    });

    return res.json(users);
  },
};
