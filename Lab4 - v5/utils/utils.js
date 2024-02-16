// Function to trim string values in an object
const trimStringValues = (obj) => {
    const trimmedObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        // Only trim string values
        trimmedObj[key] = typeof value === 'string' ? value.trim() : value;
      }
    }
    return trimmedObj;
  };
  
  module.exports = { trimStringValues };
  