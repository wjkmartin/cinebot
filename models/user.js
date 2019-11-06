const getDB = require('../util/database').getDb;
const mongoObjectID = require('mongodb').ObjectID


class User {
    constructor(email) {
        this.email = email;
        this._id = new mongoObjectID.ObjectID();
        console.log(_id)
    }

    save() {}

    static findByID(userId) {
        const db = getDB();
        db.find( {"_id": userId} );
    }
}

module.exports = User;