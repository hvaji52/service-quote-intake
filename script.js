const quoteForm = document.getElementById("quote-form");
const quoteSummary = document.getElementById("quote-summary");
const summaryContent = document.getElementById("summary-content");

quoteForm.addEventListener("submit", function (event){
    event.preventDefault();

    console.log("Form Submitted");
});

