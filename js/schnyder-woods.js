var points = [];
var edges = [];
var previous = null;
var switch_form = false;
var myp5 = null;

$(function() {

	$('#switch').on("click", function(){
		switch_form = !switch_form;
		var text = (switch_form)? "point" : "line";
		$(this).text(text);
	})

	$('#schnyder-wood').on("click", function(){
		schnyderWoods();
	})

});

function setup(){
	// Sets the screen to be 900 pixels wide and 600 pixels high
	var canvas = createCanvas(900, 600);
	canvas.parent("canvas-holder");
	background(0);
	noLoop();
	generateDemo(0);
}

function draw(){
	var d = 70;
	stroke(153);

	$('canvas').click(function(){
		var p = {
			x: mouseX,
			y: mouseY,
			colors: [false, false, false]
		};


		if(!switch_form){
			ellipse(p.x, p.y, 20, 20);
			points.push(p);
		} else {
			if (previous == null) {
                previous = p;
            } else {
                // récupère les points correspondant (arc ou sommet) par rapport au position du clic
                var edge = getEdge(previous, p);
                // Push à l'arc, le sommet
                edges.push(edge);
                // Dessine la liaison
                line(edge.p1.x, edge.p1.y, edge.p2.x, edge.p2.y);
                // reinitialise le point précédent
                previous = null;
            }
		}
	});
}

	
var points_demo1 = [{x: 384,y: 44}, {x: 633,y: 541}, {x: 164,y: 548}, {x: 318,y: 288}, {x: 410,y: 284}, {x: 356,y: 373}, {x: 445,y: 377}];
var edges_demo1 = ["0:1", "1:2", "2:0", "3:4", "4:6", "6:5", "5:3", "3:2", "5:2", "6:1", "6:2", "4:5", "3:0", "4:0", "6:0"];

var points_demo2 = [{x:357, y:138}, {x:535, y:468}, {x:166, y:456}, {x:307, y:307}, {x:347, y:307}, {x:387, y:307}, {x:280, y:385}, {x:330, y:385}, {x:380, y:385}];
var edges_demo2 = ["0:1", "1:2", "2:0", "3:2", "3:0", "3:4", "3:6", "3:7", "4:5", "4:7", "4:8", "4:0", "5:0", "5:8", "5:1", "6:7", "6:2", "7:8", "7:2", "8:2", "8:1"];

var points_demo3 = [{x: 414,y: 15}, {x: 769,y: 541}, {x: 123,y: 550}, {x: 367,y: 261}, {x: 401,y: 295}, {x: 370,y: 352}, {x: 408,y: 399}, {x: 463,y: 284}, {x: 574,y: 370}, {x: 508,y: 378}, {x: 556,y: 421}, {x: 461,y: 444}];
var edges_demo3 = ["0:1", "1:2", "2:0", "3:5", "5:6", "6:11", "11:10", "10:8", "8:9", "9:11", "9:10", "6:7", "7:11", "9:7", "8:7", "4:5", "4:7", "7:5", "3:7", "4:3", "10:1", "8:1", "11:2", "6:2", "5:2", "3:2", "3:0", "7:0", "8:0", "11:1"];


var points_demo = [points_demo1, points_demo2, points_demo3];
var edges_demo = [edges_demo1, edges_demo2, edges_demo3];


function generateDemo(number){
	reset();
	p = points_demo[number];
	e = edges_demo[number];

	for(var i = 0; i < p.length; i++){
		ellipse(p[i].x, p[i].y, 20, 20);
		var pts = {
			x: p[i].x,
			y: p[i].y,
			colors: [false, false, false]
		}
		points.push(pts);
	}

	for(var i = 0; i < e.length; i++){
		var ed = e[i].split(":");
		var edge = {
			p1: points[parseInt(ed[1])],
			p2: points[parseInt(ed[0])],
			visited:false
		}
		stroke(153);
		line(edge.p1.x, edge.p1.y, edge.p2.x, edge.p2.y);
		edges.push(edge);
	}
}


function schnyderWoods(){
	var outerPoints = [points[0], points[1], points[2]];
	var T = points.slice();
	T.splice(0, 3); // remove the outer points of the triangle
	var v0 = {pt: points[0], color: "green"};
	var w0 = {pt: points[1], color: "red"};
	var u0 = {pt: points[2], color: "blue"};
	var v = v0.pt, x = u0, y = w0;
	for(var i = 0; i <= points.length-3; i++){
		// get the node closer x to u and orient the the edge to X and color it in blue
		var v_edges = sortEdgeClockwiseOrder(getEdgeFromV(v), v);
		x = getEdgeCloser(v_edges, v, u0.pt);
		var end_x = (x.p1 == v)? x.p2 : x.p1;
		stroke(u0.color);
		drawArrow(v, end_x);
		v.colors[2] = true;
		x.visited = true;
		v_edges.splice(v_edges.indexOf(x), 1);

		// get the node closer y to w and orient the edge to Y and color it in red
		y = getEdgeCloser(v_edges, v, w0.pt);
		var end_y = (y.p1 == v)? y.p2 : y.p1;
		stroke(w0.color);
		drawArrow(v, end_y);
		v.colors[1] = true;
		y.visited = true;
		v_edges.splice(v_edges.indexOf(y), 1);

		// All other edge becomes inner edge and color them in green
		for(var j = 0; j < v_edges.length; j++){
			var end_v = (v_edges[j].p1 == v)? v_edges[j].p2 : v_edges[j].p1;
			if(!end_v.colors[0]){
				stroke(v0.color);
				drawArrow(end_v, v);
				v_edges[j].visited = true;
			}
		}
		v = T.shift();
	}
}


