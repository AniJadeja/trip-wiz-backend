function validateAndConvertToJSON(input) {
    // Check if the input is already a JSON object
    if (typeof input === 'object' && !Array.isArray(input)) {
      return input; // It's already a JSON object, so return as-is
    } else {
      try {
        // Try to parse the input as JSON
        const jsonObject = JSON.parse(input);
        if (typeof jsonObject === 'object' && !Array.isArray(jsonObject)) {
          return jsonObject; // Successfully parsed as JSON object
        } else {
          return null; // Parsed as JSON, but not an object
        }
      } catch (error) {
        return null; // Unable to parse as JSON
      }
    }
  }
  exports.validateAndConvertToJSON = validateAndConvertToJSON;