

// 利用 chart.js 绘制图表
//export function setBarChart(obj, jsonString, third) {
export function drawGanttChart(obj) {

    // 註冊 zoom plugin
    if (typeof window.ChartZoom !== 'undefined' && !window.Chart.registry.plugins.get('zoom')) {
        window.Chart.register(window.ChartZoom);
    }

    // 清除圖表
    var myChart = Chart.getChart(obj);
    if (myChart != undefined) {
        myChart.destroy();
    }

    const items = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const data = {
        labels: items,
        datasets: [{
            label: '專案週期',
            data: [
                { x: ['2025-07-01T00:00:00', '2025-07-05T00:00:00'], y: 0 },
                { x: ['2025-07-03T00:00:00', '2025-07-10T00:00:00'], y: 1 },
                { x: ['2025-07-04T00:00:00', '2025-07-14T00:00:00'], y: 2 },
                { x: ['2025-07-05T00:00:00', '2025-07-08T00:00:00'], y: 3 },
                { x: ['2025-07-06T00:00:00', '2025-07-07T00:00:00'], y: 4 },
                { x: ['2025-07-06T00:00:00', '2025-07-07T00:00:00'], y: 5 },
                { x: ['2025-07-06T00:00:00', '2025-07-07T00:00:00'], y: 6 },
                { x: ['2025-07-10T00:00:00', '2025-07-29T00:00:00'], y: 7 },
                { x: ['2025-07-06T00:00:00', '2025-07-07T00:00:00'], y: 8 },
                { x: ['2025-07-06T00:00:00', '2025-07-07T00:00:00'], y: 9 },
                { x: ['2025-07-06T00:00:00', '2025-07-07T00:00:00'], y: 10 },
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            // parsing: { ... } // 已移除 parsing 設定
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        displayFormats: {
                            day: 'MM/dd'
                        }
                    },
                    min: '2025-07-01T00:00:00',
                    max: '2025-07-14T00:00:00',
                    title: {
                        display: true,
                        text: '日期'
                    },
                    ticks: {
                        stepSize: 1,
                        source: 'auto',
                        autoSkip: false,
                        callback: function (value, index, ticks) {
                            return moment(value).format('MM/DD');
                        }
                    }
                },
                y: {
                    type: 'category',
                    labels: items,
                    title: {
                        display: true,
                        text: '項目'
                    }
                }
            },
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy',
                        modifierKey: 'ctrl',
                        // Function called while the user is panning
                        onPan: function ({ chart }) { console.log(`I'm panning!!!`); },
                        // Function called once panning is completed
                        onPanComplete: function ({ chart }) { console.log(`I was panned!!!`); }
                    },
                    zoom: {
                        wheel: {
                            enabled: true // 滾輪縮放
                        },
                        drag: {
                            enabled: false // 拖曳縮放（如需可設 true）
                        },
                        mode: 'x'
                    }
                }
            }
        }
    };

    new window.Chart(obj, config);
};