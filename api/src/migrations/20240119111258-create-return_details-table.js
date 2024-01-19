'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('return_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      returnId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'returns',
          key: 'id'
        }
      },
      productID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      localeID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'locales',
          key: 'id'
        }
      },
      priceID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'prices',
          key: 'id'
        }
      },
      priceDiscountID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'price_discounts',
          key: 'id'
        }
      },
      taxID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'taxes',
          key: 'id'
        }
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      basePrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      taxPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
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
    await queryInterface.addIndex('return_details', ['returnId'], {
      name: 'return_details_cartId_fk'
    })
    await queryInterface.addIndex('return_details', ['productId'], {
      name: 'return_details_productId_fk'
    })
    await queryInterface.addIndex('return_details', ['localeId'], {
      name: 'return_details_localeId_fk'
    })
    await queryInterface.addIndex('return_details', ['priceId'], {
      name: 'return_details_priceId_fk'
    })
    await queryInterface.addIndex('return_details', ['priceDiscountId'], {
      name: 'return_details_priceDiscountId_fk'
    })
    await queryInterface.addIndex('return_details', ['taxId'], {
      name: 'return_details_taxId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('return_details')
  }
}
