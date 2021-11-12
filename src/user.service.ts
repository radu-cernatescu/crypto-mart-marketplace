import { Injectable } from '@angular/core';
import * as mongoDB from "mongodb";
import * as argon2 from "argon2";

@Injectable({
  providedIn: 'any'
})
export class UserService {
  private uri = "mongodb+srv://dbUser:capstone15@userdb.srfax.mongodb.net/UserDB?retryWrites=true&w=majority";
  private client: mongoDB.MongoClient;

  constructor() {
    this.client = new mongoDB.MongoClient(this.uri);
  }

    // Returns a Promise that resolves with true if the user is authenticated
    // false otherwise. If there is a failure, the Promise will reject with
    // an error message.
    loginUser(username: string, password: string) {
        return new Promise((resolve, reject) => {   
        this.client.connect(async (err, db) => {
            const collection = this.client.db("users").collection("logins");
    
            await collection.findOne(
                {
                    username: { $eq: username }
                }
            ).then(async user => {
                if (user) {
                    try {
                        await argon2.verify(user.password, password) ? resolve(true) : resolve(false);
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
        this.client.close();
        });
    }
}

/* JS FUNCTION to be converted to ts
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
*/
