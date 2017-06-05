<?php
$AdminLevel = 1;
if (empty($DashboardLogin) || empty($Admin) || $Admin['level'] < $AdminLevel ):
    die('<div style="text-align: center; margin: 5% 0; color: #C54550; font-size: 1.6em; font-weight: 400; background: #fff; float: left; width: 100%; padding: 30px 0;"><b>ACESSO NEGADO:</b> Você não esta logado<br>ou não tem permissão para acessar essa página!</div>');
endif;

$Maps = new Maps();
?>

<script src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyBOzBrY44aUb2j3VIi4faeCIrhgy9-MSIU"></script>
<script src="js/ol3/ol-debug.js"></script>

<script src="js/layersMaps/online.js" defer></script>
<script src="js/layersMaps/nativo.js" defer></script>

<script src="js/map.js" defer></script>
<script src="js/eventsDraw/default.js" defer></script>
<script src="js/eventsDraw/points.js" defer></script>

<script src="js/functionsDraw/default.func.js" defer></script>

<section class="mapedit" id="mapafixo">

    <p id="jsonLayersStreet" style="display: none;"><?= $Maps->generateJson($Conn, 'tb_street'); ?></p>
    <p id="jsonLayersPlaces" style="display: none;"><?= $Maps->generateJson($Conn, 'tb_places'); ?></p>

    <!--- ### BOTÕES ### -->
        <!--- btn LAYERS -->
        <div class="base_btn layerB">
            <a class='btn_draw' id="layersModel"><span class="glyphicon glyphicon-folder-open"></span> LAYERS</a>
        </div>

        <!--- btn SEARCH -->
        <div class="base_btn searchB">
            <a class='btn_draw glyphicon glyphicon-search' id='searchModel'></a>
        </div>

        <!--- btn AÇÕES DESENHO -->
        <div class="base_btn typeGeomB">
            <span style="color: #3366FF; font-size: 2em; font-weight: 600;text-shadow: 1px 1px 1px #333;">&#9997;</span>
            <a class='btn_draw drawPoint glyphicon glyphicon-record' id='pointsModel'></a>
        </div>

        <!--- btn RECARREGAMENTO de PÁGINA -->
        <div class="base_btn recarregB">
            <a class='btn_draw glyphicon glyphicon-refresh' id='recEditModel'></a>
            <a class='btn_draw glyphicon glyphicon-remove' id='recDefModel'></a>
        </div>
    <!--- ### FIM BOTÕES ### -->

    <!--- TOOBAR dos Desenhos -->
    <div id="pointsOptions" class="toobar">
        <p class="btn" id="panPoint">[ ]</p>
        <p class="btn" id="drawPoint">Draw</p>
        <p class="btn" id="editPoint">Edit</p>
        <p class="btn" id="dupPoint">Duplicate</p>
        <p class="btn" id="erasePoint">Erase</p>
    </div>
    <!---fim toobar -->

    <!--- FORMULARIO DE ENVIO DO DADO -->
    <?php require 'tpl/draw/insertdados.php'; ?>

    <!--- FORMULARIO DE EDIÇÃO DO DADO -->
    <?php require 'tpl/draw/editdados.php'; ?>

    <!--- FORMULARIO DE DUPLICAÇÃO DO DADO -->
    <?php require 'tpl/draw/duplicdados.php'; ?>

    <!--- TOOBAR DE PESQUISA (GEOCODIFICAÇÃO) -->
    <?php require 'tpl/draw/search.php'; ?>

    <img src="images/logo.png" title="logo Pauliceia-Edit">
    <a href="dashboard.php?p=home" title="portal web Pauliceia-Edit" class="icon-office btnbackMap">Voltar ao Menu</a>

</section>
<div class="clear"></div>