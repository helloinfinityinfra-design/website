import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import BlogsPage from './components/BlogsPage'
import BlogDetail from './components/BlogDetail'
import LandConverterWidget from './components/LandConverterWidget'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/vlog" element={<BlogsPage />} />
        <Route path="/vlogs" element={<BlogsPage />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
      </Routes>
      <LandConverterWidget />
    </>
  )
}

export default App

