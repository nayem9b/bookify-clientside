/**
 * Security Configuration for Bookify Application
 * 
 * This module provides security-related constants, validation functions, 
 * and utilities to help maintain security best practices throughout the application.
 */

// Security validation patterns
export const SECURITY_PATTERNS = {
  // Prevent potential XSS by validating potentially dangerous inputs
  SAFE_INPUT: /^[a-zA-Z0-9\s\-_.@!?,():;/]*$/,
  SAFE_NAME: /^[a-zA-Z\s\-'.]{1,50}$/,
  SAFE_EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  SAFE_URL: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
  SAFE_SLUG: /^[a-z0-9-_.]+$/,
};

// Security-related configuration
export const SECURITY_CONFIG = {
  // Maximum allowed file size (10MB)
  MAX_FILE_SIZE: 10 * 1024 * 1024,

  // Input validation limits
  MAX_INPUT_LENGTH: 1000,
  MAX_TITLE_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 5000,

  // Rate limiting (these would be enforced on the backend, but defined here for consistency)
  RATE_LIMIT_REQUESTS: 100,
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes

  // Session management
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
  SESSION_REFRESH_THRESHOLD: 30 * 60 * 1000, // 30 minutes before expiry

  // Security headers to be validated
  REQUIRED_SECURITY_HEADERS: [
    'content-security-policy',
    'x-content-type-options',
    'x-frame-options',
    'x-xss-protection'
  ]
};

// Security utility functions
export const SecurityUtils = {
  /**
   * Validates if a string is safe to use without XSS risks
   * @param {string} input - The string to validate
   * @returns {boolean} - Whether the string is safe
   */
  isSafeString: (input) => {
    if (typeof input !== 'string') return false;
    return SECURITY_PATTERNS.SAFE_INPUT.test(input);
  },

  /**
   * Sanitizes a string by removing potentially dangerous characters
   * @param {string} input - The string to sanitize
   * @returns {string} - Sanitized string
   */
  sanitizeString: (input) => {
    if (typeof input !== 'string') return '';
    
    // Remove potentially dangerous characters
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/<iframe\b[^>]*>/gi, '')
      .replace(/<object\b[^>]*>/gi, '')
      .replace(/<embed\b[^>]*>/gi, '');
  },

  /**
   * Validates email format
   * @param {string} email - The email to validate
   * @returns {boolean} - Whether the email is valid
   */
  isValidEmail: (email) => {
    return SECURITY_PATTERNS.SAFE_EMAIL.test(email);
  },

  /**
   * Validates name format
   * @param {string} name - The name to validate
   * @returns {boolean} - Whether the name is valid
   */
  isValidName: (name) => {
    return SECURITY_PATTERNS.SAFE_NAME.test(name);
  },

  /**
   * Checks if file size is within allowed limits
   * @param {File} file - The file to check
   * @returns {boolean} - Whether the file size is acceptable
   */
  isFileSizeValid: (file) => {
    if (!file) return false;
    return file.size <= SECURITY_CONFIG.MAX_FILE_SIZE;
  },

  /**
   * Validates URL format
   * @param {string} url - The URL to validate
   * @returns {boolean} - Whether the URL is valid
   */
  isValidURL: (url) => {
    return SECURITY_PATTERNS.SAFE_URL.test(url);
  },

  /**
   * Creates a secure random string (for CSRF tokens, etc.)
   * @param {number} length - Length of the string to generate
   * @returns {string} - Secure random string
   */
  generateSecureString: (length = 32) => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  /**
   * Gets security headers that should be present in API responses
   * @returns {Object} - Security headers configuration
   */
  getSecurityHeaders: () => {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };
  }
};

// Content Security Policy configuration
export const CSP_CONFIG = {
  // These values should match the CSP in index.html
  DIRECTIVES: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 
                "https://*.firebase.com", "https://*.googleapis.com", 
                "https://*.gstatic.com", "https://www.google.com", 
                "https://www.gstatic.com", "https://apis.google.com"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://*.googleapis.com", "https://fonts.googleapis.com"],
    imgSrc: ["'self'", "data:", "https:", "http:"],
    fontSrc: ["'self'", "https://*.gstatic.com", "https://fonts.gstatic.com"],
    connectSrc: ["'self'", "https://*.firebase.com", "https://*.googleapis.com", 
                 "https://*.google.com", "wss://*.firebase.com"],
    frameSrc: ["https://*.google.com", "https://*.googleapis.com"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"],
    frameAncestors: ["'none'"]
  },

  // Generate CSP string from directives
  generateCSPString: () => {
    const directives = CSP_CONFIG.DIRECTIVES;
    const cspParts = [];

    for (const [directive, sources] of Object.entries(directives)) {
      if (sources.length > 0) {
        const camelCaseDirective = directive.replace(/([A-Z])/g, '-$1').toLowerCase();
        cspParts.push(`${camelCaseDirective} ${sources.join(' ')}`);
      }
    }

    return cspParts.join('; ');
  }
};

// Security logging utility (to be used sparingly and carefully to avoid log injection)
export const SecurityLogger = {
  /**
   * Logs security-related events (should be used carefully to avoid logging sensitive data)
   * @param {string} message - The security message to log
   * @param {Object} metadata - Additional metadata (should be sanitized)
   */
  logSecurityEvent: (message, metadata = {}) => {
    // In a real application, this would send to a secure logging service
    // For now, we'll log to console but in production this should be sent to a secure backend service
    const sanitizedMetadata = {
      timestamp: new Date().toISOString(),
      event: message,
      ...Object.keys(metadata).reduce((acc, key) => {
        // Sanitize each value to prevent log injection
        acc[key] = typeof metadata[key] === 'string' ? 
          SecurityUtils.sanitizeString(metadata[key]) : 
          metadata[key];
        return acc;
      }, {})
    };

    // Note: In a real application, this would send to a secure logging service
    if (process.env.NODE_ENV === 'development') {
      console.log('Security Event:', sanitizedMetadata);
    }
  }
};

export default SecurityUtils;