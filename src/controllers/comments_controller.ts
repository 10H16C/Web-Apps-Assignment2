import { Request, Response } from "express";
import commentsModel from "../models/comments_model";

interface Comment {
  postId: string;
  author: string;
  content: string;
}

async function createComment(req: Request, res: Response): Promise<void> {
  const { postId, author, content } = req.body as Comment;

  if (!postId || !author || !content) {
    res.status(400).json({ error: "postId, author, and content are required." });
    return;
  }

  try {
    const newComment = new commentsModel({ postId, author, content });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: "Error creating comment." });
  }
}

async function getComments(req: Request, res: Response): Promise<void> {
  try {
    const comments = await commentsModel.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving comments." });
  }
}

async function getCommentsByPost(req: Request, res: Response): Promise<void> {
  const { postId } = req.params;

  try {
    const postComments = await commentsModel.find({ postId });
    res.json(postComments);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving comments." });
  }
}

async function getCommentById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    const comment = await commentsModel.findById(id);

    if (!comment) {
      res.status(404).json({ error: "Comment not found." });
      return;
    }

    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving comment." });
  }
}

async function updateComment(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { postId, author, content } = req.body as Comment;

  if (!postId || !author || !content) {
    res.status(400).json({ error: "postId, author, and content are required." });
    return;
  }

  try {
    const updatedComment = await commentsModel.findByIdAndUpdate(
      id,
      { postId, author, content },
      { new: true, runValidators: true }
    );

    if (!updatedComment) {
      res.status(404).json({ error: "Comment not found." });
      return;
    }

    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: "Error updating comment." });
  }
}

async function deleteComment(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    const deletedComment = await commentsModel.findByIdAndDelete(id);

    if (!deletedComment) {
      res.status(404).json({ error: "Comment not found." });
      return;
    }

    res.json(deletedComment);
  } catch (err) {
    res.status(500).json({ error: "Error deleting comment." });
  }
}

export {
  createComment,
  getComments,
  getCommentsByPost,
  getCommentById,
  updateComment,
  deleteComment,
};