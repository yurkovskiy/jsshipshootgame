/**
 * Ship-Shoot Game
 * Just for demo
 * (c) Yuriy Bezgachnyuk
 */
 
// Constants
let SIZE = 40; // 40*40 square (ship size)
let BOARD_SIZE = 400;

// enemy's ships
let eships = new Array(); // array with ship objects

// Arrow keys
let KEY_SPACE = 32;
let KEY_LEFT = 37;
let KEY_RIGHT = 39;

let board = new Board(document.getElementById("Board"));
let ship = new Ship(document.getElementById("Ship"), 0, 260); // ship initial state

// Ship Class
function Ship(obj_id, x, y) {
	this.obj_id = obj_id;
	this.x = x;
	this.y = y;
	this.move = move;
	this.shoot = shoot;
	this.show = show;
	this.hide = hide;
}

function show() {
	this.obj_id.style.width = SIZE - 2;
	this.obj_id.style.height = SIZE - 2;
	this.obj_id.style.left = this.x + "px";
	this.obj_id.style.display = "block";
}

function hide() {
	this.obj_id.display = "none";
}

function move(dx) {
	this.x += dx;
	if (this.x > (BOARD_SIZE - SIZE)) {
		this.x += -dx;
		return;
	}
	if (this.x < 0) {
		this.x = 0;
		return;
	}
	else {
		this.hide();
		this.show();

	}
}

function shoot() {
	if (isAliveShips() !== 0) {
		if ((checkShip(this.x) !== -1) && (eships[checkShip(this.x)].alive)) {
			eships[checkShip(this.x)].alive = false;
			document.getElementById("es_" + checkShip(this.x)).remove();
			if (isAliveShips() === 0) {
				window.removeEventListener("keydown", shipLogic);
				window.alert("YOU WIN!!!");
			}
		}
	}
}
// end of Ship class


// Board Class
function Board(mainElement) {
	// generating board with enemy's ships
	for (let i = 0; i < 10; i++) {
		let ship = {
			name: ("es_" + i),
			alive: true,
			coorx: (i * SIZE) + "px"
		};
		eships.push(ship);
		let eship_dom = document.createElement("div");
		eship_dom.setAttribute("id", eships[i].name);
		eship_dom.setAttribute("style", "left: " + eships[i].coorx);
		eship_dom.setAttribute("class", "eship");
		mainElement.appendChild(eship_dom);
	}
}

function checkShip(coorx) {
	for (let i = 0; i < eships.length; i++) {
		if (parseInt(eships[i].coorx) === coorx) {
			return i;
		}
	}
	return -1;
}

function isAliveShips() {
	let alives = 0;
	for (let i = 0; i < eships.length; i++) {
		if (eships[i].alive) {
			alives++;
		}
	}
	return alives;
}
// end of Board Class

// Ship Event Listener
function shipLogic(e) {
	switch(e.keyCode) {
		case KEY_LEFT: {
			ship.move(-SIZE);
			break;
		}
		case KEY_RIGHT: {
			ship.move(SIZE);
			break;
		}
		case KEY_SPACE: {
			ship.shoot();
			break;
		}
	}
}


window.addEventListener("keydown", shipLogic, false);