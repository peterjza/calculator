import Calculator from '../components/Calculator';
import { mockDomCalculator } from '../mocks/dom';

describe('Calculator', () => {
	let calculator: Calculator;

	beforeEach(() => {
		document.body.innerHTML = `${mockDomCalculator}`;
		calculator = new Calculator();
	});

	test('should create a Calculator class', () => {
		expect(calculator).toBeDefined();
	});

	test('should append values to the expression when a button is clicked', () => {
		calculator.handleInput({
			target: { dataset: { value: '5', type: 'number' } },
		} as any as MouseEvent);
		expect(calculator['currentExpression']).toBe('5');

		calculator.handleInput({
			target: { dataset: { value: '+', type: 'operator' } },
		} as any as MouseEvent);
		calculator.handleInput({
			target: { dataset: { value: '3', type: 'number' } },
		} as any as MouseEvent);
		expect(calculator['currentExpression']).toBe('5+3');
	});

	test('should handle an operator input when the expression is empty', () => {
		calculator.handleInput({
			target: { dataset: { value: '+', type: 'operator' } },
		} as any as MouseEvent);

		expect(calculator['currentExpression']).toBe('');
	});

	test('should remove the end operator if the expression ends with an operator', () => {
		calculator['currentExpression'] = '10+5*';
		calculator.removeEndOperator();
		expect(calculator['currentExpression']).toBe('10+5');
	});

	test('should evaluate the expression and update the result', () => {
		calculator['currentExpression'] = '5+3*2';
		calculator.evaluateExpression();
		expect(calculator['currentResult']).toBe(11);
	});

	test('should update the expression and result displays', () => {
		calculator['currentExpression'] = '5+3';
		calculator['currentResult'] = '8';
		calculator.updateDisplay();
		expect(calculator['expressionDisplay'].innerHTML).toBe('5+3');
		expect(calculator['resultDisplay'].innerHTML).toBe('8');
	});

	test('should clear the expression and update the display', () => {
		calculator['currentExpression'] = '5+3';
		calculator['currentResult'] = '8';
		calculator.clearExpression();

		expect(calculator['currentExpression']).toBe('0');
		expect(calculator['currentResult']).toBe('0');
		expect(calculator['expressionDisplay'].innerHTML).toBe('');
		expect(calculator['resultDisplay'].innerHTML).toBe('0');
	});

	test('should removeEndOperator when validating the expression', () => {
		calculator['currentExpression'] = '5+3*';
		calculator.validateExpression();
		expect(calculator['currentExpression']).toBe('5+3');
	});

	test('should set an expression 0 when currentExpression is empty', () => {
		calculator['currentExpression'] = '';
		calculator.validateExpression();
		expect(calculator['currentExpression']).toBe('0');
	});

	test('should follow the correct flow when the input is an operator', () => {
		const removeEndOperatorSpy = jest.spyOn(calculator, 'removeEndOperator');
		const appendOperatorSpy = jest.spyOn(calculator, 'appendOperator');
		calculator.handleInput({
			target: { dataset: { value: '+', type: 'operator' } },
		} as any as MouseEvent);
		expect(removeEndOperatorSpy).toHaveBeenCalledTimes(1);
		expect(appendOperatorSpy).toHaveBeenCalledTimes(1);
	});

	test('should follow the correct flow when the input is a number', () => {
		const appendNumberSpy = jest.spyOn(calculator, 'appendNumber');
		calculator.handleInput({
			target: { dataset: { value: '2', type: 'number' } },
		} as any as MouseEvent);
		expect(appendNumberSpy).toHaveBeenCalledTimes(1);
	});
});
