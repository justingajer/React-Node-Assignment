/* Module for handling specific api requests/routes for book data  */
console.log("helper?");
const helper = require("../scripts/helpers.js");
console.log("helper?");


const handleAllPlays = (app, Play) => {
   app.get('/api/list', helper.ensureAuthenticated, (req,resp) => {         
      Play.find({}, {
        id: 1,
        filename: 1,
        title: 1,
        likelyDate: 1,
        genre: 1,
        wiki: 1,
        gutenburg: 1,
        shakespeareOrg: 1,
        desc: 1,
    }, (err, data) => {
         if(err) {
             resp.json({message: "Unable to connect to plays..."});
         } else {
             resp.json(data);
         }
      });
   });
};

const handlePlayID = (app, Play) => {
    app.get('/api/play/:id', helper.ensureAuthenticated, (req,resp) => {
        Play.find({id: req.params.id}, "playText.title playText.short playText.persona playText.acts", (err, data) => {
            if(err) {
                resp.json(jsonMessage(`Play ID: ${req.params.id} not found`));
            } else {
                resp.json(data);
            }
        });
    });
};

/*
const handleAllBooks = (app, controller) => {
    app.get('/api/all', helper.ensureAuthenticated, (req,resp) => {         
      const data = controller.getAll();
      resp.json(data); 
   } );
};

// return just the requested book
const handleISBN10 = (app, controller) => {
   app.get('/api/isbn10/:isbn10', helper.ensureAuthenticated, (req,resp) => {
      const data = controller.findByISBN10(req.params.isbn10);
      if (data) {
         resp.json(data);
      } else {
         resp.json(jsonMessage(`ISBN ${req.params.isbn10} not found`));
      }  
   });
};

const handleTitle = (app, controller) => {
   app.get('/api/title/:substring', helper.ensureAuthenticated, (req,resp) => {
      const data = controller.findByTitle(req.params.substring);
      if (data) {
         resp.json(data);
      } else {
         resp.json(jsonMessage(`No title matches found for ${substring}`));
      }          
   });
};
*/

// error messages need to be returned in JSON format
const jsonMessage = (msg) => {
   return { message : msg };
};


module.exports = {
   handleAllPlays, handlePlayID
};
