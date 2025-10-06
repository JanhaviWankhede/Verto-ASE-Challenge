# Verto-ASE-Challenge# Quiz Application API

## **Project Description**
This project is a backend API for a simple quiz application built using **Node.js**, **Express.js**, and **MongoDB**.  
It allows users to create quizzes, add different types of questions (single choice, multiple choice, and text-based), fetch quiz questions (without exposing correct answers), and submit answers to get a score.

---

## **Features**

- **Quiz Management**
  - Create a quiz with a title.
  - Add questions to a quiz with single choice, multiple choice, or text type.
- **Quiz Taking**
  - Fetch all questions for a specific quiz without revealing correct answers.
  - Submit answers and receive a score (correct answers are evaluated automatically).
- **Bonus Features**
  - Validation middleware ensures question correctness and text length limits.
  - Endpoint to fetch all available quizzes.
  - Unit tests for scoring logic.

---

## **Setup and Run Locally**

1. **Clone the repository:**
   ```bash
      git clone <repository-url>
      cd quiz-app
2. Install dependencies:
    npm install
3. Ensure MongoDB is running locally:
    Default connection used: mongodb://127.0.0.1:27017/quiz-app
    Start MongoDB service if not already running.
4. Start the server:
    npm run dev
    Server will run on http://localhost:5000
    Root route / returns Quiz API running
5. Testing
    Unit tests are written using Jest for the scoring service.
    Run tests:
    npm test
6. Expected output:
    All tests for single, multiple, and text-based question scoring should pass.

API Endpoints
    Method	Endpoint	Description
   - POST	/api/quizzes	Create a new quiz
   - GET	/api/quizzes	Get all quizzes
   - POST	/api/quizzes/:quizId/questions	Add a question to a quiz
   - GET	/api/quizzes/:quizId/questions	Get all questions of a quiz (without correct answers)
   - POST	/api/quizzes/:quizId/submit	Submit answers and get score

Use Postman or any API client to test these endpoints.

Assumptions & Design Choices
   - Single Responsibility: Routes, controllers, services, and middleware are separated for maintainability.
   - Validation: Middleware ensures question types, option correctness, and text length restrictions.
   - Scoring Logic:
   - Single choice: 1 point if correct, 0 if wrong.
   - Multiple choice: 1 point only if all correct options selected (can be extended for partial points).
   - Text: Exact match (case-sensitive).
   - No authentication is implemented; assumes trusted usage.
   - MongoDB IDs are used to identify quizzes, questions, and options.
    
Postman Collection
   - A ready-to-use Postman collection is included in the project to test all endpoints, including:
   - Creating quizzes
   - Adding single, multiple, and text-based questions
   - Fetching questions
   - Submitting answers and verifying scores
   - Listing all quizzes

