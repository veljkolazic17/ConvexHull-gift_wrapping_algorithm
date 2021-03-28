import "p5.min.js"

var points = [];
var pointOnHull;
var P = [];
var num_of_points = 0;
var endpoint;
var canvas_size;
var pressed = false;

function find_most_left(num_of_points){
    let min = Number.MAX_SAFE_INTEGER;
    let found = 0;
    for(let i = 0;i<num_of_points;i++){
        if(points[i].x<min){
            found = points[i];
            min = points[i].x;
        }
    }
    return found;
}

function check_left(pointS,pointP){
    
    let vpointS = createVector(pointS.x,pointS.y);
    let vpointP = createVector(pointP.x,pointP.y);
    let vednpoint = createVector(endpoint.x,endpoint.y);
    
    let vector1 = p5.Vector.sub(vpointP,vpointS);
    let vector2 = p5.Vector.sub(vpointP,vednpoint);

    let cross_product = vector1.cross(vector2);
    if(cross_product.z < 0){
        return true;
    }   
    else{
        return false;
    }
        
}


function setup(){
    canvas_size = 400;
    frameRate(20);
    createCanvas(canvas_size,canvas_size);
}


function mouseClicked(){
    clear();
    points = [];
    P = [];
    num_of_points = 40;
    for(let i = 0;i<num_of_points;i++){
        let x = Math.random()*(canvas_size/2) + canvas_size/4;
        let y = Math.random()*(canvas_size/2) + canvas_size/4;
        points.push({'x':x,'y':y,'index':i});
        stroke('purple')
        strokeWeight(5);
        point(x,y);
        
    }
    pointOnHull = find_most_left(num_of_points);
    strokeWeight(7);
    stroke('green');
    point(pointOnHull.x,pointOnHull.y);
    
    
}


function keyPressed(){
    pressed = true;
    stroke(255,0,0);
    strokeWeight(1); 
}
function draw(){
    if(pressed == true){

    let iter = 0;
    do{
        P.push(pointOnHull);
        endpoint = points[0];
        for(let i = 0;i<num_of_points;i++){
            if((endpoint.index == pointOnHull.index) ||  check_left(points[i],P[iter])){
                endpoint = points[i];
            }
        }
        iter++;
        line(pointOnHull.x,pointOnHull.y,endpoint.x,endpoint.y);
        pointOnHull = endpoint;
        
    }while(P[0]!=endpoint)
}
    pressed = false;
}