function getEdgeCloser(v_edges, current_point, outter_point){
	var distances = [];

	for(var i = 0; i < v_edges.length; i++){
		var end = (v_edges[i].p1 == current_point)? v_edges[i].p2 : v_edges[i].p1;
		if(end == outter_point){
			return v_edges[i];
		}
		var dist = Math.abs(outter_point.x - end.x);
		distances.push(dist);
	}

	return v_edges[distances.indexOf(Math.min(...distances))];
}


// -------------------------- Utility functions for button or drawing ----------------------------------------------
function getEdgeFromV(v){
	var array = []
	for(var i = 0; i < edges.length; i++){
		if(edges[i].p1 == v || edges[i].p2 == v){
			if(!edges[i].visited){
				array.push(edges[i]);
			}
		}
	}

	return array;
}

function sortEdgeClockwiseOrder(edges_node, node){
	var edges_sorted = [];
	var left_top = [];
	var left_bot = [];
	var right_top = [];
	var right_bot = [];
	var previous_end = {
		x: node.x,
		y: 0
	}
	for(var i = 0; i < edges_node.length; i++){
		var end = (edges_node[i].p1 != node)? edges_node[i].p1 : edges_node[i].p2;
		var or = orientation(previous_end, node, end);
		if(or < 0){
			if(scalar(segmentData(node, previous_end), segmentData(node, end)) > 0){
				left_top.push({edge: edges_node[i], value:or});
			} else {
				left_bot.push({edge: edges_node[i], value:or});
			}
		} else {
			if(scalar(segmentData(node, previous_end), segmentData(node, end)) > 0){
				right_top.push({edge: edges_node[i], value:or});
			} else {
				right_bot.push({edge: edges_node[i], value:or});
			}
		}
	}

	left_top.sort(function(a,b){return a.value - b.value});
	left_bot.sort(function(a,b){return a.value - b.value});
	right_bot.sort(function(a,b){return a.value - b.value});
	right_top.sort(function(a,b){return b.value - a.value});

	ma_list = left_top.concat(left_bot).concat(right_bot).concat(right_top);
	ma_list.forEach(function(el){edges_sorted.push(el.edge)});

	return edges_sorted;
}

function drawArrow(start, end){
	var segment = segmentData(start, end);
	var a = segment.y/segment.x;
	var b = start.y - a*start.x;

	var f = function(x){
		return a*x + b;
	}

	var end_p = end.x;
	if(end.x > start.x){
		end_p -= (end.x-start.x)/7;
	} else {
		end_p += (start.x-end.x)/7;
	}

	line(start.x, start.y, end.x, end.y);
	ellipse(end_p, f(end_p), 5, 5);
	//triangle(end.x, end.y, end.x-5, f(end.x+segment.x)/5, end.x+segment.x, f(end.x+segment.x)/5);
}

function reset(){
	clear();
	background(0);
	stroke(153);

	points = [];
	edges = [];
	previous = null;
}

function clear_solution(){
	clear();
	background(0);
	stroke(153);

	for(var i = 0; i < points.length; i++){
		points[i].colors = [false, false, false];
		ellipse(points[i].x, points[i].y, 20, 20);
	}

	for(var i = 0; i < edges.length; i++){
		edges[i].visited = false;
		line(edges[i].p1.x, edges[i].p1.y, edges[i].p2.x, edges[i].p2.y);
	}

	previous = null;
}

// Retrouve le point(arc ou sommet) correspondant aux extremité de la ligne
function getEdge(previous, point){
   	var p1 = null;
   	var p2 = null;
   	for(var i = 0; i < points.length; i++){
   		if(p1 != null && p2 != null)
   			break;
   		if(isIn(points[i], previous))
   			p1 = points[i];

   		else if(isIn(points[i], point))
   			p2 = points[i];
   	}

    // renvoie la structure arc-sommet, car on ne peut pas lier arc-arc ou sommet-sommet
    return {p1:p1, p2:p2, visited:false};
}

// Verifie si la position du clic appartient à une ellipse fixée
function isIn(point, ellipse){
    return Math.abs(point.x - ellipse.x) <= 20 && Math.abs(point.y - ellipse.y) <= 20;
}

function segmentData(p1, p2){
	var data = {
		x: (p1.x - p2.x),
		y: (p1.y - p2.y)
	};
	return data;
}

function scalar(vector1, vector2){
	return ((vector1.x*vector2.x)+(vector1.y*vector2.y));
}

function orientation(p1, p2, p3){
	var matrice = [[p1.x, p1.y, 1],
					[p2.x, p2.y, 1],
					[p3.x, p3.y, 1]];

	return math.det(matrice);
}