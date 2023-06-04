const connection = require('../services/db.service');

class User {
    constructor(user) {
        this.firstName = user.firstName,
            this.lastName = user.lastName,
            this.email = user.email,
            this.password = user.password,
            this.active = user.active;
    }
    static getAll(result) {
        let query = "SELECT * FROM users";

        connection.query(query, (err, res) => {
            result(null, res);
        });
    }
}


module.exports = User
