import * as itemController from "../controllers/item-controller";
import Hapi from "@hapi/hapi";

export const itemRoutes = (server: Hapi.Server) => {
    server.route([
        {
            method: "GET",
            path: "/items",
            handler: itemController.getItems,
        },
        {
            method: "POST",
            path: "/items",
            handler: itemController.createItem,
        },
        {
            method: "GET",
            path: "/items/{id}",
            handler: itemController.getItem,
        },
        {
            method: "PUT",
            path: "/items/{id}",
            handler: itemController.updateItem,
        },
        {
            method: "DELETE",
            path: "/items/{id}",
            handler: itemController.deleteItem,
        }
    ]);
};
