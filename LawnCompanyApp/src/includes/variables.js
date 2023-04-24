    // Variables
    export const appName  = 'Austin\'s Lawn Tracking App';

    /**
     * List of Available Categories
     */
    export const categories = [
      { id: "rs", text: "Routine Service" },
      { id: "gm", text: "Garden/Mulch" },
      { id: "lr", text: "Lawn Rolling" },
      { id: "ls", text: "Lay Sod" },
      { id: "al", text: "Aerate Lawn" },
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
