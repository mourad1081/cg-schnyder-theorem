<?php 
    // Simple parser d'XML
    $xml_string = file_get_contents("../locales/fr.xml");
    $level = new SimpleXMLElement($xml_string);

    // Il suffit de changer juste cette variable 
    // si on veut reprendre le même template pour 
    // les futurs levels
    $level_index = 1; 

    // Les datas du XML décrivant le level
    $title   = $level->level[$level_index]->title;
    $content = $level->level[$level_index]->content;
    $name    = $level->level[$level_index]->name;
?>

<main id="level-2" class="container">
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
        <div id="actions-level-2">
            <button id="btn-start-quizz-level-2" class="btn big-button">Play quizz</button>
        </div>
    </div>

    <div id="container-questions-level-2" class="row">

    </div>

    <!-- 
        Ici, les contrôles possibles pour une question.
        Il peut soit terminer la série de questions,
        soit passer à la question suivante.
     -->
    <div id="container-actions-questions" class="row d-none animated bounceIn">
        <button id="show-theory"       class="btn big-button" onClick="displayTheory()">Help</button>
        <button id="btn-next-question" class="btn big-button">Next question</button>
        <button id="btn-finish-level"  class="btn big-button">Finish</button>
    </div>

    <div class="theory-explanations"></div>

    <div id="congratulations-level-2" class="container d-none">
        <div class="row explanations">
            <h2 class="text-center col-12">Congratulations</h2>
            <div class="col-12 col-md-12">
                Now, you have a good understanding of what is an 
                <strong>order</strong>. <br/> 
                You can continue to the next level : 
                <strong> LEVEL 2 - Partial Orders</strong>
            </div>
        </div>
        
        <button id="btn-next-level-2" class="btn big-button">Next level</button>
    </div>
</main>


<!-- Ce div contient le fichier XML, il est caché,
     il sert pour pouvoir l'utiliser aisément en JS -->
<div id="xml-content" class="d-none">
    <?php echo $xml_string ?>
</div>
