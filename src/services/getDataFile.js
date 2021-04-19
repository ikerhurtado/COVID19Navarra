
import XLSX from 'xlsx'

const dataByTypeMap = new Map([
  ['vaccination', './data/GobiernoAbiertoVacunas.csv'],
  ['new-infections', './data/CasosMunicipios_ZR_Covid.csv'],
  ['situation', './data/datos_coronavirus_julio_2020.xls']
])
export function getDataFile(type, callback){

    if (type === 'situation'){
      fetch(dataByTypeMap.get(type))
      .then( response => response.arrayBuffer() )
      .then( data => {
        const workbook = XLSX.read(data, {type:"array"});
        //console.log('data workbook', workbook.Sheets)
        const pageData = XLSX.utils.sheet_to_csv(workbook.Sheets['Resumen'])
        callback(parseSituationData(pageData))

        console.log('Sit transfomm', 
          transformSituationDataToShow(parseSituationData(pageData)))
      })
    }else
      fetch(dataByTypeMap.get(type))
      .then( response => response.text() )
      .then( fileText => {
          const data = (type === 'vaccination' ? parseVaccinationData(fileText) : parseNewInfectionsData(fileText))
          callback(data)
          console.log('data loaded', data)
      })
}

export function transformVaccinationDataToShow(rawData){
    const chartData = { 
        labels: [], 
        datasets: [[], [], [], []]
    }
    rawData.forEach( dayData => {
        chartData.labels.push(dayData[0])
        chartData.datasets[0].push(dayData[1])
        chartData.datasets[1].push(dayData[2])
        chartData.datasets[2].push(dayData[7])
        chartData.datasets[3].push(dayData[8])
    })
    return chartData
}


export function transformSecondaryVaccinationDataToShow(rawData){
    const chartData = { 
        labels: [], 
        attendance: {data: [], average: 0},
        noVaccinated: {data: [], average: 0}
    }
    rawData.forEach( dayData => {
        chartData.labels.push(dayData[0])
        chartData.attendance.data.push(dayData[5])
        chartData.noVaccinated.data.push(dayData[3])
    })
    // console.log('rawData', rawData, rawData[rawData.length-1])
    return chartData
}

export function transformVaccinationDataForTable(rawData){
    const dataForTable = {data: [], averageAttendance: 0, averageNoVaccinated: 0}
    rawData.forEach( (dayData, index)  => {
        const tempDayData = []
        tempDayData.push(dayData[0], dayData[1], dayData[2], 
            dayData[7], dayData[8], dayData[5], dayData[3])
        dataForTable.data.push(tempDayData)
        if (index == rawData.length-1){
            dataForTable.averageAttendance = dayData[6]
            dataForTable.averageNoVaccinated = dayData[4]
        }
    })
    dataForTable.data.reverse()
    return dataForTable
}


function parseVaccinationData(text){

    const FIELD_NAMES_INDEX = 0 // First array element holding data field names
    const DATE_FIELD_INDEX = 0 
  
  let fieldNames // array element holding data field names
  let data = []
  
  text.split('\n').forEach( (line, index) => {

    const lineTokens = line.trim().split(';')
  	if (index == FIELD_NAMES_INDEX){
        fieldNames = lineTokens
  	}else if (lineTokens.length > 1){
        const dataRow = []
        lineTokens.forEach( (token, index) => {
          if (index == DATE_FIELD_INDEX) 
            dataRow.push(token) //*** Parse date */
          else 
            dataRow.push( token ? parseFloat(token.replace(',','.')) : null)
        })
      data.push(dataRow)
    } 
  })
  //console.log('parseVaccinationData ', data)
  return data
}


export function transformNewInfectionsDataToShow(dataByDate){
    const chartData = { labels: [], datasets: [{label: 'Nuevas infecciones', data:[]}]}
    dataByDate.forEach( dayData => {
        chartData.labels.push(dayData.date)
        chartData.datasets[0].data.push(dayData.newInfections)

    })
    return chartData
}


