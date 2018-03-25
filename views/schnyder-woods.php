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
    <h2 class="text-center"> Computational Geometry</h2>
    <div class="theory animated bounceInUp container">
        <div class="explanations row">
            <h3 class="text-center col-12">Schnyder's Woods</h3>
            <hr>
            <div class="col-12 col-md-12">
                <p>
                    Avant d'entamer la définition d'un Schnyder's Woods, nous allons introduire la notion de 3-orientations d'un plan triangulaire.
                </p>
                <p>
                    Considérons un plan triangulaire G. Un vertex interne de G est un vertex qui n'est pas incident à la face extérieur de G tandis qu'un vertex externe est un vertex qui
                    est incident à la face extérieur. Implicitement, un arc interne est un arc qui n'est pas incident à la face extérieur donc possède au moins 1 vertex interne et un arc externe
                    est un arc qui est incident à la face extérieur. La définition de 3-orientations est la suivante :
                    <quote>
                        Posons G un plan triangulaire. Une 3-orientation de G est une orientation des arc internes de G tel que le degré sortant de chaque arc d'incident est de 3.
                    </quote>
                </p>
                <p>
                    La définition d'un Schnyder's Woods est défini tel que : <br/>
                    <quote>
                        Etant donné un plan triangulaire \( T = (V, E) \), un Schnyder's Woods/Labelling de T est une 3-orientation \( \overrightarrow{T} \) de T de même que un 3-coloration des arcs internes de \( \overrightarrow{T} \) respecte ces conditions :
                        <ul>
                            <li> Chaque vertex possède exactement un arc sortant pour chaque couleur dans \( \overrightarrow{T} \).</li>
                            <li> 
                                Les couleurs des arcs sortant autour d'un vertex apparaissent toujours dans le même ordre (chronologique). <br/>
                                <img src="../img/schnyder_condition.png"/>
                            </li>
                            <li> Les arcs entrants pour une couleur apparaissent toujours entre 2 arcs sortant des 2 autres couleurs.</li>
                        </ul>
                    </quote>
                </p>

                <p>
                    Maintenant nous allons développer le fonctionnement de l'algorithme de Schnyder's Woods. Considérons un plan triangulaire \( T = (V, E) \). Posons u,v, w les 3 vertex exterieur de T, dans 
                    l'ordre chronologique, et posons les couleurs bleu, rouge, vert. A chaque étape i \( \leq \) 0 de l'algorithme, nous allons traiter un sous-graphe \( T_i \) de T dont il est 2-connecté à triangulation proche contenant l'arc (u,w). A chaque itération, nous allons choisir un vertex externe \( v_i \) dans \( T_i \) different de u et w, tel que \( v_i \) a exactement 2 voisins qui sont des vertex externes à \( T_i \). Une fois choisi, on oriente et colore les arcs de \( v_i \) et on recommence en i+1 tel que \( T_{i+1} = T_i\)\{\(v_i\)}. Dans un premier temps, on initialise \( T_0 = T\) et \( v_0 = v\). Ensuite, de i allant de 0 à n-3 (dont n est le nombre de points dans le plan), on sait que \( T_i \) est un sous graphe de T. Le processus se déroule comme-ci : 
                    <ul>
                        <li> on choisit, dans \(T_i\), \(v_i\) qui a exactement 2 voisins \( x_i\) et \(y_i\) qui sont 2 vertex externes. On choisit \(x_i\) le sommet qui est le plus proche de u et on choisit \(y_i\) le sommet qui est le plus proche de w. </li>
                        <li> Maintenant, on oriente l'arc (\(v_i\), \(y_i\)) en direction de \(y_i\) et on le colore en bleu. On oriente l'arc (\(v_i\), \(x_i\)) dans la direction de \(x_i\) et on le colore en vert. Enfin, on oriente tous les autres arcs de \(v_i\) en direction de lui-même et on les colore en rouge </li>
                        <li> On recommence depuis l'étape 1 avec \(T_i\)\{\(v_i\)}.
                    </ul>
                    L'iteration arrête lorsqu'on a parcouru au plus quand on a parcouru tous les sommets internes. Il peut exister plusieurs solutions pour un même plan triangulaire. Les différentes solutions peuvent etre créer dûe à un parcours différents des vertex internes. <br/>
                    <img src="../img/schnyder_algo.PNG" class="center" />
                </p>

                <p>
                    Ci-dessous, vous pouvez trouver 3 démonstrations de l'algorithme sur 3 plans triangulaire à complexité différentes.
                </p>
            </div>
        </div>
    </div>
    <br/>
    <div class="buttons_demo animated bounceInUp row">
            <button id="demo1" class="btn big-button" onclick="generateDemo(0)"> Demo 1 </button>
            <button id="demo2" class="btn big-button" onclick="generateDemo(1)"> Demo 2 </button>
            <button id="demo3" class="btn big-button" onclick="generateDemo(2)"> Demo 3 </button>
    </div> 
    <div class="demo animated bounceInUp row">
        <div class="col-sm-8">
            <div id="canvas-holder"></div>
            <button id="switch" class="btn btn-warning">line</button>
            <button id="clear_sol" class="btn btn-warning" onclick="clear_solution()">Clear</button>
            <button id="reset" class="btn btn-warning" onclick="reset()">Reset</button>
        </div>
        <div class="col-sm-4">
            <button id="schnyder-wood" class="btn big-button">Schnyder's Woods</button>
        </div>
    </div>
</body>
</html>