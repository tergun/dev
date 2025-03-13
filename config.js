// Configuration for API endpoints
export default {
  getUrl: function(endpoint) {
    const baseUrl = 'https://api.example.com';
    
    const endpoints = {
      tokenVerify: '/auth/verify',
      login: '/auth/login',
      verificationCode: '/auth/captcha?checkKey=',
      // Add other endpoints as needed
    };
    
    return baseUrl + endpoints[endpoint];
  }
}
