# Plugins y habilidades de Claude

Copia de todo lo que Claude tiene instalado en esta compu, armada el 05/10/2026.

> **Ojo:** esto es una **copia de referencia** para que puedas leer cómo funciona cada cosa.
> Si editás algo acá, Claude **no** se entera: los originales siguen en su lugar
> (ver "De dónde salió cada cosa" al final).

## Instalar en otra PC

1. Pasá el archivo `plugins-y-habilidades.zip` a la otra PC (pendrive, Drive, mail…).
2. Clic derecho en el ZIP → **Extraer todo**.
3. Entrá a la carpeta y hacé **doble clic en `INSTALAR.bat`**.
4. Respondé la pregunta que te hace (si usás la misma cuenta de Claude o no).
5. Cerrá y volvé a abrir Claude.

Si Windows muestra "Windows protegió su PC", tocá **Más información → Ejecutar de todas formas**
(sale porque el archivo vino de otra compu).

El instalador baja la **versión más nueva** de cada plugin oficial, no copia la vieja.

---

**Cómo usar una habilidad:** en el chat escribí `/` y el nombre (por ejemplo `/seo-audit`),
o simplemente pedí la tarea y Claude elige la habilidad que corresponde.
Cada habilidad es una carpeta con un archivo `SKILL.md`: ahí están las instrucciones que sigue Claude.

---

## 1. Plugins instalados en Claude Code (`1-plugins-instalados/`)

| Plugin | Versión | Para qué sirve |
|---|---|---|
| **chrome-devtools-mcp** | 1.9.0 | Controlar Chrome con DevTools: depurar páginas, red, consola, rendimiento, Lighthouse |
| **code-review** | — | Comando `/code-review` para revisar un pull request |
| **code-simplifier** | 1.0.0 | Agente que limpia y simplifica código sin cambiar lo que hace |
| **figma** | 2.2.120 | Leer y crear diseños en Figma/FigJam, pasar diseño a código y al revés |
| **frontend-design** | — | Guía para hacer interfaces con diseño propio, que no parezcan plantilla |
| **vercel** | 0.50.0 | Todo lo de Vercel y Next.js: deploy, variables de entorno, AI SDK, caché, etc. |

### chrome-devtools-mcp — habilidades
| Habilidad | Qué hace |
|---|---|
| `a11y-debugging` | Revisa accesibilidad: ARIA, foco, teclado, contraste |
| `chrome-devtools` | Depuración y automatización general del navegador |
| `chrome-devtools-cli` | Scripts de terminal para automatizar Chrome |
| `cookie-debugging` | Problemas de cookies, sesión, login y banners de consentimiento |
| `debug-optimize-lcp` | Mejorar el LCP (qué tan rápido aparece el contenido principal) |
| `memory-leak-debugging` | Encontrar pérdidas de memoria en JavaScript/Node |
| `troubleshooting` | Arreglar problemas de conexión del propio DevTools MCP |

### figma — habilidades
| Habilidad | Qué hace |
|---|---|
| `figma-use` | Base obligatoria antes de editar cualquier archivo de Figma |
| `figma-create-new-file` | Crear un archivo nuevo de Figma |
| `figma-design-to-code` | Pasar un diseño de Figma a código |
| `figma-generate-design` | Pasar una pantalla de tu app a Figma |
| `figma-generate-library` | Armar un sistema de diseño (componentes, tokens) en Figma |
| `figma-generate-diagram` | Crear diagramas en FigJam |
| `figma-code-connect` | Vincular componentes de Figma con los de tu código |
| `figma-generative-plugins` | Plugins generativos de Figma |
| `figma-implement-motion` / `figma-use-motion` | Animaciones |
| `figma-shaders` | Shaders (efectos visuales) |
| `figma-swiftui` | Pasar diseños a SwiftUI (iPhone/Mac) |
| `figma-use-figjam` | Trabajar en FigJam |
| `figma-use-slides` | Trabajar en Figma Slides |

> La carpeta `skills-figquery/` es una variante interna de las mismas habilidades, y
> `workflow-skills/` trae dos extras (plan de proyecto y mapeo de interacciones en video).

