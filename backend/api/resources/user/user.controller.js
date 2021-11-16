import * as argon2 from 'argon2';
import User from './user.models';

const EXISTS = 'EXISTS';
const SUCCESS = 'SUCCESS';
const FAILED = 'FAILED';
const NOT_FOUND = 'NOT_FOUND';

export default {
    async getUser(req, res) {
        await User.findOne({
            email: { $eq: req.query.email }
        }).then(async user => {
            if (user) {
                if (await argon2.verify(user.password,req.query.password)) {
                    return res.send({ message: SUCCESS, data: user });
                }
                else
                {
                    return res.send({ message: NOT_FOUND });
                }
            }
            else {
                return res.send({ message: NOT_FOUND });
            }
        }).catch(err => {
            return res.status(500).send(err);
        });
    }
}