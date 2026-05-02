# app.js
```js
import express, { urlencoded } from "express";
import { ReservaRuta } from "./routes/ReservaRoutes.js";
import permitirIntercambioDeRecursos from "cors";
import { conectarDB } from "./database.js";
import { MongoClient, ServerApiVersion } from "mongodb";
import { UsuarioRuta } from "./routes/UsuarioRoutes.js";

export const app = express()
const PORT = Number(process.env.PORT) || 3001;

conectarDB()
app.use(permitirIntercambioDeRecursos())
app.use(express.urlencoded({extended:true}))


app.listen(PORT, () => {
    console.log(`Escuchando desde el puerto ${PORT}: http://localhost:${PORT}`);
})


app.get("/",(pet, res) => {
    res.send("Hello there");
})

app.use("/reservas",ReservaRuta)
app.use("/usuarios",UsuarioRuta)
```
## ReservaRoutes.js

```js
import{Router} from "express";
import { mostrarReservas, reservar ,detalleReservas,borrarReserva,actualizarReserva} from "../controllers/ReservaController.js";

import * as z from "zod";

export const ReservaRuta = Router()



ReservaRuta.get("/",mostrarReservas);
ReservaRuta.get("/:id",detalleReservas);
ReservaRuta.post("/",reservar);
ReservaRuta.delete("/:id",borrarReserva);
ReservaRuta.put("/:id",actualizarReserva);
```
## UsuarioRoutes.js
```js
import{Router} from "express";
import { mostrarUsuario ,detalleUsuario,borrarUsuario,actualizarUsuario,crearUsuario} from "../controllers/UsuarioController.js";

import * as z from "zod";
import { loginUsuario } from "../controllers/UsuarioController.js";
import { autenticar_jwt } from "../middlewares/autenticacionJWT.js";

export const UsuarioRuta = Router()



UsuarioRuta.get("/",mostrarUsuario);
UsuarioRuta.get("/:id",detalleUsuario);
UsuarioRuta.post("/",autenticar_jwt,crearUsuario);
UsuarioRuta.post("/login",loginUsuario)
UsuarioRuta.delete("/:id",borrarUsuario);
UsuarioRuta.put("/:id",actualizarUsuario);
```



