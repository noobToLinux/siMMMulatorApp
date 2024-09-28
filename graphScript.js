//import Chart from 'chart.js/auto';

const e=2.7182818;

function fSat(alpha,gamma){
    function f(x){
        return x**alpha/(x**alpha+gamma**alpha);
    }
    return f;
}

function fGeoAdStock(theta){
    function decay(t){
        return 1/e**(theta*t)
    }
    /*
    function f(actual,previous){
        return actual + theta*previous;
    }
    */
    return decay;
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
    /*
    function f(actual,previous,t){
        return actual + funMap[type](t)*previous;
    }
    */
    return funMap[type];
}

function getChart(){
    return document.getElementById('Grafica');
}

function genXRange(min,max,step){
    let xValues = [];
    for (let x=min; x<=max; x+=step){xValues.push(Math.round(x*100)/100);}
    return xValues;
}

function genRevXRange(max,min,step){
    let xValues = [];
    for (let x=max; x>=min; x+=step){xValues.push(Math.round(x*100)/100);}
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

function getYValues(xValues,yFunc){
    let yList = [];
    for (let i=1; i<xValues.length; i++){
        yList.push(yFunc(xValues[i]));
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

function getConfig(XData,YData,varName,adStock){
    return {
        'type':'line',
        'data': {
            'labels':XData,
            'datasets': [
                {
                    'label':adStock +' '+varName,
                    'data':YData,
                    'backgroundColor': 'rgba(153, 0, 153, 0.2)', // Color de fondo
                    'borderColor': 'rgba(204, 0, 204, 1)', // Color de borde
                    'borderWidth': 1 // Ancho del borde
                }
            ]
        },
    }
}


async function plotGeometric(theta,varName){
    removeCanvas();
    createCanvas();
    if (theta === ''){return undefined;}
    X = genXRange(0,10,0.1);
    f = fGeoAdStock(theta);
    Y = getYValues(X,f);
    let config = getConfig(X,Y,varName,'geometric');
    let ctx = getChart().getContext('2d');
    new Chart(
        ctx,
        config
    );
    
    return undefined;
}

async function plotWeibull(shape,scale,type,varName){
    removeCanvas();
    createCanvas();
    if (shape === '' || scale === '' || type===''){return undefined;}
    X = genXRange(0,2,0.01);
    f = fWeibullAdStock(shape,scale,type);
    Y = getYValues(X,f);
    let config = getConfig(X,Y,varName,'weibull_'+type);
    let ctx = getChart().getContext('2d');
    new Chart(
        ctx,
        config
    );
    return undefined;
}