//import Chart from 'chart.js/auto';

const e=2.7182818;

function fSat(alpha,gamma){
    function f(x){
        return x**alpha/(x**alpha+gamma**alpha);
    }
    return f;
}

function fGeoAdStock(theta){
    function f(actual,previous){
        return actual + theta*previous;
    }
    return f;
}

function fWeibullAdStock(shape,scale,type='pdf'){
    function pdf(t){
        return scale*shape*(scale*t)**(shape-1)*e**((-1)*(scale*t)**shape);
    }

    function cdf(t){
        return 1-e**((-1)*(scale*t)**shape)
    }
    let funMap = {
        'pdf':pdf,
        'cdf':cdf
    }
    function f(actual,previous,t){
        return actual + funMap[type](t)*previous;
    }
    return f;
}

function getChart(){
    return document.getElementById('Grafica');
}

function genXRange(min,max,step){
    let xValues = [];
    for (let x=min; x<=max; x+=step){xValues.push(x);}
    return xValues;
}

function getGeoGraphData(xValues,yFunc){
    let dataList = [];
    let previous = 0;
    for (let i=1; i<xValues.length; i++){
        let actual = xValues[i]
        data = {'x':actual,'y':yFunc(previous,actual)};
        dataList.push(data);
        previous = actual
    }
    return {'dataset':dataList}
}

function getGeoYValues(xValues,yFunc){
    let yList = []
    let previous = 0;
    for (let i=1; i<xValues.length; i++){
        let actual = xValues[i]
        yList.push(yFunc(actual,previous))
        previous = actual
    }
    return yList;
}

function removeCanvas(){
    let chart = getChart();
    chart.remove();
    return undefined;
}
function createCanvas(){
    let chart = document.createElement('canvas');
    chart.id='Grafica';
    document.getElementById('canvasContainer').appendChild(chart);
    return undefined;
}

async function plotGeometric(theta){
    removeCanvas();
    createCanvas();
    if (theta === ''){return undefined;}
    console.log(theta,'A');
    X = genXRange(0,100,1);
    f = fGeoAdStock(theta);
    Y = getGeoYValues(X,f);
    let config = {
        'type':'line',
        'data': {
            'labels':X,
            'datasets': [
                {
                    'label':'AdStock Geometrico',
                    'data':Y,
                    'backgroundColor': 'rgba(153, 0, 153, 0.2)', // Color de fondo
                    'borderColor': 'rgba(204, 0, 204, 1)', // Color de borde
                    'borderWidth': 1 // Ancho del borde
                }
            ]
        },
    }
    let ctx = getChart().getContext('2d')
    new Chart(
        ctx,
        config
    );
    return undefined;
}