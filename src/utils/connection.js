// Connection pooling and rate limiting configuration
import axios from 'axios'

// Create connection pool
const connectionPool = axios.create({
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 30000,
  keepAlive: true
})

// Rate limiting configuration
const rateLimiter = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}

// Request queue management
const requestQueue = []
const maxConcurrentRequests = 20

const processQueue = async () => {
  while (requestQueue.length > 0) {
    const { config, resolve, reject } = requestQueue[0]
    
    try {
      const response = await connectionPool(config)
      resolve(response)
    } catch (error) {
      reject(error)
    }
    
    requestQueue.shift()
  }
}

// Concurrent request handler
export const request = (config) => {
  return new Promise((resolve, reject) => {
    if (requestQueue.length < maxConcurrentRequests) {
      requestQueue.push({ config, resolve, reject })
      processQueue()
    } else {
      reject(new Error('Too many concurrent requests'))
    }
  })
}

export const setupConcurrentConnections = () => {
  return {
    connectionPool,
    rateLimiter,
    maxConcurrentRequests
  }
}
