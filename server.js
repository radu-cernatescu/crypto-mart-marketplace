const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
const argon2 = require('argon2');
const bodyParser = require('body-parser');
//const mailchimp = require('@mailchimp/mailchimp_transactional')('gCNp0sPDBIdbOKvYhikZww');
const monerojs = require("monero-javascript");
//1. Import coingecko-api
const CoinGecko = require('coingecko-api');
 
//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();
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
});

/*
*/
app.post("/api/sign-up", async (req, res) => {
    const walletRpc = await monerojs.connectToWalletRpc("http://172.105.103.62:8181", "radu", "R123R123");
    await client.connect().then(async () => {
        const collection = client.db("users").collection("logins");
        await collection.findOne({
            email: {$eq: req.body.email}
        }).then(async user => {
            if (user) {
                res.send({message:"EXISTING USER"});
            }
            else {
                let path, password;
                try {
                    path = req.body.email;
                    password = await argon2.hash(req.body.password);
                    await walletRpc.createWallet({
                      path: path,
                      password: password,
                    });
                    await walletRpc.sync();
                    
                    const user = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: password,
                        type: req.body.type,
                        isBlock: req.body.isBlock,
                        wallet: path,
                        wallet_password: password,
                        wallet_address: await walletRpc.getPrimaryAddress()
                    }
                    walletRpc.close();
                    await collection.insertOne(user).then(() => {
                        res.send({message: "SUCCESS"});
                    }).catch(err => {
                        res.send({message: "FAILED"});
                    });
                } catch(err) {
                    //console.log(err.toString());
                    res.send({message: "FAILED", reason: err.toString()});
                } 
            }
        }).catch(() => {
            res.send({message:"FAILED"});
        });
    }).catch(err => {/*console.log(err)*/});
});

/* Gets all valid invite codes from backend. This way we can quickly invalidate codes.
*/
app.get("/api/invitecodes/", async (req, res) =>{
    await client.connect().then(async () => {
        const collection = client.db("users").collection("invite_codes");

        let codes = await collection.find().toArray();
        res.send({message: "SUCCESS", codes: codes});

    }).catch(err => {/*console.log(err)*/});

});

/* Mailchimp deprecated :(

app.post("/api/ban-user-email", async (req, res) => {
    //console.log(req.body);

    const response = await mailchimp.messages.sendTemplate({
        template_name: 'Ban User',
        template_content: [{REASON: req.body.reason}],
        message: {
            from_email: 'radu@triaz.dev',
            from_name: 'Radu',
            to: [{email: req.body.user.email, name: req.body.user.firstName}]
        },
    });

    res.send({message: "SUCCESS", mailchimp_response: response});

    console.log(response);
});

*/

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

});

