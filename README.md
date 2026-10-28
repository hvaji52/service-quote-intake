# Service Quote Intake

A responsive, front-end home-services quote estimator built using HTML, CSS, and vanilla JavaScript.

This application demonstrates form handling, preliminary price estimation, budget compatibility checks, and dynamically generated quote summaries.

## Features

- Customer contact and project information form
- Multiple home-service categories
- Budget and urgency selection
- Preliminary estimates using service based pricing and urgency multipliers
- Budget compatibility checks with visual status indicators
- Custom quote handing for unspecified services
- Form validation using native HTML attributes
- Dynamically generated request summary
- Resposive interface and keyboard focus styling

## Technology Stack

- HTML5 - Form structure and validation
- CSS3 - Responsive design, styling, and visual indicators
- JavaScript (ES6+) - Form processing, calculations, and DOM manipulation
- Git and GitHub - Version control

No frameworks, backend services, or external JavaScript libraries are required

## How It Works

1. Enter customer contact information.
2. Select a home service category
3. Describe a project
4. Choose an approximate budget adn service urgency
5. Select "Review Quote Request"
6. Review the preliminary estimate and budget compatibility result

The estimate is calculated using:

**Preliminary Estimate = Base Service Price x Urgency Multiplier**

The values are illustrative and do not represent actual contractor pricing.

For the "Other" service category, an automatic estimate is unavailable

## Budget Compatibility

The application checks whether the estimated price satisfies the customer's selected budget ceiling.

The result is displayed using three visual states:

- Green — Estimate satisfies the budget limit
- Red — Estimate falls outside the budget limit
- Grey — Budget compatibility cannot be determined or no upper limit is specified

The "Under $250" category requires an estimate strictly below $250.

## Run Locally

1. Clone the repository:

   `git clone https://github.com/hvaji52/service-quote-intake.git`

2. Open the `service-quote-intake` folder.
3. Open `index.html` in a web browser.

No package installation or build process is required.

## Project Structure

- `index.html` — Application markup
- `styles.css` — Layout, styling, and responsive presentation
- `script.js` — Form processing and calculation logic
- `README.md` — Project documentation

## Demo Notice and Limitations

**This project is a portfolio demonstration, not a functioning contractor booking or lead-submission service.**

- All calculations take place in the browser.
- Customer information is not transmitted to a server, emailed, or saved to persistent storage.
- The application does not generate binding quotations.
- Service prices and urgency multipliers are demonstration values.
- Phone number and ZIP Code validation are basic.
- No database, user authentication, or administrative dashboard is included.

Please use fictional contact information when testing.

## Testing

The application has undergone manual functional testing and preliminary responsive-layout checks, including:

- Form submission and required-field behavior
- Estimate calculations for different services and urgency levels
- Unavailable-price handling
- Budget boundary conditions
- Conditional budget indicators
- Repeated submissions and summary updates
- Desktop browser resizing

Additional testing on physical mobile devices is planned after deployment.

## Future Enhancements

Potential improvements for later versions include:

- More advanced form validation
- Separating budget status values from display messages
- Backend lead submission and storage
- Email notifications
- Configurable service pricing
- Improved mobile layouts and accessibility
- Additional quote management features

## Author

**CodeClick53**

© CodeClick53. All Rights Reserved.