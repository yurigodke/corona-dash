function preparData(dataInfo) {
  const labels = Object.keys(dataInfo);

  const getValues = key => {
    let values = [];
    for (var date in dataInfo) {
      const valueItem = dataInfo[date][key] || 0;
      values.push(valueItem);
    }

    return values;
  };

  const getProcessedValues = key => {
    let values = [];

    for (var date in dataInfo) {
      switch (key) {
        case "active":
          const nurseryValueItem = dataInfo[date]["nursery"] || 0;
          const icuValueItem = dataInfo[date]["icu"] || 0;
          values.push(nurseryValueItem + icuValueItem);
          break;
        case "confirmedAverage":
          const averageDays = 3;

          let valueSum = dataInfo[date].confirmed;

          for (let i = averageDays - 1; i > 0; i--) {
            const indexSum = labels.indexOf(date) - i;
            const dateSum = indexSum < 0 ? labels[0] : labels[indexSum];
            valueSum += dataInfo[dateSum].confirmed;
          }

          values.push(Math.round(valueSum / averageDays));
          break;
        case "dailyCases":
          const indexPrevDay = labels.indexOf(date) - 1;
          const datePrevDay =
            indexPrevDay < 0 ? labels[0] : labels[indexPrevDay];
          const valuePrevDay = dataInfo[datePrevDay].confirmed;

          const valueCurrent = dataInfo[date].confirmed;

          values.push(valueCurrent - valuePrevDay);
          break;
        case "perPopulation":
          const population = 142761;

          values.push(
            Math.round((100000 / population) * dataInfo[date].confirmed)
          );
          break;
        default:
      }
    }

    return values;
  };

  const getLastValues = dataInfo => {
    const lastValue = dataInfo[dataInfo.length - 1] || 0;
    const second2LastValue = dataInfo[dataInfo.length - 2] || 0;

    const returnData = {
      value: lastValue,
      diff: Math.round((lastValue * 100) / second2LastValue - 100)
    };

    return returnData;
  };

  const notifiedValues = {
    label: "Casos notificados",
    fill: false,
    lineTension: 0.5,
    borderColor: "#f7b731",
    borderCapStyle: "butt",
    borderJoinStyle: "miter",
    pointBackgroundColor: "#f7b731",
    pointBorderWidth: 5,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#f7b731",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: getValues("notified")
  };

  const discartedValues = {
    label: "Casos descartados",
    fill: false,
    lineTension: 0.5,
    borderColor: "#d1d8e0",
    borderCapStyle: "butt",
    borderJoinStyle: "miter",
    pointBackgroundColor: "#d1d8e0",
    pointBorderWidth: 5,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#d1d8e0",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: getValues("discarted")
  };

  const confirmedValues = {
    label: "Casos confirmados",
    fill: false,
    lineTension: 0.5,
    borderColor: "#0fb9b1",
    borderCapStyle: "butt",
    borderJoinStyle: "miter",
    pointBackgroundColor: "#0fb9b1",
    pointBorderWidth: 5,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#0fb9b1",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: getValues("confirmed")
  };

  const confirmedAverage = {
    label: "Casos confirmados (média últimos 3 dias)",
    fill: false,
    lineTension: 0.5,
    borderColor: "#f7b731",
    borderCapStyle: "butt",
    borderJoinStyle: "miter",
    pointBackgroundColor: "#f7b731",
    pointBorderWidth: 5,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#f7b731",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: getProcessedValues("confirmedAverage")
  };

  const waitResultValues = {
    label: "Aguardando resultado",
    fill: false,
    lineTension: 0.5,
    borderColor: "#4b7bec",
    borderCapStyle: "butt",
    borderJoinStyle: "miter",
    pointBackgroundColor: "#4b7bec",
    pointBorderWidth: 5,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#4b7bec",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: getValues("waitResult")
  };

  const recoveredValues = {
    label: "Recuperados",
    fill: false,
    lineTension: 0.5,
    borderColor: "#26de81",
    borderCapStyle: "butt",
    borderJoinStyle: "miter",
    pointBackgroundColor: "#26de81",
    pointBorderWidth: 5,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#26de81",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: getValues("recovered")
  };

  const deathValues = {
    label: "Óbitos",
    fill: false,
    lineTension: 0.5,
    borderColor: "#eb3b5a",
    borderCapStyle: "butt",
    borderJoinStyle: "miter",
    pointBackgroundColor: "#eb3b5a",
    pointBorderWidth: 5,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#eb3b5a",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: getValues("death")
  };

  const suspectDeathValues = {
    label: "Óbitos suspeitos",
    fill: false,
    lineTension: 0.5,
    borderColor: "#f7b731",
    borderCapStyle: "butt",
    borderJoinStyle: "miter",
    pointBackgroundColor: "#f7b731",
    pointBorderWidth: 5,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#f7b731",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: getValues("suspectDeath")
  };

  const nurseryValues = {
    label: "Enfermaria",
    fill: false,
    lineTension: 0.5,
    borderColor: "#fed330",
    borderCapStyle: "butt",
    borderJoinStyle: "miter",
    pointBackgroundColor: "#fed330",
    pointBorderWidth: 5,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#fed330",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: getValues("nursery")
  };

  const icuValues = {
    label: "UTI",
    fill: false,
    lineTension: 0.5,
    borderColor: "#fc5c65",
    borderCapStyle: "butt",
    borderJoinStyle: "miter",
    pointBackgroundColor: "#fc5c65",
    pointBorderWidth: 5,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#fc5c65",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: getValues("icu")
  };

  const activeValues = {
    label: "Em tratamento",
    fill: false,
    lineTension: 0.5,
    borderColor: "#45aaf2",
    borderCapStyle: "butt",
    borderJoinStyle: "miter",
    pointBackgroundColor: "#45aaf2",
    pointBorderWidth: 5,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#45aaf2",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: getProcessedValues("active")
  };

  const dailyCases = {
    label: "Casos diários",
    fill: false,
    lineTension: 0.5,
    borderColor: "#4b7bec",
    backgroundColor: "#4b7bec",
    borderCapStyle: "butt",
    borderJoinStyle: "miter",
    pointBackgroundColor: "#4b7bec",
    pointBorderWidth: 5,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#4b7bec",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: getProcessedValues("dailyCases")
  };

  const perPopulationCases = {
    label: "Casos por 100 mil habitantes",
    fill: false,
    lineTension: 0.5,
    borderColor: "#4b7bec",
    backgroundColor: "#4b7bec",
    borderCapStyle: "butt",
    borderJoinStyle: "miter",
    pointBackgroundColor: "#4b7bec",
    pointBorderWidth: 5,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#4b7bec",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: getProcessedValues("perPopulation")
  };

  const consolidated = {
    confirmed: getLastValues(confirmedValues.data),
    active: getLastValues(activeValues.data),
    recovered: getLastValues(recoveredValues.data),
    nursery: getLastValues(nurseryValues.data),
    icu: getLastValues(icuValues.data),
    death: getLastValues(deathValues.data)
  };

  const general = {
    labels,
    datasets: [
      confirmedValues,
      confirmedAverage,
      perPopulationCases,
      deathValues
    ]
  };

  const balance = {
    labels,
    datasets: [
      notifiedValues,
      discartedValues,
      confirmedValues,
      waitResultValues
    ]
  };

  const death = {
    labels,
    datasets: [suspectDeathValues, deathValues, recoveredValues]
  };

  const hospital = {
    labels,
    datasets: [nurseryValues, icuValues, activeValues]
  };

  const daily = {
    labels,
    datasets: [dailyCases]
  };

  return { consolidated, general, balance, death, hospital, daily };
}

export default preparData;
