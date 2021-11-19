// const { mostrarMenu, pausa } = require('./helpers/mensajes');

const guardarDB = require('./helpers/guardarArchivos');
const { inquirerMenu, pausa, leerInput, confirmar, listadoTareasBorrar
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
require('colors')
const tareas=new Tareas();
// console.clear();

const main=async()=>{
    console.log('hola mundo');
    let opt='';
    const tareasDB=guardarDB.leerDB();

    // const tareasDB = leerDB();

    if ( tareasDB ) { // cargar tareas
        tareas.cargarTareasFromArray( tareasDB );
    }
    do{
        opt=await inquirerMenu()
        console.log({opt})
        
        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
            break;

            case '2':
                // console.log(tareas._listado)
                // console.log(tareas.listadoArr)
                tareas.listadoCompleto();
            break;
            
            case '3': // listar completadas
                tareas.listarPendientesCompletadas(true);
            break;

            case '4': // listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5': // completado | pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;
                       
            case '6': // Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirmar('¿Está seguro?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
            break;
        }
        // guardarDB( tareas.listadoArr );
        await pausa()
    }while(opt!=='0');
    
    // pausa()
}
main()