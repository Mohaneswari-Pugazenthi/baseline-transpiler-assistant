// packages/baseline-checker/src/index.js
const { features } = require('web-features'); 
const webFeatures = Object.values(features);
    
function getViolation(featureId) { // <--- The function MUST be defined like this
    const feature = webFeatures.find(f => f.id === featureId);
    
    // ... rest of your logic ...

    // Compliant ('low' or 'high')
    return null; 
}
    
// 🌟 CRITICAL: This line makes the function available to other packages 🌟
module.exports = { getViolation };