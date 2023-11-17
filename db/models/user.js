'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.passwordbookEntries, { foreignKey: 'userId' });
      User.belongsToMany(models.groupAccount, { through: 'shared_accounts' });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profilePhoto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
      timestamps: true,
      underscored: true,
    }
  );

  return User;
};
