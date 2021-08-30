function GetValues() {
	//get values from the page
	let loanAmount = parseFloat(document.getElementById("inputLoanAmount").value);
	let term = parseInt(document.getElementById("inputTerm").value);
	let interestRate = parseFloat(
		document.getElementById("inputInterestRate").value
	);

	//calculate table
	let results = CalculateTable(loanAmount, term, interestRate);

	//display results
	DisplayResults(results);
}

function CalculateTable(loanAmount, term, interestRate) {
	let resultsArray = [];
	let totalInterest = 0;
	let balance = loanAmount;

	for (let i = 1; i <= term; i++) {
		//TEMP
		//First part
		let firstPart = loanAmount * (interestRate / 1200);
		//2nd part
		let secondPart = 1 - Math.pow(1 + interestRate / 1200, -term);

		//Monthly payment
		let monthlyPayment =
			(loanAmount * (interestRate / 1200)) /
			(1 - Math.pow(1 + interestRate / 1200, -term));
		//Interest and Principal
		let interest = balance * (interestRate / 1200);
		let principal = monthlyPayment - interest;
		totalInterest += interest;

		//Push values into array
		resultsArray.push(
			i,
			monthlyPayment,
			principal,
			interest,
			totalInterest,
			balance
		);

		balance = balance - principal;
	}

	return resultsArray;
}

function DisplayResults(results) {
	//get handle for tbody
	let tbodyResults = document.getElementById("tbodyResults");

	//get handle for template row
	let templateRow = document.getElementById("tempResultsRow");

	//clear table
	tbodyResults.innerHTML = "";

	for (let i = 0; i < results.length; i += 6) {
		let tableRow = document.importNode(templateRow.content, true);

		let rowCols = tableRow.querySelectorAll("td");

		rowCols[0].textContent = results[i];
		rowCols[1].textContent = results[i + 1];
		rowCols[2].textContent = results[i + 2];
		rowCols[3].textContent = results[i + 3];
		rowCols[4].textContent = results[i + 4];
		rowCols[5].textContent = results[i + 5];

		//fill in template row copy
		tbodyResults.appendChild(tableRow);

		//add template row copy to tbody
	}
}
