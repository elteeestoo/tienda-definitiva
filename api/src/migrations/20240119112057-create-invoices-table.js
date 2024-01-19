'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id'
        }
      },
      saleID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'locales',
          key: 'id'
        }
      },
      returnID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'returns',
          key: 'id'
        }
      },
      reference: {
        allowNull: false,
        type: Sequelize.STRING
      },
      path: {
        allowNull: false,
        type: Sequelize.TEXT
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
    await queryInterface.addIndex('invoices', ['customerId'], {
      name: 'invoices_customerId_fk'
    })
    await queryInterface.addIndex('invoices', ['saleId'], {
      name: 'invoices_saleId_fk'
    })
    await queryInterface.addIndex('invoices', ['returnId'], {
      name: 'invoices_returnId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('invoices')
  }
}
