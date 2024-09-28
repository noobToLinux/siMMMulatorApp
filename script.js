
//Funciones para nombres de las variables
function removeRow(rowName){
    id = 'row_'+rowName;
    document.getElementById(id).remove();
    removeAllVarsParams(rowName);
    return undefined;
}

function addRow(){
    variableName = inputVariableName.value;
    //Comprobamos que no este vacío
    if (!variableName){return undefined;}
    row = document.createElement('div');
    row.classList.add("VariableName");
    row.innerHTML = `<span>${variableName}</span><button onclick="removeRow('${variableName}')"><span>&#10006;</span></button>`
    row.id=`row_${variableName}`;
    document.getElementById('variablesList').appendChild(row);
    inputVariableName.value = '';
    /* */
    addAllVarsParams(variableName)
}

inputVariableName = document.getElementById('inputVarNames');
inputVariableName.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addRow();
    }
})

function listOfVariables(){
    let rows = document.getElementById('variablesList').childNodes;
    let listOfVars = [];
    for (let r of rows){
        if (r.id){
            let name = r.id.split('_')[1];
            listOfVars.push(name);
        }
    }
    return listOfVars;
}

/*Variable params*/
function genVariableParamsBase(vName){
    /*this blueprint is the base for the params */
    div = document.createElement('div');
    div.classList.add("variableParam");
    divVar = document.createElement('div');
    spanVar = document.createElement('span');
    spanVar.classList.add("variableTitle");
    spanVar.innerHTML = vName;
    divVar.appendChild(spanVar);
    div.appendChild(divVar);
    return div;
}

function genKVP(){
    divKVP = document.createElement('div');
    divKVP.classList.add('keyValuePairs');
    return divKVP;
}


function addVarRanges(vName){
    glob = genVariableParamsBase(vName);
    kVP = genKVP();
    kvMax = document.createElement('div');
    kvMin = document.createElement('div');
    kvMax.classList.add('keyValue');
    kvMin.classList.add('keyValue');
    spanMin = document.createElement('span');
    spanMin.innerHTML='Gasto mínimo:';
    spanMax = document.createElement('span');
    spanMax.innerHTML='Gasto máximo:';

    inputMin = document.createElement('input');
    inputMax = document.createElement('input');

    inputMin.type = 'number';
    inputMax.type = 'number';

    inputMin.min = '0';
    inputMax.min = '0';

    kvMax.appendChild(spanMax);
    kvMax.appendChild(inputMax);

    kvMin.appendChild(spanMin);
    kvMin.appendChild(inputMin);

    kVP.appendChild(kvMin);
    kVP.appendChild(kvMax);

    glob.appendChild(kVP);

    glob.id = 'varRange_'+vName;
    glob.classList.add('divInputVariableRange');

    /*Añadimos el elemento al html */
    main = document.getElementById('varRanges');
    main.appendChild(glob);
    return undefined;
}


function addVarAdStock(vName){
    glob = genVariableParamsBase(vName);
    kVP = genKVP();
    glob.classList.add('divInputAdStockParam');
    glob.id = 'varAd_'+vName;

    kvT = document.createElement('div');
    kvT.classList.add('keyValue');
    kvT.classList.add('geometricParam');
    kvSp = document.createElement('div');
    kvSp.classList.add('keyValue');
    kvSp.classList.add('weibullParam');
    kvSc = document.createElement('div');
    kvSc.classList.add('keyValue');
    kvSc.classList.add('weibullParam');

    thetaSpan = document.createElement('span');
    thetaSpan.innerHTML = 'Theta:';
    thetaInput = document.createElement('input');
    thetaInput.type = 'number';
    thetaInput.min = '0';
    thetaInput.max = '1';
    thetaInput.step = '0.01';
    thetaInput.classList.add('thetaParam');
    /**/
    function thetaSteps(){
        plotGeometric(thetaInput.value,vName);
    }
    thetaInput.addEventListener('click',function (){
        thetaSteps();
    });
    thetaInput.addEventListener('input',function (){
        thetaSteps();
    });
    /*Ponemos los dos para que lo haga tanto en el click como al escribir*/

    shapeSpan = document.createElement('span');
    shapeSpan.innerHTML = 'Shape:';
    shapeInput = document.createElement('input');
    shapeInput.type = 'number';
    shapeInput.min = "0.0001"
    shapeInput.classList.add('shapeParam');
    
    scaleSpan = document.createElement('span');
    scaleSpan.innerHTML = 'Scale:';
    scaleInput = document.createElement('input');
    scaleInput.type = 'number';
    scaleInput.min = '0';
    scaleInput.max = '1';
    scaleInput.step = '0.01';
    scaleInput.classList.add('scaleParam');

    function shapeSteps(){
        let weibullType = document.querySelector('input[name=radioDF]:checked').value;
        let scaleValue = scaleInput.value;
        let shapeValue = shapeInput.value;
        if (scaleValue){
            plotWeibull(shapeValue,scaleValue,weibullType,vName)
        }
    }

    shapeInput.addEventListener('click',function(){
        shapeSteps();
    })
    shapeInput.addEventListener('input',function(){
        shapeSteps();
    })

    function scaleSteps(){
        weibullType = document.querySelector('input[name=radioDF]:checked').value;
        scaleValue = scaleInput.value;
        shapeValue = shapeInput.value;
        if (shapeValue){
            plotWeibull(shapeValue,scaleValue,weibullType,vName)
        }
    }

    scaleInput.addEventListener('click',function(){
        scaleSteps();
    })
    scaleInput.addEventListener('input',function(){
        scaleSteps();
    })

    kvT.appendChild(thetaSpan);
    kvT.appendChild(thetaInput);

    kvSp.appendChild(shapeSpan);
    kvSp.appendChild(shapeInput);

    kvSc.appendChild(scaleSpan);
    kvSc.appendChild(scaleInput);

    kVP.append(kvT);
    kVP.append(kvSp);
    kVP.append(kvSc);

    glob.append(kVP);

    document.getElementById('adStock').appendChild(glob);

}

