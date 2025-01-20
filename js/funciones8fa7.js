$(document).ready(function() {
    // _provincias();   
    // _credenciales();         
    
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        var targetOffset = $target.offset().top;
        $('html, body').animate({scrollTop: targetOffset - 200}, 1000, 'swing', function () {
            window.location.hash = target;
        });
    });

    // Custom notification function (replace gritter)
    function showNotification(message, type = 'error') {
        var notification = $('<div class="notification"></div>');
        notification.addClass(type).text(message);
        $('body').append(notification);
        setTimeout(function() {
            notification.remove();
        }, 3000);
    }

    $("#enviar").click(function(event) {
        var errors = [];
        event.preventDefault();
        $("#enviar").attr('disabled', true);
        console.log(' hola 1');

        // Correct object structure for form data
        var datawh = {
            'nombre': $.trim($('#nombre').val()),
            'email': $.trim($('#email').val()),
            'doc_numero': $.trim($('#dni').val()),
            'doc_tipo': ($.trim($('#tipo').children("option:selected").val()) == "Tipo de doc.") ? "" : $.trim($('#tipo').children("option:selected").val()),
            'prefijo': $.trim($('#prefijo').val()),
            'telefono': $.trim($('#telefono').val()),
            // 'provincia': ($.trim($('#provincia').children("option:selected").val()) == "Provincias") ? "" : $.trim($('#provincia').children("option:selected").text()),
            // 'localidad': ($.trim($('#loc_id').children("option:selected").text()) == "Localidad" || $.trim($('#loc_id').children("option:selected").text()) == "(Cargando info...)") ? "" : $.trim($('#localidad').children("option:selected").text()),
            // 'localidad_id': ($.trim($('#loc_id').children("option:selected").val()) == "Localidad" || $.trim($('#loc_id').children("option:selected").val()) == "(Cargando info...)") ? "" : $.trim($('#localidad').children("option:selected").val()),
            'credencial': $.trim($('#comentario').val()),
            'tipo_contacto': $.trim($('#tipo_contacto').val()),
            'valores': window.location.search,
            'urlParams': new URLSearchParams(window.location.search),
            'gclid': new URLSearchParams(window.location.search).get('gclid')
        };

        // Validation checks
        if (datawh.doc_tipo == "") {
            errors.push("Su <b>Tipo de documento</b> es obligatorio");
        }
        if (datawh.doc_numero == "") {
            errors.push("Su <b>Documento</b> es obligatorio");
        }
        if (datawh.nombre == "") {
            errors.push("Su <b>Nombre</b> es obligatorio");
        }
        if (datawh.email == "") {
            errors.push("Su <b>Email</b> es obligatorio");
        }
        if (datawh.prefijo == "") {
            errors.push("Su <b>prefijo</b> es obligatorio");
        }
        if (datawh.telefono == "") {
            errors.push("Su <b>telefono</b> es obligatorio");
        }

        // if (datawh.provincia == "") {
        //     errors.push("Su <b>provincia</b> es obligatoria");
        // }
        // if (datawh.localidad == "") {
        //     errors.push("Su <b>localidad</b> es obligatoria");
        // }

        if (errors.length > 0) {
            showNotification(errors.join("<br>"));
            $("#enviar").attr('disabled', false);
        } else {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://n8nwebhook.tuchat.com.ar/webhook/89174271-0718-461b-911c-585e2ae1c13e');

            xhr.onload = function() {
                if (xhr.status === 200) {
                    setTimeout(function() {
                        window.location.href = 'http://localhost/plandesalud-github.io/gracias';
                    }, 3000);
                } else {
                    try {
                        let _json = JSON.parse(xhr.responseText);
                        let errors = '';
                        if (_json.msg) {
                            _json.msg.forEach(function(elemento) {
                                $.each(elemento, function(index, elem) {
                                    errors += elem + "<br>";
                                });
                            });
                        } else {
                            console.log("Mensaje no procesado.");
                        }
                        showNotification(errors);
                        $("#enviar").attr('disabled', false);
                    } catch (error) {
                        console.log("Error al procesar la respuesta del servidor.");
                        $("#enviar").attr('disabled', false);
                    }
                }
            };

            xhr.onerror = function() {
                alert('Error en la conexión');
                $("#enviar").attr('disabled', false);
            };

            xhr.send(JSON.stringify(datawh));
        }
    });

    // $("[name=provincia]").on("change", function() {
    //     var valor = $(this).val();
    //     $("[name=localidad]").html('<option selected="" disabled="">(Cargando info...)</option>');
    //     _localidades(valor);
    // });
});



function preloadHTMLImages(){      
   //var imgNodes = document.getElementsByTagName('img');
   var imgNodes = ['img/img-slider-01.jpg', 'img/about_mask-lines.png', 'img/bg-por-01.jpg', 'img/bg-por-02.jpg', 'img/bg-por-03.jpg', 'img/bg-por-03-d.jpg', 'img/logo-datego.png'];
   var imgs = []; 
   var counter = 0; 
   var limit = imgNodes.length;
       
   var incrFn = function(){ 
      counter++;
      
      if(counter >= limit){
		 $('#loader div').animate({'width':0, 'right':'-40%'}, 500, function(){
		 	$('#loader').fadeOut(300, function(){
				$('#home .mask .bg-slide').addClass('this');
				/*$('#home h2').addClass('view');*/	 		
		 	})
		 })
      }
   };
   
   for(var i = 0; i < limit; i++){
      imgs[i] = new Image();
      //imgs[i].src = imgNodes[i].getAttribute('src');      
      imgs[i].src = imgNodes[i];
      imgs[i].onload = incrFn;
      imgs[i].onerror = incrFn;
	  
   }
}


//form
$('input:not([type="hidden"]), textarea').on('keydown', function(){$(this).removeClass('error');});
//sending

 // serializes a form into an object.
(function($,undefined){
  '$:nomunge'; // Used by YUI compressor.

  $.fn.serializeObject = function(){
  var obj = {};

  $.each( this.serializeArray(), function(i,o){
    var n = o.name,
    v = o.value;

    obj[n] = obj[n] === undefined ? v
      : $.isArray( obj[n] ) ? obj[n].concat( v )
      : [ obj[n], v ];
  });

  return obj;
  };

})(jQuery);