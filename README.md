<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>

<h1 align="center">
  Medusa Store - Next.js Storefront
</h1>

<p align="center">
Tienda de joyería en línea construida con Medusa Commerce y Next.js 15. Interfaz moderna con gestión de productos, categorías, carrito y checkout.</p>

<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Iniciar el Proyecto](#iniciar-el-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Integraciones de Pago](#integraciones-de-pago)
- [Mejoras Implementadas](#mejoras-implementadas)
- [Recursos](#recursos)

---

## ✨ Características

### Funcionalidades de E-commerce

- **Catálogo de Productos**: Visualización de productos con imágenes, precios y disponibilidad
- **Categorías y Colecciones**: Organización de productos por categorías
- **Galería de Imágenes Mejorada**:
  - Imagen principal con zoom
  - Miniaturas navegables
  - Flechas de navegación
  - Indicador de posición
- **Carrito de Compras**: Agregar/eliminar productos, actualizar cantidades
- **Checkout**: Integración con Stripe
- **Cuentas de Usuario**: Registro, login, órdenes anteriores
- **Búsqueda y Filtros**: Filtrar productos por atributos
- **Panel de Categorías**: Navegación por categorías
- **Migas de Pan**: Navegación clara entre páginas

### Características de Next.js 15

- **App Router**: Enrutamiento moderno con carpetas
- **Server Components**: Renderizado en servidor
- **Server Actions**: Acciones sin API routes
- **Static Pre-Rendering**: Mejor rendimiento
- **Image Optimization**: Imágenes optimizadas automáticamente
- **Streaming**: Carga progresiva de contenido
- **Turbopack**: Compilación rápida en desarrollo

---

## 🛠️ Stack Tecnológico

- **Frontend**: [Next.js 15](https://nextjs.org/) con React 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Backend**: [Medusa V2](https://medusajs.com/)
- **UI Components**: [@medusajs/ui](https://ui.medusajs.com/)
- **Accesibilidad**: [@radix-ui](https://www.radix-ui.com/)
- **Pagos**: [Stripe](https://stripe.com/)
- **Base de Datos**: PostgreSQL (Medusa)

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: v18.x o superior
- **Yarn**: v1.22.x o superior (o npm v9+)
- **Docker**: (opcional, para ejecutar Medusa y PostgreSQL en contenedores)
- **Git**: Para clonar el repositorio

### Verificar instalación

```bash
node --version
yarn --version
```

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone <tu-repositorio-url>
cd my-medusa-store-storefront
```

### 2. Instalar Dependencias

```bash
yarn install
```

Si encuentras errores, intenta limpiar el caché:

```bash
yarn cache clean
yarn install
```

---

## ⚙️ Configuración

### 1. Crear archivo `.env.local`

Copia el archivo de configuración de plantilla:

```bash
cp .env.template .env.local
```

O crea manualmente un archivo `.env.local` con las siguientes variables:

```env
# Backend Medusa
MEDUSA_BACKEND_URL=http://localhost:9000

# API Key Pública de Medusa
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_publishable_key_here

# URL del Storefront
NEXT_PUBLIC_BASE_URL=http://localhost:8000

# Región por defecto (ISO-2)
NEXT_PUBLIC_DEFAULT_REGION=co

# Stripe (opcional)
NEXT_PUBLIC_STRIPE_KEY=pk_your_stripe_key_here

# Secret de revalidación de caché
REVALIDATE_SECRET=supersecret

# Medusa Cloud S3 (opcional)
MEDUSA_CLOUD_S3_HOSTNAME=
MEDUSA_CLOUD_S3_PATHNAME=
```

### 2. Configurar Medusa Backend

Asegúrate de que tu servidor Medusa esté corriendo en `http://localhost:9000`:

```bash
# Si Medusa está en otra carpeta
cd ../medusa-backend
npm run dev
```

O usa Docker Compose:

```bash
docker-compose up -d
```

---

## ▶️ Iniciar el Proyecto

### Desarrollo

```bash
yarn dev
```

El storefront estará disponible en: **http://localhost:8000**

### Producción

```bash
# Compilar
yarn build

# Iniciar
yarn start
```

### Analizar Bundle

```bash
yarn analyze
```

---

## 📁 Estructura del Proyecto

```
src/
├── app/                          # Next.js App Router
│   ├── [countryCode]/           # Rutas dinámicas por región
│   │   ├── (main)/              # Rutas principales
│   │   │   ├── products/        # Páginas de productos
│   │   │   ├── categories/      # Páginas de categorías
│   │   │   ├── collections/     # Colecciones
│   │   │   ├── cart/            # Carrito
│   │   │   ├── checkout/        # Checkout
│   │   │   └── account/         # Cuenta de usuario
│   │   ├── (checkout)/          # Rutas de checkout
│   │   └── layout.tsx           # Layout principal
│   └── layout.tsx               # Layout global
├── modules/                      # Componentes de módulos
│   ├── products/                # Módulo de productos
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── image-gallery/   # Galería de imágenes mejorada
│   │   │   ├── product-actions/ # Acciones del producto
│   │   │   ├── product-tabs/    # Tabs de información
│   │   │   └── ...
│   │   └── templates/           # Templates de página
│   ├── cart/                    # Módulo de carrito
│   ├── checkout/                # Módulo de checkout
│   ├── categories/              # Módulo de categorías
│   ├── store/                   # Módulo de tienda
│   ├── common/                  # Componentes comunes
│   ├── layout/                  # Componentes de layout
│   └── ...
├── lib/                         # Utilidades y helpers
│   ├── data/                    # Funciones de datos/API
│   ├── hooks/                   # Custom hooks
│   ├── util/                    # Utilidades varias
│   └── config.ts                # Configuración global
├── styles/                      # Estilos globales
│   └── globals.css              # CSS global
└── types/                       # Tipos TypeScript

public/                          # Archivos estáticos
```

---

## 💳 Integraciones de Pago

### Stripe

1. Crear cuenta en [Stripe](https://stripe.com)
2. Obtener tu clave pública (Publishable Key)
3. Agregar a `.env.local`:

```env
NEXT_PUBLIC_STRIPE_KEY=pk_live_xxxxxxxxxx
```

4. Configurar en tu servidor Medusa:

```bash
# En el servidor Medusa
npm run seed -- --stripe-key sk_live_xxxxxxxxxx
```

Consulta la [documentación de Medusa](https://docs.medusajs.com/resources/commerce-modules/payment/payment-provider/stripe) para más detalles.

---

## 🎨 Mejoras Implementadas

### Galería de Imágenes

- ✅ Imagen principal con zoom al hacer clic
- ✅ Miniaturas navegables con bordes destacados
- ✅ Flechas para navegar entre imágenes
- ✅ Indicador de posición (1/3, 2/3, etc.)
- ✅ Soporte para múltiples imágenes por producto

### Navegación

- ✅ Migas de pan (breadcrumbs) en todas las páginas
- ✅ Navegación entre tienda → categoría → producto
- ✅ Enlaces funcionales para regresar

### Categorías

- ✅ Página mejorada con banner promocional
- ✅ Subcategorías en cards
- ✅ Migas de pan con categoría padre
- ✅ Mejor diseño visual

### Validaciones

- ✅ Manejo correcto de errores de hidratación
- ✅ IDs estables con `useId()` de React
- ✅ Validación de imágenes antes de mostrar

---

## 🔍 Solución de Problemas

### Puerto 8000 en uso

```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8000
kill -9 <PID>
```

### Base de datos de Medusa no responde

```bash
# Reiniciar Docker
docker-compose restart

# O verificar conexión
curl http://localhost:9000/store/regions
```

### Caché viejo

```bash
# Limpiar caché de Next.js
rm -rf .next

# Limpiar caché de Yarn
yarn cache clean

# Reinstalar
yarn install
yarn dev
```

---

## 📚 Recursos

### Medusa

- [Website](https://www.medusajs.com/)
- [GitHub](https://github.com/medusajs)
- [Documentación](https://docs.medusajs.com/)
- [Discord Community](https://discord.gg/xpCwq3Kfn8)

### Next.js

- [Website](https://nextjs.org/)
- [GitHub](https://github.com/vercel/next.js)
- [Documentación](https://nextjs.org/docs)

### Otras Librerías

- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📝 Scripts Disponibles

```bash
yarn dev          # Iniciar en modo desarrollo (puerto 8000)
yarn build        # Compilar para producción
yarn start        # Iniciar servidor de producción
yarn lint         # Ejecutar linter
yarn analyze      # Analizar bundle de webpack
```

---

## 📄 Licencia

Este proyecto es un fork del [Medusa Next.js Starter](https://github.com/medusajs/nextjs-starter-medusa).

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa la [documentación de Medusa](https://docs.medusajs.com/)
2. Consulta el [Discord de Medusa](https://discord.gg/xpCwq3Kfn8)
3. Abre una issue en GitHub

---

**Última actualización**: Diciembre 2025
