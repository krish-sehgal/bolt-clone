import mongoose from "mongoose"

const connectdb = async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('database connected');
}

export default connectdb