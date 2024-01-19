'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cartId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'carts',
          key: 'id'
        }
      },
      customerID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id'
        }
      },
      paymentMethodID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'payment_methods',
          key: 'id'
        }
      },
      couponID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'coupons',
          key: 'id'
        }
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      totalPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      totalBasePrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      totalTaxPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      saleDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      saleTime: {
        allowNull: false,
        type: Sequelize.TIME
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
    await queryInterface.addIndex('sales', ['cartId'], {
      name: 'sales_cartId_fk'
    })
    await queryInterface.addIndex('sales', ['customerId'], {
      name: 'sales_customerId_fk'
    })
    await queryInterface.addIndex('sales', ['paymentMethodId'], {
      name: 'sales_paymentMethodId_fk'
    })
    await queryInterface.addIndex('sales', ['couponId'], {
      name: 'sales_couponId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales')
  }
}
