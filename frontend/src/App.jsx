import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import SurveyPage from './pages/SurveyPage'
import ThankYouPage from './pages/ThankYouPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/survey" element={<SurveyPage />} />

      <Route path="/thank-you" element={<ThankYouPage />} />
    </Routes>
  )
}