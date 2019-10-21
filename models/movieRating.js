const getDB = require('../util/database').getDb;

module.exports = {
    recordRate: (movieID, buttonPressed, userID) => {
        const db = getDB();
        return db
            .collection('userData')
            .updateOne(
                {'_id': userID},
                {$push: {'ratings': {movieID: movieID, type: buttonPressed} } })
            .catch(err => {
                console.log("DB ERROR: " + err);
            });
    },
}