/** API to block/unblock user by admin  */
app.post("/api/block-user", async (req, res) => {
    let user = req.body.user;
    let reason = req.body.reason;
    await client.connect().then(async () => {
        const collection = client.db("users").collection("logins");
        let myquery = { email: user.email };
        let newvalues = { $set: {firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            isBlock: !user.isBlock,
            reason: reason
        } };

        await collection.updateOne(myquery, newvalues).then(() => {
                res.send({message: "SUCCESS"});
            }).catch(err => {
                res.send({message: "FAILED"});
            });
        }).catch(() => {
        res.send({message:"FAILED"});
    }).catch(err => {/*console.log(err)*/});
         
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

/* Check to see if a user is blocked */
app.post("/api/is-user-blocked", async (req, res) => {
    let user = req.body;
    if (user) {
        let myQuery = { email: user.email };
        await client.connect().then(async () => {
            const collection = client.db("users").collection("logins");

            await collection.findOne(myQuery).then((response) => {
                res.send({message: "SUCCESS", isBlock: response.isBlock, user: response});
            });
        }).catch((err) => { res.send({ message: "FAILED", reason: err}); });
    }
    else {
        res.send({message: "FAILED", reason: "User not logged in."});
    }
});

/* */
app.post("/api/send-listing-delete-notif", async (req, res) => {
    let user = req.body.user;
    let item = req.body.item;
    let reason = req.body.reason;

    await client.connect().then(async () => {
        const collection = client.db("users").collection("notifications");

        let insertObj = { item: item, itemId: item._id, reason: reason, unread: true, email: user.email }
        await collection.insertOne(insertObj).then(() => {
            res.send({message: "SUCCESS"})
        }).catch((err) => { res.send({ message: "FAILED", reason: err}); })
    }).catch((err) => { res.send({ message: "FAILED", reason: err}); });

});

/* */
app.post("/api/get-listing-delete-notifs", async (req,res) => {
    let user = req.body;

    await client.connect().then(async () => {
        const collection = client.db("users").collection("notifications");

        let filter = { email: user.email };

        let notifications = await collection.find(filter).toArray();

        res.send({message: "SUCCESS", notifications: notifications});
    }).catch((err) => { res.send({ message: "FAILED", reason: err}); })

});

/* */
app.post("/api/delete-listing-delete-notifs", async (req,res) => {
    let user = req.body.user;
    let item = req.body.item;

    await client.connect().then(async () => {
        const collection = client.db("users").collection("notifications");

        let filter = { email: user.email, itemId: item.item._id };

        await collection.deleteOne(filter).then((response) => {
            res.send({message: "SUCCESS", response: response});
        }).catch((err) => { res.send({ message: "FAILED", reason: err}); });

    }).catch((err) => { res.send({ message: "FAILED", reason: err}); })

});

app.post("/api/mark-read-listing-delete-notifs", async (req, res) => {
    let user = req.body.user;
    let item = req.body.item;

    await client.connect().then(async () => {
        const collection = client.db("users").collection("notifications");

        let filter = { email: user.email, itemId: item.item._id };

        let newvalues = { $set: { unread: false } };

        await collection.updateOne(filter, newvalues).then(() => {
            res.send({message: "SUCCESS"});
        }).catch((err) => { res.send({ message: "FAILED", reason: err}); })
    }).catch((err) => { res.send({ message: "FAILED", reason: err}); });
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
                    sellerId: item.sellerId,
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
            
                //console.log(newShoppingItem);
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
    });

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
        });

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
    });

});

