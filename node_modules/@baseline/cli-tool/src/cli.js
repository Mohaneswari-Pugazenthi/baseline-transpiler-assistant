#!/usr/bin/env node

// Import the core logic (getViolation) from the local checker package
const { getViolation } = require('@baseline/baseline-checker'); 
const { Command } = require('commander'); 
console.log("CLI Loaded successfully.");
const program = new Command();

program
  .name('baseline')
  .description('Dual-Engine Baseline Transpiler Assistant CLI')
  .version('1.0.0');

// --- Define the 'check' command ---
program
  .command('check <featureId>')
  .description('Checks a feature ID (e.g., "subgrid", "grid") for Baseline compliance.')
  .action( (featureId) => {
    console.log(`Checking feature ID: ${featureId}...`);

    const violation = getViolation(featureId);

    if (violation) {
      console.error(`\n${violation.message}`);
      console.error(`Status: ${violation.status}`);
      console.error(`\nSuggestion: This feature should be transpiled or avoided.`);
    } else {
      console.log(`\n✅ Feature ID '${featureId}' is Baseline compliant.`);
    }
  });

program.parse(process.argv);