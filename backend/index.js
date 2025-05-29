const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config.js");
const { upload } = require("./utils/cloudinary");
const cors = require("cors");
require("dotenv").config();

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

const startServer = async () => {
  const app = express();
  app.use(cors());

  // ✅ REST endpoint to upload image to Cloudinary
  app.post("/upload", upload.single("image"), (req, res) => {
    res.json({ imageUrl: req.file.path });
  });

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  connectDB();

  app.listen(4000, () => {
    console.log("Server running at http://localhost:4000/graphql");
  });
};

startServer(); 
