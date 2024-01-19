'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customer_trackings', {
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
      fingerprint: {
        allowNull: false,
        type: Sequelize.STRING
      },
      localeSeoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'locale_seos',
          key: 'id'
        }
      },
      localeSeoSlugId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'locale_seo_slugs',
          key: 'id'
        }
      },
      path: {
        allowNull: false,
        type: Sequelize.STRING
      },
      eventTime: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      eventName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      event: {
        type: Sequelize.JSON,
        allowNull: false
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
    await queryInterface.addIndex('customer_trackings', ['customerId'], {
      name: 'customer_trackings_customerId_fk'
    })
    await queryInterface.addIndex('customer_trackings', ['localeSeoId'], {
      name: 'customer_trackings_localeSeoId_fk'
    })
    await queryInterface.addIndex('customer_trackings', ['localeSeoSlugId'], {
      name: 'customer_trackings_localeSeoSlugId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('customer_trackings')
  }
}
