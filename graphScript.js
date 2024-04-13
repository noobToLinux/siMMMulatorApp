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

function getGraphData(xValues,yFunc){
    let dataList = [];
    let previous = 0;
    for (let i=1; i<xValues.length; i++){
        let actual = x[i]
        data = {'x':x,'y':yFunc(x)};
        dataList.push(data);
    }
    return {'dataset':dataList}
}

function plotGeometric(){
    let config = {
        'type':'line',
        'data': [],
    }
}