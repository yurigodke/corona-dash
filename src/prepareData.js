function preparData(dataInfo) {
  const labels = Object.keys(dataInfo);

  const getValues = key => {
    let values = [];
    for (var date in dataInfo) {
      if (key === "active") {
        const nurseryValueItem = dataInfo[date]["nursery"] || 0;
        const icuValueItem = dataInfo[date]["icu"] || 0;
        values.push(nurseryValueItem + icuValueItem);
      } else {
        const valueItem = dataInfo[date][key] || 0;
        values.push(valueItem);
      }
    }

    return values;
  };

  const getLastValues = key => {
    const lastDate = labels[labels.length - 1];
    const second2LastDate = labels[labels.length - 2];

    const returnData = {
      value: 0,
      diff: 0
    };

    let valueItem = dataInfo[lastDate][key] || 0;
    let valueSecondItem = dataInfo[second2LastDate][key] || 0;
    if (key === "active") {
      const nurseryValueItem = dataInfo[lastDate]["nursery"] || 0;
      const nurseryValueSecondItem = dataInfo[second2LastDate]["nursery"] || 0;
      const icuValueItem = dataInfo[lastDate]["icu"] || 0;
      const icuValueSecondItem = dataInfo[second2LastDate]["icu"] || 0;

      valueItem = nurseryValueItem + icuValueItem;
      valueSecondItem = nurseryValueSecondItem + icuValueSecondItem;
    } else {
      valueItem = dataInfo[lastDate][key] || 0;
      valueSecondItem = dataInfo[second2LastDate][key] || 0;
    }

    returnData.value = valueItem;
    returnData.diff = Math.round((valueItem * 100) / valueSecondItem - 100);

    return returnData;
  };

  const consolidated = {
    confirmed: getLastValues("confirmed"),
    active: getLastValues("active"),
    recovered: getLastValues("recovered"),
    death: getLastValues("death")
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
    data: getValues("active")
  };

  const general = {
    labels,
    datasets: [confirmedValues, deathValues]
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

  return { consolidated, general, balance, death, hospital };
}

export default preparData;
