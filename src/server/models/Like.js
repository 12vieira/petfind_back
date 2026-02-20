const { DataTypes } = require('sequelize');

let LikeModel;

function initLikeModel(sequelize) {
  if (LikeModel) return LikeModel;

  LikeModel = sequelize.define(
    'Like',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fromPetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      toPetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'likes',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: false,
    }
  );

  return LikeModel;
}

module.exports = { initLikeModel };
