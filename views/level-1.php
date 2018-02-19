<?php 
    $json = file_get_contents("../locales/level-1/en.json");
    $level = json_decode($json, true);
?>

<main id="level-1" class="container">
    <h2 class="text-center"><?php echo $level['level'] ?></h2>
    <div class="theory animated bounceInUp container">
        <div class="explanations row">
            <h3 class="text-center col-12"><?php echo $level['title'] ?></h3>
            <hr>
            <div class="col-12 col-md-12">
                <p>
                    <?php echo $level['p1'] ?>
                </p>
                <p>
                    <?php echo $level['p2'] ?>
                </p>
                <p>
                    <?php echo $level['p3'] ?>
                </p>
                <p>
                    <?php echo $level['p4'] ?> <br/>
                    <ul>
                        <li><?php echo $level['li1'] ?></li>
                        <li>
                            <?php echo $level['li2'] ?>
                        </li>
                        <li>
                            <?php echo $level['li3'] ?>
                        </li>
                    </ul>
                </p>
            </div>
        </div>
        <div id="actions-level-1">
            <button id="btn-start-quizz-level-1" class="btn big-button">Play quizz</button>
        </div>
    </div>

    <div id="container-questions-level-1" class="row">

    </div>

    <div id="congratulations-level-1" class="container d-none">
        <div class="row explanations">
            <h2 class="text-center col-12"><?php echo $level['congratulation-title'] ?></h2>
            <div class="col-12 col-md-12">
                <?php echo $level['congratulation-txt'] ?>
            </div>
        </div>
        <button id="btn-next-level-1" class="btn big-button"><?php echo $level['btn-next-level'] ?></button>
    </div>
</div>
</main>