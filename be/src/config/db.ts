import mongoose from "mongoose"

const connectdb = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/website-builder');
    console.log('database connected');
}

export default connectdb