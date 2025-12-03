// legalContentManager.js

// Import all content files
import termsOfUseContent from "./termsOfUse.json";
import privacyPolicyContent from "./privacyPolicy.json";
import returnRefundContent from "./returnRefund.json";
import aboutUsContent from "./aboutUs.json";
import careersContent from "./careers.json";
import blogsContent from "./blogs.json";
import helpSupportContent from "./helpSupport.json";

// Export individual files
export { default as termsOfUseContent } from "./termsOfUse.json";
export { default as privacyPolicyContent } from "./privacyPolicy.json";
export { default as returnRefundContent } from "./returnRefund.json";
export { default as aboutUsContent } from "./aboutUs.json";
export { default as careersContent } from "./careers.json";
export { default as blogsContent } from "./blogs.json";
export { default as helpSupportContent } from "./helpSupport.json";

// Content registry
const contentRegistry = {
  "terms-of-use": termsOfUseContent,
  "privacy-policy": privacyPolicyContent,
  "return-refund": returnRefundContent,
  "about-us": aboutUsContent,
  careers: careersContent,
  blogs: blogsContent,
  "help-support": helpSupportContent,
};

/**
 * Get a page by its ID
 * @param {string} id - Page ID
 * @returns {Object|null} Page content or null if not found
 */
export const getPageById = (id) => {
  return contentRegistry[id] || null;
};

/**
 * Get all pages
 * @returns {Object} All pages
 */
export const getAllPages = () => {
  return { ...contentRegistry };
};

/**
 * Get pages by category
 * @param {string} category - 'legal', 'company', 'content', or 'support'
 * @returns {Array} Filtered pages
 */
export const getPagesByCategory = (category) => {
  return Object.values(contentRegistry).filter(
    (page) => page.category === category
  );
};

/**
 * Get page metadata only (lightweight)
 * @param {string} id - Page ID
 * @returns {Object|null} Page metadata
 */
export const getPageMetadata = (id) => {
  const page = getPageById(id);
  if (!page) return null;

  return {
    id: page.id,
    title: page.title,
    effectiveDate: page.effectiveDate,
    lastUpdated: page.lastUpdated,
    color: page.color,
    category: page.category,
    description: page.description,
  };
};

/**
 * Get all page metadata
 * @returns {Array} All page metadata
 */
export const getAllPagesMetadata = () => {
  return Object.values(contentRegistry).map((page) => getPageMetadata(page.id));
};

/**
 * Get section by ID from a page
 * @param {string} pageId - Page ID
 * @param {string} sectionId - Section ID
 * @returns {Object|null} Section or null
 */
export const getSection = (pageId, sectionId) => {
  const page = getPageById(pageId);
  if (!page || !page.sections) return null;

  return page.sections.find((section) => section.id === sectionId) || null;
};

/**
 * Get all legal pages (terms, privacy, refund)
 * @returns {Object} Legal pages only
 */
export const getLegalPages = () => {
  return {
    termsOfUse: contentRegistry["terms-of-use"],
    privacyPolicy: contentRegistry["privacy-policy"],
    returnRefund: contentRegistry["return-refund"],
  };
};

/**
 * Get company pages (about us, careers)
 * @returns {Object} Company pages
 */
export const getCompanyPages = () => {
  return {
    aboutUs: contentRegistry["about-us"],
    careers: contentRegistry["careers"],
  };
};

/**
 * Get content pages (blogs)
 * @returns {Object} Content pages
 */
export const getContentPages = () => {
  return {
    blogs: contentRegistry["blogs"],
  };
};

/**
 * Get support pages
 * @returns {Object} Support pages
 */
export const getSupportPages = () => {
  return {
    helpSupport: contentRegistry["help-support"],
  };
};

/**
 * Get pages as array for listing
 * @returns {Array} Array of pages with basic info
 */
export const getPagesList = () => {
  return Object.entries(contentRegistry).map(([id, page]) => ({
    id,
    title: page.title,
    description: page.description,
    category: page.category,
    color: page.color,
    url: `/${id}`,
    lastUpdated: page.lastUpdated || page.effectiveDate,
  }));
};

/**
 * Get all categories with their pages
 * @returns {Object} Categories with their pages
 */
export const getPagesByCategories = () => {
  const categories = {};

  Object.values(contentRegistry).forEach((page) => {
    if (!categories[page.category]) {
      categories[page.category] = [];
    }
    categories[page.category].push(getPageMetadata(page.id));
  });

  return categories;
};

/**
 * Search pages by keyword
 * @param {string} keyword - Search keyword
 * @returns {Array} Matching pages
 */
export const searchPages = (keyword) => {
  const results = [];
  const searchTerm = keyword.toLowerCase();

  Object.values(contentRegistry).forEach((page) => {
    const matches =
      page.title.toLowerCase().includes(searchTerm) ||
      page.description.toLowerCase().includes(searchTerm) ||
      (page.sections &&
        JSON.stringify(page.sections).toLowerCase().includes(searchTerm));

    if (matches) {
      results.push(getPageMetadata(page.id));
    }
  });

  return results;
};

// Default export
export default {
  getPageById,
  getAllPages,
  getPagesByCategory,
  getPageMetadata,
  getAllPagesMetadata,
  getSection,
  getLegalPages,
  getCompanyPages,
  getContentPages,
  getSupportPages,
  getPagesList,
  getPagesByCategories,
  searchPages,

  // Direct access
  termsOfUse: contentRegistry["terms-of-use"],
  privacyPolicy: contentRegistry["privacy-policy"],
  returnRefund: contentRegistry["return-refund"],
  aboutUs: contentRegistry["about-us"],
  careers: contentRegistry["careers"],
  blogs: contentRegistry["blogs"],
  helpSupport: contentRegistry["help-support"],
};
