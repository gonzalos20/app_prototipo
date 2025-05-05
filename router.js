// router.js
import page from './node_modules/page/page.mjs';

// Function to load only the body from the external HTML file
function loadBody(file, onLoaded) {
  return fetch(file)
    .then(response => response.text())
    .then(html => {
      // Create a temporary DOM element to parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
            
      // Get the content inside the <body> tag from the fetched HTML
      const bodyContent = doc.body.innerHTML;
      document.getElementById('app').innerHTML = bodyContent;
      if (typeof onLoaded === 'function') {
        onLoaded();
      }
    })
    .catch(error => {
      document.getElementById('app').innerHTML = `<h1>Error loading page</h1>`;
      console.error('Error loading page:', error);
    });
}

// Apply the authentication middleware for all routes except '/login'
page('*', (ctx, next) => {
  if (ctx.pathname !== '/' && !isLoggedIn()) {
    page.redirect('/');  // Redirect to login if not logged in
  } else {
    next();  // Allow the route to proceed if logged in or it's the login page
  }
});

// Define routes
page('/', () => {
  if (isLoggedIn()) {
    loadBody('./pages/home.html', renderFormEntries);  // Load home.html's body content
  }
  else {
    loadBody('./pages/login.html');  // Load login.html's body content
  }
});

page('/alta', () => {
  loadBody('./pages/alta.html');  // Load alta.html's body content
});

// Start routing
page();
