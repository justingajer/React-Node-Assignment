/* Module for handling specific api requests/routes for book data  */  
const helper = require("../scripts/helpers.js");

const handleUserID = (app, User) => {
   app.get('/api/user/:id', helper.ensureAuthenticated, (req,resp) => {         
      User.find({id: req.params.id}, (err, data) => {
         if(err) {
             resp.json(jsonMessage(`User ID: ${req.params.id} not found`));
         } else {
             resp.json(data);
         }
      });
   });
};

// error messages need to be returned in JSON format
const jsonMessage = (msg) => {
   return { message : msg };
};


module.exports = {
   handleUserID
};
