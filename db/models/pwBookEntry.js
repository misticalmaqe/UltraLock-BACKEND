'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PwBookEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PwBookEntry.belongsTo(models.user, { foreignKey: 'userId' });
      PwBookEntry.belongsTo(models.groupAccount, {
        foreignKey: 'groupAccountId',
      });
    }
  }
  PwBookEntry.init(
    {
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      groupAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'groupAccount',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'pwBookEntry',
      timestamps: true,
      underscored: true,
    }
  );

  return PwBookEntry;
};
