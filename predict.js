const nn = ml5.neuralNetwork({ task: 'regression', debug: true })
nn.load('./model/model.json', modelLoaded)

function modelLoaded() {

      const CarNameField = document.getElementById('CarName')
      const fuelTypeField = document.getElementById("fueltype")
      const horsepowerField = document.getElementById('horsepower')
      const cylinderNumberField = document.getElementById('cylindernumber')
      const engineSizeField = document.getElementById('enginesize')
      const carLengthField = document.getElementById('carlength')
      const drivewheelField = document.getElementById('drivewheel')
      const carBodyField = document.getElementById('carbody')
      const doorNumberField = document.getElementById('doornumber')

      const predictBtn = document.getElementById('btn')
      const result = document.getElementById('result')

      predictBtn.addEventListener("click", predict)

      async function predict() {

        const CarName = Number(CarNameField.value)
        const fueltype = Number(fuelTypeField.value)
        const horsepower = Number(horsepowerField.value)
        const cylindernumber = Number(cylinderNumberField.value)
        const enginesize = Number(engineSizeField.value)
        const carlength = Number(carLengthField.value)
        const drivewheel = Number(drivewheelField.value)
        const carbody = Number(carBodyField.value)
        const doornumber = Number(doorNumberField.value)

        console.log("Input values are: ", {CarName, fueltype,horsepower, cylindernumber, enginesize, carlength, drivewheel,carbody ,doornumber})

        const predResult = await nn.predict({CarName, fueltype, horsepower, cylindernumber, enginesize, carlength, drivewheel, carbody, doornumber})
        console.log("hier")
        // console.log(predResult)

        const fmt = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })
        const estimatedPrice = fmt.format(predResult[0].price)

        result.innerText = `Voorspelde prijs is: ${estimatedPrice}`
        console.log(estimatedPrice)
      }  

}