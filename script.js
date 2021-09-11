//declare variables
let buttonArea = document.getElementById('buttonarea');
let inputBoxBottom = document.getElementById('inputboxbottom');
let outputBoxTop = document.getElementById('outputBoxTop');

// equal array stores the numbers input, upon pressing equal, these will be parsed and calculated
let equalArr = ['return '];
//state array turns on after equals sign was pressed, allows for further expressions using previous numbers
let state = 0
let opstate = 0

//add number to screen, if state 1 then pushes numbers to top screen

buttonArea.addEventListener('click', (e) => {
    if(e.target.className == 'numbutton'){
        if(state == 1){
            outputBoxTop.innerHTML = inputBoxBottom.value
            inputBoxBottom.value = ''   
        }
        inputBoxBottom.value += e.target.innerHTML;
    }
    //when operator button is clicked, move it to the top display and the array, if state = 1, push to array and change back to 0
    else if(e.target.className == 'opbutton'){
        console.log(e.target.innerHTML)
        if(state == 1){
            outputBoxTop.innerHTML = inputBoxBottom.value
            equalArr.push(inputBoxBottom.value)
            inputBoxBottom.value = ''
            state = 0
            
        }
        outputBoxTop.innerHTML += inputBoxBottom.value + e.target.innerHTML;
        equalArr.push(inputBoxBottom.value + e.target.innerHTML);
        inputBoxBottom.value = "";
        console.log(equalArr)
    }
    //calculate the expression by expression moving to an array, then using calculate function, change state to 1, reset array
    
    else if(e.target.className == 'equals'){
        if(state == 0){
            equalArr.push(inputBoxBottom.value);
            outputBoxTop.innerHTML += inputBoxBottom.value + ' = ';
            let answer = calculate(equalArr);
            //if answer is undefined, return nothing to the boxes
            if(answer == null){
                inputBoxBottom.value = ''
                outputBoxTop.innerHTML = ''
            } else {
                inputBoxBottom.value = answer;
                equalArr = ['return '];
                state = 1;
            }

        }
    }
    else if(e.target.className == 'clear'){
        state = 0;
        equalArr = ['return '];
        inputBoxBottom.value = "";
        outputBoxTop.innerHTML = "";

    }



//calculate using anonymous function
function calculate(arr){
    let op = arr.join(' ')
    console.log(op)
    return Function (op)()
    }
})
