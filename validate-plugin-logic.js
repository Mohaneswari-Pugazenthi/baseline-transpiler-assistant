// validate-plugin-logic.js
const plugin = require('./packages/babel-plugin/src/index.js');

// 1. Mock the Babel types object (t) and functions (isIdentifier)
const mockBabel = {
  types: {
    // This is the function your plugin calls on the AST path
    isIdentifier: (node, opts) => {
      // Simplifies the logic based on what your plugin needs: checking node.name against opts.name
      return node.name === opts.name; 
    },
    // Add other type checkers if needed, but isIdentifier is the main one here
    // For now, assume isMemberExpression is true when MemberExpression visitor is called
  }
};

// 2. Create mock nodes (as before)
const mockNode = {
  type: 'MemberExpression',
  property: {
    type: 'Identifier',
    name: 'flat' // The name your plugin checks for
  },
  loc: { start: { line: 1 } }
};

// 3. Create a mock path object (what Babel passes to the visitor)
const mockPath = {
  node: mockNode,
  // We mock buildCodeFrameError: if this is called, the test PASSED.
  buildCodeFrameError: (node, message) => {
    throw new Error(`[MOCK VIOLATION DETECTED] ${message}`);
  }
};

// 4. Get the visitor function from your plugin
// The plugin is called with mockBabel to provide the 't' object.
const visitorObject = plugin(mockBabel).visitor; 

console.log("\n--- Validating Core Plugin Logic ---");
console.log("Testing for 'Array.prototype.flat()'...");

try {
  // Manually run the mock node through your plugin's MemberExpression visitor
  visitorObject.MemberExpression(mockPath);
  
  // If no error is thrown, the logic failed to detect the violation
  console.error("❌ ERROR: Plugin failed to detect the violation. Check checker logic.");

} catch (e) {
  // If the plugin threw an error (as designed), the test passes!
  if (e.message.includes("MOCK VIOLATION DETECTED")) {
    console.log("✅ SUCCESS: The Babel Plugin successfully detected the non-compliant code.");
    console.log("The detection logic and checker linkage are CORRECT.");
    console.error("Test Output:", e.message);
  } else {
    // Catch general mock errors
    console.error("GENERAL MOCK ERROR:", e.message);
  }
}

console.log("-----------------------------------\n");