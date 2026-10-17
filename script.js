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
        "general-repair" : 100,
        "plumbing" : 150,
        "electrical" : 175,
        "carpentry" : 200,
        "painting" : 250,
        "drywall" : 150,
        "installation" : 125,
        "other" : 100
    };
const urgencyMultipliers = {
        "flexible": 1,
        "within-a-week": 1.10,
        "as-soon-as-possible": 1.25
    };

function addSummaryLine(label, value) {
       const line = document.createElement("p");
       line.textContent = `${label}: ${value}`;
       summaryContent.appendChild(line);
    }

function calculateEstimate(quoteRequest) {
        const basePrice = basePrices[quoteRequest.serviceType];
        const urgencyMultiplier = urgencyMultipliers[quoteRequest.urgency];

        if (basePrice === undefined || urgencyMultiplier === undefined){
            return null;
        }

        return basePrice * urgencyMultiplier;
    }

quoteForm.addEventListener("submit", function (event){
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const quoteRequest = Object.fromEntries(formData);
    const estimatedPrice = calculateEstimate(quoteRequest);
    
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
        addSummaryLine("Preliminary Estimate", `$${estimatedPrice.toFixed(2)}`);
    } else {
        addSummaryLine("Preliminary Estimate", "Unable to calculate");
        }

console.log("Form Submitted");
console.log("quoteRequest:", quoteRequest);
console.log("serviceType:", quoteRequest.serviceType);
console.log("service label:", serviceLabels[quoteRequest.serviceType]);
console.log("Base Price: ", basePrices[quoteRequest.serviceType]);
console.log("Estimated price:", estimatedPrice);

});

