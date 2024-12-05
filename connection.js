const { Pool } = require("pg");

// Configuración del pool de conexiones
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "Nelly",
    database: "likeme",
    allowExitOnIdle: true, 
});

// Función para agregar un post
const agregarPost = async (titulo, img, descripcion, likes) => {
    const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes];

    try {
        await pool.query(consulta, values);
        console.log(`Post agregado: Titulo = ${titulo}, Likes = ${likes}`);
    } catch (error) {
        console.error("Error al agregar el post:", error);
        throw error; // Lanza el error 
    }
};

// Función para obtener todos los posts
const obtenerPost = async () => {
    const consulta = "SELECT * FROM posts";

    try {
        const result = await pool.query(consulta);
        return result.rows; 
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        throw error; // Lanza el error 
    }
};

// Exportar las funciones
module.exports = {
    agregarPost,
    obtenerPost,
};
