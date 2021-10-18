class Calculations{

    //De afstanden tussen 2 opeenvolgende tussenstops worden berekent en op een cumulatieve manier opgeteld.
    //Dit levert een array met afstanden tot dusverre voor elke tussenstop.
    static calculateCumulativeDistances(datas){
        var distances = [];
        for(var i = 0; i < datas.length; i++){
            for(var j = 0; j < datas.length; j++){
                if(j - i == 1){
                    var dist = this.calculateDistance(datas[i], datas[j]);
                    distances.push(dist);
                }
            }
        }
        const cumulativeSum = (sum => value => sum += value)(0);
        var cumDistances = distances.map(cumulativeSum);
        return cumDistances;      
    }

    //Functie die de afstand berekent tussen 2 tussenstops. Dit onder de aanname dat 
    //de aarde plat is op een relatief kleine schaal. Het is dus een benadering en niet exact.
    static calculateDistance(stop1, stop2){
        var deltaL = Math.abs(stop1.Lengtegraad - stop2.Lengtegraad)*(Math.PI/180);
        var deltaB = Math.abs(stop1.Breedtegraad - stop2.Breedtegraad)*(Math.PI/180);
        var radiusB = 6371;
        var radiusL = Math.sin(stop1.Lengtegraad)*radiusB;
        var dist = Math.sqrt(Math.pow(deltaL*radiusL, 2) + Math.pow(deltaB*radiusB, 2)); //Pythagoras
        return dist;
    }

    static roundUpDistance(datas, cumArray){
        for(var i = 1; i < datas.length; i++){
            //Rond afstand af naar één cijfer achter de komma.
             var round = Math.round(10*cumArray[i-1])/10;
             datas[i]["Afstand"] = round;
        }
        return datas;
    }

    static calculateCoordinates(bg1, bg2, lg1, lg2){
        var latCoord = (bg1 + bg2)/2;
        var lngCoord = (lg1 + lg2)/2;
        return {
            lat: latCoord,
            lng: lngCoord
        }
    }
}
export default Calculations;