/* ORDERS */
app.post("/api/checkout-cart", async (req, res) => {
    let cartItems = req.body.items;
    let from_user = req.body.user;
    let isFailed = false;
    for (let i = 0; i < cartItems.length; i++) {
        cartItems[i]['time'] = new Date();
    }
    //console.log(cartItems);

    let balance_before, balance_after, amountTotal, amountTotalDollars;
    let totalFee = 0;
    for (let i = 0; i < cartItems.length; i++) {

        // get balance before transaction
        let path = from_user.wallet;
        let password = from_user.wallet_password;
        const walletRpc = await monerojs.connectToWalletRpc("http://172.105.103.62:8181", "radu", "R123R123");
        await walletRpc.openWallet(path, password);
        balance_before = parseInt((await walletRpc.getBalance()).toString())/1000000000000;
        walletRpc.close();

        // send transaction to seller
        await client.connect().then(async () => {
            let amount = 0;
            const collection = client.db("users").collection("logins");
            // first find the seller
            await collection.findOne(
                { "_id": ObjectId(cartItems[i].sellerId) }
            ).then(async user => {
                //console.log(user);
                //console.log(cartItems[i].sellerId)
                if (user) {
                    // get seller's wallet address
                    to = user.wallet_address;
                    // get the most up to date xmr conversion rate to CAD
                    await CoinGeckoClient.simple.price({
                        ids: ['monero'],
                        vs_currencies: ['cad']
                    }).then(async (data) => {
                        let moneroPrice = data.data.monero.cad;
                        amount = ((cartItems[i].price * cartItems[i].quantity)/moneroPrice)*1000000000000;
                        amountTotal += amount;
                        amountTotalDollars += (cartItems[i].price * cartItems[i].quantity * 1.13);
                    
                        // open wallet and create transaction, relay it to monero blockchain
                        let path = from_user.wallet;
                        let password = from_user.wallet_password;
                        const walletRpc = await monerojs.connectToWalletRpc("http://172.105.103.62:8181", "radu", "R123R123");
                        await walletRpc.openWallet(path, password);
                        balance_before = parseInt((await walletRpc.getBalance()).toString())/1000000000000;
                        let walletAddress = await walletRpc.getPrimaryAddress();
                        try {
                            // if from user has unlockable amount right now, proceed with transaction
                            let tx = await walletRpc.createTx({
                            accountIndex: 0,
                            address: user.wallet_address,
                            amount: monerojs.BigInteger(amount)
                            });
                        
                            let fee = await tx.getFee();
                            let hash = await walletRpc.relayTx(tx);

                            // add transaction to and specify it's type in transactions collection
                            const transactions = client.db("users").collection("transactions");

                            await transactions.insertOne({from: walletAddress, to: user.wallet_address, type: "purchase", txid: tx.getHash()}).then(async () => {
                                await client.connect().then(async () => {
                                    // once the transaction process is complete, the item is added to orders
                                    const collection = client.db("users").collection("orders");
                                    cartItems[i]['txid'] = hash;
                                    await collection.insertOne(cartItems[i]).then(() => {
                                        //res.send({message: "SUCCESS"});
                                    }).catch((err) => {
                                        isFailed = true;
                                        res.send({message: "FAILED", err: err});
                                    })
                                }).catch((err) => {res.send({message: "FAILED", err: err});});
                            }).catch((err) => {res.send({message:"FAILED"});});
                        
                            //console.log(tx + "\n======");
                           // console.log("Fee: " + fee);
                            totalFee += fee;
                            //console.log("Tx Hash: " + tx.getHash());
    
                        } catch(err) {
                            isFailed = true;
                            //console.log(err.toString());
                            let reason = 'none given';
                            if (err.toString().includes("Request timed out")) {
                                //console.log("Error: Time out");
                                reason = 'time out';
                            }
                            else if (err.toString().includes("not enough money")) {
                                //console.log('Error: not enough funds');
                                reason = 'not enough funds';
                            }
                            else if (err.toString().includes("not enough unlocked money")) {
                                //console.log("Error: Transaction already underway.");
                                reason = 'transaction already underway on your account, please wait 10 confirmations (~20 min).'
                            }
                            res.send({message:"FAILED", reason: reason, item: cartItems[i]});
                        }
                }).catch();
                }
                else{
                    isFailed = true;
                    res.send({message:"FAILED"});
                }
            
            }).catch((err) => {res.send({message:"FAILED"}); isFailed = true;});
        }).catch((err) => {});
    }

    if (!isFailed) {
        // get balance after transaction
        let path = from_user.wallet;
        let password = from_user.wallet_password;
        const walletRpc = await monerojs.connectToWalletRpc("http://172.105.103.62:8181", "radu", "R123R123");
        await walletRpc.openWallet(path, password);
        balance_after = parseInt((await walletRpc.getBalance()).toString())/1000000000000;
        walletRpc.close();

        let response = {
            balance_before: balance_before,
            amountTotal: amountTotal,
            amountTotalDollars: amountTotalDollars,
            balance_after: balance_after,
            totalFee: totalFee
        };

        res.send({message: "SUCCESS", response: response});
    }
    
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
        //console.log(user)
        let orders = await collection.find(myQuery).toArray();

        if (await orders.length > 0) {
            //console.log(orders);
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
            //console.log(orders);
            res.send({message: "SUCCESS", orders: orders });
        }
        else {
            res.send({message: "FAILED"});
        }
    });
});

/* CRYPTO */

// Accepts a user object and gets the balances (total and unlocked) for that wallet
app.post("/api/get-wallet-info", async (req, res) => {
    const walletRpc = await monerojs.connectToWalletRpc("http://172.105.103.62:8181", "radu", "R123R123");
    let user = req.body;
    let path = user.wallet;
    let password = user.wallet_password;

    //open wallet
    try {
        await walletRpc.openWallet(path, password);
        await walletRpc.sync();
        let wallet = {
            balance: parseInt((await walletRpc.getBalance()).toString())/1000000000000, //  Balance in Atomic Units (One atomic unit is currently 1e-12 XMR (0.000000000001 XMR, or one piconero)
            primaryAddress: await walletRpc.getPrimaryAddress(), // Very long string - looks like: 46G6moWH7kQJrjExVATHiyNhrXPLCUHwZeoGZta5QecHepE45m9Z279QVftVxfj5imHDMubV5imE6ik6saQK7hfd6PBv5JG
            mnemonicPhrase: await walletRpc.getMnemonic(),
            privateSpendKey: await walletRpc.getPrivateSpendKey(),
            privateViewKey: await walletRpc.getPrivateViewKey(),
            transactions: [],
            unlockedBalance: parseInt((await walletRpc.getUnlockedBalance()).toString())/1000000000000
        };  
        let txs = await walletRpc.getTxs(); // get ARRAY of transactions containing transfers to/from the wallet
        for (let i = 0; i < txs.length; i++) {
            delete txs[i].state['block'];
            txs[i].state['fee'] = txs[i].state['fee'].toString();
            
            let transaction = txs[i].state;
            if (transaction.isIncoming) {
                for (let k = 0; k < transaction.incomingTransfers.length; k++) {
                    delete transaction.incomingTransfers[k].state['tx'];
                    txs[i].state.incomingTransfers[k].state['amount'] = txs[i].state.incomingTransfers[k].state.amount.toString();
                }
            }
            else if (transaction.isOutgoing) {
                delete transaction.outgoingTransfer.state['tx'];
                txs[i].state.outgoingTransfer.state['amount'] = txs[i].state.outgoingTransfer.state.amount.toString();
            }
            wallet['transactions'].push(txs[i].state);
        }  
    
        walletRpc.close();

        res.send({message: "SUCCESS", wallet: wallet});     
       
    } catch(err) {
        //walletRpc.close();
        //console.log(err);
        res.send({message: "FAILED", reason: err});
    }
});

