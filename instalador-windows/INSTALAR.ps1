# Instalador de plugins y habilidades de Claude
# Se ejecuta con doble clic en INSTALAR.bat (no hace falta abrir este archivo).

$aqui = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "=== Instalador de plugins y habilidades de Claude ===" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar que Claude Code este instalado
if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
    Write-Host "No encontré Claude Code en esta PC." -ForegroundColor Red
    $r = Read-Host "¿Lo instalo ahora con winget? (s/n)"
    if ($r -match '^[sS]') {
        winget install Anthropic.ClaudeCode
        Write-Host ""
        Write-Host "Listo. Cerrá esta ventana y volvé a hacer doble clic en INSTALAR.bat" -ForegroundColor Green
    } else {
        Write-Host "Instalá Claude Code y después volvé a correr este instalador."
    }
    exit 1
}

# 2. Asegurar que este el catalogo oficial de plugins
$marketplaces = claude plugin marketplace list | Out-String
if ($marketplaces -notmatch 'claude-plugins-official') {
    Write-Host "Agregando el catálogo oficial de plugins..." -ForegroundColor Yellow
    claude plugin marketplace add https://github.com/anthropics/claude-plugins-official.git
}

# 3. Instalar los plugins oficiales (se bajan la version mas nueva)
$plugins = 'frontend-design', 'code-review', 'code-simplifier', 'chrome-devtools-mcp', 'figma', 'vercel'
foreach ($p in $plugins) {
    Write-Host ""
    Write-Host "Instalando $p..." -ForegroundColor Yellow
    claude plugin install "$p@claude-plugins-official"
}

# 4. Plugins de la cuenta (searchfit-seo y claude-site-audit)
#    Si se usa la misma cuenta de claude.ai, aparecen solos en la app de escritorio.
Write-Host ""
$r = Read-Host "¿En esta PC usás la MISMA cuenta de Claude que en la otra? (s/n)"
if ($r -match '^[sS]') {
    Write-Host "Bien: searchfit-seo y claude-site-audit van a aparecer solos al iniciar sesión en la app de Claude." -ForegroundColor Green
} else {
    $skills = Join-Path $env:USERPROFILE '.claude\skills'
    New-Item -ItemType Directory -Force $skills | Out-Null
    foreach ($p in 'searchfit-seo', 'claude-site-audit') {
        $destino = Join-Path $skills $p
        if (Test-Path $destino) {
            Write-Host "$p ya estaba instalado, lo salteo."
            continue
        }
        Copy-Item (Join-Path $aqui "2-plugins-de-tu-cuenta\$p") $destino -Recurse
        Write-Host "Copiado $p" -ForegroundColor Green
    }
}

# 5. Resumen
Write-Host ""
Write-Host "=== Plugins instalados ===" -ForegroundColor Cyan
claude plugin list
Write-Host ""
Write-Host "Terminado. Cerrá y volvé a abrir Claude para que tome los cambios." -ForegroundColor Green
Write-Host "Acordate de autorizar Vercel y Figma la primera vez que los uses (escribí /mcp en Claude Code)."
