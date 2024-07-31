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
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
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
        populateCategories(); // Update the categories dropdown
    saveQuotes(); // Save quotes after adding a new quote
     // Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
    const savedQuotes = localStorage.getItem('quotes');
    if (savedQuotes) {
        quotes = JSON.parse(savedQuotes);
    }
}

// Call loadQuotes() when the application starts
loadQuotes();


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

function exportQuotes() {
    const quotesJson = JSON.stringify(quotes, null, 2);
    const blob = new Blob([quotesJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Add an event listener to the export button
document.getElementById('exportQuotes').addEventListener('click', exportQuotes);

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            quotes = importedQuotes; // Replace existing quotes
            saveQuotes(); // Save the imported quotes
            showRandomQuote(); // Display a new quote from the imported list
            alert('Quotes imported successfully!');
        } catch (error) {
            alert('Error importing quotes: ' + error.message);
        }
    };
    fileReader.readAsText(event.target.files[0]);
}
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function filterQuotes() {
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter.value;
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear previous quotes

    const filteredQuotes = quotes.filter(quote => 
        selectedCategory === 'all' || quote.category === selectedCategory
    );

    if (filteredQuotes.length > 0) {
        showRandomQuote(filteredQuotes); // Display a random quote from the filtered list
    } else {
        quoteDisplay.innerHTML = '<p>No quotes available for this category.</p>';
    }

    // Save the last selected filter in local storage
    localStorage.setItem('lastFilter', selectedCategory);
}

function loadLastFilter() {
    const lastFilter = localStorage.getItem('lastFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    if (lastFilter) {
        categoryFilter.value = lastFilter;
        filterQuotes(); // Apply the last selected filter
    }
}

// Call these functions when the application starts
populateCategories();
loadLastFilter();

// Example using JSONPlaceholder API

const mockApiUrl = 'https://jsonplaceholder.typicode.com/quotes';

function fetchServerQuotes() {
    fetch(`${SERVER_URL}/quotes`)
        .then(response => response.json())
        .then(serverQuotes => {
            // Handle server quotes here
        })
        .catch(error => console.error('Error fetching server quotes:', error));
}

function fetchQuotesFromServer() {
    fetch(mockApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(quotes => {
            // Process the quotes data here
            console.log('Quotes fetched from server:', quotes);
            // You might want to update the local storage or the UI with the new quotes
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Call the function when the application starts
fetchQuotesFromServer();

function syncQuotesWithServer(serverQuotes) {
    // Implement the logic to merge server quotes with local quotes
    // For example, you might update the local storage with the server quotes
    // or merge them based on certain conditions
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    const mergedQuotes = mergeQuotes(localQuotes, serverQuotes);
    localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
    // You might also want to update the UI or notify the user
}

function mergeQuotes(localQuotes, serverQuotes) {
    // Implement your merge logic here
    // This could be as simple as replacing local quotes with server quotes
    // or more complex, such as merging based on quote IDs
    return serverQuotes; // This is a placeholder; replace with actual merge logic
}

function notifyUser(message) {
    const notifications = document.getElementById('syncNotifications');
    notifications.innerHTML += `<div>${message}</div>`;
    setTimeout(() => {
        notifications.removeChild(notifications.firstChild);
    }, 5000); // Remove notification after 5 seconds
}

document.getElementById('resolveConflicts').addEventListener('click', () => {
    // Implement manual conflict resolution logic
});