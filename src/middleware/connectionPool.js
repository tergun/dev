import { createPool } from 'generic-pool'
import axios from 'axios'

// Create axios instance pool
const axiosPool = createPool({
  create: async () => {
    return axios.create({
      timeout: 30000,
      keepAlive: true
    })
  },
  destroy: async (client) => {
    // Cleanup
  }
}, {
  max: 100, // Maximum size of the pool
  min: 10,  // Minimum size of the pool
  idleTimeoutMillis: 30000,
  acquireTimeoutMillis: 30000
})

export const getConnection = async () => {
  return await axiosPool.acquire()
}

export const releaseConnection = async (client) => {
  await axiosPool.release(client)
}

// Middleware to handle connection pooling
export const connectionPoolMiddleware = async (req, res, next) => {
  try {
    const client = await getConnection()
    req.axiosClient = client
    
    res.on('finish', () => {
      releaseConnection(client)
    })
    
    next()
  } catch (error) {
    next(error)
  }
}
