/**
 * Return a Array with "1" in random position
 * @param {number} row 
 * @param {number} col
 * @param {Number} maxTrophy max cells with 1
 */
function generateMap(row = 3, col = 2, maxTrophy = 2) {
    var map = []
    for (let i = 0; i < row; i++) {
        map.push([]);
        for (let j = 0; j < col; j++) {
            map[i].push(0)
        }
    }

    for (let i = 0; i <= maxTrophy; i++) {
        rowR = Math.round(Math.random() * (map.length - 1));
        colR = Math.round(Math.random() * (map[0].length - 1));

        map[rowR][colR] = 1

        maxTrophy--;
    }

    return map;
}

/**
 * Update table to the map
 * 
 * @param {Array} map 
 * @param {String} id of table
 */
function initTable(map, id = 'main-table') {
    var table = document.getElementById(id);

    table.innerHTML = '';

    var body = document.createElement("tbody")

    var head = document.createElement("tr")

    for (let col = 0; col < map[0].length; col++) {
        head.appendChild(createNode('th', col + 1))

    }

    body.appendChild(head)

    for (let row = 0; row < map.length; row++) {
        var tr = document.createElement("tr")
        for (let col = 0; col < map[0].length; col++) {
            let value = map[row][col]
            node = createNode('td', value)
            node.setAttribute('mapIndexrow', row)
            node.setAttribute('mapIndexcol', col)
            tr.appendChild(node)
        }

        body.appendChild(tr)
    }

    table.appendChild(body)

    addEventListeners()
}

/**
 * Draw icon
 * @param {*} map 
 * @param {*} table 
 */
function updateTable(map = dragMap, table = 'main-table') {
    var tds = document.getElementById('main-table').querySelectorAll('.draggable-div');
    tds.forEach(e => {
        var isTrophy = false;
        if (map[e.parentElement.getAttribute('mapindexrow')][e.parentElement.getAttribute('mapindexcol')]) {

            isTrophy = true;
        } else {

            isTrophy = false;
        }

        e.innerHTML = ''

        if (isTrophy) {
            e.innerHTML = icon;
        } else {
            e.innerHTML = ' ';
        }
    })
}

/**
 * 
 * @param {String} tag 
 * @param {Number} value 
 * @returns return an html
 */
function createNode(tag = 'td', value = 0) {
    var node = document.createElement(tag);

    if (tag == 'td') {
        node.innerHTML = `<div class="draggable-div" draggable="true">${value}</div>`
    } else {
        node.innerHTML = `${value}`
    }

    return node;
}


//* Vars
var dragMap = [];
var icon = '<iconify-icon icon="bi:trophy-fill"></iconify-icon>'
const divIcon = `<div class="draggable-div" draggable="true">${icon}</div>`
const divNoIcon = `<div class="draggable-div" draggable="true"></div>`


window.onload = () => {
    dragMap = generateMap(2, 5);

    initTable(dragMap, 'main-table');

    updateTable(dragMap, 'main-table')
}



/**
 * Drag and drop
 */

//

var dragStartIndex;
var dragEndIndex;

function dragStart() {
    row = Number(this.parentElement.getAttribute('mapindexrow'))
    col = Number(this.parentElement.getAttribute('mapindexcol'))
    dragStartIndex = {
        row: row,
        col: col
    };
}

function dragEnter() {
    row = Number(this.parentElement.getAttribute('mapindexrow'))
    col = Number(this.parentElement.getAttribute('mapindexcol'))

    dragEndIndex = {
        row: row,
        col: col
    };

    this.classList.add('over-draggable-div')
}

function dragLeave() {
    this.classList.remove('over-draggable-div')
}

function dragDrop(table = 'main-table', map = dragMap) {
    swapItems(dragStartIndex, dragEndIndex);

    updateTable(dragMap, 'main-table')
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable-div')

    draggables.forEach(item => {
        item.addEventListener('dragstart', dragStart)
        item.addEventListener('dragend', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

function swapItems(start, end, map) {
    mapStartValue = dragMap[start.row][start.col]
    mapEndValue = dragMap[end.row][end.col]

    dragMap[start.row][start.col] = mapEndValue;
    dragMap[end.row][end.col] = mapStartValue;
}