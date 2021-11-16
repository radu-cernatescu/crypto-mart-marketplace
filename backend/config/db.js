import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export default {
    async connect() {
        await mongoose.connect('mongodb+srv://dbUser:capstone15@userdb.srfax.mongodb.net/UserDB?retryWrites=true&w=majority', { useNewUrlParser: true, dbName: 'users' }).then(
            ret => {
                //console.log("Connected to DB");
            }
        ).catch(err => {
            //console.log(err);
        });
    }
}