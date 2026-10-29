import { Server as HttpServer } from "http"
import jwt from "jsonwebtoken"
import { Server } from "socket.io"

let socketServer: Server | undefined

export const initializeRealtime = (server: HttpServer, isAllowedOrigin: (origin?: string) => boolean) => {
    socketServer = new Server(server, {
        cors: {
            origin: (origin, callback) => {
                if (isAllowedOrigin(origin)) {
                    callback(null, true)
                    return
                }

                callback(new Error("Origen no permitido por CORS"))
            }
        }
    })

    socketServer.use((socket, next) => {
        const token = socket.handshake.auth?.token
        if (typeof token !== "string" || !token) {
            next(new Error("No autorizado"))
            return
        }

        try {
            jwt.verify(token, process.env.SECRET_KEY || "ejemplo")
            next()
        } catch (error) {
            next(error instanceof Error ? error : new Error("No autorizado"))
        }
    })
}

export const notifyPendingProductsChanged = () => {
    if (!socketServer) {
        throw new Error("El servidor de tiempo real no está inicializado")
    }

    socketServer.emit("pending-products:updated")
}
