document.addEventListener("DOMContentLoaded", function() {
    // Dias y horarios disponibles inicialmente
    const diasLaborables = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
 
    
  
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero=0
    const yyyy = today.getFullYear();
    
    const todayFormatted = `${yyyy}-${mm}-${dd}`;
    const dateInput = document.getElementsByName("Fecha")[0];
    dateInput.setAttribute("min", todayFormatted);
    
  
    const selectHorarios = document.getElementsByName("Horario")[0];
    selectHorarios.disabled = true;


    var db = firebase.firestore().collection("reservas");
    

    db.onSnapshot((querySnapshot) => {
      const reservas = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        reservas.push(data);
      });

      dateInput.addEventListener("change", function() {
        const selectedDate = new Date(this.value);
        const dayName = selectedDate.toLocaleString("es-ES", { weekday: 'long' });


        selectHorarios.disabled = false;

 
        const reservasParaFechaSeleccionada = reservas.filter(reserva => reserva.fecha === this.value);
        const horariosReservadosParaFechaSeleccionada = reservasParaFechaSeleccionada.map(reserva => reserva.horario);

       
        const horariosParaMostrar = horariosDisponibles.filter(horario => !horariosReservadosParaFechaSeleccionada.includes(horario));
        
    
        selectHorarios.innerHTML = '<option value="" disabled selected>Selecciona un horario</option>' + horariosParaMostrar.map(horario => `<option value="${horario}">${horario}</option>`).join("");
      });
    });
});
