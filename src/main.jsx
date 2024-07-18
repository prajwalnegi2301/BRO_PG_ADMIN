import React, { createContext , useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const Context = createContext({isAuthenticated:false});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [properties, setProperties] = useState([]);
  const [mode, setMode] = useState("dark");

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        properties,
        setProperties,
        mode,
        setMode,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AppWrapper />
  </React.StrictMode>,
)
