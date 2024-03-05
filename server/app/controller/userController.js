const Users = require('../models/Users');
const Movie = require('../models/Movies');
const message = require('../messages/messages');
const {saveUser, findUser} = require('../db/db');


const getAllUsers = async (req, res) => {
    //try code block to get all directors with a success message
    try{
        //query string
       let querString = JSON.stringify(req.query);

       querString = querString.replace(
           /\b(gt|gte|lt|lte|ne|in|nin)\b/g, 
           (match) => `$${match}`
       );

       let query = Users.find(JSON.parse(querString));

       //select
       if(req.query.select){
           const fields = req.query.select.split(',').join(' ');
           query = Users.find({}).select(fields);
       }
       //sort
       if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = Users.find({}).sort(sortBy);
        } 
       //pagination
       if(req.query.page){
        const page= parseInt(req.query.page) || 1;
        const limit= parseInt(req.query.limit) || 2;
        const skip = (page - 1) * limit;
        query.skip(skip).limit(limit);
       }

       const users = await query.populate('movie');
       //response status and message
       res.status(200).json({ 
           data: users,
           message: message.director_endpoint,
           success: true
       });
    }
    //catch code block to handle errors
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
};

const getUserById = async (req, res) => {
    //try code block to get a director by id with a success message
    try{
        const {id} = req.params;
        const user = await Users.findById(id).populate('movie');
        res.status(200).json({ 
            data: user,
            message: message.director_endpoint,
            success: true
        });
    }
    //catch code block to handle errors
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
};

const createUser = async (req, res) => {
    //try code block to create a new director with a success message
    try{
        console.log('Saving User');
        const fname = req.body.fname;
        const lname = req.body.lname;
        const email = req.body.email;

        const newUser = new Users({
            _id: new mongoose.Types.ObjectId(),
            fname: fname,
            lname: lname,
            email: email
        });

        saveUser(newUser)
            .then(result=>{
                console.log(result);
            })
            .catch(err=>{
                console.log("error: ", err);
            });
    }
    //catch code block to handle errors
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
};


const updateUser = async (req, res) => {
    //try code block to update a director with a success message
    try{
        const {id} = req.params;
        Users.findByIdAndUpdate(id, req.body, { new: true })
        .exec()
        .then(user => {
            if(!user){
                console.log(user);
                return res.status(404).json({
                    message: message.director_not_found,
                    success: false
                });
            }
        });
        const user = await Users.findByIdAndUpdate(id);
        res.status(200).json({ 
            data: user,
            message: message.director_endpoint,
            success: true
        });
    }
    //catch code block to handle errors
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
};

const deleteUser = async (req, res) => {
    
    //try code block to delete a director with a success message
    try{
        const {id} = req.params;
        Users.findByIdAndDelete(id, req.body, { new: false })
         .exec()
         .then(user => {
             if(!user){
                 console.log(user);
                 return res.status(404).json({
                     message: message.director_not_found,
                     success: false
                 });
             }
         });
        const user = await Users.findByIdAndDelete(id);
        res.status(200).json({ 
            id,
            data: user,
            message: message.director_endpoint,
            success: true
        });
    }
    //catch code block to handle errors
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};