/* Get transaction type (withdrawal, purchase)
*/
app.post("/api/get-transaction-type", async (req, res) => {
    let txid = req.body.txid;

    await client.connect().then(async () => {
        const collection = client.db("users").collection("transactions");
        await collection.findOne({
            txid: {$eq: txid}
        }).then(async transaction => {
            if (transaction) {
                res.send({message:"SUCCESS", transaction: transaction});
            }
            else{
                res.send({message:"FAILED"});
            }
        
        }).catch((err) => {res.send({message:"FAILED"});});
    }).catch((err) => {res.send({message:"FAILED"});});
});

app.get("/api/get-xmr-rate", async (req, res) => {
    await CoinGeckoClient.simple.price({
        ids: ['monero'],
        vs_currencies: ['cad']
    }).then((data) => {
        res.send({message:"SUCCESS", data: data});
    }).catch((err) => { res.send({message: "FAILED", reason: err});});
});

app.post("/api/withdraw-wallet", async(req, res) => {
    let user = req.body.user;
    let amount = (req.body.amount - 0.00000959) *1000000000000;
    let address = req.body.address;
    let sweep = req.body.sweep;

    //console.log(req.body);

    if (address != null) {
        let path = user.wallet;
        let password = user.wallet_password;
        let walletRpc;
        try {
            walletRpc = await monerojs.connectToWalletRpc("http://172.105.103.62:8181", "radu", "R123R123");
            await walletRpc.openWallet(path, password);
            let from_address = await walletRpc.getPrimaryAddress();
        
            // sweep to send ALL funds.
            if (sweep) {
                let tx_arr = await walletRpc.sweepUnlocked({address: address, relay: true});
                let tx;
                if (tx_arr != null && tx_arr.length > 0) {
                    tx = tx_arr[0].state;
                }
                let fee = await monerojs.BigInteger(tx.fee);
    
                //console.log("sweeping:");
                //console.log(tx);
                //console.log("Fee: " + fee);
                await client.connect().then(async () => {
                    const transactions = client.db("users").collection("transactions");
        
                    await transactions.insertOne({type: "withdrawal", txid: tx.hash, from: from_address}).then(() => {
                        res.send({message: "SUCCESS"});
                    }).catch(err => {res.send({message: "FAILED"});});
                }).catch(err => {res.send({message: "FAILED"});});
        
                walletRpc.close();
            }
            else {
                // if from user has unlockable amount right now, proceed with transaction
                let tx = await walletRpc.createTx({
                accountIndex: 0,
                address: address,
                amount: monerojs.BigInteger(amount)
                });
            
                let hash = await walletRpc.relayTx(tx);
        
                await client.connect().then(async () => {
                    const transactions = client.db("users").collection("transactions");
        
                    await transactions.insertOne({type: "withdrawal", txid: hash, from: from_address}).then(() => {
                        res.send({message: "SUCCESS"});
                    }).catch(err => {res.send({message: "FAILED"});});
                }).catch(err => {res.send({message: "FAILED"});});
        
                //console.log(tx);
                walletRpc.close();
            }
        } catch(err) {
            res.send({message: "FAILED"});
            //console.log(err);
            //walletRpc.close();
        }
    }
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
