// auth.js
// Middleware to check if the user is logged in
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';  // Assuming you're storing login status in localStorage
}