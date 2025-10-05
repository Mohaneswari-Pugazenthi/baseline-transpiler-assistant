// packages/swc-plugin/src/check.js
const swc = require('@swc/core');
const { getViolation } = require('@baseline/baseline-checker');

/**
 * Scans JavaScript code using SWC's AST parser and reports Baseline violations.
 * @param {string} code - The source code to check.
 * @returns {object[]} - Array of violation messages.
 */
function checkCode(code) {
    const violations = [];
    // SWC parses the code into an AST
    const ast = swc.parseSync(code, { syntax: 'ecmascript', comments: false });

    // Simple recursive function to manually traverse the AST nodes (simulating a plugin)
    function traverse(node) {
        if (!node || typeof node !== 'object') return;

        // Check for MemberExpression, similar to the Babel visitor
        if (node.type === 'MemberExpression' && node.property.type === 'Identifier') {
            const propertyName = node.property.value;
            
            if (propertyName === 'flat') {
                const violationDetails = getViolation('array-flat'); // Call your checker
                
                if (violationDetails) {
                    violations.push({
                        line: node.span.start,
                        message: `SWC detected VIOLATION: ${violationDetails.message}`
                    });
                }
            }
        }
        
        // Recursively check children
        for (const key in node) {
            const prop = node[key];
            if (prop && typeof prop === 'object') {
                if (Array.isArray(prop)) {
                    prop.forEach(traverse);
                } else {
                    traverse(prop);
                }
            }
        }
    }

    traverse(ast);
    return violations;
}

module.exports = { checkCode };