function parseNewInfectionsData(text){

    const FIELD_NAMES_INDEX = 0 // First array element holding data field names
    const DATE_FIELD_INDEX = 0 
  
  let fieldNames // array element holding data field names
  //let data = []
  const dataByZone = new Map() // key = area name, value = array of date infections pair

  const dataByDateMap = new Map() // c
  const dataByDate = [] // collect the same data but structured differently: by date
  
  const rawData = []
  const rawDataGroupedByMonth = new Map() 

  text.split('\n').forEach( (line, index) => {

    const lineTokens = line.trim().split(';')
  	if (index == FIELD_NAMES_INDEX){
        fieldNames = lineTokens
  	}else if (lineTokens.length > 1){
        const dayTownInfections = getLineData(lineTokens)
        addDayTownInfections(dataByZone, 'zone', dayTownInfections)
        addDayTownInfections(dataByDateMap, 'date', dayTownInfections)
        rawData.push(getTabularData(lineTokens))
    } 
  })

  dataByDateMap.forEach( (dayZoneInfections, date) => {
    let infectionCount = 0
    dayZoneInfections.forEach( data => {
        infectionCount += data.newInfections
    })
    dataByDate.push( {date: date, newInfections: infectionCount, infectionsByTown: dayZoneInfections} )
  })

  rawData.forEach( lineTokens => {
    if (rawDataGroupedByMonth.has(getYearMonth(lineTokens))){
        rawDataGroupedByMonth.get(getYearMonth(lineTokens)).push(lineTokens)
    }else
        rawDataGroupedByMonth.set(getYearMonth(lineTokens), [lineTokens])
  })
  

  //return { dataByZone: dataByZone, dataByDate: dataByDate}
  console.log('parseNewInfectionsData dataByDate', dataByDate, 
  'dataByZone', dataByZone, 'rawDataGroupedByMonth', rawDataGroupedByMonth)
  return { rawData: rawDataGroupedByMonth, dataByDate: dataByDate}


  function getLineData(lineTokens){
    const dayTownInfections = {} 
    dayTownInfections.date = lineTokens[DATE_FIELD_INDEX].split(' ')[0]
    dayTownInfections.zone = lineTokens[2]
    dayTownInfections.town = lineTokens[4]
    dayTownInfections.newInfections = parseInt(lineTokens[5])
    return dayTownInfections
  }

  function getTabularData(lineTokens){
      return [lineTokens[DATE_FIELD_INDEX].split(' ')[0], 
        lineTokens[2], lineTokens[4], parseInt(lineTokens[5])]
  }

  function addDayTownInfections(map, mapType, dayTownInfections){
    if (map.has(dayTownInfections[mapType])){
        map.get(dayTownInfections[mapType]).push(dayTownInfections)
    }else{
        map.set(dayTownInfections[mapType], [dayTownInfections])
    }
  }

  function getYearMonth(lineTokens){
      return lineTokens[DATE_FIELD_INDEX].substring(0,7)
  }

}


function parseSituationData(text){

  const DATA_ROWS_FROM_INDEX = 6 // First array element holding data field names
  const DATE_FIELD_INDEX = 0 

  let data = []
  
  text.split('\n').forEach( (line, index) => {
    const lineTokens = line.trim().split(',')
    if (index < DATA_ROWS_FROM_INDEX){
      // console.log('HHHHHHHHHH', lineTokens)
    }else if (lineTokens.length > 1){
        const dataRow = []
        lineTokens.forEach( (token, index) => {
          if (index < 15)
            if (index == DATE_FIELD_INDEX) 
              dataRow.push(token) //*** Parse date */
            else 
              dataRow.push( token ? parseFloat(token) : null)
        })
      data.push(dataRow)
    } 
  })
  data.reverse()
  console.log('parseSituationData ', data)
  return data
}


export function transformSituationDataToShow(rawData){
  const chartData = { 
      labels: [], 
      datasets: [[], [], [], [], [], []]
  }
  rawData.forEach( dayData => {
      chartData.labels.push(dayData[0])
      chartData.datasets[0].push(dayData[4]) // deads
      chartData.datasets[1].push(dayData[3]) // accumulated deads
      chartData.datasets[2].push(dayData[11]) // new hospaializations
      chartData.datasets[3].push(dayData[12]) // accumulted hospaializations
      chartData.datasets[4].push(dayData[13]) // new in UCI
      chartData.datasets[5].push(dayData[14]) // accumulated UCI
  })
  return chartData
}