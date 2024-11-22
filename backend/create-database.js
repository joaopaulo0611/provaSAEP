import postgres from 'postgres';

const sql = postgres({
  host: 'localhost',   
  port: 5432,
  database: 'postgres',
  user: 'postgres',    
  password: 'senai', 
});

async function createDatabase() {
  try {
    await sql`CREATE DATABASE users;`; 

    console.log('Database criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar o database:', error.message);
  } finally {
    await sql.end();
  }
}

createDatabase();