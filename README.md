# 🏛️ Patronato de Monterrey – Portal de Transparencia

Portal web de transparencia exclusivo para el **Comité de Desarrollo del Patronato de Monterrey**. Permite registrar y publicar donaciones (ingresos) y gastos (egresos) de forma pública, con gráficos, leaderboard de donantes, buscador de donantes y panel administrativo completo.

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## 📋 Características

### Portal Público
- ✅ **Dashboard principal** con totales de donaciones, gastos y balance
- ✅ **Barra de progreso** hacia la meta del proyecto (configurable)
- ✅ **Leaderboard de donantes** con podio top 3
- ✅ **Gráficos interactivos** (Chart.js):
  - Donaciones por categoría (donut)
  - Top donantes (barras horizontales)
  - Tendencia mensual (líneas)
- ✅ **Buscador de donantes** por nombre o empresa
- ✅ **Perfil de donante** con historial completo
- ✅ **Lista de movimientos** con filtros (fecha, categoría, método)
- ✅ **Página de estadísticas** detalladas
- ✅ **Página de gastos** pública
- ✅ **Reportes** descargables

### Panel Administrativo
- ✅ **Autenticación** con JWT (7 días)
- ✅ **Dashboard admin** con alertas de pendientes
- ✅ **CRUD de Donantes** (personas y empresas)
- ✅ **CRUD de Categorías/Rubros** (colores, íconos)
- ✅ **CRUD de Donaciones** con verificación
- ✅ **CRUD de Gastos** con verificación
- ✅ **Proveedores** para gastos
- ✅ **Estados**: Pendiente → Verificado / Anulado
- ✅ **Gestión de usuarios** administrativos (roles: ADMIN / VIEWER)
- ✅ **Configuración** del sistema (meta, nombre)
- ✅ **Registro de auditoría** de todas las acciones
- ✅ **Reportes** con filtros de fechas

## 🎨 Identidad Visual

- **Color primario**: Azul marino (`#1d4ed8`) — representa la seriedad y confianza institucional
- **Color acento**: Dorado (`#d97706`) — representa la excelencia y el orgullo regiomontano
- **Moneda**: Lempiras Hondureños (HNL)
- **Localización**: `es-HN`

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+
- PostgreSQL 14+
- npm

### 1. Instalar dependencias

```bash
cd patronatomonterrey
npm install
```

### 2. Configurar variables de entorno

Copia `.env.example` a `.env` y ajusta los valores:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/patronato_monterrey?schema=public"
JWT_SECRET="tu-super-secreto-cambiar-en-produccion"
ADMIN_EMAIL="admin@patronato-monterrey.org"
ADMIN_PASSWORD="admin123456"
PUBLIC_APP_NAME="Patronato de Monterrey - Comité de Desarrollo"
PUBLIC_META_GOAL=5000000
```

### 3. Crear la base de datos

```bash
psql -U postgres -c "CREATE DATABASE patronato_monterrey;"
```

### 4. Ejecutar migraciones

```bash
npx prisma migrate dev --name init
```

### 5. Poblar datos iniciales

```bash
npx prisma db seed
```

Crea:
- Usuario administrador
- 10 categorías predefinidas (Industria, Comercio, Servicios, etc.)
- Configuración inicial con meta de L 5,000,000 HNL
- Proveedores de ejemplo
- Donantes de ejemplo

### 6. Iniciar desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## 📱 Rutas

### Públicas
| Ruta | Descripción |
|------|-------------|
| `/` | Dashboard con totales, leaderboard y gráficos |
| `/movimientos` | Lista de donaciones con filtros |
| `/egresos` | Lista de gastos |
| `/buscar` | Búsqueda de donantes |
| `/donante/[id]` | Perfil e historial del donante |
| `/estadisticas` | Estadísticas detalladas |
| `/reportes` | Reportes por período |

### Administrativas
| Ruta | Descripción |
|------|-------------|
| `/admin/login` | Inicio de sesión |
| `/admin` | Dashboard administrativo |
| `/admin/donantes` | Gestión de donantes |
| `/admin/rubros` | Gestión de categorías |
| `/admin/aportes` | Gestión de donaciones |
| `/admin/egresos` | Gestión de gastos |
| `/admin/reportes` | Reportes administrativos |
| `/admin/auditoria` | Registro de actividad |
| `/admin/usuarios` | Gestión de usuarios admin |
| `/admin/configuracion` | Configuración del sistema |

## 🗃️ Estructura

```
src/
├── lib/
│   ├── components/      # Componentes reutilizables
│   ├── server/          # Auth, DB, Auditoría, Reportes
│   ├── utils/           # Formato (moneda HNL, fechas es-HN)
│   └── validations.ts   # Esquemas Zod
├── routes/
│   ├── admin/           # Panel administrativo
│   ├── buscar/          # Búsqueda de donantes
│   ├── donante/[id]/    # Perfil de donante
│   ├── estadisticas/    # Estadísticas
│   ├── egresos/         # Gastos públicos
│   ├── movimientos/     # Donaciones públicas
│   ├── reportes/        # Reportes públicos
│   └── +page.svelte     # Página principal
prisma/
├── schema.prisma
└── seed.ts
```

## 🔧 Scripts

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run preview      # Preview del build
npx prisma studio    # GUI de base de datos
npx prisma db seed   # Poblar datos iniciales
```

## 🔒 Seguridad

- Referencias bancarias privadas (solo visibles en admin)
- Solo donaciones/gastos **VERIFICADOS** son públicos
- Auditoría completa de acciones administrativas
- Contraseñas con bcrypt (12 rounds)
- JWT con expiración de 7 días

---

Desarrollado para el **Patronato de Monterrey – Comité de Desarrollo**
