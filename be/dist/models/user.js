import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    firebaseUid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    projects: [{
            type: Schema.Types.ObjectId,
            ref: 'Project',
            default: []
        }]
});
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=user.js.map