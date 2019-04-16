document.median = [
    [100, 850],
    [200, 750],
    [300, 650],
    [400, 550],
    [500, 450],
    [600, 350],
    [700, 250],
    [800, 150],
    [900, 50]
];

document.min = document.median.map(function (point) {
    return [point[0], point[1] + 3 + Math.random() * 10];
});

document.max = document.median.map(function (point) {
    return [point[0], point[1] - 3 - Math.random() * 10];
});

document.initSvg = function () {
    var ns = "http://www.w3.org/2000/svg";
    //document.svg = document.getElementsByTagName("svg")[0]; //Get svg element
    var div = document.querySelector('.svg');
    document.svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('height', 1600)
    svg.setAttribute('width', 1600)
    div.appendChild(document.svg);


};

// document.drawLine = function ({
//     x1,
//     y1,
//     x2,
//     y2
// }) {
//     var {
//         lineColor
//     } = document.chartConfig;
//     var newElement = document.createElementNS(document.ns, "path"); //Create a path in SVG's namespace
//     newElement.setAttribute("d", `M${x1} ${y1} L${x2} ${y2}`); //Set path's data
//     newElement.style.stroke = lineColor; //Set stroke colour
//     newElement.style.strokeWidth = "5px"; //Set stroke width
//     document.svg.appendChild(newElement);
// };

document.drawCirc = function ([x, y]) {
    var {
        circleRadius,
        circleBorderColor,
        circleFill
    } = document.chartConfig;
    var newCirc = document.createElementNS(document.ns, "circle"); //Create a path in SVG's namespace
    newCirc.setAttribute("cx", x); //Set path's data
    newCirc.setAttribute("cy", y); //Set path's data
    newCirc.setAttribute("r", circleRadius); //Set path's data
    newCirc.style.fill = circleFill; //Set stroke colour
    newCirc.style.stroke = circleBorderColor; //Set stroke colour
    newCirc.style.strokeWidth = "3"; //Set stroke width
    document.svg.appendChild(newCirc);
};

document.chartConfig = {
    lineLength: 10,
    lineColor: "blue",
    circleRadius: 5,
    circleBorderColor: "red",
    circleFill: "blue"
};



document.drawLine = function (points) {
    var {
        lineColor
    } = document.chartConfig;

    var newElement = document.createElementNS(document.ns, "path"); //Create a path in SVG's namespace

    var pathSpec = points.map(
        function (point, key) {
            return {
                pathSegTypeAsLetter: (key == 0) ? 'M' : 'L',
                x: point[0],
                y: point[1]
            }
        }
    )

    console.log(pathSpec)

    //newElement.setAttribute("d", `M${x1} ${y1} L${x2} ${y2}`); //Set path's data

    newElement.setAttribute('d', document.svgHelper.d(pathSpec))

    newElement.style.stroke = lineColor; //Set stroke colour
    newElement.style.strokeWidth = "5px"; //Set stroke width
    document.svg.appendChild(newElement);
};

document.drawAxes = function () {



}


document.drawGraph = function () {
    var {
        lineLength,
        circleSize
    } = document.chartConfig;

    document.median.forEach(function (p) {
        document.drawCirc(p);
    });

    document.min.forEach(function (p) {
        document.points = [
            [p[0] - lineLength,
                p[1]
            ],
            [p[0] + lineLength,
                p[1]
            ]
        ];
        document.drawLine(document.points);
    });
    document.max.forEach(function (p) {
        document.points = [
            [p[0] - lineLength,
                p[1]
            ],
            [p[0] + lineLength,
                p[1]
            ]
        ];
        document.drawLine(document.points);
    });
};
window.addEventListener("load", function () {
    document.initSvg();
    document.drawGraph();
});