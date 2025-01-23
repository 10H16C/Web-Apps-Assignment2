import mongoose, { Schema, Document, Model } from "mongoose";

interface Comment extends Document {
  postId: string;
  author: string;
  content: string;
}

const commentSchema: Schema<Comment> = new mongoose.Schema({
  postId: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
});

const commentModel: Model<Comment> = mongoose.model<Comment>("Comment", commentSchema);

export default commentModel;