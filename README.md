# AI Mock Interview Platform 🎯

A full-stack web application designed to help job seekers practice technical and behavioral interviews. The platform generates targeted interview questions using the Google Gemini API, evaluates user responses, and stores session histories securely in MongoDB Atlas.

---

## 📌 Features

- **Dynamic Question Generation:** Generates interview questions tailored to specific job titles and tech stacks via Google Gemini.
- **Automated Feedback & Evaluation:** Evaluates candidate answers and returns constructive scoring and actionable recommendations.
- **Cloud Persistence:** Stores mock interview sessions, questions, and feedback history in MongoDB Atlas.
- **Decoupled Architecture:** Clean separation of concerns between a React client interface and a Node.js/Express REST API.
- **Secure Credential Isolation:** Protects sensitive AI tokens and database URIs using backend environment variables.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, HTML5/CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Dat