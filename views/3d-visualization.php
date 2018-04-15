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
    <style>
        .text {
            padding: 0;
            font-family: monospace;
            box-shadow: none;

        }
    </style>
</head>
<body>
   <h2 class="text-center">
        Part III - Visualisation 3D de Schnyder Woods
    </h2>
    <div class="theory animated bounceInUp container">
        <div class="explanations row">
            <h3 class="text-center col-12">Introduction</h3>
            <hr>
            <div class="col-12 col-md-12">
                <p>
                    Nous voici arrivé dans l'ultime partie du jeu, voyons désormais 
                    comment représenter un schnyder Wood en trois dimensions.
                    <em>(* une scène interactive est disponible tout en bas du niveau)</em>
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
                    le schnyder Wood en trois régions (et ce, pour chaque commet).
                    Prenons le Schnyder wood ci-dessous comme exemple :
                </p>
                <p class="text-center">
                    <img style="max-width: 100%;" src="../img/3D-0.png" alt="" />
                </p>
                <p>
                    Soit \( T_i \), le digraphe obtenu en ne considérant que les arcs dirigés de couleur \( i \).
                    Nous pouvons remarquer que chaque sommet interne dans \( T_i \) possède
                    un degré sortant de 1. Ainsi, tout sommet \( v \) est le sommet
                    de départ d'un <em>i-chemin</em> \( P_i(v) \) dans \( T_i \).
                </p>
                <p>
                    (Le <em>i-chemin \( P_i(v) \) </em> d'un sommet \(v\) se définit comme étant 
                    l'unique chemin dans \(T_i\) allant de \(v\) à la racine \(a_i\).)
                </p>
                <p>
                    Ces chemins seront toujours acycliques et simples.
                    Aussi, nous en déduisons que les chemins
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
                    <img style="max-width: 100%;" src="../img/3D-1.png" alt="" />
                    <br>
                    <small>Source: [1] Schnyder Woods and Orthogonal Surfaces</small>
                </p>

                <p>
                Et les chemins \(P_1(v), P_2(v), P_3(v)\) sont les suivants : 
                </p>
                <p class="text-center">
                    <img style="max-width: 100%;" src="../img/3D-2.png" alt="" />
                </p>

                <hr>
                <h5><strong>Faire correspondre un sommet à un point 3D</strong></h5>
                <hr>
                La deuxième chose que nous devons être capable de faire est 
                de convertir un sommet de \(M^\sigma\) en sa représentation
                3D sur base d'un Schnyder Wood.
                Pour ce faire, la méthode est assez simple,
                pour un sommet \(v\) de \(M\), nous définissons son
                <em>face-count vector \((v_1, v_2, v_3)\)</em> (ou
                <em>vecteur région</em>) où
                <br>
                <p class="text-center">
                    \(v_i = \) le nombre de faces de \( M \) contenue dans \( R_i(v) \)
                    selon un Schnyder Wood donné de \(M\)
                </p>
                Le vecteur défini ci-dessus nous servira pour construire
                un <em>geodesic embedding</em>.
                Les sommets \( a_1, a_2, a_3 \) de \(M^\sigma\)
                valent respectivement \( (f-1, 0, 0), (0, f-1, 0) \) et \( (0, 0, f-1) \),
                et pour tout vecteur région, nous avons \(v_1 + v_2 + v_3 = f-1 \).
                <p>
                    \(f\) représente le nombre de face dans \( M^\sigma \).
                </p>
                <hr>
                <h5><strong>Surfaces orthogonales et graphes planaires</strong></h5>
                <hr>
                <p>
                    Avant-dernière chose à connaître avant de pouvoir
                    représenter un Schnyder Wood en 3D.
                    Considérons \( \mathbb{Z}^3 \) des sous-ensembles de \( \mathbb{R}^3 \) ainsi
                    que <em>l'ordre de domination</em> sur ces ensembles.
                </p>
                <p>
                    C'est-à-dire que \((a_1, a_2, a_3) \leq (b_1, b_2, b_3) \)
                    si et seulement si \(a_i \leq b_i \) pour \(i = 1, 2, 3\).
                    Par exemple, \((-2, 3, 0) \leq (0, 5, 0) \) mais \((0, 10, 0) \not\leq (5, 5, 10) \).
                </p>
                <p>
                    Ensuite, notons \(a \vee b \) comme la <em>jointure</em> de \(a,b \in \mathbb{R^3}\).
                    Il s'agit du vecteur résultant du maximum appliqué composant par composant.
                    Par exemple, \((-2, 3, 8) \vee (0, 5, 0) = (0, 5, 8) \).
                </p>
                <p>
                    Notons également \(a \wedge b \) comme étant la <em>rencontre</em> de \(a,b \in \mathbb{R^3}\)
                    et qui est exactement pareil que la jointure sauf qu'on
                    considère le minimum au lieu du maximum. Par exemple,
                    \((-2, 3, 12) \vee (0, -10, 0) = (-2, -10, 0) \).
                </p>
                <p>
                    Aussi, posons \(\mathcal{V} \) un sous-ensemble de \(\mathbb{Z}^3\) et qui est
                    une antichaîne, c'est-à-dire un ensemble où chaque paire d'élément est incomparable.
                    Dans \(\mathbb{R}^3\), \(\mathcal{V} \) génère un filtre qui est l'ensemble défini ainsi :
                    \[\langle \mathcal{V} \rangle = \{a\in\mathbb{R}^3 | a \geq v \text{, pour certains } v \in \mathcal{V} \} \]
                </p>
                <p>
                    De plus, nous appelons \(S_\mathcal{V}\) la surface orthogonale générée par
                    \(\mathcal{V} \) et représente les bornes du filtre \langle \mathcal{V} \rangle de
                    \(\mathcal{V} \).
                </p>
                <p>
                    Ci-dessous, nous pouvons voir une représentation 2D de ce qui vient d'être dit :
                </p>
                <p class="text-center">
                    <img style="max-width: 100%;" src="../img/2D-0.png" alt="" />
                    <br>
                    <small>Source: [4] - Geometry of Orthogonal Surfaces</small>
                </p>
                <p class="text-center">
                    <img style="max-width: 100%;" src="../img/2D-1.png" alt="" />
                    <br>
                    <small>Source: [4] - Geometry of Orthogonal Surfaces</small>
                </p>
                <p>
                    Dans un espace à trois dimension, l'on obtiendrait cela :
                </p>
                <p class="text-center">
                    <img style="max-width: 100%;" src="../img/geo-0.png" alt="" />
                    <br>
                    <small>Source: [4] - Geometry of Orthogonal Surfaces</small>
                </p>
                <p>
                    Nous pouvons remarquer que si deux points \( u,v \in \mathcal{V} \)
                    et que leur jointure \( u \vee v \in S_\mathcal{V} \), alors la bordure
                    \( S_\mathcal{V} \) contient l'union des deux segments
                    de droites reliant \(u\) et \(v\) à \( u \vee v \). Ces arcs sont appelés
                    des <em>coudes géodésiques</em> (elbow geodesic) dans \( S_\mathcal{V}\).
                </p>
                <p>
                    Ci-dessous, nous pouvons voir de manière schématique les coudes
                    géodésiques sur base d'un exemple de surface orthogonale générée
                    par une antichaîne.
                </p>
                <p class="text-center">
                    <img style="max-width: 100%;" src="../img/3D-3.png" alt="" />
                </p>
                <p>
                    Enfin, notons que chaque vecteur \( v \in \mathcal{V} \) possède
                    exactement trois arcs orthogonaux dans les directions des axes
                    de coordonnées. Nous pouvons voir que certains arcs ne sont pas
                    bornés tandis que d'autre le sont. Sur l'illustration ci-dessus,
                    le vecteur \( (0, 0, 7) \) possède deux arcs orthogonaux bornés
                    (dans la direction de l'axe \( y \) et \( x \)) et un arc
                    non-borné (dans la direction de l'axe \( z \) ). Un corollaire
                    de cette observation est qu'un coude géodésique \( u \vee v \)
                    possède nécessaire au moins un arc orthogonal borné du fait qu'il
                    est la jointure de \(u,v \in \mathcal{V}\).
                </p>
                <p>
                    Une antichaîne \( \mathcal{V} \) dans \( \mathbb{Z}^3 \) est ainsi
                    dite <em>axiale</em> si elle contient <em>exactement</em> trois arcs
                    orthogonaux non-bornés. L'exemple illustré ci-dessus n'est pas axial
                    car il y a 5 arcs orthogonaux.
                </p>
                <p class="text-center">
                    À votre avis, quel point faudrait-il retirer de \( \mathcal{V} \)
                    pour que l'antichaîne devienne axiale ?
                    (cliquez sur le point qu'il faudrait retirer selon vous.)
                </p>
                <div class="text-center">
                    <button class="btn btn-warning" onclick="swal('Ce n\'est pas la bonne réponse :-(')">(0, 0, 7)</button>
                    <button class="btn btn-warning" onclick="swal('Ce n\'est pas la bonne réponse :-(')">(2, 4, 2)</button>
                    <button class="btn btn-warning" onclick="swal('', 'Oui ! C\'est la bonne réponse !', 'success')">(5, -2, 6)</button>
                    <button class="btn btn-warning" onclick="swal('Ce n\'est pas la bonne réponse :-(')">(1, 2, 4)</button>
                    <button class="btn btn-warning" onclick="swal('Ce n\'est pas la bonne réponse :-(')">(5, 3, 0)</button>
                    <button class="btn btn-warning" onclick="swal('Ce n\'est pas la bonne réponse :-(')">(4, 2, 1)</button>
                    <button class="btn btn-warning" onclick="swal('Ce n\'est pas la bonne réponse :-(')">(7, 0, 0)</button>
                    <button class="btn btn-warning" onclick="swal('Ce n\'est pas la bonne réponse :-(')">(4, 1, 2)</button>
                    <button class="btn btn-warning" onclick="swal('Ce n\'est pas la bonne réponse :-(')">(0, 7, 0)</button>
                </div>

                <hr>
                <h5><strong>Embedding géodésiques</strong></h5>
                <hr>

                <p>
                    Toute la section précédente nous sert pour comprendre
                    le théorème suivant dont une partie nous permettra de produire un
                    embedding géodésique à partir d'un Schnyder Wood.
                </p>

                <div style="border: solid blue 3px; padding: 10px;margin: 10px;">
                    Théorème
                    <hr>
                    <p style="text-align: justify;">
                        Soit \( \mathcal{V} \) une antichaîne axiale et
                        \( M \hookrightarrow S_\mathcal{V} \) un embedding géodésique.
                        Cet embedding induit un Schnyder Wood de \( M^\sigma \).
                        <strong>
                            Et inversement, soit donné un Schnyder Wood d'un graphe planaire \( M^\sigma \),
                            nous définissons \( \mathcal{V} \) comme l'ensemble des vecteurs régions des sommets de
                            \( M^\sigma \). Ceci produit un embedding géodésique de \( M \hookrightarrow S_\mathcal{V} \)
                            avec \( \mathcal{V} \) qui est axial.
                        </strong>
                    </p>
                </div>

                <p>
                    Aussi, un tracé (=représenter des graphes dans le plan)
                     \( M \hookrightarrow S_\mathcal{V} \) est un embedding géodésique de \( M \) dans
                    \( S_\mathcal{V} \) s'il satisfait les trois axiomes suivants :

                </p>
                <ol>
                    <li>
                        <em>Axiome de sommet</em> - Il y a une bijection entre les sommets de \( M \) et
                        \( \mathcal{V} \).
                    </li>
                    <li>
                        <em>Axiome du coude géodésique</em> - Tout arc de \( M \) est un coude géodésique dans
                        \( S_\mathcal{V} \) et tout arc orthogonal borné dans \( S_\mathcal{V} \) fait parti d'un
                        arc de \( M \).
                    </li>
                    <li>
                        Il n'y a pas d'arcs qui se croisent dans l'embedding de \( M \) sur \( S_\mathcal{V} \).
                    </li>
                </ol>
                <hr/>
                <p>
                    Nous savons donc maintenant comment procéder.
                    Sur la scène ci-dessous, vous pouvez constater un plan 2D.
                    Cliquez sur le bouton "Etape 1 - ..." pour
                    générer le Schnyder Wood d'un graphe planaire et calculer les i-chemin
                    (et donc les régions) de chaque sommet.
                    Vous pouvez masquer le résultat avec le premier bouton.
                </p>
                <p>
                    Ensuite, vous pourrez cliquer sur le bouton "Etape 2 - ..." pour générer
                    les points 3D correspondant aux sommets du Schnyder Wood associé
                    au graphe planaire. Sont affichés sur la scène des petits segments blancs qui
                    indiquent quel point 3D correspond à quel sommet du Schnyder Wood.
                </p>
                <p>
                    Enfin, vous pourrez cliquer sur le bouton "Etape 3 - ..." pour créer
                    l'embedding géodésique et ainsi voir en même temps le Schnyder Wood
                    et son embedding sur la même scène.
                </p>


<!-- --------------------------------------------------------------------------------------- -->
<hr>
<pre>Source : 
[1] - Felsner, S., & Zickfeld, F. (n.d.). Schnyder Woods and Orthogonal Surfaces. 
      In Graph Drawing (pp. 417–429). Springer Berlin Heidelberg. 
      https://doi.org/10.1007/978-3-540-70904-6_40

[2] - S. Felsner, Convex drawings of planar graphs and the order dimension of
      3-polytopes, Order, 18 (2001), pp. 19–37.

[3] - S. Felsner, Geometric Graphs and Arrangements, Vieweg Verlag, 2004.

[4] - S. Felsner, S. Kappes, F. Zickfeld, Geometry of Orthogonal Surfaces,
      CanaDAM 2007, 2007,
      http://page.math.tu-berlin.de/~felsner/Slides/banff-ortho.pdf
</pre>
<!-- --------------------------------------------------------------------------------------- -->
            </div>
        </div>
    </div>
    <div id="visu-3d" class="container-fluid">
        <div class="row">
            <div class="demo animated bounceInUp text-center col-12">
                <div class="col-12">
                    <hr>
                </div>
                <button class="btn btn-warning" onclick="$('#result').toggleClass('d-none')">Afficher/masquer textes sur la scène</button>
                <br>
                <button id="btn-compute-regions" class="btn btn-warning mt-2 mb-2">
                    Étape 1 - Générer Schnyder wood et calculer ses régions
                </button>
                <button id="btn-create-3d-points" class="btn btn-warning mt-2 mb-2" disabled>
                    Étape 2 - Générer les points 3D
                </button>
                <button id="btn-generate-orthogonal-surfaces" class="mt-2 mb-2 btn btn-warning" disabled>
                    Étape 3 - Générer le géodésique embedding
                </button>
                <div class="col-sm-12" style="position: relative;">
                    <small style="display: block;
                                  top: 0;right: 10px;
                                  position: absolute;
                                  padding: 5px;
                                  font-family: monospace;
                                  background-color: rgba(0, 0, 0, 0.3);">
                        * l'axe Y pointe vers le haut.
                    </small>

                    <p id="result"
                       class="d-none"
                       style="top: 0;left: 10px;
                              position: absolute;
                              padding: 5px;
                              font-family: monospace;
                              color:white;
                              text-align: left;
                              font-size: 10px;
                              background-color: rgba(0, 0, 0, 0.3);"></p>


                    <!-- canvas -->
                    <div id="canvas-holder"></div>

                </div>
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