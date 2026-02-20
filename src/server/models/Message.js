const { DataTypes } = require('sequelize');

let MessageModel;

function initMessageModel(sequelize) {
  if (MessageModel) return MessageModel;

  MessageModel = sequelize.define(
    'Message',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      matchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'messages',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: false,
    }
  );

  return MessageModel;
}

module.exports = { initMessageModel };
