import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { PathwaysPage } from './pages/PathwaysPage'
import { PathwayDetailPage } from './pages/PathwayDetailPage'
import { ProgramsPage } from './pages/ProgramsPage'
import { SchoolsPage } from './pages/SchoolsPage'
import { NewsPage } from './pages/NewsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pathways" element={<PathwaysPage />} />
        <Route path="/pathways/:id" element={<PathwayDetailPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/schools" element={<SchoolsPage />} />
        <Route path="/news" element={<NewsPage />} />
      </Route>
    </Routes>
  )
}
