import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {
  const { loading, generateReport, reports } = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const [fileName, setFileName] = useState("")
  const [charCount, setCharCount] = useState(0)
  const resumeInputRef = useRef()
  const navigate = useNavigate()

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0]
    const data = await generateReport({ jobDescription, selfDescription, resumeFile })
    navigate(`/interview/${data._id}`)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) setFileName(file.name)
  }

  const handleJobDescChange = (e) => {
    setJobDescription(e.target.value)
    setCharCount(e.target.value.length)
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="spinner" />
          <p>Generating your interview strategy...</p>
          <span>This usually takes about 30 seconds</span>
        </div>
      </div>
    )
  }

  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar__brand">
          <div className="navbar__logo">🎯</div>
          <span>InterviewAI</span>
        </div>
        <div className="navbar__links">
          <a href="#">Dashboard</a>
          <a href="#">Reports</a>
          <button className="navbar__cta">Upgrade to Pro</button>
        </div>
      </nav>

      <main className="main-content">

        {/* Header */}
        <header className="page-header">
          <div className="header__badge">✦ AI-Powered Interview Prep</div>
          <h1>Create Your Custom <span className="highlight">Interview Strategy</span></h1>
          <p>Paste the job description and upload your resume. Our AI will build a personalized winning plan in 30 seconds.</p>
        </header>

        {/* Main Card */}
        <div className="interview-card">

          <div className="interview-card__body">

            {/* Left Panel */}
            <div className="panel panel--left">
              <div className="panel__header">
                <div className="panel__header-left">
                  <span className="panel__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </span>
                  <h2>Target Job Description</h2>
                </div>
                <span className="badge badge--required">Required</span>
              </div>
              <textarea
                onChange={handleJobDescChange}
                className="panel__textarea"
                placeholder={`Paste the full job description here...\n\ne.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and system design..."`}
                maxLength={5000}
              />
              <div className="char-counter">
                <span className={charCount > 4500 ? 'char-counter--warn' : ''}>
                  {charCount} / 5000
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="panel-divider">
              <span className="panel-divider__label">+</span>
            </div>

            {/* Right Panel */}
            <div className="panel panel--right">
              <div className="panel__header">
                <div className="panel__header-left">
                  <span className="panel__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <h2>Your Profile</h2>
                </div>
              </div>

              {/* Upload */}
              <div className="upload-section">
                <label className="section-label">
                  Resume Upload
                  <span className="badge badge--best">Best Results</span>
                </label>
                <label
                  className={`dropzone ${fileName ? 'dropzone--filled' : ''}`}
                  htmlFor="resume"
                >
                  {fileName ? (
                    <>
                      <span className="dropzone__icon dropzone__icon--success">✓</span>
                      <p className="dropzone__title dropzone__title--success">{fileName}</p>
                      <p className="dropzone__subtitle">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <span className="dropzone__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
                          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                        </svg>
                      </span>
                      <p className="dropzone__title">Click to upload or drag &amp; drop</p>
                      <p className="dropzone__subtitle">PDF or DOCX · Max 5MB</p>
                    </>
                  )}
                  <input
                    ref={resumeInputRef}
                    hidden
                    type="file"
                    id="resume"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* OR */}
              <div className="or-divider"><span>OR</span></div>

              {/* Self Description */}
              <div className="self-description">
                <label className="section-label" htmlFor="selfDescription">
                  Quick Self-Description
                </label>
                <textarea
                  onChange={(e) => setSelfDescription(e.target.value)}
                  id="selfDescription"
                  className="panel__textarea panel__textarea--short"
                  placeholder="Briefly describe your experience, key skills, and years of experience..."
                />
              </div>

              {/* Info Box */}
              <div className="info-box">
                <span className="info-box__icon">ℹ</span>
                <p>Either a <strong>Resume</strong> or a <strong>Self-Description</strong> is required.</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="interview-card__footer">
            <span className="footer-info">
              <span className="footer-dot" />
              AI-powered · Results in ~30 seconds
            </span>
            <button onClick={handleGenerateReport} className="generate-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
              Generate My Interview Strategy
            </button>
          </div>
        </div>

        {/* Recent Reports */}
        {reports.length > 0 && (
          <section className="recent-reports">
            <div className="recent-reports__header">
              <h2>Recent Interview Plans</h2>
              <span className="reports-count">{reports.length} plans</span>
            </div>
            <div className="reports-grid">
              {reports.map(report => (
                <div
                  key={report._id}
                  className="report-card"
                  onClick={() => navigate(`/interview/${report._id}`)}
                >
                  <div className="report-card__top">
                    <h3>{report.title || 'Untitled Position'}</h3>
                    <span className={`score-badge ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>
                      {report.matchScore}%
                    </span>
                  </div>
                  <p className="report-card__date">
                    {new Date(report.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </p>
                  <span className="report-card__link">View plan →</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="page-footer">
        <span>© 2025 InterviewAI</span>
        <div className="page-footer__links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Help Center</a>
        </div>
      </footer>

    </div>
  )
}

export default Home