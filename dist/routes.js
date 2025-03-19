"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineRoutes = void 0;
const item_routes_1 = require("./routes/item-routes");
const defineRoutes = (server) => {
    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return {
                ok: true
            };
        }
    });
    // Agregar rutas de items
    (0, item_routes_1.itemRoutes)(server);
};
exports.defineRoutes = defineRoutes;
