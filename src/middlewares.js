function logRequests(request, response, next) {
  const { method, url } = request

  const logLabel = `[${method.toUpperCase()}] ${url}`
  console.time(logLabel)

  next()
  console.timeEnd(logLabel)
}

function validateRepo(repositories) {
  return (request, response, next) => {
    const { id } = request.params
    const repoIndex = repositories.findIndex(repo => repo.id === id)

    if (repoIndex < 0) {
      return response.status(400).json({ error: 'Repository not found.' })
    }

    request.repoIndex = repoIndex
    next()
  }
}

module.exports = { logRequests, validateRepo }
