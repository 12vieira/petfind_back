module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'telefone', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'cidade', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'estado', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'foto', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'foto');
    await queryInterface.removeColumn('users', 'estado');
    await queryInterface.removeColumn('users', 'cidade');
    await queryInterface.removeColumn('users', 'telefone');
  },
};
