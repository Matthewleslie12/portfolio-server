const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const { MongoClient } = require("mongodb");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

const images = require("./images.json");

app.get("/images/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("ID:", id);
  const image = images.images.find((i) => i.id === id);
  if (image) {
    res.sendFile(image.image, { root: "public/images" });
  } else {
    res.status(404).send("Image not found");
  }
});

app.get("/images", (req, res) => {
  res.json(images.images);
});

const icons = require("./icons.json");

app.get("/icons/:id", (req, res) => {
  const id = Number(req.params.id);
  const icon = icons.icons.find((i) => i.id === id);
  if (icon) {
    res.sendFile(icon.icon, { root: "public/icons" });
  } else {
    res.status(404).send("Icon not found!");
  }
});

app.get("/icons", (req, res) => {
  res.json(icons.icons);
});

const projects = require("./projects.json");

app.get("/projects/:id", (req, res) => {
  const id = Number(req.params.id);
  const project = projects.projects.find((i) => i.id === id);
  if (project) {
    res.sendFile(project.image, { root: "public/projects" });
  } else {
    res.status(404).send("Project not found!");
  }
});

app.get("/projects", (req, res) => {
  res.json(projects.projects);
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
