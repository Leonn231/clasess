class Hotel {
  constructor() {
    // Definición de las habitaciones y su disponibilidad inicial
    this.habitaciones = {
      individual: { fumadores: 3, noFumadores: 3, capacidad: 2 },
      doble: { fumadores: 3, noFumadores: 3, capacidad: 4 },
      familiar: { fumadores: 3, noFumadores: 3, capacidad: 6, aceptaMascotas: true }
    };
    this.reservas = []; // Array para almacenar las reservas realizadas
  }

  // Método para realizar una reserva
  reservar(tipo, fumador, nombre, pais, numeroPersonas, periodo, traeMascota) {
    // Validar el tipo de habitación
    if (!this.habitaciones[tipo]) {
      console.log("Tipo de habitación no válido.");
      return;
    }

    // Determinar la disponibilidad de habitaciones según el tipo de habitación y si es fumador o no
    const habitacionesDisponibles = fumador ? this.habitaciones[tipo].fumadores : this.habitaciones[tipo].noFumadores;

    // Verificar si hay habitaciones disponibles
    if (habitacionesDisponibles <= 0) {
      console.log("No hay habitaciones disponibles de este tipo.");
      return;
    }

    // Verificar si el número de personas excede la capacidad de la habitación
    if (numeroPersonas > this.habitaciones[tipo].capacidad) {
      console.log(`La habitación ${tipo} no puede alojar a más de ${this.habitaciones[tipo].capacidad} personas.`);
      return;
    }

    // Verificar si se permiten mascotas en el tipo de habitación reservado
    if (traeMascota && tipo !== 'familiar') {
      console.log("Las mascotas solo se aceptan en habitaciones familiares.");
      return;
    }

    // Actualizar la disponibilidad de habitaciones según el tipo de habitación y si es fumador o no
    if (fumador) {
      this.habitaciones[tipo].fumadores--;
    } else {
      this.habitaciones[tipo].noFumadores--;
    }

    // Crear un objeto de reserva y agregarlo al array de reservas
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

  // Método para obtener estadísticas sobre las reservas realizadas
  obtenerEstadisticas() {
    const estadisticas = {
      totalReservas: this.reservas.length, // Total de reservas realizadas
      totalPersonas: this.reservas.reduce((acc, reserva) => acc + reserva.numeroPersonas, 0), // Total de personas alojadas
      totalConMascotas: this.reservas.filter(reserva => reserva.traeMascota).length, // Total de reservas con mascotas
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

// Crear una instancia del hotel
const hotel = new Hotel();

// Realizar algunas reservas
hotel.reservar('individual', false, 'Juan Pérez', 'México', 1, '2024-05-20 a 2024-05-25', false);
hotel.reservar('doble', true, 'Ana García', 'España', 4, '2024-06-01 a 2024-06-10', false);
hotel.reservar('familiar', false, 'Carlos López', 'Argentina', 5, '2024-07-15 a 2024-07-20', true);
hotel.reservar('familiar', false, 'Lucía Fernández', 'Chile', 6, '2024-08-05 a 2024-08-15', false);

// Obtener y mostrar las estadísticas de las reservas
const estadisticas = hotel.obtenerEstadisticas();
console.log(estadisticas);
