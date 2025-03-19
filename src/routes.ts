import { Server } from "@hapi/hapi"
import { itemRoutes } from "./routes/item-routes";

export const defineRoutes = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return {
                ok: true
            }
        }
    })
    // Agregar rutas de items
    itemRoutes(server);
}