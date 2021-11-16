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
    */
    email: {
        type: String
    },
    password: {
        type: String
    }
});

export default mongoose.model('Login', userSchema);