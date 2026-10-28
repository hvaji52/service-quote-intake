const quoteForm = document.getElementById("quote-form");
const quoteSummary = document.getElementById("quote-summary");
const summaryContent = document.getElementById("summary-content");

const serviceLabels = {
        "general-repair" : "General Repair",
        "plumbing" : "Minor Plumbing",
        "electrical" : "Minor Electrical",
        "carpentry" : "Carpentry",
        "painting" : "Painting",
        "drywall" : "Drywall Repair",
        "installation" : "Installation or Assembly",
        "other" : "Other"
    };

const budgetLabels = {
        "under-250" : "Under $250",
        "250-500" : "$250-$500",
        "500-1000" : "$500-$1000",
        "1000-2500" : "$1000-$2500",
        "over-2500" : "Over $2500",
        "not-sure" : "Not Sure"
    };

const urgencyLabels = {
        "flexible" : "My Schedule Is Flexible",
        "within-a-week" : "Within A Week",
        "as-soon-as-possible" : "As Soon As Possible"
    };

const basePrices = {
        "general-repair" : 200,
        "plumbing" : 250,
        "electrical" : 275,
        "carpentry" : 230,
        "painting" : 350,
        "drywall" : 250,
        "installation" : 225,
        "other" : null
    };
const urgencyMultipliers = {
        "flexible": 1,
        "within-a-week": 1.25,
        "as-soon-as-possible": 1.5
    };
const budgetLimits = {
    "under-250": 250,
    "250-500" : 500,
    "500-1000" : 1000,
    "1000-2500" : 2500,
    "over-2500" : Infinity,
    "not-sure" : null
};

function addSummaryLine(label, value, className, additionalClass) {
        const line = document.createElement("p");
        line.textContent = `${label}: ${value}`;
        
        if(className)  {
        line.classList.add(className);
        }
        if (additionalClass) {
            line.classList.add(additionalClass);
        }

        summaryContent.appendChild(line);
    }

function calculateEstimate(quoteRequest) {
        const basePrice = basePrices[quoteRequest.serviceType];
        const urgencyMultiplier = urgencyMultipliers[quoteRequest.urgency];

        if (basePrice == null || urgencyMultiplier == null){
            return null;
        }

        return basePrice * urgencyMultiplier;
    }

function addSummaryNote(message){
    const note = document.createElement("p");
    note.textContent = message;
    summaryContent.appendChild(note);
}
function checkBudgetCompatibility(estimatedPrice, selectedBudget){
    if(estimatedPrice === null){
        return "Unable to check budget compatibility.";
    }
    switch (selectedBudget) {
        case "not-sure":
            return "Customer has not specified a budget.";
        case "under-250":
            if (estimatedPrice < 250) {
                return "Estimate does not exceed the selected budget maximum."
            } else {
                return "Estimate is not under $250 and falls outside the selected budget.";
            }
        case "250-500":
        case "500-1000":
        case "1000-2500":{
            const maxBudget = budgetLimits[selectedBudget];
            if (estimatedPrice <= maxBudget) {
                return "Estimate does not exceed the selected budget maximum."
            } else {
                return "Estimate exceeds the selected budget maximum."
            }
        }
        case "over-2500":
            return "Customer selected a budget over $2,500; no upper spending limit was specified."
    
        default:
            return "Unrecognized budget selection";
    }
}

quoteForm.addEventListener("submit", function (event){
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const quoteRequest = Object.fromEntries(formData);
    const estimatedPrice = calculateEstimate(quoteRequest);
    const budgetMessage = checkBudgetCompatibility(estimatedPrice, quoteRequest.budget);

    let budgetClass = "budget-neutral";
    if (budgetMessage === "Estimate exceeds the selected budget maximum." || budgetMessage === "Estimate is not under $250 and falls outside the selected budget.") {
        budgetClass = "budget-warning";
    } else if (budgetMessage === "Estimate does not exceed the selected budget maximum.") {
        budgetClass = "budget-success";
    }

    summaryContent.textContent = "";
    quoteSummary.hidden = false;

    addSummaryLine("Customer", quoteRequest.fullName);
    addSummaryLine("Email", quoteRequest.email);
    addSummaryLine("Phone", quoteRequest.phone);
    addSummaryLine("ZIP Code", quoteRequest.zipCode);
    addSummaryLine("Service", serviceLabels[quoteRequest.serviceType]);
    addSummaryLine("Description", quoteRequest.projectDescription);
    addSummaryLine("Budget", budgetLabels[quoteRequest.budget]);
    addSummaryLine("Urgency", urgencyLabels[quoteRequest.urgency]);
    
    if (estimatedPrice !== null) {
        addSummaryLine("Preliminary Estimate", `$${estimatedPrice.toFixed(2)}`, "estimate-line");
    } else {
        addSummaryLine("Preliminary Estimate", "Unable to calculate", "estimate-line");
        }
    
    addSummaryLine("Budget Compatibility", budgetMessage, "budget-line", budgetClass);
    
    addSummaryNote(
    "This is a preliminary estimate based on service type and urgency. Final pricing may vary after reviewing the project details."
    );


});