### vercel — comandos, agentes y habilidades
**Comandos:** `/bootstrap`, `/deploy` (preview o `prod`), `/env` (variables de entorno), `/status`

**Agentes:** `ai-architect` (apps con IA), `deployment-expert` (deploys y CI/CD), `performance-optimizer` (velocidad y Core Web Vitals)

| Habilidad | Qué hace |
|---|---|
| `nextjs` | Guía general de Next.js |
| `next-upgrade` | Actualizar Next.js de versión |
| `next-cache-components` | Caché de componentes en Next.js |
| `next-forge` | Plantilla next-forge (monorepo SaaS) |
| `react-best-practices` | Buenas prácticas de React |
| `shadcn` | Componentes shadcn/ui |
| `turbopack` | El empaquetador de Next.js |
| `ai-sdk` | Vercel AI SDK: chats, herramientas, streaming |
| `ai-gateway` | Gateway para usar varios modelos de IA |
| `build-agents` | Construir agentes de IA |
| `chat-sdk` | Bots multiplataforma (Slack, Telegram, Discord…) |
| `workflow` | Flujos de trabajo durables |
| `queues` | Colas de tareas |
| `create-a-backend` | Elegir arquitectura de backend |
| `vercel-functions` | Funciones serverless |
| `vercel-storage` | Bases de datos y almacenamiento |
| `vercel-services` | Servicios de Vercel |
| `vercel-sandbox` | Entornos aislados para ejecutar código |
| `vercel-cli` | La terminal de Vercel (`vercel ...`) |
| `deployments-cicd` | Deploys, rollbacks, CI/CD |
| `env-vars` | Variables de entorno y archivos `.env` |
| `bootstrap` | Preparar un repo con recursos de Vercel |
| `access-protected-vercel-deployment` | Entrar a deploys protegidos con contraseña/SSO |
| `auth` | Login de usuarios (Clerk, Auth0, Descope) |
| `routing-middleware` | Middleware y ruteo |
| `cdn-caching` / `runtime-cache` | Caché de la CDN y en tiempo de ejecución |
| `vercel-firewall` | Firewall y protección contra ataques |
| `flags-sdk` | Feature flags (activar/desactivar funciones) |
| `microfrontends` | Microfrontends |
| `marketplace` | Integraciones del Marketplace de Vercel |
| `custom-metrics` | Métricas propias |
| `vercel-agent` | El agente de Vercel |
| `vercel-connect` | Conexiones de Vercel |
| `verification` | Verificar que un cambio funciona |
| `eve` | Habilidad "eve" de Vercel |
| `knowledge-update` | Corrige info vieja que Claude pueda tener sobre Vercel |

> Las habilidades dentro de `vercel/.claude/skills/` (benchmark, release, etc.) son internas
> de los creadores del plugin, Claude no las usa con vos.

---

## 2. Plugins de tu cuenta claude.ai (`2-plugins-de-tu-cuenta/`)

### searchfit-seo — kit de SEO
**Comandos:** `/create-content` (artículo completo), `/create-topic` (plan de tema), `/generate-schema` (JSON-LD),
`/keyword-cluster` (agrupar palabras clave), `/seo-check` (chequeo rápido), `/translate-content` (traducir para SEO)

**Agentes:** `seo-auditor` (auditoría completa), `content-strategist` (estrategia de contenido), `competitor-analyzer` (análisis de competencia)

| Habilidad | Qué hace |
|---|---|
| `seo-audit` | Auditoría SEO completa |
| `technical-seo` | SEO técnico: velocidad, robots.txt, sitemap, indexación |
| `on-page-seo` | Optimizar una página puntual |
| `schema-markup` | Datos estructurados para Google |
| `internal-linking` | Enlaces internos entre páginas |
| `broken-links` | Encontrar y arreglar links rotos |
| `keyword-clustering` | Organizar palabras clave por tema |
| `content-strategy` | Planificar qué contenido escribir |
| `content-brief` | Guía detallada antes de escribir un artículo |
| `content-translation` | Traducir y adaptar contenido a otros idiomas |
| `ai-visibility` | Cómo aparece tu marca en ChatGPT, Claude, Gemini, etc. |

