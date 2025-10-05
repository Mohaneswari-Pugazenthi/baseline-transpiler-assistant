// run-swc-test.js
const { checkCode } = require('./packages/swc-plugin/src/check.js');
const chalk = require('chalk');

const testCode = `
const compliant = [1, 2, 3];
const nonCompliant = compliant.flat(1); // Should trigger detection
`;

console.log(chalk.blue('\n--- Running SWC Baseline Plugin Test ---'));
console.log(chalk.yellow('Input Code:\n') + testCode);

// You must be sure to install chalk in the root if you get errors here: npm install chalk

try {
    const violations = checkCode(testCode);

    if (violations.length > 0) {
        console.error(chalk.red('\n❌ SWC DETECTION SUCCESSFUL (VIOLATION FOUND)'));
        violations.forEach(v => console.error(`Line ${v.line}: ${v.message}`));
    } else {
        console.log(chalk.green('\n✅ SWC check completed. No violations found.'));
    }
} catch (e) {
    console.error(chalk.red('\n❌ SWC Test failed with a critical error.'));
    console.error(e.message);
}

console.log(chalk.blue('\n----------------------------------------\n'));