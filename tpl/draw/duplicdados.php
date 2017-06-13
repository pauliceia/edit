<article class="boxToobar form_draw" id="duplicData"> 
    <header class="row">
        <h1 class="page-header"> <span class="glyphicon glyphicon-pencil"></span> Duplicate Data</h1>    
    </header>
    <div class="content">
        <form action="" name="edit_form" method="post" enctype="multipart/form-data">
        <input type="hidden" name="callback" value="Draw">
        <input type="hidden" name="callback_action" value="draw_duplic">
        <input type="hidden" name="id">
        <div class="callback_return" style="margin-bottom: -10px;">
            <?php
            if (!empty($_SESSION['trigger_login'])):
                echo $_SESSION['trigger_login'];
                unset($_SESSION['trigger_login']);
            endif;
            ?>
        </div>

        <div class="form-group">
            <label for="name">&#10143; Name:</label>
            <input type="text" name="name" class="form-control inF" placeholder="name">
        </div>
        <div class="form-group">
            <label for="street">&#10143; Street:</label>
            <input type="hidden" name="id_street" class="inF">
            <input type="text" name="street" class="form-control" disabled>
        </div>
        <div class="form-group">
            <label for="number">&#10143; * Number:</label>
            <input type="number" name="number" class="form-control inF" required>
        </div>
        <div class="form-group">
            <label for="original_number">&#10143; Original Number:</label>
            <input type="text" name="original_number" class="form-control inF" placeholder="full number">
        </div>
        <div class="form-group">
            <label>&#10143; First date (dd/mm/yyyy):</label>
            <br>
            <div class="col-lg-4">
                <input type="number" name="first_day" class="form-control inF" min="1" max="31" placeholder="day">
            </div>
            <div class="col-lg-4">
                <input type="number" name="first_month" class="form-control inF" min="1" max="12" placeholder="month">
            </div>
            <div class="col-lg-4">
                <input type="number" name="first_year" class="form-control inF" min="1868" max="1940" placeholder="year">
            </div>
            <div class="clear"></div>
        </div>
        <div class="form-group">
            <label>&#10143; Last date (dd/mm/yyyy):</label>
            <br>
            <div class="col-lg-4">
                <input type="number" name="last_day" class="form-control inF" min="1" max="31" placeholder="day">
            </div>
            <div class="col-lg-4">
                <input type="number" name="last_month" class="form-control inF" min="1" max="12" placeholder="month">
            </div>
            <div class="col-lg-4">
                <input type="number" name="last_year" class="form-control inF" min="1868" max="1940" placeholder="year">
            </div>
            <div class="clear"></div>
        </div>
        <div class="form-group">
            <label for="source">&#10143; * Source:</label>
            <input type="text" name="source" class="form-control inF" placeholder="fonte" required>
        </div>

        <div class="form-group">
            <label for="author">&#10143; * Author:</label>
             <?php
                $sql = "SELECT id, name FROM tb_users";
                $result = pg_query(Connection::getConn(), $sql);
                $resAutor = pg_fetch_all($result);
                $jsonAutor = json_encode($resAutor);
            ?>
            <p id="jsonAutor" style="display: none;"><?= $jsonAutor; ?></p>
            <input type="text" name="author" class="form-control inF" placeholder="author" disabled>
        </div>

        <button type="button" class="btn btn-default cl_form"><span class="glyphicon glyphicon-remove"></span> Close</button>
        <button class="btn btn-danger">Duplicate</button>
        <img class="form_load" style="margin-left: 10px; display:none;" alt="Enviando Requisição!" title="Enviando Requisição!" src="images/load.gif"/>
    </form>

</article>