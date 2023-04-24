
    
    // Variables
    export const appName  = 'Social Media App';

    /**
     * List of Available Categories
     */
    export const categories = [
      { id: "edu", text: "Education" },
      { id: "ent", text: "Entertainment" },
      { id: "gam", text: "Gaming" },
      { id: "nws", text: "News" },
      { id: "oth", text: "Other" },
    ];
  
    /**
     * Get a category based on its id.
     * @param {string} id 
     * the id of the category to retrieve.
     * @returns 
     * The category text
     */
    export const getCategory = (id) => {
      const item = categories.find(
          (category) => category.id === id
      );
      return item?.text || 'None';
  }
  /**
   * List of Available Statuses
   */
  export const statuses = [
    { id: "d", text: "Draft" },
    { id: "p", text: "Published" },
    { id: "a", text: "Draft" },
  ];
/**
 * Get a status based on its id
 * @param {string} id 
 * id of the status to retreive
 * @returns 
 * The status text
 */
  export const getStatus = (id) => {
    const item = statuses.find(
      (status) => status.id === id
    );
    return item?.text || 'Not set';
  }