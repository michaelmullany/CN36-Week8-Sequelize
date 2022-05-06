const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Movie = sequelize.define("Movie", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    year: {
        type: DataTypes.INTEGER,
    },
    rating: {
        type: DataTypes.INTEGER,
    }
});

module.exports = Movie;