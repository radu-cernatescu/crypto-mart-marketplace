import User from './user.models';

const EXISTS = 'EXISTS';
const SUCCESS = 'SUCCESS';
const FAILED = 'FAILED';
const NOT_FOUND = 'NOT_FOUND';

export default {
    async getUser(req, res) {
        await User.findOne({
            username: { $eq: req.query.username }
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