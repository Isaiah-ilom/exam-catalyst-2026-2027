import React, { useState, useCallback } from 'react';
import { Delete, RotateCcw } from 'lucide-react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = useCallback((num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const clearEntry = useCallback(() => {
    setDisplay('0');
  }, []);

  const backspace = useCallback(() => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  }, [display]);

  const performOperation = useCallback((nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const percentage = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  }, [display]);

  const toggleSign = useCallback(() => {
    if (display !== '0') {
      setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
    }
  }, [display]);

  const sqrt = useCallback(() => {
    const value = parseFloat(display);
    if (value >= 0) {
      setDisplay(String(Math.sqrt(value)));
    }
  }, [display]);

  const square = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(value * value));
  }, [display]);

  const sin = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(Math.sin(value * Math.PI / 180)));
  }, [display]);

  const cos = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(Math.cos(value * Math.PI / 180)));
  }, [display]);

  const tan = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(Math.tan(value * Math.PI / 180)));
  }, [display]);

  const log = useCallback(() => {
    const value = parseFloat(display);
    if (value > 0) {
      setDisplay(String(Math.log10(value)));
    }
  }, [display]);

  const ln = useCallback(() => {
    const value = parseFloat(display);
    if (value > 0) {
      setDisplay(String(Math.log(value)));
    }
  }, [display]);

  const buttons = [
    // Row 1
    [
      { label: 'C', onClick: clear, className: 'calculator-button clear', span: 1 },
      { label: 'CE', onClick: clearEntry, className: 'calculator-button clear', span: 1 },
      { label: '⌫', onClick: backspace, className: 'calculator-button clear', span: 1 },
      { label: '÷', onClick: () => performOperation('÷'), className: 'calculator-button operator', span: 1 },
    ],
    // Row 2
    [
      { label: '√', onClick: sqrt, className: 'calculator-button operator', span: 1 },
      { label: 'x²', onClick: square, className: 'calculator-button operator', span: 1 },
      { label: '%', onClick: percentage, className: 'calculator-button operator', span: 1 },
      { label: '×', onClick: () => performOperation('×'), className: 'calculator-button operator', span: 1 },
    ],
    // Row 3
    [
      { label: '7', onClick: () => inputNumber(7), className: 'calculator-button number', span: 1 },
      { label: '8', onClick: () => inputNumber(8), className: 'calculator-button number', span: 1 },
      { label: '9', onClick: () => inputNumber(9), className: 'calculator-button number', span: 1 },
      { label: '-', onClick: () => performOperation('-'), className: 'calculator-button operator', span: 1 },
    ],
    // Row 4
    [
      { label: '4', onClick: () => inputNumber(4), className: 'calculator-button number', span: 1 },
      { label: '5', onClick: () => inputNumber(5), className: 'calculator-button number', span: 1 },
      { label: '6', onClick: () => inputNumber(6), className: 'calculator-button number', span: 1 },
      { label: '+', onClick: () => performOperation('+'), className: 'calculator-button operator', span: 1 },
    ],
    // Row 5
    [
      { label: '1', onClick: () => inputNumber(1), className: 'calculator-button number', span: 1 },
      { label: '2', onClick: () => inputNumber(2), className: 'calculator-button number', span: 1 },
      { label: '3', onClick: () => inputNumber(3), className: 'calculator-button number', span: 1 },
      { label: '=', onClick: () => performOperation('='), className: 'calculator-button equals', span: 1, rowSpan: 2 },
    ],
    // Row 6
    [
      { label: '±', onClick: toggleSign, className: 'calculator-button operator', span: 1 },
      { label: '0', onClick: () => inputNumber(0), className: 'calculator-button number', span: 1 },
      { label: '.', onClick: inputDecimal, className: 'calculator-button number', span: 1 },
    ],
    // Scientific functions row
    [
      { label: 'sin', onClick: sin, className: 'calculator-button operator text-xs', span: 1 },
      { label: 'cos', onClick: cos, className: 'calculator-button operator text-xs', span: 1 },
      { label: 'tan', onClick: tan, className: 'calculator-button operator text-xs', span: 1 },
      { label: 'log', onClick: log, className: 'calculator-button operator text-xs', span: 1 },
    ],
  ];

  const formatDisplay = (value) => {
    if (value === 'Error') return value;
    
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    
    // Handle very large or very small numbers
    if (Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
      return num.toExponential(6);
    }
    
    // Format normal numbers
    return num.toString();
  };

  return (
    <div className="calculator max-w-sm mx-auto">
      {/* Display */}
      <div className="calculator-display">
        <div className="text-right overflow-hidden">
          {formatDisplay(display)}
        </div>
        {operation && previousValue !== null && (
          <div className="text-sm text-gray-400 text-right">
            {previousValue} {operation}
          </div>
        )}
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((row, rowIndex) => 
          row.map((button, buttonIndex) => {
            const key = `${rowIndex}-${buttonIndex}`;
            
            // Handle equals button spanning two rows
            if (button.label === '=' && rowIndex === 4) {
              return (
                <button
                  key={key}
                  onClick={button.onClick}
                  className={`${button.className} row-span-2`}
                >
                  {button.label}
                </button>
              );
            }
            
            // Skip rendering equals button in the last row since it's handled above
            if (button.label === '=' && rowIndex === 5) {
              return null;
            }
            
            return (
              <button
                key={key}
                onClick={button.onClick}
                className={button.className}
              >
                {button.label}
              </button>
            );
          })
        )}
      </div>

      {/* Memory and History */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Scientific Mode</span>
          <button
            onClick={clear}
            className="text-sm text-gray-400 hover:text-white flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;