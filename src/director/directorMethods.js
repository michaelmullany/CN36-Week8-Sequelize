const Director = require("./directorTable");

exports.addDirector = async (directorObj) => {
    try {
        await Director.create(directorObj);
    } catch (error) {
        console.log(error);
    }
}

exports.listDirectors = async () => {
    try {
        return await Director.findAll();
    } catch (error) {
        console.log(error);
    }
}

exports.getDirectorId = async (condition) => {
    try {
        console.log(condition);
        return await Director.findOne(condition)
    } catch (error) {
        console.log(error);
    }
}

exports.updateDirector = async (updateData, condition) => {
    try {
        await Director.update(updateData, condition);
    } catch (error) {
        console.log(error);
    }
}

exports.deleteDirector = async (condition) => {
    try {
        await Director.destroy(condition);
    } catch (error) {
        console.log(error);
    }
}