# ====================================================================
# ETAPA 1: BUILD (Compilación del código TypeScript)
# Esta etapa usa Node y todas las dependencias de desarrollo.
# ====================================================================
FROM node:20-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración
COPY package.json package-lock.json tsconfig.json ./

# Instala las dependencias, incluyendo las de desarrollo para la compilación
RUN npm ci

# Copia todo el código fuente
COPY . .

# Compila el código de TypeScript a JavaScript. 
# Esto asume que tu script 'build' en package.json ejecuta 'tsc'.
RUN npm run build



# ETAPA 2: PRODUCTION (Ejecución del código JavaScript compilado)
# ====================================================================
FROM node:20-alpine AS production

WORKDIR /app
#RUN apk add --no-cache python3 make g++ # Dependencias necesarias para algunas librerías nativas de Node.js
#
# 1. Copia solo los archivos de producción
COPY package.json package-lock.json ./

# 2. Instala SOLAMENTE las dependencias de producción
RUN npm ci --omit=dev

# 3. 🚨 CAMBIO AQUÍ: Copia el código compilado de la etapa 'builder'
#    Desde /app/build (en el builder) hacia ./build (en el contenedor de producción)
COPY --from=builder /app/build ./build

# Puerto que expone Express 
EXPOSE 3000

# 4. 🚨 CAMBIO AQUÍ: Comando para iniciar la aplicación Node.js desde 'build/'
#    Asume que tienes un script 'start' que ejecuta 'node build/server.js' o similar
CMD ["npm", "start"]

