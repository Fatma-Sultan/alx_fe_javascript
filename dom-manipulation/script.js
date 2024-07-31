// Array of quote objects
let quotes = [
    { text: "The way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Your time is limited, don't waste it living someone else's life.", category: "Inspiration" },
    // Add more quotes here
];

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><i>${randomQuote.category}</i></p>`;
}
// Add an event listener to the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to create a form for adding new quotes
function createAddQuoteForm() {
    const formContainer = document.getElementById('quoteFormContainer');
    formContainer.innerHTML = `
        <div>
            <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
            <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
            <button onclick="addQuote()">Add Quote</button>
        </div>
    `;
}

function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;
    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote); // Add the new quote to the quotes array
        showRandomQuote(); // Display a new quote after adding

        // Clear the input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        // Optionally, you can provide feedback to the user that the quote was added
        const feedback = document.createElement('div');
        feedback.textContent = 'Quote added successfully!';
        feedback.style.color = 'green';
        document.getElementById('quoteFormContainer').appendChild(feedback);

        // Remove the feedback message after a few seconds
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    } else {
        // Provide feedback if the fields are empty
        const feedback = document.createElement('div');
        feedback.textContent = 'Please fill in both quote and category.';
        feedback.style.color = 'red';
        document.getElementById('quoteFormContainer').appendChild(feedback);

        // Remove the feedback message after a few seconds
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }
}