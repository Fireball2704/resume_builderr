import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-3xpdhmkgl8j200te.us.auth0.com"
    clientId="p2NpJ6yLraxdFAeHN8kzd82JTkHdmaeo"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Auth0Provider>
  
)
