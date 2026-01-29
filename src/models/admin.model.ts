import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt"

interface AdminDocument extends mongoose.Document {
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
}

const adminSchema = new Schema<AdminDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

adminSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.comparePassword = function (password: string) {
    return bcrypt.compare(password, this.password);
};

export const Admin = mongoose.model<AdminDocument>("Admin", adminSchema);
// export const Admin:Model<AdminDocument> = mongoose.model.Admin || mongoose.model("Admin", adminSchema);
