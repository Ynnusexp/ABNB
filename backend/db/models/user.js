'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Spot, {
        foreignKey: "ownerId",
        onDelete: "CASCADE",
        hooks: true
      })
      User.hasMany(models.Booking, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      })
      User.hasMany(models.Review, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      })
    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
         isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
          isUniq(value) {
            return User.findOne({
              where: {
                username:value
              }
            }).then(name => {
              if(name) throw new Error ("Username must be unique")
            })

          }
        }
      },
      firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [1, 30]
        }
      },
      lastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [1, 30]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true,
          isUniq(value) {
            return User.findOne({
              where: {
                email:value
              }
            }).then(name => {
              if(name) throw new Error ("Email must be unique")
            })

          }
        }

      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      }
    }
  );
  return User;
};
