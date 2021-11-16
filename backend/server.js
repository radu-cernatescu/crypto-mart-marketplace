const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const argon2 = require('argon2');

const uri = "mongodb+srv://dbUser:ejmpFQ2aFQzMaJpI@userdb.srfax.mongodb.net/UserDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors())
app.use(express.json());
app.post("/api/user-login", async (req, res) => {
    await client.connect().then(async err => {
        const collection = client.db("users").collection("logins");
        await collection.findOne({
            email: {$eq: req.body.email}
        }).then(async user => {
            if (user) {
                if (await argon2.verify(user.password, req.body.password)) {
                    res.send({message: "SUCCESS", data: user});
                }
                else{
                    res.send({message:"FAILED"})
                }
            }
            else{
                res.send({message:"FAILED"})
            }
        }).catch(err => {
            //console.log(err)
            res.send({message:"FAILED"})
        });
        
    });
    client.close();
});

app.post("/api/sign-up", async (req, res) => {
    await client.connect().then(async err => {
        const collection = client.db("users").collection("logins");
        await collection.findOne({
            email: {$eq: req.body.email}
        }).then(async user => {
            if (user) {
                res.send({message:"EXISTING USER"});
            }
            else{
                const user = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: await argon2.hash(req.body.password)
                }
                await collection.insertOne(user).then(() => {
                    res.send({message: "SUCCESS"});
                }).catch(err => {
                    res.send({message: "FAILED"});
                });
            }
        }).catch(err => {
            //console.log(err)
            res.send({message:"FAILED"});
        });
    });
    client.close();
});

app.listen(process.env.PORT || 8080);
