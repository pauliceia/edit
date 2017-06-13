//RETIRA AS INTERAÇÕES DOS MAPAS
function clearInteraction(type){
    if(type == 'line'){
        $("#lineOptions").find("p").removeClass('activeOptions');
        map.removeInteraction(editLine);
        map.removeInteraction(drawLine);
        map.removeInteraction(duplicLine);
        map.removeInteraction(modifyLine);
        map.removeInteraction(eraseLine);
    }else{
        $("#pointsOptions").find("p").removeClass('activeOptions');
        map.removeInteraction(drawPoints);
        map.removeInteraction(erasePoint);
        map.removeInteraction(editPoint);
        map.removeInteraction(duplicPoint);
    }
}

//GERA UM DADO NO FORMATO WKT
function generationWkt(e, type){
    var featureWkt;

    var featureClone = e.clone();
    featureWkt = wkt.writeFeature(featureClone);

    if(type == "insert"){
        $("#insertData input[name='geom']").val(featureWkt);
    }else if(type == "edit"){
        $("#editData input[name='geom']").val(featureWkt);
    }

}

//ADICIONA A FEATURE NO LAYER DO MAPA
function addFeature(feature){
    feature.setProperties({
        'id': 'waitingCheck'
    });

    if (bases instanceof ol.layer.Group){
        bases.getLayers().forEach(function(sublayer){
            if (sublayer.get('name') == 'places') {
                sublayer.getSource().addFeatures(feature);
            }
        });
    }
}

//DUPLICA A FEATURE NO LAYER DO MAPA
function cloneFeature(idAnt, id){
    if (bases instanceof ol.layer.Group){
        bases.getLayers().forEach(function(sublayer){
            if (sublayer.get('name') == 'places') {
                sublayer.getSource().forEachFeature(function(f) {
                    if(f.get('id') == idAnt){
                        var cloneF = f.clone();
                        cloneF.setId(id);
                        cloneF.set('id', id, true);

                        sublayer.getSource().addFeatures(cloneF);

                       /* function addFeature(callback){
                            sublayer.getSource().addFeatures(cloneF);
                            callback();
                        };
                        addFeature(function(){
                            console.log(sublayer.getSource().getFeatures());
                            atualizaFeature(id, "duplicData");
                        });*/
                    }
                });
            }
        });
    }
}

//PREENCHE A FEATURE COM OS ATRIBUTOS DIGITADOS PELO USUÁRIO
function preencheFeature(id, type){
    if (bases instanceof ol.layer.Group){
        bases.getLayers().forEach(function(sublayer){
            if (sublayer.get('name') == 'places') {
                sublayer.getSource().forEachFeature(function(f) {
                    if(f.get('id') == 'waitingCheck'){
                        f.set('id', id, true);
                        f.setId(id);

                        $("#"+type+" input.inF").each(function(){
                            var colunmsName = $(this).attr('name');
                            var inputAtual = $('#'+type+' input[name="'+colunmsName+'"').val();
                            f.set(colunmsName, inputAtual, true);
                        });
                    }
                });
            }
        });
    }
}

//MOSTRA OS ATRIBUTOS DA FEATURE NO FORMULARIO DE EDIÇÃO
function getAttribs(feature, type){
    $("#"+type+" input").each(function(){
        var colunmsName = $(this).attr('name');
        if(colunmsName != 'callback' && colunmsName != 'callback_action' && colunmsName != 'geom'){
            $('#'+type+' input[name="'+colunmsName+'"').val(feature.get(colunmsName));
        }
    });
    var jsonAutor = $('#jsonAutor').text();
    jsonAutor = JSON.parse(jsonAutor);

    jsonAutor.forEach(function(resultado) {
        if(resultado.id == feature.get('id_user')){
            $('#'+type+' input[name="author"]').val(resultado.name);
        }
    });
}

//ATUALIZA OS ATRIBUTOS DA FEATURE DE ACORDO COM O QUE FOI DIGITADO PELO USUÁRIO
function atualizaFeature(idFeature, type){
     if (bases instanceof ol.layer.Group){
        bases.getLayers().forEach(function(sublayer){
            if (sublayer.get('name') == 'places') {
                sublayer.getSource().forEachFeature(function(f) {
                    if(f.get('id') == idFeature){

                        $("#"+type+" input.inF").each(function(){
                            var colunmsName = $(this).attr('name');
                            var inputAtual = $('#'+type+' input[name="'+colunmsName+'"').val();
                            f.set(colunmsName, inputAtual, true);
                        });

                    }
                });
            }
        });
    }
}

//EXCLUI A FEATURE SELECIONADA DO 'LAYER ATUAL' NO MAPA
function excluiFeature(feature){
    var DelId = feature.get('id');
    if(DelId=='waitingCheck'){
        if (bases instanceof ol.layer.Group){
            bases.getLayers().forEach(function(sublayer){
                if (sublayer.get('name') == 'places'){
                    sublayer.getSource().removeFeature(feature);
                }
            });
        }
    }else{
        var Callback = 'Draw';
        var Callback_action = 'draw_delete';
        $.post('ajax/' + Callback + '.ajax.php', {callback: Callback, callback_action: Callback_action, del_id: DelId}, function (data) {

            if (data.trigger) {
                if (bases instanceof ol.layer.Group){
                    bases.getLayers().forEach(function(sublayer){
                        if (sublayer.get('name') == 'places'){
                            sublayer.getSource().removeFeature(feature);
                        }
                    });
                }
            }

        }, 'json');
    }
}
