
//Funciones para nombres de las variables
function removeRow(rowName){
    id = 'row_'+rowName;
    document.getElementById(id).remove();
    return undefined;
}
inputVariableName = document.getElementById('inputVarNames');
inputVariableName.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addRow();
    }
})

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
}