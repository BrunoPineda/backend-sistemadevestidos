const Producto = require('../models/productoModel');

// Registrar un producto con archivos (imágenes)
exports.registrarProducto = async (req, res) => {
    const { nombre, descripcion, precio_venta, precio_alquiler, talla, estado } = req.body;

    try {
        // Obtener las rutas de las imágenes subidas
        const imagenes = req.files.map(file => file.path);

        const nuevoProducto = new Producto({
            nombre,
            descripcion,
            precio_venta,
            precio_alquiler,
            talla,
            estado,
            imagenes
        });

        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al registrar el producto' });
    }
};

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los productos' });
    }
};

// Obtener producto por ID
exports.obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el producto' });
    }
};

// Editar producto (se puede actualizar y agregar más imágenes)
exports.editarProducto = async (req, res) => {
    const { nombre, descripcion, precio_venta, precio_alquiler, talla, estado } = req.body;

    try {
        // Buscar el producto a editar
        let producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }

        // Actualizar campos
        producto.nombre = nombre || producto.nombre;
        producto.descripcion = descripcion || producto.descripcion;
        producto.precio_venta = precio_venta || producto.precio_venta;
        producto.precio_alquiler = precio_alquiler || producto.precio_alquiler;
        producto.talla = talla || producto.talla;
        producto.estado = estado || producto.estado;

        // Agregar nuevas imágenes si se subieron
        if (req.files && req.files.length > 0) {
            const nuevasImagenes = req.files.map(file => file.path);
            producto.imagenes = [...producto.imagenes, ...nuevasImagenes];
        }

        // Guardar los cambios
        await producto.save();
        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al editar el producto' });
    }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        
        // Eliminar el producto usando findByIdAndDelete
        await Producto.findByIdAndDelete(req.params.id);

        res.status(200).json({ msg: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el producto' });
    }
};

// Eliminar una imagen específica del producto
exports.eliminarImagenProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }

        // Filtrar la imagen que se quiere eliminar
        const imagen = req.body.imagen;  // Esta es la imagen a eliminar (se pasa por el body)
        producto.imagenes = producto.imagenes.filter(img => img !== imagen);

        // Guardar los cambios
        await producto.save();
        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar la imagen' });
    }
};
