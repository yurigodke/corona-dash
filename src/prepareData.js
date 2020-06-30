class prepareData {
  constructor(data) {
    this.dataInfo = data;
    this.values = {};

    this.labels = this.getChartLabel();
    this.labelsWeek = this.getChartLabel("byWeek");
  }

  string2Date = string => {
    const splitedDate = string.split("/");

    const dateString =
      splitedDate[1] + "/" + splitedDate[0] + "/" + splitedDate[2];

    return new Date(dateString);
  };

  date2String = date => {
    const day = date.getDate() >= 9 ? date.getDate() : "0" + date.getDate();
    const month =
      date.getMonth() >= 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);

    return day + "/" + month + "/" + date.getFullYear();
  };

  getChartDataSet = (title, color, values) => {
    return {
      label: title,
      fill: false,
      lineTension: 0.5,
      borderColor: color,
      borderCapStyle: "butt",
      borderJoinStyle: "miter",
      pointBackgroundColor: color,
      backgroundColor: color,
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: color,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: values
    };
  };

  getChartLabel = (type = "byDay") => {
    let labels = [];

    switch (type) {
      case "byDay":
        labels = Object.keys(this.dataInfo);
        break;
      case "byWeek":
        const labelsWeek = [];
        const labelsDay = Object.keys(this.dataInfo);

        const firstDate = this.string2Date("01/03/2020");
        const lastDate = this.string2Date(labelsDay[labelsDay.length - 1]);

        let weekCount = 1;
        while (
          new Date(firstDate.getTime() + 6.048e8 * weekCount).getTime() <=
          lastDate.getTime()
        ) {
          const dateWeek = new Date(firstDate.getTime() + 6.048e8 * weekCount);
          labelsWeek.push(this.date2String(dateWeek));
          weekCount++;
        }

        labels = labelsWeek;
        break;
      default:
    }

    return labels;
  };

  getSimpleValues = key => {
    if (!this.values[key]) {
      let values = [];

      for (var date in this.dataInfo) {
        const valueItem = this.dataInfo[date][key] || 0;
        values.push(valueItem);
      }

      this.values[key] = values;
    }

    return this.values[key];
  };

  getConsolidateValue = itemData => {
    const lastValue = itemData[itemData.length - 1] || 0;
    const second2LastValue = itemData[itemData.length - 2] || 0;

    const returnData = {
      value: lastValue,
      diff: Math.round((lastValue * 100) / second2LastValue - 100)
    };

    return returnData;
  };

  getConsolidateData = () => {
    return {
      confirmed: this.getConsolidateValue(this.getSimpleValues("confirmed")),
      active: { value: 0, diff: 0 },
      recovered: this.getConsolidateValue(this.getSimpleValues("recovered")),
      nursery: this.getConsolidateValue(this.getSimpleValues("nursery")),
      icu: this.getConsolidateValue(this.getSimpleValues("icu")),
      death: this.getConsolidateValue(this.getSimpleValues("death"))
    };
  };

  getAverageValues = (dataInfo, averageTarget) => {
    let values = [];

    dataInfo.forEach((item, index) => {
      let valueSum = item;

      for (let i = averageTarget - 1; i > 0; i--) {
        const indexSum = index - i;
        const itemSum = indexSum < 0 ? dataInfo[0] : dataInfo[indexSum];
        valueSum += itemSum;
      }

      values.push(Math.round(valueSum / averageTarget));
    });

    return values;
  };

  getPerPopulationValues = (dataInfo, population) => {
    let values = [];

    dataInfo.forEach((item, index) => {
      values.push(Math.round((100000 / population) * item));
    });

    return values;
  };

  getSumData = dataInfoList => {
    let values = [];

    dataInfoList[0].forEach((item, index) => {
      let sumValue = 0;

      dataInfoList.forEach(item => {
        sumValue += item[index];
      });

      values.push(sumValue);
    });

    return values;
  };

  getUniqValueData = dataInfo => {
    let values = [];

    dataInfo.forEach((item, index) => {
      const valuePrevDay = index - 1 < 0 ? dataInfo[0] : dataInfo[index - 1];
      values.push(item - valuePrevDay);
    });

    return values;
  };

  getWeekUniqValueData = dataInfo => {
    let weekValue = [];
    let handleWeek = 0;

    dataInfo.forEach((item, index) => {
      if (!weekValue[handleWeek]) {
        weekValue[handleWeek] = 0;
      }

      const valuePrevDay = index - 1 < 0 ? dataInfo[0] : dataInfo[index - 1];
      weekValue[handleWeek] += item - valuePrevDay;

      const currentDate = this.string2Date(this.labels[index]);
      const weekHandleDate = this.string2Date(this.labelsWeek[handleWeek]);

      if (currentDate.getTime() > weekHandleDate.getTime()) {
        handleWeek++;
      }
    });

    return weekValue;
  };

  getNotifiedProjection = () => {
    const deathValues = this.getSimpleValues("death");
    let values = [];

    deathValues.forEach(item => {
      const deathRate = 0.7;
      const deathValueItem = item || 0;

      const deathProjected = Math.round(deathValueItem / (deathRate / 100));
      values.push(deathProjected);
    });

    return values;
  };

  getChartValues = () => {
    return {
      notified: this.getChartDataSet(
        "Casos notificados",
        "#f7b731",
        this.getSimpleValues("notified")
      ),
      discarted: this.getChartDataSet(
        "Casos descartados",
        "#d1d8e0",
        this.getSimpleValues("discarted")
      ),
      confirmed: this.getChartDataSet(
        "Casos confirmados",
        "#0fb9b1",
        this.getSimpleValues("confirmed")
      ),
      death: this.getChartDataSet(
        "Óbitos",
        "#eb3b5a",
        this.getSimpleValues("death")
      ),
      waitResult: this.getChartDataSet(
        "Aguardando resultado",
        "#4b7bec",
        this.getSimpleValues("waitResult")
      ),
      recovered: this.getChartDataSet(
        "Recuperados",
        "#26de81",
        this.getSimpleValues("recovered")
      ),
      suspectDeath: this.getChartDataSet(
        "Óbitos suspeitos",
        "#f7b731",
        this.getSimpleValues("suspectDeath")
      ),
      nursery: this.getChartDataSet(
        "Enfermaria",
        "#fed330",
        this.getSimpleValues("nursery")
      ),
      icu: this.getChartDataSet("UTI", "#fc5c65", this.getSimpleValues("icu"))
    };
  };

  getProcessedChartValues = () => {
    return {
      confirmedAverage: this.getChartDataSet(
        "Casos confirmados (média últimos 3 dias)",
        "#f7b731",
        this.getAverageValues(this.getSimpleValues("confirmed"), 3)
      ),
      perPopulationCases: this.getChartDataSet(
        "Casos por 100 mil habitantes",
        "#4b7bec",
        this.getPerPopulationValues(this.getSimpleValues("confirmed"), 142761)
      ),
      active: this.getChartDataSet(
        "Em tratamento",
        "#45aaf2",
        this.getSumData([
          this.getSimpleValues("nursery"),
          this.getSimpleValues("icu")
        ])
      ),
      daily: this.getChartDataSet(
        "Casos diários",
        "#45aaf2",
        this.getUniqValueData(this.getSimpleValues("confirmed"))
      ),
      weekly: this.getChartDataSet(
        "Casos semanais",
        "#f7b731",
        this.getWeekUniqValueData(this.getSimpleValues("confirmed"))
      )
    };
  };

  getProjectionChartValues = () => {
    return {
      casesProjection: this.getChartDataSet(
        "Casos projetados",
        "#f7b731",
        this.getNotifiedProjection()
      )
    };
  };

  getRawData = () => {
    const chartValues = this.getChartValues();
    const chartProcessedValues = this.getProcessedChartValues();

    const general = {
      labels: this.labels,
      datasets: [
        chartValues["confirmed"],
        chartValues["death"],
        chartProcessedValues["confirmedAverage"],
        chartProcessedValues["perPopulationCases"]
      ]
    };

    const balance = {
      labels: this.labels,
      datasets: [
        chartValues["notified"],
        chartValues["discarted"],
        chartValues["confirmed"],
        chartValues["waitResult"]
      ]
    };

    const death = {
      labels: this.labels,
      datasets: [
        chartValues["death"],
        chartValues["suspectDeath"],
        chartValues["recovered"]
      ]
    };

    const hospital = {
      labels: this.labels,
      datasets: [
        chartValues["nursery"],
        chartValues["icu"],
        chartProcessedValues["active"]
      ]
    };

    const daily = {
      labels: this.labels,
      datasets: [chartProcessedValues["daily"]]
    };

    const weekly = {
      labels: this.labelsWeek,
      datasets: [chartProcessedValues["weekly"]]
    };

    return { general, balance, death, hospital, daily, weekly };
  };

  getProjectionsData = () => {
    const chartProjectionValues = this.getProjectionChartValues();

    const cases = {
      labels: this.labels,
      datasets: [chartProjectionValues["casesProjection"]]
    };

    return { cases };
  };
}

export default prepareData;
