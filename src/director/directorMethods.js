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
    console.log("In Methods with condition: " + condition)
    try {
        return await Director.findOne(condition)
    } catch {
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