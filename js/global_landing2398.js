function _provincias(elemento) {

    if(typeof elemento == "undefined"){
        elemento = '.provincias';
    }
  
    $.ajax({
        url: BASE_URL + 'xhr/contacto_landings.php',
        type: 'POST',
        dataType: 'json',
        data: {
            accion: "provincias"
        },
        success: function(_json) {
            
            if (_json.success && _json.msg && _json.msg.provincias) {
                $.each(_json.msg.provincias, function() {
                    var _html = '<option value="' + this.codigo + '">' + this.nombre + '</option>';
                    //$('.provincia').last().append(_html);
                    
                    
                        $(elemento).append(_html);
                    
                });
                //$('#provincia').removeClass("d-none");
            }
        },
        error: function(xhr, ajaxOptions, thrownError) { }
    });
}

jQuery($("[name=telefono]")).keypress(function(tecla)

   {
    if($("[name=telefono]").val().length == 2){
        console.log($("[name=telefono]").val());
        if($("[name=telefono]").val() == 15){
            gritter("No debe contener 15");
        }
    }
    


   });

function _localidades(provincia){
    $.ajax({
        url: BASE_URL + 'xhr/contacto_landings.php',
        type: 'POST',
        dataType: 'json',
        data: {
            accion: "localidades",
            provincia: provincia
        },  
        
        beforeSend: function() {
            $("[name=localidad]").html('<option selected="" disabled="">(recuperando...)</option>');
        },
        success: function(_json) {
                $('.localidad').html("");
            if (_json.success && _json.msg && _json.msg.localidades) {
                $.each(_json.msg.localidades, function() {
                    var _html = '<option value="' + this.id + '">' + this.nombre + '</option>';
                    //$('.provincia').last().append(_html);
                    $('.localidad').append(_html);

                });
                //$('#provincia').removeClass("d-none");
            }
        },
        error: function(xhr, ajaxOptions, thrownError) { }
    });
}

function _credenciales() {
  
    $.ajax({
        url: BASE_URL + 'xhr/contacto_landings.php',
        type: 'POST',
        dataType: 'json',
        data: {
            accion: "credenciales"
        },
        async: false,
        beforeSend: function() {
            $("#comentario").html('Cargando credenciales...');
        },
        success: function(_json) {
            
            if (_json.success && _json.msg && _json.msg.credenciales) {
                $('#comentario').html("<option selected='' disabled=''>Me interesa la credencial</option>");

                $.each(_json.msg.credenciales, function() {
                    var _html = '<option value="Credencial ' + format_texto(this.id) + '">' + "Credencial "+ format_texto(this.descripcion) + '</option>';
                    //$('.provincia').last().append(_html);
                    
                    $('#comentario').append(_html);

                });
                $('#comentario').append("<option value='Todavía no lo sé'>Todavía no lo sé</option>");                
                //$('#provincia').removeClass("d-none");
            }
        },
        error: function(xhr, ajaxOptions, thrownError) { }
    });
}

function format_texto(str) {
    
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}
