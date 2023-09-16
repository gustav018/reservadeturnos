
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
 

    var db = firebase.firestore().collection("reservas");

   
    function submitForm(event) {
        event.preventDefault();

     
        var fecha = document.getElementsByName("Fecha")[0].value;
        var horario = document.getElementsByName("Horario")[0].value;
        var nombre = document.getElementsByName("Nombre")[0].value;
        var numeroDeContacto = document.getElementsByName("Numero de Contacto")[0].value;
        var servicios = document.getElementsByName("Servicios")[0].value;

     
        db.add({
            fecha: fecha,
            horario: horario,
            nombre: nombre,
            numero_de_contacto: numeroDeContacto,
            servicios: servicios
        })
            .then(function (docRef) {
           
                form.reset();
                var alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success';
                alertDiv.innerHTML = 'Reserva de turno guardada con éxito!';

                var formContainer = document.querySelector(".contact-form");
                formContainer.insertBefore(alertDiv, formContainer.firstChild);

              
                setTimeout(function () {
                    alertDiv.remove();
                }, 6000);
            })
            .catch(function (error) {
                console.error("moriii  ", error);

              
                var alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-danger';
                alertDiv.innerHTML = 'Hubo un error al guardar la reserva de turno.';
                document.body.appendChild(alertDiv);

               
                setTimeout(function () {
                    alertDiv.remove();
                }, 3000);
            });

    }


    document.querySelector("form").addEventListener("submit", submitForm);
});
