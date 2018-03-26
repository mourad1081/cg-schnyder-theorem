<?php  
    // Simple parser d'XML
    $xml_string = file_get_contents("../locales/fr.xml");
    $xml = new SimpleXMLElement($xml_string);

    $name = $xml->woods->name;
    $title = $xml->woods->title;
    $content = $xml->woods->content;
?>

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

     <!-- Pour faire du latex en HTML -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0-beta1/katex.min.css" integrity="sha384-VEnyslhHLHiYPca9KFkBB3CMeslnM9CzwjxsEbZTeA21JBm7tdLwKoZmCt3cZTYD" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0-beta1/katex.min.js" integrity="sha384-O4hpKqcplNCe+jLuBVEXC10Rn1QEqAmX98lKAIFBEDxZI0a+6Z2w2n8AEtQbR4CD" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0-beta1/contrib/auto-render.min.js" integrity="sha384-IiI65aU9ZYub2MY9zhtKd1H2ps7xxf+eb2YFG9lX6uRqpXCvBTOidPRCXCrQ++Uc" crossorigin="anonymous"></script>

    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <link href="https://fonts.googleapis.com/css?family=Nanum+Pen+Script" rel="stylesheet">

    <script src="../js/xml2json.js"></script>
    <script src="../js/typed.min.js"></script>
    <link rel="stylesheet" href="../css/style.css">
    <script src="../js/core.js"></script>
    <script src="../js/schnyder-woods.js"></script>

</head>
<body>
   <h2 class="text-center">
        <?php echo $name ?>
    </h2>
    <div class="theory animated bounceInUp container">
        <div class="explanations row">
            <h3 class="text-center col-12"><?php echo $title ?></h3>
            <hr>
            <div class="col-12 col-md-12">
                <?php echo $content ?>
            </div>
        </div>
    </div>
    <br/>
    <div class="container">
        <div class="row">
            <div class="buttons_demo animated bounceInUp text-center col-12">
                <button id="demo1" style="display:inline-block;" class="btn big-button" onclick="generateDemo(0)"> Demo 1 </button>
                <button id="demo2" style="display:inline-block;" class="btn big-button" onclick="generateDemo(1)"> Demo 2 </button>
                <button id="demo3" style="display:inline-block;" class="btn big-button" onclick="generateDemo(2)"> Demo 3 </button>
            </div> 
            <div class="demo animated bounceInUp text-center col-12">
                <div class="col-sm-12">
                    <div id="canvas-holder"></div>
                    <button id="clear_sol" class="btn btn-warning" onclick="clear_solution()">Clear</button>
                </div>
                <div class="col-sm-12">
                    <button id="schnyder-wood" style="display:inline-block; width: auto;" class="btn big-button">Schnyder's Woods</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>