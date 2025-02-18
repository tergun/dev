import axios from 'axios'
import { isDesktop } from '../utils/platform'

const BASE_URL = 'http://localhost:3000'
const CONCURRENT_REQUESTS = 50

// Test concurrent mobile access
const testMobileAccess = async () => {
  const requests = Array(CONCURRENT_REQUESTS).fill().map(() => 
    axios.get(`${BASE_URL}/api/projects`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
      }
    })
  )
  
  try {
    const results = await Promise.all(requests)
    console.log(`✅ Mobile concurrent access test passed: ${results.length} successful requests`)
    return true
  } catch (error) {
    console.error('❌ Mobile concurrent access test failed:', error.message)
    return false
  }
}

// Test desktop modification restrictions
const testDesktopModification = async () => {
  const requests = Array(CONCURRENT_REQUESTS).fill().map(() => 
    axios.post(`${BASE_URL}/api/projects`, {
      name: 'Test Project',
      level: '市级'
    }, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    })
  )
  
  try {
    const results = await Promise.all(requests)
    console.log(`✅ Desktop modification test passed: ${results.length} successful requests`)
    return true
  } catch (error) {
    console.error('❌ Desktop modification test failed:', error.message)
    return false
  }
}

// Test rate limiting
const testRateLimiting = async () => {
  const requests = Array(150).fill().map(() => 
    axios.get(`${BASE_URL}/api/projects`)
  )
  
  try {
    await Promise.all(requests)
    console.error('❌ Rate limiting test failed: Should not allow 150 requests')
    return false
  } catch (error) {
    if (error.response?.status === 429) {
      console.log('✅ Rate limiting test passed: Requests properly limited')
      return true
    }
    console.error('❌ Rate limiting test failed with unexpected error:', error.message)
    return false
  }
}

// Run all tests
const runTests = async () => {
  console.log('Starting concurrent connection tests...')
  
  const results = await Promise.all([
    testMobileAccess(),
    testDesktopModification(),
    testRateLimiting()
  ])
  
  const allPassed = results.every(result => result === true)
  console.log(`\nTest Summary: ${allPassed ? '✅ All tests passed' : '❌ Some tests failed'}`)
  
  return allPassed
}

runTests()
