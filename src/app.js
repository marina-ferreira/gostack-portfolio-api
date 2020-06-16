const express = require("express")
const cors = require("cors")
const { uuid } = require("uuidv4")

const { logRequests, validateRepo } = require('./middlewares')

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

app.use(logRequests)
app.use('/repositories/:id', validateRepo(repositories))

app.get("/repositories", (request, response) => {
  return response.json(repositories)
})

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  const repo = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repo)

  return response.json(repo)
})

app.put("/repositories/:id", (request, response) => {
  const repoIndex = request.repoIndex
  const { title, url, techs } = request.body
  const repo = { ...repositories[repoIndex], title, url, techs }

  repositories[repoIndex] = repo

  return response.json(repo)
})

app.delete("/repositories/:id", (request, response) => {
  const repoIndex = request.repoIndex
  repositories.splice(repoIndex, 1)

  return response.status(204).send()
})

app.post("/repositories/:id/like", (request, response) => {
  const repoIndex = request.repoIndex
  repositories[repoIndex].likes++

  return response.json(repositories[repoIndex])
})

module.exports = app
