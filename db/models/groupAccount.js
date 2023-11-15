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
      GroupAccount.hasMany(models.pwBookEntry);
      GroupAccount.belongsToMany(models.user, {
        through: 'sharedAccount',
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
