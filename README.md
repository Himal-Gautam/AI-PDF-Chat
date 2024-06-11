# PDF Q&A Application

This is a full-stack application that allows users to upload PDF documents and ask questions about their content. The backend uses FastAPI and LlamaIndex for processing and answering questions, while the frontend is built with Vite and React.js.

## Features

- Upload PDF files
- Ask questions about the content of uploaded PDFs
- Receive AI-generated answers

## Prerequisites

- Node.js and npm (or yarn)
- Python 3.10 or later
- An OpenAI API key (get one from https://platform.openai.com/account/api-keys)

## Installation

### Backend

1. **Navigate to the `server` directory:**

   ```bash
   cd server
   ```
2. **Create and activate a virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On macOS/Linux
   venv\Scripts\activate     # On Windows
   ```
3. **Install backend dependencies:**

   ```bash
   pip install -r requirements.txt
   ```
4. **Set up your OpenAI API key:**

   * Create a `.env` file in the `server` directory and add:
     ```
     OPENAI_API_KEY=your_actual_openai_api_key
     ```
   * Replace `your_actual_openai_api_key` with your real OpenAI API key.
5. **Start the backend server:**

   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend

1. **Navigate to the `client` directory:**

   ```bash
   cd client
   ```
2. **Install frontend dependencies:**

   ```bash
   npm install  # Or yarn install
   ```
3. **Start the frontend development server:**

   ```bash
   npm run dev # Or yarn dev
   ```

## API Endpoints

### 1. Upload PDF

* **Endpoint:**`/pdf/upload/`
* **Method:**`POST`
* **Request Body:**
  * `file` (multipart/form-data): The PDF file to upload.
* **Response:**
  * `{"file_id": file_id}` (JSON): A unique ID for the uploaded and processed PDF.

**Example (curl):**

Bash

```
curl -X POST http://127.0.0.1:8000/pdf/upload/ -F file=@your_pdf_file.pdf
```

### 2. Ask Question

* **Endpoint:**`/pdf/ask/`
* **Method:**`POST`
* **Request Body (JSON):**
  * `file_id` (string): The unique ID of the PDF file obtained from the upload response.
  * `question` (string): The question to ask about the PDF content.
* **Response:**
  * `{"answer": answer}` (JSON): The answer to the question.

**Example (curl):**

Bash

```
curl -X POST http://127.0.0.1:8000/pdf/ask/ -H "Content-Type: application/json" -d '{"file_id": "your_file_id", "question": "Your question here"}'
```


## Frontend Components (Client)

- **`App.jsx`:**  The main component that renders the application layout.
- **`FileUpload.jsx`:** Handles PDF file uploads.
- **`QuestionInput.jsx`:**  Allows the user to input questions.
- **`AnswerDisplay.jsx`:** Displays the answers from the backend.
- **`Chats.jsx`:** Manages the chat history.
- **`Messager.jsx`:** Handles the user's message input.
- **`NavBar.jsx`:** Provides navigation and actions related to the uploaded PDF.

## How to Use

1. **Start both servers:**

   * The backend server (in the `server` directory).
   * The frontend development server (in the `client` directory).
2. **Upload a PDF:**

   * Use the file upload component in the frontend to select and upload a PDF.
3. **Ask Questions:**

   * Type your questions in the question input area.
   * The application will send the question to the backend, which will process the PDF and return the answer.
4. **View Answers:**

   * The answers will be displayed in the chat area.

## Additional Notes

* The frontend communicates with the backend via API requests.
* This setup is optimized for development. For production, consider:
  * Building the frontend for production (`npm run build` or `yarn build`)
  * Deploying both frontend and backend to a suitable hosting environment.

Let me know if you have any other questions!

**Key Changes:**

* **Combined Instructions:**  The README now includes steps for setting up and running both the frontend and backend.
* **Frontend Components:**  A brief overview of the main frontend components is provided.
* **Usage Instructions:**  Clear steps on how to use the application are added.
* **Production Notes:**  Recommendations for production deployment are included.

Remember to replace `your-repository-url` with the actual URL of your project's Git repository if you're planning to share it with others.
