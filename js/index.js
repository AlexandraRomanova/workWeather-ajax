const ctx = document.querySelector('.js-chart').getContext('2d');
const GLOBAL_MEAN_TEMPERATURE = 14;


fetchData().then(parseData).then(getLabelsAndData).then(({years, temps}) => drawChart(years, temps))

async function fetchData() {
    const response = await fetch("./ZonAnn.Ts+dSST.csv");
    const data = await response.text();
    return data;
};

function parseData(data) {
    return Papa.parse(data, { header: true }).data;
};

function getLabelsAndData(data) {
    return data.reduce((acc, entry) => {
        acc.years.push(entry.Year);      
        acc.temps.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);
        acc.nhem.push(entry.NHem);
        acc.shem.push(entry.SHem);

        return acc;
    }, { years: [], temps: [], nhem: [], shem: [] });
};

function drawChart(labels, data, nhem, shem) {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels,    
            datasets: [         
            {
                label: ' Средняя глобальная температура',
                data,
                backgroundColor: 'rgba(153, 102, 255, 1)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    callback (value) {
                        return value + "°";
                    }
                }
            }
        }
    }
    });
}


// async function fetchData() {
//     const response = await fetch("./ZonAnn.Ts+dSST.csv");
//     const data = await response.text();

    // const parseData = Papa.parse(data, { header: true }).data;

    // const mappedData = parseData.reduce((acc, entry) => {
    //     acc.years.push(entry.Year);
    //     acc.temps.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);

    //     return acc;
    // }, { years: [], temps: [] });

    // эти две строчки пояснение к reduce, лучше использовать его, чем два map
    // const years = parseData.map(entry => entry.Year);
    // const temps = parseData.map(entry => Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);
    
    // new Chart(ctx, {
    // type: 'line',
    // data: {
    //     labels: mappedData.years,
    //     datasets: [
    //         {
    //         label: ' Средняя глобальная температура',
    //         data: mappedData.temps,
    //         borderColor: 'rgba(153, 102, 255, 1)',
    //         borderWidth: 1,
    //         }
    //     ]
    // },
    // options: {
    //     scales: {
    //         y: {
    //             ticks: {
    //                 // Include a dollar sign in the ticks
    //                 callback (value, index, values) {
    //                     return value + "°";
    //                 }
    //             }
    //         }
    //     }
    // }
    // });
// }

// fetchData()