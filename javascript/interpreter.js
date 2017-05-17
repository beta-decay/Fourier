var code, accumulator, position;
var ifstage, testval, test;
var tempaccumulator, temppos;
var output, variables, funcpos;
var functions;
var funccode;

function check() {
	if (code[position] == "^") {
		accumulator += 1;
		position += 1;
	} else if (code[position] == "v") {
		accumulator -= 1;
		position += 1;
	} else if (code[position] == "a") {
		output += String.fromCharCode(accumulator);
		position += 1;
	} else if (code[position] == "o") {
		output += accumulator;
		position += 1;
	} else if (code[position] == "`") {
		string = "";
		position += 1;
		while (code[position] != "`") {
			string += code[position];
			position += 1
		}
		output += string;
		position += 1;
	} else if (code[position] == "r") {
		accumulator = Math.round(Math.random()*accumulator);
		position += 1;
	} else if ("0123456789".indexOf(code[position]) !== -1) {
		try {
			n = ""
			while ("0123456789".indexOf(code[position]) !== -1) {
				n += code[position];
				position += 1;
			}
			accumulator = Number(n);
		} catch(e) {
			accumulator = Number(n);
		}
	} else if (code[position] == "~") {
		if ("(){}+-naod@;|r~*/%I<>=^vLP`".indexOf(code[position+1]) === -1) {
			variables[code[position+1]] = accumulator;
			position += 2;
		} else {
			// raise Name Error
			document.getElementById("output").style.color = "red";
			output = "Name Error: " + code[position+1] + " at position " + (position+1) + " is a reserved keyword";
			position = code.length * 2;
		}
	} else if (code[position] == "(") {
		tempaccumulator.push(accumulator);
		temppos.push(position + 1);
		accumulator = 0;
		position += 1;
	} else if (code[position] == ")") {
		if (accumulator == tempaccumulator[tempaccumulator.length-1]) {
			position += 1;
			tempaccumulator.pop();
			temppos.pop();
		} else {
			position = temppos[temppos.length-1];
		}
	} else if (code[position] == "{") {
		if (ifstage == 1) {
			testval = accumulator;
			accumulator = 0;
			position += 1;
		} else if (ifstage == 2) {
			if (!test) {
				try {
					while (code[position] != "}") {
						position += 1;
					}
					accumulator = testval;
				} catch(e) {
					// Do nothing
				}
			} else {
				position += 1;
			}
		}
		
	} else if (code[position] == "}") {
		if (ifstage == 1) {
			ifstage = 2
			if (accumulator == testval) {
				test = true;
			} else {
				test = false;
			}
			position += 1;
		} else if (ifstage == 2) {
			ifstage = 1;
			testval = 0;
			test = true;
		
			position += 1;
		}
	
	} else if(code[position] == "|") {
		position += 1;
		var tempfcode = "";
		while (code[position] != "|") {
			tempfcode += code[position];
			position += 1;
		}
		position += 2;
		functions[code[position-1]] = tempfcode;
		
	} else if (code[position] == " ") {
		position += 1
	} else if (code[position] == "*") {
		position += 1;
		multitempaccumulator = accumulator;
		check();
		accumulator *= multitempaccumulator;
	} else if (code[position] == "/") {
		position += 1;
		divtempaccumulator = accumulator;
		check();
		accumulator = Math.floor(divtempaccumulator/accumulator);
	} else if (code[position] == "%") {
		position += 1;
		modtempaccumulator = accumulator;
		check();
		accumulator = modtempaccumulator % accumulator;
	} else if (code[position] == "+") {
		position += 1;
		addtempaccumulator = accumulator;
		check();
		accumulator += addtempaccumulator;
	} else if (code[position] == "-") {
		position += 1;
		subtempaccumulator = accumulator;
		check();
		accumulator = subtempaccumulator - accumulator;
	} else if (code[position] == "P") {
		position += 1;
		powtempaccumulator = accumulator;
		check();
		accumulator = Math.pow(powtempaccumulator,accumulator);
	} else if (code[position] == "I") {
		//var stdin = prompt("Enter input:");
		stdin = input.shift()
		if (stdin !== "") {
			try {
				stdin = Number(stdin);
			} catch(e) {
				stdin = stdin.charCodeAt(0);
			}
			accumulator = stdin;
		}
		position += 1
	} else if (code[position] == ">") {
		position += 1;
		gttempaccumulator = accumulator;
		check();
		if (gttempaccumulator > accumulator) {
			accumulator = 1;
		} else {
			accumulator = 0;
		}
	} else if (code[position] == "<") {
		position += 1;
		lttempaccumulator = accumulator;
		check();
		if (lttempaccumulator < accumulator) {
			accumulator = 1;
		} else {
			accumulator = 0;
		}
	} else if (code[position] == "=") {
		position += 1;
		eqtempaccumulator = accumulator;
		check();
		if (eqtempaccumulator == accumulator) {
			accumulator = 1;
		} else {
			accumulator = 0;
		}
	} else if (code[position] == "d") {
		var date = new Date();
		if (accumulator === 0) {
			accumulator = date.getSeconds();
		} else if (accumulator == 1) {
			accumulator = date.getMinutes();
		} else if (accumulator == 2) {
			accumulator = date.getHours();
		} else if (accumulator == 3) {
			accumulator = date.getDate();
		} else if (accumulator == 4) {
			accumulator = date.getMonth();
		} else if (accumulator == 5) {
			accumulator = date.getFullYear();
		} else {
			accumulator = date.getTime();
		}

		position += 1;
	} else if (code[position] == "@") {
		output = "";
		position += 1;
	} else if (code[position] == ";") {
		var delay = accumulator;
		var delaypos = position+1;
		setTimeout(function(){position = delaypos;runCode();}, delay*1000);
		return code.length*2;
	} else if (code[position] == "L") {
		var log = Math.log10(accumulator);
		accumulator = Math.floor(log);
		position += 1
	} else {
		if (functions.hasOwnProperty(code[position])) {
			funcpos.push(position);
			funccode.push(code);
			
			code = functions[code[position]]
			position = 0;
			
			console.log(funcpos);
			console.log(funccode);
			console.log(code);
			
			while(position < code.length){
				position = check();
				console.log(code[position]);
			}
			
			code = funccode.pop();
			position = funcpos.pop()+1;
			console.log(position+"\n\n");
			
		} else if (variables.hasOwnProperty(code[position])) {
			accumulator = variables[code[position]];
			position += 1;
		} else {
			variables[code[position]] = 0;
			accumulator = 0;
			position += 1;
		}
	}
	document.getElementById("output").value = output;
	return position;
}

function runCode() {
	while(position < code.length){
		position = check();
	}
	console.log(position);
}

function interpreter() {
	code = document.getElementById("code").value;
	position = 0;
	accumulator = 0;
	
	ifstage = 1;
	testval = 0;
	test = true;

	output = "";
	
	input = document.getElementById("input").value.split("\n");
	console.log(input);

	document.getElementById("output").value = output;
	document.getElementById("output").style.color = "black";
	
	tempaccumulator = [];
	temppos = [];
	
	functions = {};
	funcpos = [];
	funccode = [];
	
	variables = {};
	
	runCode();
	
	document.getElementById("output").value = output;
}	