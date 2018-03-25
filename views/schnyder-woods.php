<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Schnyder's theorem</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/3.16.5/math.js"></script>

    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <link href="https://fonts.googleapis.com/css?family=Nanum+Pen+Script" rel="stylesheet">

    <script src="../js/xml2json.js"></script>
    <script src="../js/typed.min.js"></script>
    <link rel="stylesheet" href="../css/style.css">
    <script src="../js/core.js"></script>
    <script src="../js/schnyder-woods.js"></script>
    <script src="../js/util.js"></script>

</head>
<body>
    <h2 class="text-center"> Computational Geometry</h2>
    <div class="row">
        <div class="col-sm-9">
            <div id="canvas-holder"></div>
            <button id="switch" class="btn btn-warning">line</button>
            <button id="clear_sol" class="btn btn-warning" onclick="clear_solution()">Clear</button>
            <button id="reset" class="btn btn-warning" onclick="reset()">Reset</button>
        </div>
        <div class="col-sm-3">
            <button id="demo1" class="btn btn-warning" onclick="generateDemo(0)"> Demo 1 </button>
            <button id="demo2" class="btn btn-warning" onclick="generateDemo(1)"> Demo 2 </button>
            <button id="demo3" class="btn btn-warning" onclick="generateDemo(2)"> Demo 3 </button>
        </div>
    </div>
    <button id="schnyder-wood" class="btn btn-warning">Schnyder's Woods</button>
</body>
</html>