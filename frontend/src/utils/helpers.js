/**
 * Utility Functions
 * Helper functions for strings, validation, formatting
 */

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date (MM/DD/YYYY HH:MM)
 */
export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return (
    d.toLocaleDateString("en-US") +
    " " +
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  );
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency ($X,XXX.XX)
 */
export const formatCurrency = (amount) => {
  if (!amount) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

/**
 * Generate SKU from category
 * @param {string} category - Product category
 * @returns {string} SKU prefix
 */
export const generateSKUPrefix = (category) => {
  return category ? category.slice(0, 4).toUpperCase() : "ITEM";
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate string to max length
 * @param {string} str - String to truncate
 * @param {number} maxLen - Max length
 * @returns {string} Truncated string with ... if longer
 */
export const truncate = (str, maxLen = 50) => {
  if (!str) return "";
  return str.length > maxLen ? str.slice(0, maxLen) + "..." : str;
};

/**
 * Deep clone object
 * @param {object} obj - Object to clone
 * @returns {object} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Group array by property
 * @param {array} arr - Array to group
 * @param {string} key - Property to group by
 * @returns {object} Grouped object
 */
export const groupBy = (arr, key) => {
  return arr.reduce((result, obj) => {
    const group = obj[key];
    if (!result[group]) result[group] = [];
    result[group].push(obj);
    return result;
  }, {});
};
