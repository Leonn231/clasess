class Hotel {
    constructor() {
      this.habitaciones = {
        individual: { fumadores: 3, noFumadores: 3, capacidad: 2 },
        doble: { fumadores: 3, noFumadores: 3, capacidad: 4 },
        familiar: { fumadores: 3, noFumadores: 3, capacidad: 6, aceptaMascotas: true }
      };
      this.reservas = [];
    }
  
    
    reservar(tipo, fumador, nombre, pais, numeroPersonas, periodo, traeMascota) {
      if (!this.habitaciones[tipo]) {
        console.log("Tipo de habitación no válido.");
        return;
      }
  
      const habitacionesDisponibles = fumador ? this.habitaciones[tipo].fumadores : this.habitaciones[tipo].noFumadores;
  
      if (habitacionesDisponibles <= 0) {
        console.log("No hay habitaciones disponibles de este tipo.");
        return;
      }
  
      if (numeroPersonas > this.habitaciones[tipo].capacidad) {
        console.log(`La habitación ${tipo} no puede alojar a más de ${this.habitaciones[tipo].capacidad} personas.`);
        return;
      }
  
      if (traeMascota && tipo !== 'familiar') {
        console.log("Las mascotas solo se aceptan en habitaciones familiares.");
        return;
      }
  
      
      if (fumador) {
        this.habitaciones[tipo].fumadores--;
      } else {
        this.habitaciones[tipo].noFumadores--;
      }
  
      const reserva = {
        tipo,
        fumador,
        nombre,
        pais,
        numeroPersonas,
        periodo,
        traeMascota
      };
  
      this.reservas.push(reserva);
      console.log(`Reserva exitosa para ${nombre}.`);
    }
  

    obtenerEstadisticas() {
      const estadisticas = {
        totalReservas: this.reservas.length,
        totalPersonas: this.reservas.reduce((acc, reserva) => acc + reserva.numeroPersonas, 0),
        totalConMascotas: this.reservas.filter(reserva => reserva.traeMascota).length,
        reservas: this.reservas.map(reserva => ({
          nombre: reserva.nombre,
          pais: reserva.pais,
          numeroPersonas: reserva.numeroPersonas,
          periodo: reserva.periodo,
          traeMascota: reserva.traeMascota
        }))
      };
  
      return estadisticas;
    }
  }
  

  const hotel = new Hotel();
  
  hotel.reservar('individual', false, 'Juan Pérez', 'México', 1, '2024-05-20 a 2024-05-25', false);
  hotel.reservar('doble', true, 'Ana García', 'España', 4, '2024-06-01 a 2024-06-10', false);
  hotel.reservar('familiar', false, 'Carlos López', 'Argentina', 5, '2024-07-15 a 2024-07-20', true);
  hotel.reservar('familiar', false, 'Lucía Fernández', 'Chile', 6, '2024-08-05 a 2024-08-15', false);
  
  const estadisticas = hotel.obtenerEstadisticas();
  console.log(estadisticas);  