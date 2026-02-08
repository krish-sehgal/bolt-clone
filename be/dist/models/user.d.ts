import mongoose from "mongoose";
declare const User: mongoose.Model<{
    firebaseUid: string;
    email: string;
    projects: mongoose.Types.ObjectId[];
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    firebaseUid: string;
    email: string;
    projects: mongoose.Types.ObjectId[];
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    firebaseUid: string;
    email: string;
    projects: mongoose.Types.ObjectId[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    firebaseUid: string;
    email: string;
    projects: mongoose.Types.ObjectId[];
}, mongoose.Document<unknown, {}, {
    firebaseUid: string;
    email: string;
    projects: mongoose.Types.ObjectId[];
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    firebaseUid: string;
    email: string;
    projects: mongoose.Types.ObjectId[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        firebaseUid: string;
        email: string;
        projects: mongoose.Types.ObjectId[];
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        firebaseUid: string;
        email: string;
        projects: mongoose.Types.ObjectId[];
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    firebaseUid: string;
    email: string;
    projects: mongoose.Types.ObjectId[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    firebaseUid: string;
    email: string;
    projects: mongoose.Types.ObjectId[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default User;
//# sourceMappingURL=user.d.ts.map