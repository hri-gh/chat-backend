import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    hobbies: [String]
})

export const SampleUser = mongoose.model('Sample_Users', userSchema)
