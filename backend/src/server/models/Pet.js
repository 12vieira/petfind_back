const { DataTypes } = require('sequelize');

let PetModel;

function initPetModel(sequelize) {
  if (PetModel) return PetModel;

  PetModel = sequelize.define(
    'Pet',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ageMonths: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mainPhoto: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      additionalPhotos: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'pets',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );

  return PetModel;
}

module.exports = { initPetModel };
