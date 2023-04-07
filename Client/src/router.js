import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import * as pages from './Pages'

const Routers = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<pages.Home />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Routers