module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('pets', 'mainPhoto', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('pets', 'additionalPhotos', {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: [],
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('pets', 'additionalPhotos');
    await queryInterface.removeColumn('pets', 'mainPhoto');
  },
};
