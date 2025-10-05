// packages/baseline-checker/src/index.js

const { features } = require('web-features'); 
const webFeatures = Object.values(features);
    
function getViolation(featureId) {
    

    // This section handles all real checks (for production)
    const feature = webFeatures.find(f => f.id === featureId);
    
    // Only flag features that are explicitly 'false' (Limited availability)
    if (feature && feature.status.baseline === false) {
        return {
             name: feature.name,
             status: 'limited',
             message: `Feature ${feature.name} is Limited Availability.`,
             ast_path: feature.ast_path
        };
    }

    return null; // Feature is compliant (or not flagged)
}
    
module.exports = { getViolation };