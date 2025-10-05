// packages/baseline-checker/src/index.js

const { features } = require('web-features'); 
const webFeatures = Object.values(features);
    
/**
 * Checks a feature for compliance against 'web-features' data.
 * @param {string} featureId - The unique ID for the feature (e.g., 'array-flat').
 * @returns {object | null} Violation metadata or null if compliant.
 */
function getViolation(featureId) {
    const feature = webFeatures.find(f => f.id === featureId);
    
    // Check for array-flat compliance (as an example)
    if (feature && feature.status.baseline === false) {
        return {
            name: feature.name,
            status: 'limited',
            message: `Feature ${feature.name} is not Baseline compliant (Limited Availability).`,
            ast_path: feature.ast_path
        };
    }

    return null; 
}
    
module.exports = { getViolation };