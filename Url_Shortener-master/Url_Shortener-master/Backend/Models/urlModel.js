module.exports = (sequelize, DataTypes) => {
    const Url = sequelize.define('urls', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        url: { type: DataTypes.STRING, allowNull: false },
        alias: { type: DataTypes.STRING, allowNull: false },
        visits: { type: DataTypes.INTEGER, defaultValue: 0 },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)')
        }
    },
        {
            indexes: [
                { unique: true, fields: ['url', 'alias'] },
                {
                    name: 'url_alias_index',
                    method: 'BTREE',
                    fields: ['url', 'alias']
                },
                {
                    name: 'alias_index',
                    method: 'BTREE',
                    fields: ['alias']
                }
            ],
            timestamps: false,
            tableName: 'urls'
        }
    );
    return Url;
};
