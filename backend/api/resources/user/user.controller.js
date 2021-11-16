import User from './user.models';

const EXISTS = 'EXISTS';
const SUCCESS = 'SUCCESS';
const FAILED = 'FAILED';
const NOT_FOUND = 'NOT_FOUND';

export default {
    /*
    async addNewUser(req, res) {
        const username = "radu1"
        await collection.findOne(
            {
                username: { $eq: username }
            }
        ).then(async user => {
            if (user) {
                console.log(user)
            }
            else {
                let passwordHash = await argon2.hash(password);
                await collection.insertOne({
                    username: username,
                    password: passwordHash
                }).then(() => resolve(true)).catch(err => reject("Error: " + err));
            }
        })
    },
    */
    async getUser(req, res) {
        const username = "radu";
        await User.findOne({
            username: { $eq: username }
        }).then(user => {
            if (user) {
                try {
                    return res.send({ message: SUCCESS, data: user });
                } catch (err) {
                    // internal failure
                }
            }
            else
            {
                return res.send({ message: NOT_FOUND });
            }
        }).catch(err => {
            // console.log("Database error: " + err);
            return res.status(500).send(err);
        });
    }
}