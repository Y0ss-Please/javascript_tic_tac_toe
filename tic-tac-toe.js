currentTurn = 'X';
won = false;

const Box = function(id) {
    let set = false;
    let value = '';

    const setText = function(text,setGrey) {
        document.getElementById(this.id).innerHTML = text;
        if (setGrey){
            document.getElementById(id).classList.add('grey');
        } else {
            document.getElementById(id).classList.remove('grey');
        }
    };
    return {id,set,value,setText};
}

function mouseEnter(e) {
    const box = boxes[e.target.id];
    if (!box.set && !won) {
        box.setText(currentTurn,true);
    }
}
function mouseLeave(e) {
    const box = boxes[e.target.id];
    if (!box.set && !won) {
        box.setText('&nbsp',false);
    }
}
click = function(e) {
    const box = boxes[e.target.id];
    if (!box.set && !won){
        box.set = true;
        box.value = currentTurn;
        box.setText(currentTurn,false);
        toggleTurn();
        checkWin();
    }
}

boxes = [];
const boxElements= document.querySelectorAll('.box');
Array.from(boxElements).forEach( (e) => {
    const newBox = new Box(e.id);
    boxes.push(newBox);
});

boxes.forEach( (e) => {
    document.getElementById(e.id).addEventListener('mouseenter', mouseEnter);
    document.getElementById(e.id).addEventListener('mouseleave', mouseLeave);
    document.getElementById(e.id).addEventListener('click', click);
})

function toggleTurn() {
    currentTurn = currentTurn == 'X' ? 'O' : 'X';
}

function checkWin() {
    if (boxes[0].value == boxes[1].value && boxes[1].value == boxes[2].value && boxes[0].value != ''){
        win('top');
    }else if (boxes[0].value == boxes[3].value && boxes[3].value == boxes[6].value && boxes[0].value != ''){
        win('left');
    } else if (boxes[0].value == boxes[4].value && boxes[4].value == boxes[8].value && boxes[0].value != ''){
        win('diag-down');
    } else if (boxes[1].value == boxes[4].value && boxes[4].value == boxes[7].value && boxes[1].value != ''){
        win('vert-middle');
    } else if (boxes[3].value == boxes[4].value && boxes[4].value == boxes[5].value && boxes[3].value != ''){
        win('middle');
    }else if (boxes[2].value == boxes[5].value && boxes[5].value == boxes[8].value && boxes[2].value != ''){
        win('right');
    }else if (boxes[6].value == boxes[7].value && boxes[7].value == boxes[8].value && boxes[6].value != ''){
        win('bottom');
    }else if (boxes[6].value == boxes[4].value && boxes[4].value == boxes[2].value && boxes[6].value != ''){
        win('diag-up');
    } else if (checkDraw()){
        win('', true);   
    }
}

function checkDraw() {
    let count = 0;
    boxes.forEach((e) => {
        if (e.value != '') {
            count++
        }
    });
    return count == boxes.length ? true : false;
}

const resetBtn =  document.getElementById('reset');
const winner = document.getElementById('winner');
const hr = document.getElementById('hr')

resetBtn.addEventListener('click', reset);

function win(e,draw) {
    won = true;
    if (!draw) {
        hr.classList.add(e);
        hr.style.display = 'initial';
    }
    toggleTurn();
    winner.textContent = (!draw) ? '- '+currentTurn+'\'s win -' : '- it\'s a draw -';
    resetBtn.textContent = '-- reset --';
}

function reset() {
    if (won) {
        hr.className = '';
        hr.style.display = 'none';
        winner.textContent = '';
        resetBtn.textContent = '';
        boxes.forEach((e) => {
            e.value = ''
            e.set = false;
            e.setText('&nbsp', false);
        });
        won = false;
    }
}