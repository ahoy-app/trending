export const getMetrics = async (req, res) => {
  const response = Object.entries(req.db)
  response.sort((a, b) => (a[1] < b[1] ? 1 : -1))
  res.send(response.slice(0, 5))
}
