const joi = require('@hapi/joi')
const mongoose=require('mongoose')
const bcrypt = require('bcrypt')
Schema = mongoose.Schema;
const authSchema=joi.object({
    email:joi.string().email().lowercase().required(),
    fullName:joi.string().min(2).required(),
    password:joi.string().min(6).required(),
    
    
})
var UserSchema = new Schema({
    fullName: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true
    },
    hash_password: {
      type: String
    },
    created: {
      type: Date,
      default: Date.now
    }
  });


UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };
  
  
  mongoose.model('User', UserSchema);
module.exports={
    authSchema
}