### claude-site-audit
**Comando:** `/site-audit` — audita SEO, accesibilidad y preparación para buscadores con IA,
y arma un PDF para el cliente con nota, tabla de puntajes y arreglos priorizados.
Muy útil para tu proyecto de prospección web.

> **frontend-design** también está en tu cuenta, pero es el mismo que el de la sección 1, así que no lo dupliqué.

---

## 3. Habilidades de Anthropic (`3-habilidades-anthropic/`)

| Habilidad | Qué hace |
|---|---|
| `docx` | Crear y editar documentos de Word |
| `xlsx` | Crear y editar planillas de Excel / CSV |
| `pptx` | Crear y editar presentaciones de PowerPoint |
| `pdf` | Todo con PDFs: leer, unir, separar, completar formularios, OCR |
| `docs` | Documentos de Claude para compartir y comentar |
| `google-workspace` | Crear o editar archivos de Google Docs, Sheets y Slides |
| `deep-research` | Investigación a fondo con varias fuentes y un informe final |
| `skill-creator` | Crear tus propias habilidades |
| `schedule` | Programar tareas que se repiten (todos los días, cada hora…) |
| `morning` | Resumen de la mañana |
| `consolidate-memory` | Ordenar la memoria de Claude (juntar duplicados, borrar lo viejo) |
| `import-memory` | Importar la memoria de otro asistente de IA |
| `explain-usage` | Explicar en qué se gastaron los tokens de la sesión |
| `built-in-browser` | Usar el navegador integrado de la app |
| `chrome-browser` | Usar tu Chrome real (extensión Claude in Chrome) |
| `computer-use` | Controlar apps de tu compu con clics y teclado |
| `setup-claude` / `setup-cowork` | Configuración guiada inicial |

---

## 4. Habilidades integradas en Claude Code (sin archivos para copiar)

Estas vienen adentro del programa, no hay carpeta que copiar. Igual las podés usar:

| Habilidad | Qué hace |
|---|---|
| `/code-review` | Revisar cambios de código buscando errores |
| `/simplify` | Limpiar y simplificar el código que cambiaste |
| `/security-review` | Revisión de seguridad |
| `/init` | Crear el archivo `CLAUDE.md` de un proyecto |
| `/run` | Levantar tu app para ver un cambio funcionando |
| `/loop` | Repetir una tarea cada cierto tiempo |
| `/schedule` | Agentes programados en la nube |
| `claude-api` | Referencia de la API de Claude (modelos, precios, etc.) |
| `update-config` | Cambiar la configuración de Claude Code (permisos, hooks) |
| `keybindings-help` | Cambiar atajos de teclado |
| `fewer-permission-prompts` | Reducir los carteles de "¿permitís esto?" |
| `artifact-design` / `artifact-diagramming` / `artifact-capabilities` | Hacer páginas web publicables (Artifacts) |
| `dataviz` | Gráficos y dashboards bien hechos |

## 5. Conectores (MCP) activos

Herramientas externas a las que Claude se puede conectar:
**Supabase** (tu base de datos de agro-drones), **Figma**, **Vercel** (⚠️ falta autorizarlo),
**Chrome DevTools**, **Claude in Chrome**, **Claude Docs**, **tareas programadas** y **terminal**.

---

## De dónde salió cada cosa

| Carpeta | Original |
|---|---|
| `1-plugins-instalados/` | `C:\Users\matia\.claude\plugins\cache\claude-plugins-official\` |
| `2-plugins-de-tu-cuenta/` | `C:\Users\matia\AppData\Roaming\Claude\local-agent-mode-sessions\...\rpm\` |
| `3-habilidades-anthropic/` | `C:\Users\matia\AppData\Roaming\Claude\local-agent-mode-sessions\skills-plugin\...\skills\` |

La lista oficial de lo instalado está en `C:\Users\matia\.claude\plugins\installed_plugins.json`.
