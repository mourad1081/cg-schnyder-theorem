<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>3D visualization of Schnyder's theorem</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>

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

</head>
<body>
   <h2 class="text-center">
        Part III - Visualisation 3D des Schnyder Woods
    </h2>
    <div class="theory animated bounceInUp container">
        <div class="explanations row">
            <h3 class="text-center col-12">Introduction</h3>
            <hr>
            <div class="col-12 col-md-12">
                <p>
                    Nous voici arrivé dans l'ultime partie du jeu, voyons désormais 
                    comment représenter un schnyder Wood en trois dimension.
                </p>
                <p>
                    Tout d'abord, quelques définitions sur les termes employés :
                    <ul>
                        <li>
                        Une map planaire \(M\) est un graphe planaire \(G\) associé
                        à un <em>planar embedding</em> de \(G\) dans le plan.
                        </li>

                        <li>
                        Soit \(a_1, a_2, a_3\) trois sommets différents 
                        apparaissant dans le sens horloger sur la face externe de \( M \).
                        Une suspension \(M^\sigma\) s'obtient en créant un demi-arc qui
                        relie chacun de ces sommets spéciaux à la face externe.
                        </li>
                    </ul>
                </p>
                <hr>
                <h5><strong>Partition en régions</strong></h5>
                <hr>
                <p>
                    La première étape consiste à pouvoir être capable de diviser
                    le schnyder Woods en trois régions (et ce, pour chaque commet).
                    Prenons le schnyder woods ci-dessous comme exemple :
                </p>
                <p class="text-center">
                    <img src="../img/3D-0.png" alt="" />
                </p>
                <p>
                    Soit \( T_i \), le digraphe obtenu par les arcs dirigés de couleur \( i \). 
                    Nous pouvons remarque que chaqe sommet interne dans \( T_i \) possède 
                    un degré ortant de 1. Ainsi, tout sommet \( v \) est le sommet 
                    de départ d'un <em>i-chemin</em> \( P_i(v) \) dans \( T_i \).
                </p>
                <p>
                    (Le <em>i-chemin \( P_i(v) \) </em> d'un sommet \(v\) se définit comme étant 
                    l'unique chemin dans \(T_i\) allant de \(v\) à la racine \(a_i\). 
                </p>
                <p>
                    Ces chemins seront toujours acycliques et simples. 
                    Aussi, le digraphe \(D_i = T_i \cup T^{-1}_{i-1} \cup T^{-1}_{i+1}\)
                    est acyclique pour \( i = 1, 2, 3 \). \( T^{-1} \) s'obtient en inversant
                    tous les arcs de \( T_i \). Aussi, nous en déduisons que les chemins 
                    \(P_i(v)\) et \(P_j(v)\) ont pour seul sommet commun \(v\) 
                    et ce, pour \(i \neq j\). Les preuves peuvent être trouvées
                    dans les références en bas du niveau (sources [2] et [3]).
                </p>
                <p>
                    Ainsi, \(P_1(v), P_2(v), P_3(v)\) divisent \(M\) en trois régions 
                    \(R_1(v), R_2(v), R_3(v)\) où \(R_i(v)\) est la région bornée par
                    les chemins \(P_{i-1}(v)\) et \(P_{i+1}(v)\). 
                    Ci-dessous, nous pouvons voir une illustration de ce qui vient 
                    d'être expliqué.
                </p>
                <p class="text-center">
                    <img src="../img/3D-1.png" alt="" />
                    <br>
                    <small>Source: [1] Schnyder Woods and Orthogonal Surfaces</small>
                </p>

                <p>
                Et les chemins \(P_1(v), P_2(v), P_3(v)\) sont les suivants : 
                </p>
                <p class="text-center">
                    <img src="../img/3D-2.png" alt="" />
                </p>

                <hr>
                <h5><strong>Embarquer un Schnyder wood dans une surface orthogonale</strong></h5>
                <hr>
                La deuxième chose que nous devons être capable de faire est 
                de convertir un sommet du Schnyder woods en sa représentation 3D.
                Pour ce faire, la méthode est assez simple :

                <ol>
                    <li>
                        Pour un sommet \(v\) d'un schnyder Woods, 
                        nous définissons son <em>face-count vector \((v_1, v_2, v_3)\)</em>
                        (ou <em>vecteur région</em>) où <br>
                        <p class="text-center">
                            \(v_i = \) le nombre de face de \( M \) contenue dans \( R_i(v) \)
                        </p>
                    </li>
                    <li>
                        Le vecteur défini ci-dessus nous servira pour construire 
                        une surface orthogonale pour le Schnyder wood. 
                        Maintenant, posons \(\alpha_1, \alpha_2, \alpha_3\) trois point 
                        dans le plan et non collinéaires. 
                        Grâce à ces trois points et les vecteurs régions, nous pouvons définir
                        le point embarqué dans \( M \) correspondant au sommet \(v\) du Schnyder wood.
                        <p>
                        Un sommet \(v\) sera mis embarqué dans \( M \) via la fonction \(\mu\) :
                        <br>
                        \[ \mu : v \rightarrow v_1\alpha_1 + v_2\alpha_2 + v_3\alpha_3 \]
                        </p>
                        <p>
                        Ici, nous pouvons simplifier les calculs en prenant 
                        \(\alpha_1 = (1, 0, 0), \alpha_2 = (0, 1, 0), \alpha_3 = (0, 0, 1) \),
                        le point \(v\) sera donc embarqué ainsi via son vecteur région.
                        </p>
                    </li>
                    <li>
                        Aussi, un arc \(\{u,v\}\) est mappé par \(\mu\) sur le segment 
                        de droite reliant \(\mu(u)\) et \(\mu(v)\).
                    </li>
                </ol>




<hr>
<pre>Source : 
[1] - Felsner, S., & Zickfeld, F. (n.d.). Schnyder Woods and Orthogonal Surfaces. 
      In Graph Drawing (pp. 417–429). Springer Berlin Heidelberg. 
      https://doi.org/10.1007/978-3-540-70904-6_40

[2] - S. Felsner, Convex drawings of planar graphs and the order dimension of
      3-polytopes, Order, 18 (2001), pp. 19–37.

[3] - S. Felsner, Geometric Graphs and Arrangements, Vieweg Verlag, 2004.
</pre>



            </div>
        </div>
    </div>
    <div id="visu-3d" class="container">
        <div class="row">
            <div class="buttons_demo animated bounceInUp text-center col-12">
                <button id="btn-start-embedding" style="display:inline-block; width: auto;" class="btn big-button">Demarrer l'embedding</button>
            </div> 
            <div class="demo animated bounceInUp text-center col-12">
                
                <div class="col-sm-12">

                    <!-- canvas -->
                    <div id="canvas-holder"></div>


                </div>
                
                <button id="btn-reset-position-camera" class="btn btn-warning">Reset camera position</button>
                <button id="btn-reset-rotation-camera" class="btn btn-warning">Reset camera rotation</button>
            </div>
        </div>
    </div>
    <script src="../js/three/build/three.min.js"></script>
    <script src="../js/three/controls/OrbitControls.js"></script>
    <script src="../js/3d-visualization.js"></script>
    <script>
    renderMathInElement(document.body);
    </script>
</body>
</html>