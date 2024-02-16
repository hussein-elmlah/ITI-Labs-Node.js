// Custom validator function to check if value contains only whitespace characters
const notEmptyValidator = {
    validator: function(value) {
      return value.trim().length > 0;
    },
    message: 'Field cannot be empty or contain only whitespace characters'
  };
  
  module.exports = notEmptyValidator;
  