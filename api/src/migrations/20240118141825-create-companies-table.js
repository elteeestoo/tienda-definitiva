'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      countryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'countries',
          key: 'id'
        }
      },
      cityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'id'
        }
      },
      dialCodeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'dial_codes',
          key: 'id'
        }
      },
      postalCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fiscalAddress: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      comercialAddress: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      telephone: {
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      web: {
        type: Sequelize.INTEGER
      },
      fiscalName: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      comercialName: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      vat: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('companies')
  }
}
