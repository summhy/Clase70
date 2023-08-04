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

async function leer(conexion, id){
    let consulta ={
        text:"select  *  from usuarios where id=$1",
        values:[id],
        //rowMode:"array"
    }

    let resultado = await conexion.query(consulta);
    console.log(resultado.rows);

    conexion.release
}

async function modificarRetorno(conexion, valor, id){
    let consulta ={
        text:"update usuarios set apellido = $1 where id = $2  RETURNING *",
        values:[valor,id],
        //rowMode:"array"
    }

    let resultado = await conexion.query(consulta);
    console.log(resultado.rows);

    conexion.release
}

async function modificar(conexion, valor, id){
    let consulta ={
        text:"update usuarios set apellido = $1 where id = $2",
        values:[valor,id],
        //rowMode:"array"
    }
    await conexion.query(consulta);
    conexion.release
}

async function main(){
   try{
    const conexion = await pool.connect();
    console.log("Conexion correcta");

    await leer(conexion, 2);
    await modificar(conexion, 'Lopez',2); // modificación simple
    await leer(conexion, 2);
    await modificarRetorno(conexion, 'America',2); //modificación con retorno

    await conexion.end(()=>{console.log("cerrado")})

   }catch(err){
    console.log(err);
   }

} 

main()

