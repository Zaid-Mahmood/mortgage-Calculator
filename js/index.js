// By default Right Menu Heading Values
document.getElementById("paymentBreakDown").style.fontWeight = "bold";
document.getElementById("amortization").style.border = "none";

function rightPageChange(id) {
  if (id == "paymentBreakDown") {
    document.getElementById("rightPageOne").classList.remove("d-none");
    document.getElementById("rightPageTwo").classList.add("d-none");
    document.getElementById("paymentBreakDown").classList.add("rightMenuHeading");
    document.getElementById("amortization").classList.remove("rightMenuHeading");
    document.getElementById("paymentBreakDown").style.display = "inline-block";
    document.getElementById("amortization").style.display = "inline-block";
    document.getElementById("paymentBreakDown").style.fontWeight = "bold";
    document.getElementById("amortization").style.fontWeight = "lighter";
    document.getElementById("paymentBreakDown").style.cursor = "pointer";
    document.getElementById("amortization").style.cursor = "pointer";
    document.getElementById("amortization").style.borderBottom = "none";
  }
  else if (id == "amortization") {
    document.getElementById("rightPageOne").classList.add("d-none");
    document.getElementById("rightPageTwo").classList.remove("d-none");
    document.getElementById("paymentBreakDown").classList.remove("rightMenuHeading");
    document.getElementById("amortization").classList.add("rightMenuHeading");
    document.getElementById("amortization").style.fontWeight = "bold";
    document.getElementById("amortization").style.borderBottom = "4px solid #28558a";
    document.getElementById("paymentBreakDown").style.fontWeight = "lighter";
    document.getElementById("paymentBreakDown").style.display = "inline-block";
    document.getElementById("amortization").style.display = "inline-block";
    document.getElementById("paymentBreakDown").style.cursor = "pointer";
    document.getElementById("amortization").style.cursor = "pointer";
  }
}


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
  console.log(monthlyInterest, "monthly interest")
  let numberOfPayments = (document.getElementById("numberOfPayments").value) * 12 || 0;

  // upper portion
  let upperPortion = monthlyInterest * (Math.pow(1 + monthlyInterest, numberOfPayments));

  // lower portion
  let lowerPortion = (Math.pow(1 + monthlyInterest, numberOfPayments)) - 1;

  // Calculating Principal Interest 
  let principalInterest = principalLoanAmount * (upperPortion / lowerPortion);
  document.getElementById("principalInterest").innerHTML = "$" + parseFloat(principalInterest.toFixed(2));
  principalAndInterestChart = parseFloat(principalInterest)

  //Getting value of propertytax and putting in the right result section
  let propertyTax = parseFloat(document.getElementById("propertyTax").value);
  console.log(propertyTax, "propertyTax");
  document.getElementById("propertyTaxResult").innerHTML = "$" + parseFloat(propertyTax);
  propertyTaxChart = parseFloat(propertyTax)
  //Getting value of Homeowner's insurance and putting in the right result section
  let homeownerInsurance = parseFloat(document.getElementById("homeownerInsurance").value);
  document.getElementById("homeOwnerResult").innerHTML = "$" + parseFloat(homeownerInsurance);
  homeownerownerInsuranceChart = parseFloat(homeownerInsurance)
  // Getting value of PMI per month and putting in the right result section
  let PMI = parseFloat(document.getElementById("PMI").value);
  console.log(PMI, "PMI");
  document.getElementById("pmiResult").innerHTML = "$" + parseFloat(PMI);
  PMIChart = parseFloat(PMI)
  // Getting value of HOA fee per month and putting in the right result section
  let HOA = parseFloat(document.getElementById("HOA").value);
  console.log(HOA, "HOA")
  document.getElementById("hoaResult").innerHTML = "$" + parseFloat(HOA);
  HOAChart = parseFloat(HOA);
  // Total monthly payment result
  let totalMonthlyPaymentResult = parseFloat(principalInterest + propertyTax + homeownerInsurance + PMI + HOA);
  console.log(totalMonthlyPaymentResult)
  document.getElementById("totalMonthlyPaymentResult").innerHTML = "$" + totalMonthlyPaymentResult.toFixed(2);


  // Amortization loan amount value
  let formatNumber = principalLoanAmount.toLocaleString("en-US");
  document.getElementById("loanAmount").innerHTML = "$" + (formatNumber);

  // Amortization total interest paid value Start

  // Calculating  monthly payment amount value first 
  let monthlyPaymentAmountUpperPortion = ((monthlyInterest) * principalLoanAmount);
  let monthlyPaymentAmountDownPortion = (1 - (Math.pow((1 + monthlyInterest), (-numberOfPayments))))

  // Monthly payment amount value
  let monthlyPaymentAmount = (monthlyPaymentAmountUpperPortion / monthlyPaymentAmountDownPortion);
  console.log(monthlyPaymentAmount);

  // Calculate total interest paid value
  let totalInterestPaid = (monthlyPaymentAmount * numberOfPayments) - principalLoanAmount;
  let formatNumberTotalInterest = totalInterestPaid.toLocaleString("en-US");
  console.log(formatNumberTotalInterest , "formatNumberTotalInterest");  
  document.getElementById("totalInterestPaid").innerHTML = formatNumberTotalInterest;
  // Amortization total interest paid value End

  // Calculate total cost of loan
  let totalCostOfLoanValue = principalLoanAmount + totalInterestPaid;
  let totalCostLoan = totalCostOfLoanValue.toLocaleString("en-US");
  document.getElementById("totalCostOfLoan").innerHTML =  "$" +(totalCostLoan);

  // Calculating the Payoff date
let loanTerms = document.getElementById("numberOfPayments").value * 12;
console.log(loanTerms);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let date = new Date();
  let month = monthNames[date.getMonth()];
  console.log(month);

  let year = date.getFullYear();
  let payOffYear = year + (parseFloat(document.getElementById("numberOfPayments").value))
 document.getElementById("payOffDate").innerHTML =month + "-" + payOffYear

// Looping to the end of the loan term
 

//  Calculating Principal
 let monthlyInterestTable = monthlyInterest * principalLoanAmount;
document.getElementById("monthlyInterestTable").innerHTML = "$" + monthlyInterestTable;

//  Calculating Monthly interest
let principalTable = parseFloat(principalInterest - monthlyInterestTable);
document.getElementById("monthlyInterestTable").innerHTML = "$" + (principalTable).toFixed(2);

// Calculating remianing balance
 let remainingBalance = principalLoanAmount - principalTable;
 document.getElementById("remainingBalance").innerHTML = "$" + (remainingBalance).toFixed(2);

 
for(let i = 1 ; i <= numberOfPayments; i++){
 let table = `<tr>
                <td>${monthlyInterestTable}</td>
                <td>${principalTable}</td>
                <td>${remainingBalance}</td>
                </tr>`
                document.getElementById("insertValues").innerHTML += table
              }
  updateChart();
}


// Changing in Down payment to change the corresponding percentage 
function downPaymentChange() {
  let downpayment = parseFloat(document.getElementById("downPayment").value) || 0;
  let homePrice = parseFloat(document.getElementById("homePrice").value) || 0;
  let downPaymentPercentage = (downpayment / homePrice) * 100;
  document.getElementById("downPaymentPercentage").value = downPaymentPercentage;

  monthlyPayment()
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
// Payment Breakdown End


