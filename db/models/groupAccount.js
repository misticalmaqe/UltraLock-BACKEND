'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GroupAccount.hasMany(models.passwordbookEntries, {
        foreignKey: 'groupAccountId',
      });
      GroupAccount.belongsToMany(models.user, {
        through: 'shared_accounts',
      });
    }
  }
  GroupAccount.init(
    {
      groupName: DataTypes.STRING,
      privateShared: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'groupAccount',
      timestamps: true,
      underscored: true,
    }
  );

  return GroupAccount;
};
