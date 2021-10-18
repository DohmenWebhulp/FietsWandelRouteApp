const timeout = 2500; // 2.5 seconds

class API {

    static fetchData = (url) => new Promise( (resolve, reject) => {
      
         // This URL takes several seconds to complete so we can test some features. 
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
            clearTimeout(killFetch);
            resolve({ key: url.substring(46), success: true, data: data.entries });
              /// Everything okay, so resolve 
         })
         .catch( err => {  /// Oops! we got an error! let's 'reject' this call!
            clearTimeout(killFetch);
             reject({ success: false, error: err });
         });
      
    });

    static fetchGeocode = (url) => new Promise((resolve, reject) => {

        fetch(url)
          .then( result => result.json() ) 
         .then( data => {  
            resolve({success: true, data: data });
         })
         .catch( err => { 
             reject({ success: false, error: err });
         }); 
    })

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

    static fetchTwice = (url1, url2) => new Promise((resolve, reject) => {

        let data = {fietsroutes: {}, tussenstops: {}};

        Promise.all([
            API.fetchData(url1),
            API.fetchData(url2)
        ])
        .then( result => {
            result.forEach (item => {
                switch(item.key){
                    case "Fietsroute?token=9d13205f131c93ba9b696c5761a0d5": {
                        data.fietsroutes = item.data;
                        break;
                    }
                    case "Tussenstops?token=9d13205f131c93ba9b696c5761a0d5": {
                        data.tussenstops = item.data;
                        break;
                    }
                }
            })
            resolve(data);
        })
        .catch( error => {
            reject(error);
        });
    })
 }
 
 export default API;