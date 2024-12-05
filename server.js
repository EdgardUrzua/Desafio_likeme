const express = require("express");
const { agregarPost, obtenerPost } = require("./connection");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// Ruta para agregar un post
app.post("/posts", async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body;

    // Validar los datos enviados por el cliente
    if (!titulo || !img || !descripcion || likes === undefined) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        await agregarPost(titulo, img, descripcion, likes);
        res.status(201).json({ message: "Post agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar el post:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para obtener todos los posts
app.get("/posts", async (req, res) => {
    try {
        const posts = await obtenerPost();
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));
