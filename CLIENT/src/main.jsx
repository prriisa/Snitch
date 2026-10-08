import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router/Approutes.jsx'
import { Provider } from "react-redux"
import { store } from './redux/store.jsx'

import "./index.css";
import AppRoutes from './router/Approutes.jsx'


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AppRoutes />
    </Provider>
)
