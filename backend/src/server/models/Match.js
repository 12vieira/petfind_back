const { DataTypes } = require('sequelize');

let MatchModel;

function initMatchModel(sequelize) {
  if (MatchModel) return MatchModel;

  MatchModel = sequelize.define(
    'Match',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      petAId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      petBId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
      },
    },
    {
      tableName: 'matches',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );

  return MatchModel;
}

module.exports = { initMatchModel };
