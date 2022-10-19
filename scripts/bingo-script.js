var rows = ["B","I","N","G","O"];
var columnCount = 15;
var checkedBoxClass = 'checked-box';

function resetBoard() {
	var checkboxes = document.querySelectorAll(`.${checkedBoxClass}`);
	for (const box of checkboxes) {
		box.classList.remove(checkedBoxClass)
	}
}

function checkboxChangeHandler() {
	// 'this' is the parent element that triggered this handler
	var checkboxElement = this.querySelector('input');
	var isChecked = checkboxElement.checked;
	this.className = isChecked
		? checkedBoxClass
		: '';
}

function createRow(rowLabel) {
	var boardRow = document.createElement('tr');
	boardRow.className = 'bingo-board-row';
	
	var rowLabelTh = document.createElement('th');
	rowLabelTh.className = 'row-label-node';
	
	var rowLabelTdText = document.createTextNode(rowLabel);

	rowLabelTh.appendChild(rowLabelTdText);
	boardRow.appendChild(rowLabelTh);

	return boardRow;
}

function fillRow(rowIndex, row, colCount) {
	for (let i = 0; i < colCount; i++) {
		var rowItemTd = document.createElement('td');
		rowItemTd.className = 'bingo-board-col-val';

		var rowItemControl = document.createElement('input');
		rowItemControl.type = 'checkbox';

		var rowItemLabel = document.createElement('label');
		var colVal = i + 1 + (rowIndex * columnCount);
		var colValText = document.createTextNode(colVal.toString().padStart(2));
		
		rowItemLabel.addEventListener('change', checkboxChangeHandler);
		rowItemLabel.appendChild(colValText);
		rowItemLabel.appendChild(rowItemControl);
		
		rowItemTd.appendChild(rowItemLabel);

		row.appendChild(rowItemTd);
	}
}

var bingoBoard = document.querySelector('#bingo-board');

if (bingoBoard) {
	for (const rowName of rows) { 
		var row = createRow(rowName);
		fillRow(rows.indexOf(rowName), row, columnCount);

		bingoBoard.appendChild(row);
	}
}