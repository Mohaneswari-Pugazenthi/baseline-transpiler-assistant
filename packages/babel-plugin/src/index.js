// packages/babel-plugin/src/index.js

const { getViolation } = require('@baseline/baseline-checker');

// The file MUST export a function that accepts the Babel instance
module.exports = function({ types: t }) { 
  return {
    name: "baseline-babel-plugin",
    visitor: {
      MemberExpression(path) {
        const featureId = 'array-flat'; 
        
        if (t.isIdentifier(path.node.property, { name: "flat" })) {
          const violationDetails = getViolation(featureId);
          
          if (violationDetails) {
            // Throw a compilation error to halt the build and report the issue
            throw path.buildCodeFrameError(
              path.node,
              `🚨 BASELINE VIOLATION: ${violationDetails.message}`
            );
          }
        }
      }
    }
  };
};