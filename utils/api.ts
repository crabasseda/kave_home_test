const fetchData = async () => {
    try {
      const url = 'https://kavehome.com/nfeeds/es/es/templatebuilder/20231221';
      const options = {
        method: 'GET',
      };
      const response = await fetch(url, options);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching product data:', error);
      throw error;
    }
  };
  
  export default fetchData;
  