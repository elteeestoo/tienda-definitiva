module.exports = function (sequelize, DataTypes) {
  const LocaleSeoSlug = sequelize.define('LocaleSeoSlug', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    localeSeoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    languageAlias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Dirección".'
        }
      }
    },
    relParent: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Dirección".'
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Dirección".'
        }
      }
    },
    key: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Dirección".'
        }
      }
    },
    parentSlug: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Dirección".'
        }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    keywords: {
      type: DataTypes.STRING
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
  },
  {
    sequelize,
    tableName: 'locale_seo_slugs',
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
        name: 'locale_seo_slugs_localeSeoId_fk',
        using: 'BTREE',
        fields: [
          { name: 'localeSeoId' }
        ]
      }
    ]
  })

  LocaleSeoSlug.associate = function (models) {
    LocaleSeoSlug.belongsTo(models.LocaleSeo, { as: 'localeSeo', foreignKey: 'localeSeoId' })

    LocaleSeoSlug.hasMany(models.CustomerTracking, { as: 'customerTrackings', foreignKey: 'localeSeoSlugId' })
    LocaleSeoSlug.hasMany(models.MenuItem, { as: 'menuItems', foreignKey: 'localeSeoSlugId' })
    LocaleSeoSlug.hasMany(models.pageTracking, { as: 'pageTrackings', foreignKey: 'localeSeoSlugId' })
  }

  return LocaleSeoSlug
}
