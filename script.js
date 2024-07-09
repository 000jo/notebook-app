// Models
class NotebookEntry {
    constructor(text, questions = []) {
        this.text = text;
        this.questions = questions;
    }
}

class Question {
    constructor(text, answer) {
        this.text = text;
        this.answer = answer;
    }
}

// Camera setup
const camera = document.getElementById('camera');
const shutterButton = document.getElementById('shutter');
const notebookContainer = document.getElementById('notebook-container');
const questionsContainer = document.getElementById('questions-container');
let currentNotebookEntry = null;

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        camera.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing camera: ", err);
    });

shutterButton.addEventListener('click', takePhoto);

function takePhoto() {
    const canvas = document.createElement('canvas');
    canvas.width = camera.videoWidth;
    canvas.height = camera.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(camera, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob(blob => {
        processImage(blob);
    });
}

function processImage(imageBlob) {
    // Simulate image processing and create a notebook entry
    const text = "Beispieltext aus dem Bild";  // This would be the result of some OCR process
    currentNotebookEntry = new NotebookEntry(text);
    
    showNotebookEntry(currentNotebookEntry);
}

function showNotebookEntry(notebookEntry) {
    const notebookEntryDiv = document.getElementById('notebook-entry');
    notebookEntryDiv.textContent = notebookEntry.text;
    notebookContainer.classList.remove('hidden');
}

document.getElementById('generate-questions').addEventListener('click', generateQuestions);

function generateQuestions() {
    if (!currentNotebookEntry) return;
    
    const questions = [
        new Question("Was bedeutet dieses Wort?", "Antwort"),
        new Question("Was ist der Hauptgedanke dieses Absatzes?", "Antwort")
    ];
    
    currentNotebookEntry.questions = questions;
    showQuestions(questions);
}

function showQuestions(questions) {
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = '';
    
    questions.forEach(q => {
        const questionDiv = document.createElement('div');
        questionDiv.textContent = q.text;
        
        const answerInput = document.createElement('input');
        answerInput.type = 'text';
        questionDiv.appendChild(answerInput);
        
        questionsDiv.appendChild(questionDiv);
    });
    
    questionsContainer.classList.remove('hidden');
}
