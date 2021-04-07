class ChartWrapper{

    constructor(type = "bar", options = {} ){
        this.canvas = document.createElement('canvas')
  
        this.graphConfig = {
          "type": type,//"bar",
          "options": options// { }
        }
  
        this.chart = new Chart.Chart(this.canvas, this.graphConfig)
        this.chart.data.datasets = []
    }
  
  
    setDataSets(daysNum, ...dataSets){
  
      this.chart.data.labels = data[0].slice(-daysNum)
  
      this.dataSetNames = dataSets
  
      dataSets.forEach( dataSetName => {
  
        //let name = dataSetName
        let group
        if (dataSetName.includes(':')){
          [dataSetName, group] = dataSetName.split(':')
        }
  
        let dataSetObj = {
          "label": dataSetName,
  
          "data": data[nameIndexDataMap.get(dataSetName).index].slice(-daysNum),
          "fill": true,
          'backgroundColor': nameIndexDataMap.get(dataSetName).color,
          "borderColor": 'grey',
          "lineTension": 0.1
        }
        if (group) dataSetObj.stack = group
        if (dataSetName == 'Tests de anticuerpos' || dataSetName == 'Tests PCR'){
          dataSetObj.hidden = true
          dataSetObj.text = dataSetName
         
        } 
        this.chart.data.datasets.push(dataSetObj)
      })
      this.chart.update()
    }
  
  
    updateShowingDays(daysNum){
  
      if (daysNum == 0){
        let i = 0
        this.chart.data.datasets.forEach( dataSetObject => {
          dataSetObject.data = data[nameIndexDataMap.get(this.dataSetNames[i++]).index]
        })
        this.chart.data.labels = data[0]
  
      }else{
        let i = 0
        this.chart.data.datasets.forEach( dataSetObject => {
          dataSetObject.data = data[nameIndexDataMap.get(this.dataSetNames[i++]).index].slice(-daysNum)
        })
        this.chart.data.labels = data[0].slice(-daysNum)
      }
      this.chart.update()
    }
  
  }