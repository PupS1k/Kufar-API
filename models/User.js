import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  mail: {type: String},
  password: {type: String},
  sellerStatus: {type: String}
});

export const User = mongoose.model('User', UserSchema);
