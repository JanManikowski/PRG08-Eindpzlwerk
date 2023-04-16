import { createChart, updateChart } from "./scatterplot.js"
const nn = ml5.neuralNetwork({task: 'regression', debug: true})
let testData = []
function loadData(){
        Papa.parse("./data/cars.csv", {
            download:true,
            header:true, 
            dynamicTyping:true,
            complete: results => checkData(results.data)
        })
}
loadData()

function checkData(data) {
        data.sort(() => Math.random() > 0.5)   
        let trainData = data.slice(0, Math.floor(data.length * 0.8))    
        testData  = data.slice(Math.floor(data.length * 0.8) + 1)
        
        // const chardata = data.map(car => ({
        //         x: car.horsepower,
        //         y: car.price
        // }))
        for (let car of trainData) {
                nn.addData({CarName: car.CarName, fueltype: car.fueltype, horsepower: car.horsepower, cylindernumber: car.cylindernumber, enginesize: car.enginesize, carlength: car.carlength, drivewheel: car.drivewheel, carbody: car.carbody, doornumber: car.doornumber}, {price: car.price})
        }

        // createChart(chardata, "Horsepower", "Price")

        nn.normalizeData()
        nn.train({ epochs:30}, ()=> makePrediction())

        // drawPredictions()


}

// async function makePrediction() {
//         const results = await nn.predict( testData[0].horsepower )
//         console.log(`Geschat verbruik: ${results[0].price}`)
// }

// async function drawPredictions() {
//         let predictions = []
//         for (let horsepower = 48; horsepower < 288; horsepower += 1) {
//             const pred = await nn.predict({horsepower: horsepower})
//             predictions.push({x: horsepower, y: pred[0].price})
//         }
//         updateChart("Predictions", predictions)
//     }


    // Add event listener to the save button
const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
  nn.save();
  console.log("Model saved!");
});









