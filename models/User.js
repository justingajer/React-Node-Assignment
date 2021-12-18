const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// define a schema that maps to the structure of the data in MongoDB
const userSchema = new mongoose.Schema({
    id: Number,
    details: {
        firstname: String,
        lastname: String,
        city: String,
        country: String
    },
    picture: {
        large: String,
        thumbnail: String
    },
    membership: {
        date_joined: String,
        last_update: String,
        likes: Number
    },
    email: String,
    password_bcrypt: String,
    apikey: String,
    favorites: Array
});

//DO NOT USE arrow syntax, NEEDING this KEYWORD!
userSchema.methods.isValidPassword = async function(formPassword) {
    const user = this;
    const digest = user.password_bcrypt;

    //console.log("formPassword:");
    //console.log(formPassword);
    //console.log("user:");
    //console.log(user);

    const compare = await bcrypt.compare(formPassword, digest);
    return compare;
}

userSchema.methods.getUserID = async function() {
    let idOut = this.id;
    if(idOut) {
        return idOut;
    }
    setTimeout(() => {
        idOut = this.id;
        return idOut;
    }, 500);
}

module.exports = mongoose.model('User', userSchema, 'users');