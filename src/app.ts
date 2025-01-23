import express, { Application } from "express";
import postsRouter from "./routes/posts_router";
import commentsRouter from "./routes/comments_router";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app: Application = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Comments API",
      version: "1.0.0",
      description: "API for managing comments",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./**/*.ts"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

export default app;
