import express from 'express'
import { rateLimitMiddleware } from '../middleware/rateLimit.js'
import { connectionPoolMiddleware } from '../middleware/connectionPool.js'

const app = express()
app.use(express.json())

// Apply middleware
app.use(rateLimitMiddleware)
app.use(connectionPoolMiddleware)

// Test endpoints
app.get('/api/projects', (req, res) => {
  res.json([
    { id: 1, name: '城市基础设施改造项目' },
    { id: 2, name: '智慧城市数字化转型项目' }
  ])
})

app.post('/api/projects', (req, res) => {
  const userAgent = req.headers['user-agent'] || ''
  if (!userAgent.includes('Windows') && !userAgent.includes('Macintosh')) {
    return res.status(403).json({ error: '只能在桌面端进行修改操作' })
  }
  res.status(201).json({ id: 3, ...req.body })
})

const server = app.listen(3000, () => {
  console.log('Test server running on port 3000')
})

export default server
