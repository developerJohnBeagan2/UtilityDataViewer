

class UtilityDataApi {
  static getData() {
 
        fetch('/api/data')
        .then(function(resp) {
             return resp.json();
          })
 
        .catch(function(error) {
          throw error;
        });   
  }
}

export default UtilityDataApi;
