const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const argon2 = require('argon2');
const bodyParser = require('body-parser');

const uri = "mongodb+srv://dbUser:ejmpFQ2aFQzMaJpI@userdb.srfax.mongodb.net/UserDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

/* Initialize Express backend */
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* USERS */

/*
*/
app.post("/api/user-login", async (req, res) => {
    await client.connect().then(async () => {
        const collection = client.db("users").collection("logins");
        await collection.findOne({
            email: {$eq: req.body.email}
        }).then(async user => {
            if (user) {
                if (await argon2.verify(user.password, req.body.password)) {
                    res.send({message: "SUCCESS", data: user});
                }
                else{
                    res.send({message:"FAILED"});
                }
            }
            else{
                res.send({message:"FAILED"});
            }
        }).catch(err => {
            res.send({message:"FAILED"});
        });
        
    }).catch(err => {/*console.log(err)*/});
    client.close();
});

/*
*/
app.post("/api/sign-up", async (req, res) => {
    await client.connect().then(async () => {
        const collection = client.db("users").collection("logins");
        await collection.findOne({
            email: {$eq: req.body.email}
        }).then(async user => {
            if (user) {
                res.send({message:"EXISTING USER"});
            }
            else {
                const user = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: await argon2.hash(req.body.password),
                    type: req.body.type,
                    isBlock: req.body.isBlock
                }
                await collection.insertOne(user).then(() => {
                    res.send({message: "SUCCESS"});
                }).catch(err => {
                    res.send({message: "FAILED"});
                });
            }
        }).catch(() => {
            res.send({message:"FAILED"});
        });
    }).catch(err => {/*console.log(err)*/});
    client.close();
});

/* Gets all valid invite codes from backend. This way we can quickly invalidate codes.
*/
app.get("/api/invitecodes/", async (req, res) =>{
    await client.connect().then(async () => {
        const collection = client.db("users").collection("invite_codes");

        let codes = await collection.find().toArray();
        res.send({message: "SUCCESS", codes: codes});

    }).catch(err => {/*console.log(err)*/});
    client.close();
});

/* TO DO - Adding & Removing Invite codes */


/* ITEMS/LISTINGS */

/*
*/
app.get("/api/items", async (req, res) => {
    await client.connect().then(async () => {
        const collection = client.db("users").collection("items");
        
        const items = await collection.find().toArray();
        if (items) {
            res.send({ message: "SUCCESS", data: items });
        }
        else {
            res.send({ message: "FAILED" });
        }
        
    }).catch(err => {/*console.log(err)*/});
    client.close();
});

/** API  to block/unblock user by admin  */
app.post("/api/block-user", async (req, res) => {
    await client.connect().then(async () => {
        const collection = client.db("users").collection("logins");
        let myquery = { email: req.body.user.email };
        let newvalues = { $set: {firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
            email: req.body.user.email,
            password: req.body.user.password,
            isBlock: !req.body.user.isBlock } };

        await collection.updateOne(myquery, newvalues).then(() => {
                res.send({message: "SUCCESS"});
            }).catch(err => {
                res.send({message: "FAILED"});
            });
        }).catch(() => {
        res.send({message:"FAILED"});
    }).catch(err => {/*console.log(err)*/});
    client.close();        
});

/** All Users */
/** API  to get all users by admin  */
app.get("/api/allusers", async (req, res) => {
    await client.connect().then(async () => {
        const collection = client.db("users").collection("logins");
        const users = await collection.find().toArray();
        if (users) {
            res.send({ message: "SUCCESS", data: users });
        }
        else {
            res.send({ message: "FAILED" });
        }
        
    }).catch(err => {/*console.log(err)*/});
    client.close();
});

/** users Items with selected user */ 
app.post("/api/user/items", async (req, res) => {
    await client.connect().then(async () => {
        const collection = client.db("users").collection("items");
        const collection2 = client.db("users").collection("logins");
        const users = await collection2.findOne({
            email: {$eq: req.body.userId}
        })
        const items = await collection.find().toArray();
        // const cc = items.filter(x => x.userId == users._id)
        if (items) {
            res.send({ message: "SUCCESS", data: items , user : users });
        }
        else {
            res.send({ message: "FAILED" });
        }
        
    }).catch(err => {/*console.log(err)*/});
    client.close();
});
/** API  to delete user by admin  */
app.post("/api/remove-user", async (req, res) => {
    let user = req.body.user;
    if (user) {
        let myQuery = {  email: user.email };
        await client.connect().then(async () => {
            const collection = client.db("users").collection("logins");
            
            await collection.deleteOne(myQuery).then(() => {
                res.send({ message: "SUCCESS" });
            }).catch((err) => { res.send({ message: "FAILED", reason: err}); });
        })
    }
});

