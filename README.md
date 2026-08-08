Noorverse — AI-Powered Developer Portfolio

«A modern, responsive developer portfolio with an integrated Gemini-powered AI assistant.»

Noorverse is a personal developer portfolio built to showcase my projects, technical skills, learning journey, and work in a polished and interactive experience. The project combines a modern frontend with a practical AI feature that allows visitors to interact with the portfolio in a more engaging way.

---

✨ Highlights

- 🤖 Gemini-powered AI assistant
- 💻 Modern responsive portfolio interface
- 📱 Mobile-first responsive design
- 🧩 Reusable React components
- 🧪 Component testing with Vitest
- ♿ Accessibility-focused UI
- ⚡ Performance-conscious implementation
- 🛡️ AI error handling and safe API usage
- 🌐 Production-ready deployment workflow
- 📚 Detailed project documentation

---

🚀 Features

Portfolio Experience

- Hero section with personal introduction
- About section
- Skills and technologies
- Project showcase
- Certificates and achievements
- Blog/content section
- Contact section
- Responsive navigation
- Downloadable resume/CV

AI Assistant

The portfolio includes a Gemini-powered AI assistant that provides an interactive way for visitors to engage with the portfolio.

The AI feature is designed to add practical value to the portfolio experience rather than being included only as a visual demonstration.

---

🛠️ Tech Stack

Technology| Purpose
Next.js| Application framework
React| UI development
TypeScript| Type-safe development
Tailwind CSS| Styling and responsive design
Gemini API| AI assistant
Vitest| Testing
Testing Library| Component testing
Vercel| Deployment

---

📁 Project Structure

noorverse/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── about/
│   │   │   └── AboutSection.tsx
│   │   └── tests/
│   │       └── AboutSection.test.tsx
│   └── data/
│
├── public/
├── .env.local
├── package.json
├── README.md
├── vitest.config.mts
└── vitest.setup.ts

The project follows a component-based structure to keep the interface maintainable and easier to extend.

---

⚙️ Getting Started

Prerequisites

Make sure you have the following installed:

- Node.js 18+
- npm
- Git

1. Clone the repository

git clone YOUR_GITHUB_REPOSITORY_URL
cd noorverse

2. Install dependencies

npm install

3. Configure environment variables

Create a ".env.local" file in the project root:

GEMINI_API_KEY=your_gemini_api_key_here

The API key must remain private and should never be committed to GitHub.

4. Run the development server

npm run dev

Open:

http://localhost:3000

---

🤖 Gemini AI Integration

Noorverse uses the Gemini API to provide its AI-powered assistant.

The integration is designed around a real portfolio use case: helping visitors interact with and learn more about the developer and the work presented on the site.

AI Design Principles

- Keep the API key server-side
- Avoid exposing secrets to the browser
- Provide useful responses related to the portfolio
- Handle failed API requests gracefully
- Keep the AI feature integrated with the overall user experience

Environment Variable

GEMINI_API_KEY=your_gemini_api_key_here

«Never commit ".env.local", API keys, or other secrets to the repository.»

---

🧪 Testing

Testing is implemented using Vitest.

Run the test suite:

npm run test:run

Current Test

The project includes a passing test for the "AboutSection" component.

The test verifies that the "AboutSection" component is correctly exported and available for use.

Example result:

Test Files  1 passed
Tests       1 passed

Testing is part of the development workflow and provides a foundation for adding more component and feature tests as the application grows.

---

♿ Accessibility

Accessibility was considered during the frontend implementation in alignment with modern frontend development practices.

The project focuses on:

- Semantic HTML
- Accessible interactive elements
- Keyboard-friendly navigation
- Visible focus states
- Meaningful content structure
- Responsive layouts
- Readable text and contrast
- Appropriate ARIA attributes where required

Accessibility can be further validated using tools such as axe DevTools or WAVE before each production release.

---

⚡ Performance

Performance considerations include:

- Next.js optimizations
- Responsive layouts
- Optimized fonts and assets
- Reusable components
- Avoiding unnecessary client-side work
- Server-side handling of sensitive AI/API logic

Before production release, the application should also be checked with browser performance tools and Lighthouse.

---

🛡️ Error Handling

The application is designed to account for expected failure scenarios, particularly around the AI feature.

Potential failures include:

- Missing Gemini API configuration
- Network errors
- Failed API requests
- API/service limits
- Unexpected AI responses

The goal is to provide users with a clear fallback or error state instead of leaving the application in a broken state.

---

🌐 Deployment

The project is intended to be deployed using Vercel.

Production checklist

Before deployment:

1. Run the application locally.
2. Run the test suite.
3. Run the production build.
4. Configure environment variables.
5. Confirm no secrets are committed.
6. Test the Gemini AI feature.
7. Test error states.
8. Check mobile responsiveness.
9. Perform an accessibility audit.
10. Verify the production URL.

Production build

npm run build

Run production build locally

npm run start

---

🔗 Project Links

Live Website: "ADD_YOUR_VERCEL_URL"

GitHub Repository: "ADD_YOUR_GITHUB_URL"

These links will be updated with the final production and repository URLs.

---

📋 Deployment Checklist

- [ ] Application runs locally
- [ ] Gemini AI integration works
- [ ] "npm run test:run" passes
- [ ] "npm run build" succeeds
- [ ] Environment variables configured
- [ ] API keys excluded from Git
- [ ] AI error handling verified
- [ ] Mobile responsiveness checked
- [ ] Accessibility audit completed
- [ ] Production deployment verified
- [ ] GitHub repository updated
- [ ] README reflects the final implementation

---

💭 Reflection

Building Noorverse helped me understand that completing a frontend project is not only about creating a visually appealing interface.

I learned to think beyond the happy path by considering testing, accessibility, performance, error handling, documentation, and deployment as part of the development process.

Integrating Gemini also helped me understand that an AI feature should have a clear purpose. AI should solve a real user need or improve an existing experience rather than being added simply because it is an AI project.

One of the important lessons from this project was learning to troubleshoot issues across the development workflow, from component structure and testing configuration to API integration and production readiness.

If I continued developing Noorverse, I would expand the automated test suite, conduct deeper accessibility and performance audits, improve the AI assistant based on real user feedback, and continue refining the production experience.

---

📚 Resources

- Next.js Documentation
- React Documentation
- TypeScript Documentation
- Tailwind CSS Documentation
- Gemini API Documentation
- Vitest Documentation
- Vercel Documentation
- Testing Library Documentation

---

👩‍💻 About

Noor — BS Software Engineering student and aspiring Full Stack Developer.

This project represents my ongoing journey of learning frontend development, AI integration, testing, accessibility, and modern software development practices.