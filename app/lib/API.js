const timeout = 2500; // 2.5 seconds

class API {

    static fetchData = (url) => new Promise( (resolve, reject) => {
      
         /// This URL takes several seconds to complete so we can test some features. 
         //let url = "https://api.dev-master.ninja/reactjs/slow/";

         let killFetch = setTimeout( () => {
            console.warn("TIMEOUT!!!");
            alert("TIMEOUT");
            reject({ success: false, error: 'Timeout occured' });
        }, timeout);
         /**
          * This is going to be a basic "GET" 
          */
          fetch(url)
          .then( result => result.json() ) /// convert the result to a JSON object
         .then( data => {  /// The return of 'result.json' is passed on as 'data'     
            //alert("fetch succeeded");
            clearTimeout(killFetch);
            resolve({ success: true, data: data.entries });
              /// Everything okay, so resolve 
         })
         .catch( err => {  /// Oops! we got an error! let's 'reject' this call!
            clearTimeout(killFetch);
             reject({ success: false, error: err });
         });
      
    });

    static postData = (url, data) => new Promise( (resolve, reject) => {
        const body = new FormData();
        body.append('field', data.field);
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                data: data
            })
        })
        .then(response => response.json())
        .then(data => {
            //alert("post succeeded");
            resolve(data);
        })
        .catch( error => {
            reject(error);
        });
    })
 }
 
 export default API;