'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('email_errors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id'
        }
      },
      emailId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'emails',
          key: 'id'
        }
      },
      error: {
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
    await queryInterface.addIndex('email_errors', ['customerId'], {
      name: 'sent_emails_customersId_fk'
    })
    await queryInterface.addIndex('email_errors', ['emailId'], {
      name: 'sent_emails_emailsId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('email_errors')
  }
}