/*
*/
app.get("/api/item", async (req, res) => {
    await client.connect().then(async () => {
        const collection = client.db("users").collection("items");
        
        const item = await collection.findOne({
            title: {$eq: req.query.title}
        });
        if (item) {
            res.send({ message: "SUCCESS", data: item });
        }
        else {
            res.send({ message: "FAILED" });
        }
    }).catch(err => {/*console.log(err)*/});
    client.close();
});

/*
*/
app.post("/api/add-item", async (req, res) => {
    await client.connect().then(async () => {
        const collection = client.db("users").collection("items");
        await collection.findOne({
            userId: {$eq: req.body.user._id},
            title: {$eq: req.body.item.title}
        }).then(async item => {
            if (item) {
                res.send({message:"EXISTING ITEM WITH SAME TITLE"});
            }
            else {
                req.body.item.userId = req.body.user._id;
                await collection.insertOne(req.body.item).then(() => {
                    res.send({message: "SUCCESS"});
                }).catch(() => {res.send({message: "FAILED"})});
            }
        }).catch(() => {
            res.send({message:"FAILED"});
        });
    }).catch(err => {/*console.log(err)*/});
    client.close();
});

/*
*/
app.post("/api/update-item", async (req, res) => {
    await client.connect().then(async () => {
        const collection = client.db("users").collection("items");
        let items = await collection.find({
            userId: {$eq: req.body.user._id},
            title: {$eq: req.body.newitem.title}
        }).toArray();
        if (items.length > 1) {
            res.send({message:"EXISTING ITEM WITH SAME TITLE"});
        }
        else {
            let myquery = { userId: req.body.user._id, title: req.body.olditem.title };
            let newvalues = { $set: {} };
            if (req.body.olditem.images[0] != req.body.newitem.images[0]) {
                newvalues.$set['images'] = req.body.newitem.images;
            }
            if (req.body.olditem.title != req.body.newitem.title) {
                newvalues.$set['title'] = req.body.newitem.title
            }
            if (req.body.olditem.description != req.body.newitem.description) {
                newvalues.$set['description'] = req.body.newitem.description;
            }
            if (req.body.olditem.price != req.body.newitem.price) {
                newvalues.$set['price'] = req.body.newitem.price;
            }
            if (req.body.olditem.shippingOption != req.body.newitem.shippingOption) {
                newvalues.$set['shippingOption'] = req.body.newitem.shippingOption;
            }
            newvalues.$set['parameters'] = req.body.newitem.parameters;
            newvalues.$set['colors'] = req.body.newitem.colors;
            newvalues.$set['sizes'] = req.body.newitem.sizes;
            
            await collection.updateOne(myquery, newvalues).then(() => {
                res.send({message: "SUCCESS"});
            }).catch(() => {res.send({message: "FAILED"})});
        }        
    }).catch(err => {/*console.log(err)*/});
});

/*
*/
app.post("/api/remove-item", async (req, res) => {
    await client.connect().then(async () => {
        const collection = client.db("users").collection("items");
        let myquery = { userId: req.body.user._id, title: req.body.item.title };
        await collection.deleteOne(myquery).then(() => {
            res.send({message: "SUCCESS"});
        }).catch(() => {res.send({message: "FAILED"})});
    });
    client.close();
});

/* SHOPPING CART */

