# ByteLab LMS 🚀

[![Live Demo](https://img.shields.io/badge/Live_Demo-Play_Now!-emerald?style=for-the-badge&logo=vercel)](https://abhijith-web-dev.github.io/bytelab/)

ByteLab is an advanced, interactive Learning Management System (LMS) specifically designed to teach Python Programming. It transforms standard academic syllabuses into a vibrant, hands-on learning experience.

## Features ✨

- **65-Day Structured Curriculum:** Based on the official 19AI301 / CS3301 Python Programming syllabus.
- **Story Mode:** Learn complex concepts through engaging, narrative-driven analogies (like a 10th-grade student).
- **Interactive Code Simulations:** Step through execution line-by-line to watch variable bindings and states update in real time.
- **In-Browser Python IDE (Pyodide):** Write, run, and debug Python code directly in your browser using a robust WASM sandbox—no local installation required.
- **Dynamic Assessments:** Test your knowledge with module-specific quizzes and automated grading.
- **Mobile Optimized:** A sleek, fully responsive UI engineered for blazing fast performance on any device.

## Tech Stack 🛠️

- **Frontend:** React 18, Vite, Tailwind CSS, React Router v7
- **State Management:** Zustand
- **Code Execution:** Pyodide (Python WebAssembly)
- **Code Editor:** Monaco Editor
- **Styling:** Tailwind CSS (Prose, Animations, Custom Design System)
- **Icons:** Lucide React

## Getting Started 🏁

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abhijith-web-dev/bytelab.git
   cd bytelab
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   npm run preview
   ```
   *(Note: The `preview` mode bundles all code, ensuring blazing fast load times on mobile devices)*

## License 📜

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
