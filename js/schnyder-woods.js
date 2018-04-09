var points = [];
var edges = [];
var previous = null;
var point_draw = true;
var myp5 = null;
var schnyder_steps = false;

$(function() {
	renderMathInElement(document.body);
	$('#switch').on("click", function(){
		switch_form = !switch_form;
		var text = (switch_form)? "point" : "line";
		$(this).text(text);
	})

	$('#schnyder-wood').on("click", function(){
		schnyder_steps = true;
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

	$('canvas').on('click', function(){
		var pt_clic = {
			x: mouseX,
			y: mouseY,
			colors: [false, false, false]
		}

		if(schnyder_steps){
			var pt = getPoint(pt_clic);

			vertexConquest(pt);
		} else if(point_draw){
			var name = ["v", "w", "u"];
			ellipse(pt_clic.x, pt_clic.y, 20, 20);
			points.push(pt_clic);
			if(points.indexOf(pt_clic) < name.length) text(name[points.indexOf(pt_clic)], pt_clic.x+15, pt_clic.y+15);
		} else {
			if(previous == null){
				var firstPoint = getPoint(pt_clic);
				if(firstPoint != null){
					previous = firstPoint;
				}
			} else {
				var secPoint = getPoint(pt_clic);
				if(secPoint != null){
					line(secPoint.x, secPoint.y, previous.x, previous.y);
					edges.push({p1: previous, p2: secPoint, visited: false});
				}
				previous = null;
			}
		}
	});

}

	
var points_demo1 = [{x: 384,y: 44}, {x: 633,y: 541}, {x: 164,y: 548}, {x: 318,y: 288}, {x: 410,y: 284}, {x: 356,y: 373}, {x: 445,y: 377}];
var edges_demo1 = ["0:1", "1:2", "2:0", "3:4", "4:6", "6:5", "5:3", "3:2", "5:2", "6:1", "6:2", "4:5", "3:0", "4:0", "6:0"];

var points_demo2 = [{x:357, y:138}, {x:535, y:468}, {x:166, y:456}, {x:307, y:307}, {x:347, y:307}, {x:387, y:307}, {x:280, y:385}, {x:330, y:385}, {x:390, y:385}];
var edges_demo2 = ["0:1", "1:2", "2:0", "3:2", "3:0", "3:4", "3:6", "3:7", "4:5", "4:7", "4:8", "4:0", "5:0", "5:8", "5:1", "6:7", "6:2", "7:8", "7:2", "8:2", "8:1"];

var points_demo3 = [{x: 414,y: 15}, {x: 769,y: 541}, {x: 123,y: 550}, {x: 367,y: 261}, {x: 401,y: 295}, {x: 370,y: 352}, {x: 408,y: 399}, {x: 463,y: 284}, {x: 574,y: 370}, {x: 508,y: 378}, {x: 556,y: 421}, {x: 461,y: 444}];
var edges_demo3 = ["0:1", "1:2", "2:0", "3:5", "5:6", "6:11", "11:10", "10:8", "8:9", "9:11", "9:10", "6:7", "7:11", "9:7", "8:7", "4:5", "4:7", "7:5", "3:7", "4:3", "10:1", "8:1", "11:2", "6:2", "5:2", "3:2", "3:0", "7:0", "8:0", "11:1"];


var points_demo = [points_demo1, points_demo2, points_demo3];
var edges_demo = [edges_demo1, edges_demo2, edges_demo3];


function generateDemo(number){
	reset();
	var p = points_demo[number];
	var e = edges_demo[number];
	var name = ["v", "w", "u"];

	fill(153);
	for(var i = 0; i < p.length; i++){
		if(i < name.length)
			text(name[i], p[i].x+15, p[i].y+15);
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


function vertexConquest(v){
	var v0 = {pt: points[0], color: "green"};
	var w0 = {pt: points[1], color: "red"};
	var u0 = {pt: points[2], color: "blue"};
	var v_edges = sortEdgeClockwiseOrder(getEdgeFromV(v), v);

	// shift : colorie en rouge
	var y = v_edges.shift(); 
	var end_y = (y.p1 == v)? y.p2 : y.p1; 
	stroke(w0.color);
	drawArrow(v, end_y);
	v.colors[1] = true;
	y.visited = true;


	// pop : colorie en bleu
	var x = v_edges.pop();
	var end_x = (x.p1 == v)? x.p2 : x.p1;
	stroke(u0.color);
	drawArrow(v, end_x);
	v.colors[2] = true;
	x.visited = true;

	// All other edge becomes inner edge and color them in green
	for(var j = 0; j < v_edges.length; j++){
		var end_v = (v_edges[j].p1 == v)? v_edges[j].p2 : v_edges[j].p1;
		if(!end_v.colors[0]){
			stroke(v0.color);
			drawArrow(end_v, v);
			v_edges[j].visited = true;
		}
	}
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
			if(scalar(segmentData(node, previous_end), segmentData(node, end)) >= 0){
				left_top.push({edge: edges_node[i], value:or});
			} else {
				left_bot.push({edge: edges_node[i], value:or});
			}
		} else {
			if(scalar(segmentData(node, previous_end), segmentData(node, end)) >= 0){
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
	var pt_base = null;
	if(end.x > start.x){
		end_p = end.x-5;
		pt_base = {x: end_p, y: f(end_p)};
	} else if (end.x < start.x){
		end_p = end.x+5;
		pt_base = {x: end_p, y: f(end_p)};
	} else {
		pt_base = {x: end.x, y: end.y-5};
	}

	line(start.x, start.y, end.x, end.y);

	// Computation to find how to orient the triangle along with the orientation of the line
	var pt_base = {x: end_p, y: f(end_p)};
	var end_2 = rotate_point(pt_base, 90, end);
	var end_3 = rotate_point(pt_base, -90, end);
	var ratio = 2;

	// Scale the triangle
	// Created an equilateral triangle, so we just need to check one side
	while(length(segmentData(end, end_2)) > 15){
		var sc_x = end.x / ratio;
		var sc_y = end.y / ratio;

		// translation
		var t_x = end.x - sc_x;
		var t_y = end.y - sc_y;

		end_2.x = (end_2.x/ratio) + t_x;
		end_2.y = (end_2.y/ratio) + t_y;

		end_3.x = (end_3.x/ratio) + t_x;
		end_3.y = (end_3.y/ratio) + t_y;
	}

	// Position the triangle in the middle of the edge
	var mid_x = (end.x + start.x)/2;
	var mid_y = (end.y + start.y)/2;

	var tr_x =  mid_x - end.x;
	var tr_y = mid_y - end.y;

	// Draw the triangle
	triangle(end.x + tr_x, end.y + tr_y, end_2.x + tr_x, end_2.y + tr_y, end_3.x + tr_x, end_3.y + tr_y);
}

function rotate_point(base, angle, point){
	var sin = Math.sin(angle);
	var cos = Math.cos(angle);

	var p = {
		x: point.x - base.x,
		y: point.y - base.y
	}

	var new_x = p.x * cos - p.y * sin;
	var new_y = p.x * sin + p.y * cos;

	p.x = new_x + base.x;
	p.y = new_y + base.y;

	return p; 
}

function reset(){
	clear();
	background(0);
	stroke(153);

	points = [];
	edges = [];
	previous = null;
	schnyder_steps = false;
}

function clear_solution(){
	clear();
	background(0);
	stroke(153);

	var name = ["v", "w", "u"];
	for(var i = 0; i < points.length; i++){
		if(i < name.length)	{
			text(name[i], points[i].x+15, points[i].y+15);
		}
		points[i].colors = [false, false, false];
		ellipse(points[i].x, points[i].y, 20, 20);
	}

	for(var i = 0; i < edges.length; i++){
		edges[i].visited = false;
		line(edges[i].p1.x, edges[i].p1.y, edges[i].p2.x, edges[i].p2.y);
	}

	previous = null;
	schnyder_steps = false;
}

function switch_type_drawing(){
	point_draw = !point_draw;
	var txt = (point_draw)? "Ligne" : "Point";
	$('#form_drawing').text(txt);
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

function getPoint(clic){
	for(var i = 0; i < points.length; i++){
		if(isIn(clic, points[i]))
			return points[i];
	}

	return null;
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

function length(vector){
	return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}