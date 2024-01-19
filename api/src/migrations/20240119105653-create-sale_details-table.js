'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sale_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      saleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'sales',
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
    await queryInterface.addIndex('sale_details', ['saleId'], {
      name: 'sale_details_saleId_fk'
    })
    await queryInterface.addIndex('sale_details', ['productId'], {
      name: 'sale_details_productId_fk'
    })
    await queryInterface.addIndex('sale_details', ['localeId'], {
      name: 'sale_details_localeId_fk'
    })
    await queryInterface.addIndex('sale_details', ['priceId'], {
      name: 'sale_details_priceId_fk'
    })
    await queryInterface.addIndex('sale_details', ['priceDiscountId'], {
      name: 'sale_details_priceDiscountId_fk'
    })
    await queryInterface.addIndex('sale_details', ['taxId'], {
      name: 'sale_details_taxId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sale_details')
  }
}
