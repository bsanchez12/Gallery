function DialogConfirm(titulo, mensaje, value) {
    $("#TituloConfirm").html(titulo);
    $("#MensajeConfirm").html(mensaje);
    $('#myConfirm').modal('show');
    $('#AcceptConfirm').attr("onClick", "actuar('" + value + "')");
}

function DialogAlert(titulo, mensaje) {
    $("#TituloAlert").html(titulo);
    $("#MensajeAlert").html(mensaje);   
    $('#myAlert').modal('show');
}

function DialogAlert(titulo, mensaje, value) {
    $("#TituloAlert").html(titulo);
    $("#MensajeAlert").html(mensaje);
    $('#myAlert').modal('show');
    $('#btnCloseAlert').attr("onClick", "actuar('" + value + "')");

}

function AjaxJsonGet(tourl, todata, funcionCallBack) {
    $.ajax({
        url: tourl,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        data: todata,
        dataType: 'json',
        success: funcionCallBack,
        error: function (ext) {
            DialogAlert("Error", "No se pudo completar la acción, por favor reintenta mas tarde");
        },
    });
}
function GotoServerNoModal(tourl, todata, funcionCallBack) {
    $.ajax({
        url: tourl,
        cache: false,
        type: 'POST',
        data: todata,
        dataType: 'json',       
        success: funcionCallBack       
    });
}

function GotoServerHtml(tourl, todata, funcionCallBack) {
    $.ajax({
        url: tourl,
        cache: false,
        type: 'POST',
        data: todata,
        dataType: 'html',
        success: funcionCallBack,
        error: function (ext) {
            DialogAlert("Error", "No se pudo completar la acción, por favor reintenta mas tarde");
        },
    });
}

//Funcion para traer una vista parcial
function GotoServerPartial(tourl, funcionCallBack) {
    $.ajax({
        url: tourl,
        cache: false,
        dataType: "html",
        beforeSend: function () {
            // Handle the beforeSend event
            $('#cargando').modal('show');
        },
        success: funcionCallBack,
        error: function (ext) {
            DialogAlert("Error", "No se pudo completar la acción, por favor reintenta mas tarde");
        },
        complete: function () {
            // Handle the complete event
            $('#cargando').modal('hide');
        }
    });
}

//Función para llevar y traer datos desde el servidor con ajax post
function GotoServer(tourl, todata, funcionCallBack) {
    $.ajax({
        url: tourl,
        cache: false,
        type: 'POST',
        data: todata,
        dataType: 'json',
        beforeSend: function () {
            // Handle the beforeSend event
            $('#cargando').modal('show');
        },
        success: funcionCallBack,
        error: function (ext) {
            DialogAlert("Error", "No se pudo completar la acción, por favor reintenta mas tarde.");
        },
        complete: function () {
            // Handle the complete event
            $('#cargando').modal('hide');
        }
    });
}

//Función para llevar y traer datos desde el servidor con ajax post con un objeto Json
function GotoServerJson(tourl, todata, funcionCallBack) {
    $.ajax({
        url: tourl,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: todata,
        dataType: 'json',
        beforeSend: function () {
            // Handle the beforeSend event
            $('#cargando').modal('show');
        },
        success: funcionCallBack,
        error: function (ext) {
            DialogAlert("Error", "No se pudo completar la acción, por favor reintenta mas tarde");
        },
        complete: function () {
            // Handle the complete event
            $('#cargando').modal('hide');
        }
    });
}

function currencyFormat(fld, milSep, decSep, e) {
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';

    len = fld.value.length;

    if (len > 13) { fld.value = "0.00"; return false; }

    for (i = 0; i < len; i++)
        if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
    aux = '';
    for (; i < len; i++)
        if (strCheck.indexOf(fld.value.charAt(i)) != -1) aux += fld.value.charAt(i);
    aux += key;
    len = aux.length;
    if (len == 0) fld.value = '';
    if (len == 1) fld.value = '0' + decSep + '0' + aux;
    if (len == 2) fld.value = '0' + decSep + aux;
    if (len > 2) {
        aux2 = '';
        for (j = 0, i = len - 1; i >= 0; i--) {
            if (j == 3) {
                aux2 += milSep;
                j = 0;
            }

            if (strCheck.indexOf(aux.charAt(i)) != -1) {
                aux2 += aux.charAt(i);
            }
            j++;
        }
        fld.value = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
            fld.value += aux2.charAt(i);
        fld.value += decSep + "00";
    }
    return false;
}

function checkIt(evt) {

    evt = (evt) ? evt : window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        status = "This field accepts numbers only."
        return false
    }
    status = ""
    return true

}