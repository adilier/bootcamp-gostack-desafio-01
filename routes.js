const express = require('express');
const server = express();

server.use(express.json());

const projects = [];

server.use((req, res, next) => {
  console.count("Requistions")

  next();
})

function checkIdExist(req, res, next){
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if(!project){
    res.status(400).json({error: "Id does not exist"});
  }

  next();
}

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({id, title, tasks: []});

  res.json(projects)
});

server.get('/projects', (req, res) => {
  res.json(projects)
});

server.delete('/projects/:id', checkIdExist, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);
  
  res.send();
});

server.post('/projects/:id/tasks', checkIdExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  res.json(projects)
})

server.listen(3333);