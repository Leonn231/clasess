// Objeto banco que contiene los datos de los clientes y métodos para operar sobre ellos
const banco = {
  clientes: {
    "12345678": { pin: "1234", intentos: 0, cuentas: { "ahorros": 500000, "corriente": 200000 } },
    "87654321": { pin: "4321", intentos: 0, cuentas: { "ahorros": 1000000, "corriente": 300000 } }
  },
  // Método para validar un cliente por su ID y PIN
  validarCliente(id, pin) {
    const cliente = this.clientes[id];
    if (!cliente) {
      return false; // Cliente no existe
    }
    if (cliente.pin === pin) {
      cliente.intentos = 0; // Resetea el contador de intentos fallidos
      return true; // PIN correcto
    } else {
      cliente.intentos++; // Incrementa el contador de intentos fallidos
      return false; // PIN incorrecto
    }
  },
  // Método para obtener las cuentas de un cliente por su ID
  obtenerCuentas(id) {
    return this.clientes[id].cuentas;
  },
  // Método para realizar un retiro de una cuenta específica
  realizarRetiro(id, cuenta, monto) {
    if (this.clientes[id].cuentas[cuenta] >= monto) {
      this.clientes[id].cuentas[cuenta] -= monto;
      return `Retiro exitoso, puede tomar $${monto} de la bandeja principal.`;
    } else {
      return `Fondos insuficientes en la cuenta ${cuenta}.`;
    }
  },
  // Método para realizar un depósito en una cuenta específica
  realizarDeposito(id, cuenta, monto) {
    this.clientes[id].cuentas[cuenta] += monto;
    return `Depósito de $${monto} exitoso en la cuenta ${cuenta}.`;
  },
  // Método para realizar una transferencia entre cuentas del mismo cliente
  realizarTransferencia(id, cuentaOrigen, cuentaDestino, monto) {
    if (this.clientes[id].cuentas[cuentaOrigen] >= monto) {
      this.clientes[id].cuentas[cuentaOrigen] -= monto;
      this.clientes[id].cuentas[cuentaDestino] += monto;
      return `Transferencia de $${monto} desde ${cuentaOrigen} a ${cuentaDestino} exitosa.`;
    } else {
      return `Fondos insuficientes en la cuenta ${cuentaOrigen}.`;
    }
  },
  // Método para consultar el saldo de una cuenta específica
  consultarSaldo(id, cuenta) {
    return `El saldo de la cuenta ${cuenta} es $${this.clientes[id].cuentas[cuenta]}.`;
  }
};

// Clase CajeroAutomatico que interactúa con el objeto banco
class CajeroAutomatico {
  constructor(banco) {
    this.banco = banco; // Referencia al objeto banco
    this.encendido = false; // Estado inicial del cajero
  }

  // Método para encender el cajero
  encender() {
    this.encendido = true;
    console.log("Cajero automático encendido.");
    this.iniciarSesion();
  }

  // Método para apagar el cajero
  apagar() {
    this.encendido = false;
    console.log("Cajero automático apagado.");
  }

  // Método para iniciar sesión de un cliente
  iniciarSesion() {
    if (!this.encendido) return;
    const id = prompt("Inserte su documento de identidad:");
    let pinValido = false;
    // Bucle para validar el PIN del cliente, permite hasta 3 intentos
    while (!pinValido && this.banco.clientes[id]?.intentos < 3) {
      const pin = prompt("Inserte su PIN:");
      pinValido = this.banco.validarCliente(id, pin);
      if (!pinValido) {
        console.log("PIN incorrecto. Inténtelo de nuevo.");
      }
    }

    // Si el PIN es válido, muestra el menú de operaciones
    if (pinValido) {
      this.mostrarMenu(id);
    } else {
      console.log("Número de intentos excedidos. Tarjeta bloqueada.");
    }
  }

  // Método para mostrar el menú de operaciones del cajero
  mostrarMenu(id) {
    let continuar = true;
    // Bucle para mostrar el menú hasta que el cliente elija salir
    while (continuar) {
      const opcion = prompt(`Menú:
1. Retirar efectivo
2. Depositar
3. Transferir
4. Consultar saldo
5. Salir
Seleccione una opción:`);

      // Switch para manejar las opciones del menú
      switch (opcion) {
        case "1":
          this.retirar(id);
          break;
        case "2":
          this.depositar(id);
          break;
        case "3":
          this.transferir(id);
          break;
        case "4":
          this.consultarSaldo(id);
          break;
        case "5":
          continuar = false;
          console.log("Gracias por usar el cajero automático. Hasta luego.");
          break;
        default:
          console.log("Opción no válida. Inténtelo de nuevo.");
      }
    }
  }

  // Método para realizar un retiro de una cuenta
  retirar(id) {
    const cuenta = prompt("Seleccione la cuenta (ahorros/corriente):");
    const monto = parseInt(prompt("Ingrese el monto a retirar (múltiplos de $50000):"), 10);
    if (monto % 50000 === 0) {
      const resultado = this.banco.realizarRetiro(id, cuenta, monto);
      console.log(resultado);
    } else {
      console.log("Monto inválido. Debe ser en múltiplos de $50000.");
    }
  }

  // Método para realizar un depósito en una cuenta
  depositar(id) {
    const cuenta = prompt("Seleccione la cuenta (ahorros/corriente):");
    const monto = parseInt(prompt("Ingrese el monto a depositar:"), 10);
    const tipo = prompt("¿El depósito es en efectivo o cheque? (efectivo/cheque):");
    const resultado = this.banco.realizarDeposito(id, cuenta, monto);
    console.log(resultado);
  }

  // Método para realizar una transferencia entre cuentas del mismo cliente
  transferir(id) {
    const cuentaOrigen = prompt("Seleccione la cuenta de origen (ahorros/corriente):");
    const cuentaDestino = prompt("Seleccione la cuenta de destino (ahorros/corriente):");
    const monto = parseInt(prompt("Ingrese el monto a transferir:"), 10);
    const resultado = this.banco.realizarTransferencia(id, cuentaOrigen, cuentaDestino, monto);
    console.log(resultado);
  }

  // Método para consultar el saldo de una cuenta
  consultarSaldo(id) {
    const cuenta = prompt("Seleccione la cuenta (ahorros/corriente):");
    const resultado = this.banco.consultarSaldo(id, cuenta);
    console.log(resultado);
  }
}

// Creación de una instancia de CajeroAutomatico con el objeto banco
const cajero = new CajeroAutomatico(banco);

// Pregunta al operador si desea encender el cajero
const operador = prompt("Panel de operador: ¿Desea encender el cajero automático? (sí/no):");
if (operador.toLowerCase() === "sí") {
  cajero.encender();
} else {
  console.log("Cajero automático permanece apagado.");
}

