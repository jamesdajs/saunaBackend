import {Router}  from "express";
import {roleVerify} from "../midelwares/auth.midelware"
import multer from 'multer';
import fs from 'fs';
import path from 'path'
const route = Router()

// Configurar multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/'); // Guardar imágenes en la carpeta uploads/
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        let exten = path.extname(file.originalname);
        cb(null, uniqueSuffix + '-' + exten); // Agregar un prefijo único al nombre del archivo
      }
  });
  const upload = multer({ storage: storage });
route.post('/',  upload.single('image'), (req, res) => {
    res.status(200).json({path:req.file?.filename})
  });
  route.delete('/', (req, res) => {
    res.status(200).send('No se elimino imagenes');
  });
route.delete('/:image', (req, res) => {
  try {
    const image = req.params.image;
    const rutaImagen =path.resolve(__dirname ,'../../public/uploads/' , image);
    //console.log(path.normalize(rutaImagen))
    fs.unlink(rutaImagen, (error) => {
      if (error) {
        console.error('Error al eliminar la imagen', error);
        res.status(500).send('Error al eliminar la imagen');
        return;
      }
      console.log('Imagen eliminada del servidor');
      res.status(200).send('Imagen eliminada del servidor');
    });
  } catch (error) {
    res.status(500).send('Error al eliminar la imagen o no se encontro');
  }
  
  });
 
  
  
  
  
export default route