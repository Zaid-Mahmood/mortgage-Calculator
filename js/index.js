// By default Right Menu Heading Values
document.getElementById("paymentBreakDown").style.fontWeight = "bold";

// Payment Breakdown Start
let principalAndInterestChart = 1001.31;
let propertyTaxChart = 100.00;
let homeownerownerInsuranceChart = 100.00;
let PMIChart = 0;
let HOAChart = 0;

var myChart;
function monthlyPayment() {
  let homePrice = document.getElementById("homePrice").value || 0;
  let downPaymentPercentage = document.getElementById("downPaymentPercentage").value || 0;

  let downPayment = homePrice * downPaymentPercentage / 100;
  document.getElementById("downPayment").value = downPayment;

  downPaymentPercentage = (downPayment / homePrice) * 100;
  let principalLoanAmount = homePrice - downPayment;
  let monthlyInterest = (document.getElementById("monthlyInterest").value / 100) / 12;
  let numberOfPayments = (document.getElementById("numberOfPayments").value) * 12 || 0;

  // upper portion
  let upperPortion = monthlyInterest * (Math.pow(1 + monthlyInterest, numberOfPayments));

  // lower portion
  let lowerPortion = (Math.pow(1 + monthlyInterest, numberOfPayments)) - 1;

  // Calculating Principal Interest and putting in the right result section
  let principalInterest = principalLoanAmount * (upperPortion / lowerPortion);
  document.getElementById("principalInterest").innerHTML = "$" + parseFloat(principalInterest.toFixed(2));
  principalAndInterestChart = parseFloat(principalInterest)

  //Getting value of propertytax and putting in the right result section
  let propertyTax = parseFloat(document.getElementById("propertyTax").value);
  document.getElementById("propertyTaxResult").innerHTML = "$" + parseFloat(propertyTax);
  propertyTaxChart = parseFloat(propertyTax)
  //Getting value of Homeowner's insurance and putting in the right result section
  let homeownerInsurance = parseFloat(document.getElementById("homeownerInsurance").value);
  document.getElementById("homeOwnerResult").innerHTML = "$" + parseFloat(homeownerInsurance);
  homeownerownerInsuranceChart = parseFloat(homeownerInsurance)
  // Getting value of PMI per month and putting in the right result section
  let PMI = parseFloat(document.getElementById("PMI").value);
  document.getElementById("pmiResult").innerHTML = "$" + parseFloat(PMI);
  PMIChart = parseFloat(PMI)
  // Getting value of HOA fee per month and putting in the right result section
  let HOA = parseFloat(document.getElementById("HOA").value);
  document.getElementById("hoaResult").innerHTML = "$" + parseFloat(HOA);
  HOAChart = parseFloat(HOA);
  // Total monthly payment result
  let totalMonthlyPaymentResult = parseFloat(principalInterest + propertyTax + homeownerInsurance + PMI + HOA);
  document.getElementById("totalMonthlyPaymentResult").innerHTML = "$" + totalMonthlyPaymentResult.toFixed(2);

  updateChart();
  
}

// Changing in Down payment to change the corresponding percentage 
function downPaymentChange() {
  let downpayment = parseFloat(document.getElementById("downPayment").value) || 0;
  let homePrice = parseFloat(document.getElementById("homePrice").value) || 0;
  let downPaymentPercentage = (downpayment / homePrice) * 100;
  document.getElementById("downPaymentPercentage").value = downPaymentPercentage;
  monthlyPayment();
  updateChart();
}

function createChart() {
  const ctx = document.getElementById('pieChart');
  myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Principal & Interest',
        'Property tax',
        `Homeowner's insurance`,
        'PMI',
        'HOA fees'
      ],
      datasets: [{
        data: [principalAndInterestChart, propertyTaxChart, homeownerownerInsuranceChart, PMIChart, HOAChart],
        backgroundColor: [
          '#2cf755',
          '#866af7',
          '#078ff7',
          '#866af7',
          '#2cf755',
          '#078ff7',
        ],
        hoverOffset: 4,
        borderWidth: 1,
      }]
    },
  });
}

function updateChart() {

  // Update the chart values
  var newValues = [principalAndInterestChart, propertyTaxChart, homeownerownerInsuranceChart, PMIChart, HOAChart];
  myChart.data.datasets[0].data = newValues;

  // Redraw the chart
  myChart.update();
}

createChart();

  
