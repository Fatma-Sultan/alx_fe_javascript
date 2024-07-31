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