/*
Añadimos a los botones del tipo de adStock que se ejecuten las funciones
y del tipo de weibull que se ejecuten las gráficas de nuevo
*/


function addSaturation(vName){
    glob = genVariableParamsBase(vName);
    kVP = genKVP();
    satA = document.createElement('div');
    satG = document.createElement('div');
    satA.classList.add('keyValue');
    satA.classList.add('satParam');
    satG.classList.add('keyValue');
    satG.classList.add('satParam');
    spanA = document.createElement('span');
    spanA.innerHTML='Alpha:';
    spanG = document.createElement('span');
    spanG.innerHTML='Gamma:';

    inputA = document.createElement('input');
    inputG = document.createElement('input');

    inputA.type = 'number';
    inputG.type = 'number';

    inputA.min = '0';
    inputA.step='0.01';
    inputA.classList.add('alphaParam');
    inputG.min = '0';
    inputG.max = '1';
    inputG.step='0.01';
    inputG.classList.add('gammaParam');

    satA.appendChild(spanA);
    satA.appendChild(inputA);

    satG.appendChild(spanG);
    satG.appendChild(inputG);

    kVP.appendChild(satA);
    kVP.appendChild(satG);

    glob.appendChild(kVP);

    glob.id = 'varSat_'+vName;
    glob.classList.add('divInputSatParam');

    /*Añadimos el elemento al html */
    main = document.getElementById('saturation');
    main.appendChild(glob);
    return undefined;
}


function addCampaign(vName){
    glob = genVariableParamsBase(vName);
    kVP = genKVP();
    freqD = document.createElement('div');
    phiD = document.createElement('div');
    freqD.classList.add('keyValue');
    freqD.classList.add('campParam');
    phiD.classList.add('keyValue');
    phiD.classList.add('campParam');
    spanF = document.createElement('span');
    spanF.innerHTML='Frecuencia:';
    spanP = document.createElement('span');
    spanP.innerHTML='Desfase:';

    inputF = document.createElement('input');
    inputP = document.createElement('input');

    inputF.type = 'number';
    inputP.type = 'number';

    inputF.classList.add('freqParam');
    inputG.min = '0';
    inputG.max = '6.283';
    inputG.step='0.01';
    inputG.classList.add('PhiParam');

    freqD.appendChild(spanF);
    freqD.appendChild(inputF);

    phiD.appendChild(spanP);
    phiD.appendChild(inputP);

    kVP.appendChild(freqD);
    kVP.appendChild(phiD);

    glob.appendChild(kVP);

    glob.id = 'varFre_'+vName;
    glob.classList.add('divInputFreqParam');

    /*Añadimos el elemento al html */
    main = document.getElementById('frequency');
    main.appendChild(glob);
    return undefined;
}

function removeVarRange(vName){
    let id = 'varRange_'+vName;
    document.getElementById(id).remove();
    return undefined;
}

function removeAdStock(vName){
    let id = 'varAd_'+vName;
    document.getElementById(id).remove();
    return undefined;
}

function removeSaturation(vName){
    let id = 'varSat_'+vName;
    document.getElementById(id).remove();
    return undefined;
}

function removeCampaign(vName){
    let id = 'varFre_'+vName;
    document.getElementById(id).remove();
    return undefined;
}

function addAllVarsParams(vName){
    addVarRanges(vName);
    addVarAdStock(vName);
    addSaturation(vName);
    addCampaign(vName);
    return undefined;
}

function removeAllVarsParams(vName){
    removeVarRange(vName);
    removeAdStock(vName);
    removeSaturation(vName);
    removeCampaign(vName);
    return undefined;
}
