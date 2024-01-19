'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cart_details', {
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
    await queryInterface.addIndex('cart_details', ['cartId'], {
      name: 'cart_details_cartId_fk'
    })
    await queryInterface.addIndex('cart_details', ['productId'], {
      name: 'cart_details_productId_fk'
    })
    await queryInterface.addIndex('cart_details', ['localeId'], {
      name: 'cart_details_localeId_fk'
    })
    await queryInterface.addIndex('cart_details', ['priceId'], {
      name: 'cart_details_priceId_fk'
    })
    await queryInterface.addIndex('cart_details', ['priceDiscountId'], {
      name: 'cart_details_priceDiscountId_fk'
    })
    await queryInterface.addIndex('cart_details', ['taxId'], {
      name: 'cart_details_taxId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cart_details')
  }
}
