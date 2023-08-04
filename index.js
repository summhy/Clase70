import pg from 'pg';  
const { Pool } = pg;

// 1. Realizar la conexión con Base de Datos
const pool = new Pool({
  host: 'localhost',
  user: 'susanamunoz',
  password: '',
  database: 'ercompleto',
  port: 5432,
  max: 20, // máximo de 20 clientes
  idleTimeoutMillis: 5000, // 5 segundos de inactividad
  connectionTimeoutMillis: 2000, // 2 segundos de espera
});

async function main(){
   try{
    const conexion = await pool.connect();
    console.log("Conexion correcta");

    let consulta ={
        text:"select  *  from usuarios where id=$1",
        values:[2],
        //rowMode:"array"
    }

    let resultado = await conexion.query(consulta);
    console.log(resultado.rows);

    consulta ={
        text:"update usuarios set apellido = $1 where id = $2",
        values:['Solar',2],
        //rowMode:"array"
    }
    await conexion.query(consulta);

    consulta ={
        text:"select  *  from usuarios where id=$1",
        values:[2],
        //rowMode:"array"
    }

    resultado = await conexion.query(consulta);
    console.log(resultado.rows);


    consulta ={
        text:"update usuarios set apellido = $1 where id = $2 RETURNING id",
        values:['Lopez',2],
        //rowMode:"array"
    }
    resultado = await conexion.query(consulta);
    console.log(resultado.rows)

   }catch(err){
    console.log('Error al conectar a base de datos');
   }

} 

main()

