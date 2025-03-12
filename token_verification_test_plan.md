# Token Verification Test Plan

This document outlines the test scenarios for the token verification flow in the UniApp application.

## Test Scenarios

### Scenario 1: Valid Token
**Setup:**
1. Set a valid token in storage:
   ```javascript
   uni.setStorageSync('token', 'valid-token-value');
   ```
2. Ensure the token verification API returns `true` for this token

**Expected Behavior:**
1. App should initialize with `isLoading = true` and `isConnected = false`
2. Token verification request should be made with the valid token
3. On success, `isLoading` should remain `true` and `isConnected` should remain `false`
4. App should navigate to the project list page
5. No white screen should appear
6. Index page should not be loaded

**Verification Points:**
- Check console logs for token verification result (`true`)
- Verify navigation to project list page
- Verify state values in storage

### Scenario 2: Invalid Token
**Setup:**
1. Set an invalid token in storage:
   ```javascript
   uni.setStorageSync('token', 'invalid-token-value');
   ```
2. Ensure the token verification API returns `false` for this token

**Expected Behavior:**
1. App should initialize with `isLoading = true` and `isConnected = false`
2. Token verification request should be made with the invalid token
3. On failure, `isLoading` should be set to `false` and `isConnected` should be set to `true`
4. The invalid token should be removed from storage
5. App should remain on the index page (no navigation)
6. Index page should only load once
7. No white screen should appear

**Verification Points:**
- Check console logs for token verification result (`false`)
- Verify no navigation occurs
- Verify state values in storage
- Verify token is removed from storage

### Scenario 3: No Token
**Setup:**
1. Ensure no token is in storage:
   ```javascript
   uni.removeStorageSync('token');
   ```

**Expected Behavior:**
1. App should initialize with `isLoading = true` and `isConnected = false`
2. Token existence check should fail
3. `isLoading` should be set to `false` and `isConnected` should be set to `true`
4. No token verification request should be made
5. App should remain on the index page (no navigation)
6. Index page should only load once
7. No white screen should appear

**Verification Points:**
- Verify no token verification request is made
- Verify no navigation occurs
- Verify state values in storage

## Manual Testing Instructions

Since we can't run the app directly in this environment, here's how to manually test the implementation:

1. Add console.log statements to key points in the App.vue file:
   ```javascript
   onLaunch: function() {
     console.log('App onLaunch - Starting')
     
     // Set default states at app startup
     uni.setStorageSync('isLoading', true)
     uni.setStorageSync('isConnected', false)
     console.log('App onLaunch - Default states set')
     
     // Avoid duplicate redirects
     if (this.$isRedirecting) {
       console.log('App onLaunch - Already redirecting, returning')
       return;
     }
     this.$isRedirecting = true;
     
     // Check if token exists
     const token = uni.getStorageSync('token')
     console.log('App onLaunch - Token exists:', !!token)
     
     if (!token) {
       // No token, set states for login page
       uni.setStorageSync('isLoading', false)
       uni.setStorageSync('isConnected', true)
       console.log('App onLaunch - No token, states set for login page')
       this.$isRedirecting = false
       return
     }
     
     // Token exists, verify it
     console.log('App onLaunch - Verifying token')
     uni.request({
       url: config.getUrl('tokenVerify'),
       method: 'GET',
       header: {
         'X-Access-Token': token
       },
       success: (res) => {
         console.log('App onLaunch - Token verification result:', res.data)
         if (res.data == true) {
           // Token is valid - set states and redirect to project list
           uni.setStorageSync('isLoading', true)
           uni.setStorageSync('isConnected', false)
           console.log('App onLaunch - Token valid, navigating to project list')
           uni.switchTab({
             url: '/pages/project_list/project_list'
           })
         } else {
           // Token is invalid - set states for login page
           uni.setStorageSync('isLoading', false)
           uni.setStorageSync('isConnected', true)
           // Clear invalid token
           uni.removeStorageSync('token')
           console.log('App onLaunch - Token invalid, states set for login page')
         }
       },
       fail: (err) => {
         // Request failed - set states for login page
         console.error('App onLaunch - Token verification failed:', err)
         uni.setStorageSync('isLoading', false)
         uni.setStorageSync('isConnected', true)
       },
       complete: () => {
         console.log('App onLaunch - Token verification complete')
         this.$isRedirecting = false;
       }
     })
   }
   ```

2. Add console.log statements to the index page to track when it loads:
   ```javascript
   onLoad() {
     console.log('Index page - onLoad')
   },
   onShow() {
     console.log('Index page - onShow')
     console.log('Index page - isLoading:', uni.getStorageSync('isLoading'))
     console.log('Index page - isConnected:', uni.getStorageSync('isConnected'))
   }
   ```

3. Run the app and check the console logs for each scenario:
   - Clear token and run app (Scenario 3)
   - Set invalid token and run app (Scenario 2)
   - Set valid token and run app (Scenario 1)

4. Verify that the behavior matches the expected behavior for each scenario.

## Expected Console Output Examples

### Scenario 1: Valid Token
```
App onLaunch - Starting
App onLaunch - Default states set
App onLaunch - Token exists: true
App onLaunch - Verifying token
App onLaunch - Token verification result: true
App onLaunch - Token valid, navigating to project list
App onLaunch - Token verification complete
```

### Scenario 2: Invalid Token
```
App onLaunch - Starting
App onLaunch - Default states set
App onLaunch - Token exists: true
App onLaunch - Verifying token
App onLaunch - Token verification result: false
App onLaunch - Token invalid, states set for login page
App onLaunch - Token verification complete
Index page - onLoad
Index page - onShow
Index page - isLoading: false
Index page - isConnected: true
```

### Scenario 3: No Token
```
App onLaunch - Starting
App onLaunch - Default states set
App onLaunch - Token exists: false
App onLaunch - No token, states set for login page
Index page - onLoad
Index page - onShow
Index page - isLoading: false
Index page - isConnected: true
```
