import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Quote from './pages/Quote'
import Blog from './pages/Blog'
import Admin from './pages/Admin'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/quote" element={<Quote />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
