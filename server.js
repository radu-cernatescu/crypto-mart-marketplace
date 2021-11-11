const express = require('express');
const { MongoClient } = require('mongodb');
const argon2 = require('argon2');

const uri = "mongodb+srv://dbUser:capstone15@userdb.srfax.mongodb.net/UserDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();

app.use(express.static('dist/Group15'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/Group15'});
});
app.listen(process.env.PORT || 80);

// Returns a Promise that resolves with true if the user has been added successfully,
// rejects with an error message otherwise.
function addNewUser(username, password) {
    return new Promise((resolve, reject) => {
        client.connect(async (err, db) => {
            const collection = client.db("users").collection("logins");
    
            await collection.findOne(
                {
                    username: { $eq: username }
                }
            ).then(async user => {
                if (user) {
                    reject("Username taken");
                }
                else {
                    let passwordHash = await argon2.hash(password);
                    await collection.insertOne({
                        username: username,
                        password: passwordHash
                    }).then(() => resolve(true)).catch(err => reject("Error: " + err));
                }
            })
        });
    });
}
export {addNewUser as addNewUser}

// Returns a Promise that resolves with true if the user is authenticated
// false otherwise. If there is a failure, the Promise will reject with
// an error message.
function loginUser(username, password) {
    return new Promise((resolve, reject) => {   
        client.connect(async (err, db) => {
            const collection = client.db("users").collection("logins");
    
            await collection.findOne(
                {
                    username: { $eq: username }
                }
            ).then(user => {
                if (user) {
                    try {
                        argon2.verify(user.password, password) ? resolve(true) : resolve(false);
                    } catch (err) {
                        // internal failure
                        // console.log("Error verifying password: " + err);
                        reject("Error verifying password: " + err);
                    }
                    // console.log(user);
                }
                else {
                    resolve(false);
                }
            }).catch(err => {
                // console.log("Database error: " + err);
                reject("Database error: " + err);
            });
        });
        client.close();
    });
}
export {loginUser as loginUser}

// DEBUG
//loginUser("radu1", "password").then(ret => console.log(ret ? "Logged in.":"Incorrect username/password."));
//addNewUser("test1", "hehehe").then(ret => console.log(ret ? "Added successfully":"Failed")).catch(err => console.log(err));