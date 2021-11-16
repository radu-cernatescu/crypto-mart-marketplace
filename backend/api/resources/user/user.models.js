import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    /*
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    */
    username: {
        type: String
    }
});

export default mongoose.model('Login', userSchema);