module.exports = function (sequelize, DataTypes) {
  const CartDetail = sequelize.define('CartDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    localeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    priceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    taxId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    priceDiscountId: {
      type: DataTypes.INTEGER
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "productName".'
        }
      }
    },
    basePrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "basePrice".'
        }
      }
    },
    taxPrice: {
      type: DataTypes.DECIMAL(6, 2)
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "quantity".'
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null
      }
    }
  }, {
    sequelize,
    tableName: 'cart_details',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
      {
        name: 'cart_details_cartId_fk',
        using: 'BTREE',
        fields: [
          { name: 'cartId' }
        ]
      },
      {
        name: 'cart_details_productId_fk',
        using: 'BTREE',
        fields: [
          { name: 'productId' }
        ]
      },
      {
        name: 'cart_details_localeId_fk',
        using: 'BTREE',
        fields: [
          { name: 'localeId' }
        ]
      },
      {
        name: 'cart_details_priceId_fk',
        using: 'BTREE',
        fields: [
          { name: 'priceId' }
        ]
      },
      {
        name: 'cart_details_taxId_fk',
        using: 'BTREE',
        fields: [
          { name: 'taxId' }
        ]
      }
    ]
  })

  CartDetail.associate = function (models) {
    CartDetail.belongsTo(models.Cart, { as: 'cart', foreignKey: 'cartId' })
    CartDetail.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' })
    CartDetail.belongsTo(models.Locale, { as: 'locale', foreignKey: 'localeId' })
    CartDetail.belongsTo(models.Price, { as: 'price', foreignKey: 'priceId' })
    CartDetail.belongsTo(models.PriceDiscount, { as: 'priceDiscount', foreignKey: 'priceDiscountId' })
    CartDetail.belongsTo(models.Tax, { as: 'tax', foreignKey: 'taxId' })
  }

  return CartDetail
}