const mongoose=require('mongoose');
const Joi=require('joi');
const jwt=require('jsonwebtoken');

const registerSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minLength:5,
        maxLength:255
    },
    email: {
        type:String,
        required:true,
        unique:true,
        minLength:5,
        maxLength:255
    },
    password: {
        type: String,
        required:true,
        minLength:5,
        maxLength:1024
    }
});
registerSchema.methods.generateAuthToken = function () {
    //note as  this.id will refer to the id of the object so we cannot have fat arrow function here 
    //as that does not have a this
    const token = jwt.sign({ _id: this.id }, 'mySecretKey')
    return token;
}

const Register = mongoose.model('Register',registerSchema);




function validateRegister(registerObj) {
    //these come from the user
    const schema = {
        name:Joi.string().min(5).max(255).required(),
        email:Joi.string().min(5).max(255).email().required(),
        password:Joi.string().min(5).max(255).required()
    };
    return Joi.validate(registerObj, schema);

}



exports.Register=Register;
exports.validate=validateRegister;