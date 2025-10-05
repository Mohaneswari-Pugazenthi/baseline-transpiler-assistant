// run-babel-test.js
const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// --- Test Setup ---
const testCode = `
const compliantArray = [1, 2, 3];
const nonCompliantResult = compliantArray.flat(1); // Triggers detection logic
`;

const pluginPath = path.resolve(__dirname, 'packages/babel-plugin/src/index.js');

console.log(chalk.blue('\n--- Running Babel Baseline Plugin Test ---'));
console.log(chalk.yellow('Input Code:\n') + testCode);
console.log(chalk.cyan(`Loading plugin from: ${pluginPath}`));

try {
  const pluginPath = path.resolve(__dirname, 'packages/babel-plugin/src/index.js');
  // 1. Run the test code through Babel
  const result = babel.transformSync(testCode, {
    filename: 'test-code.js',
    
    // 2. Load the local plugin using its absolute path
    plugins: [
      pluginPath
    ],
    
    // Disable external configuration
    babelrc: false,
    configFile: path.resolve(__dirname, 'babel.config.js')
  });

  console.log(chalk.green('\n✅ SUCCESS: Babel compilation completed (NO VIOLATION DETECTED).'));
  console.log(chalk.yellow('Output Code:\n') + result.code);

} catch (e) {
  // Catch the explicit error thrown by your plugin
  if (e.message && e.message.includes('BASELINE VIOLATION')) {
    console.error(chalk.red('\n❌ BASELINE VIOLATION DETECTED!'));
    console.error(e.message);
  } else {
    // Catch general compilation/module errors
    console.error(chalk.red('\n❌ GENERAL BABEL ERROR. Check installation.'));
    console.error(e.message);
  }
}
console.log(chalk.blue('\n----------------------------------------\n'));