/*
*/
app.post("/api/add-shopping-item", async (req, res) => {
    let item = req.body.item;
    let user = req.body.user;

    await client.connect().then(async () => {
        
        if (user._id) {
            const collection = client.db("users").collection("cart");
            let myQuery = { userId: user._id, itemId: item.itemId }
            if (item.color) {
                myQuery['color'] = item.color;
            }
            if (item.size) {
                myQuery['size'] = item.size;
            }
            let existingObject = await collection.findOne(myQuery);
            if (!existingObject) {
                let newShoppingItem = {
                    userId: user._id,
                    itemId: item.itemId,
                    quantity : item.quantity,
                    images: item.images,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    firstName: item.firstName,
                    shippingOption: item.shippingOption
                };
            
                if (item.color) {
                    newShoppingItem['color'] = item.color;
                }
                if (item.size) {
                    newShoppingItem['size'] = item.size;
                }
            
                await client.connect().then(async () => {
                    await collection.insertOne(newShoppingItem).then(() => {
                        res.send({ message: "SUCCESS "});
                    }).catch((err) => { res.send({ message: "FAILED", reason: err}) });
                });
            }
            else {
                let newvalues = { $set: { quantity: existingObject.quantity + 1 } };
                collection.updateOne(myQuery, newvalues).then(() => {
                    res.send({ message: "SUCCESS "});
                }).catch((err) => { res.send({ message: "FAILED", reason: err}) });
                existingObject.quantity+=1;
                
            }
        }
        
    }).then((message) => {/*console.log(message)*/}).catch((err) => {/*console.log(err)*/});
});

/*
*/
app.post("/api/update-shopping-item", async (req, res) => {
    let item = req.body.item;
    let user = req.body.user;
    let newvalues = { $set: { quantity: item.quantity } };
    let myQuery = { userId : user._id, title: item.title, color: item.color, size: item.size };
    await client.connect().then(async () => {
        const collection = client.db("users").collection("cart");
        
        await collection.updateOne(myQuery, newvalues).then(() => {
            res.send({ message: "SUCCESS"});
        }).catch((err) => { res.send({ message: "FAILED", reason: err }) });
    })
});

/*
*/
app.post("/api/remove-shopping-item", async (req, res) => {
    let item = req.body.item;
    let user = req.body.user;
    if (item) {
        let myQuery = { userId : user._id, title: item.title, color: item.color, size: item.size };
        await client.connect().then(async () => {
            const collection = client.db("users").collection("cart");
            
            await collection.deleteOne(myQuery).then(() => {
                res.send({ message: "SUCCESS" });
            }).catch((err) => { res.send({ message: "FAILED", reason: err}); });
        })
    }
});

/*
*/
app.post("/api/get-shopping-cart", async (req, res) => {
    let user = req.body;
    await client.connect().then(async () => {
        const collection = client.db("users").collection("cart");
        let myQuery = { userId : user._id };
        let userCart = await collection.find(myQuery).toArray();        
        if (userCart.length > 0) {
            res.send({ message: "SUCCESS", cart: userCart});
        }
        else {
            res.send({message: "FAILED"});
        }
    })
});

/* ORDERS */
app.post("/api/checkout-cart", async (req, res) => {
    let cartItems = req.body;
    for (let i = 0; i < cartItems.length; i++) {
        cartItems[i]['time'] = new Date();
        cartItems[i]['confirmed'] = false;
    }
    console.log(cartItems);
    await client.connect().then(async () => {
        const collection = client.db("users").collection("orders");

        await collection.insertMany(cartItems).then(() => {
            res.send({message: "SUCCESS"});
        }).catch((err) => {
            res.send({message: "FAILED", err: err});
        })

        

    }).catch(err => {/*console.log(err);*/});
});

app.post("/api/clear-cart", async (req, res) => {
    let cartItems = req.body;
    await client.connect().then(async () => {
        const collection = client.db("users").collection("cart");

        let myQuery = { userId: cartItems[0].userId };
        await collection.deleteMany(myQuery);
    }).catch(err => {/*console.log(err);*/});

});

app.post("/api/get-user-orders", async (req, res) => {
    //console.log(req.body)
    let user = req.body;
    await client.connect().then(async () => {
        const collection = client.db("users").collection("orders");

        let myQuery = { userId: user._id };
        console.log(user)
        let orders = await collection.find(myQuery).toArray();

        if (await orders.length > 0) {
            console.log(orders);
            res.send({message: "SUCCESS", orders: orders });
        }
        else {
            res.send({message: "FAILED"});
        }

        
    }).catch(err => {/*console.log(err);*/})
});

app.get("/api/get-orders", async (req, res) => {
    await client.connect().then(async () => {
        const collection = client.db("users").collection("orders");

        let orders = await collection.find().toArray();

        if (await orders.length > 0) {
            console.log(orders);
            res.send({message: "SUCCESS", orders: orders });
        }
        else {
            res.send({message: "FAILED"});
        }
    });
});

/* Allows express to serve files from this directory
*/
app.use(express.static('dist/Group15'));

/* We are using the express backend to serve the index.html
   for our Angular app
*/
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/Group15'});
});

/*
*/
app.listen(process.env.PORT || 80);
