import '../app.scss';

export default class Calculator {
	private currentExpression: string;
	private currentResult: string;

	private equalsBtn: HTMLButtonElement;
	private clearBtn: HTMLButtonElement;
	private btns: HTMLButtonElement[];
	private expressionDisplay: HTMLDivElement;
	private resultDisplay: HTMLDivElement;

	constructor() {
		this.currentExpression = '';
		this.currentResult = '0';
		this.initialize();
	}

	initialize() {
		this.setElements();
		this.bindEvents();
		this.updateDisplay();
	}

	handleInput(event: MouseEvent) {
		const clickedElement = event.target as HTMLElement;
		const { value, type } = clickedElement.dataset;

		switch (type) {
			case 'operator':
				this.removeEndOperator();
				this.appendOperator(value);
				break;

			case 'number':
				this.appendNumber(value);
				break;
		}

		this.updateDisplay();
	}

	removeEndOperator() {
		// Check if the expression ends with an operator and removes it
		if (/[+\-*/]$/.test(this.currentExpression)) {
			this.currentExpression = this.currentExpression.slice(0, -1);
		}
	}

	appendOperator(value: string): void {
		if (this.currentExpression === '') return;
		this.currentExpression += value;
	}

	appendNumber(value: string): void {
		this.currentExpression += value;
	}

	evaluateExpression(): void {
		this.validateExpression();
		this.currentResult = new Function('return ' + this.currentExpression)();
		this.currentExpression = this.currentResult;
	}

	clearExpression(): void {
		this.currentExpression = '0';
		this.currentResult = '0';
	}

	validateExpression() {
		this.removeEndOperator();
		if (this.currentExpression === '') this.currentExpression = '0';
	}

	updateDisplay() {
		this.expressionDisplay.innerHTML = this.currentExpression;
		this.resultDisplay.innerHTML = this.currentResult.toString();
	}

	equalBtnHandler() {
		this.evaluateExpression();
		this.updateDisplay();
	}

	clearBtnHandler() {
		this.clearExpression();
		this.updateDisplay();
	}

	setElements() {
		this.btns = Array.from(
			document.querySelectorAll('.btn')
		) as HTMLButtonElement[];

		this.equalsBtn = document.getElementById('equals') as HTMLButtonElement;
		this.clearBtn = document.getElementById('clear') as HTMLButtonElement;

		this.expressionDisplay = document.getElementById(
			'expressionDisplay'
		) as HTMLDivElement;

		this.resultDisplay = document.getElementById(
			'resultDisplay'
		) as HTMLDivElement;
	}

	bindEvents(): void {
		if (!this.btns && !this.equalsBtn) {
			throw new Error('Elements not found.');
		}

		this.btns.forEach((btn: HTMLButtonElement) => {
			btn.addEventListener('click', (event: MouseEvent) =>
				this.handleInput(event)
			);
		});

		this.equalsBtn.addEventListener('click', () => this.equalBtnHandler());
		this.clearBtn.addEventListener('click', () => this.clearBtnHandler());
	}
}

document.addEventListener('DOMContentLoaded', () => new Calculator());
