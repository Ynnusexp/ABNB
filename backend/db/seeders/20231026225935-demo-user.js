'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'ssqaurepants@gmail.com',
        username: 'user1',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Spongebob',
        lastName: 'Squarepants'
      },
      {
        email: 'pstar@gmail.com',
        username: 'user2',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Patrick',
        lastName: 'Star'
      },
      {
        email: 'stenticles@gmail.com',
        username: 'user3',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Squidward',
        lastName: 'Tenticles'
      },
      {
        email: 'ekrabs@ymail.com',
        username: 'user4',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Eugene',
        lastName: 'Krabs'
      },
      {
        email: 'scheeks@gmail.com',
        username: 'user5',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Sandy',
        lastName: 'Cheeks'
      },
      {
        email: 'splankton@ymail.com',
        username: 'user6',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Sheldon J',
        lastName: 'Plankton'
      },
      {
        email: 'mpuff@ymail.com',
        username: 'user7',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Mary Jo',
        lastName: 'Puff'
      },
      {
        email: 'pkrabs@gmail.com',
        username: 'user8',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Pearl',
        lastName: 'Krabs'
      },
      {
        email: 'mermaidman@ymail.com',
        username: 'user9',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Mermaid Man',
        lastName: 'no last name'
      },
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['user1', 'user2', 'user3', 'user4','user5','user6','user7','user8','user9'] }
    }, {});
  }
};
