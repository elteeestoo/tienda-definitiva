module.exports = function (sequelize, DataTypes) {
  const LocaleSeoSlugRedirect = sequelize.define('LocaleSeoSlugRedirect', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    localeSeoSlugId: {
      type: DataTypes.INTEGER
    },
    languageAlias: {
      type: DataTypes.STRING
    },
    oldUrl: {
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
  }, {
    sequelize,
    tableName: 'locale_seo_slug_redirects',
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
      }
    ]
  })

  LocaleSeoSlugRedirect.associate = function (models) {

  }

  return LocaleSeoSlugRedirect
}
