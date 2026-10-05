# Muestra el boceto del sitio en tu navegador, sin instalar nada.
# Se ejecuta con doble clic en VER-BOCETO.bat (no hace falta abrir este archivo).

$raiz = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot 'boceto-portada')) + [IO.Path]::DirectorySeparatorChar

$tipos = @{
    '.html'  = 'text/html; charset=utf-8'
    '.css'   = 'text/css; charset=utf-8'
    '.js'    = 'text/javascript; charset=utf-8'
    '.svg'   = 'image/svg+xml'
    '.woff2' = 'font/woff2'
    '.png'   = 'image/png'
    '.json'  = 'application/json'
}

# Busca un puerto libre entre 8080 y 8090
$servidor = $null
foreach ($p in 8080..8090) {
    $prueba = New-Object System.Net.HttpListener
    $prueba.Prefixes.Add("http://localhost:$p/")
    try { $prueba.Start(); $servidor = $prueba; $puerto = $p; break } catch { $prueba.Close() }
}
if (-not $servidor) {
    Write-Host "No pude abrir ningún puerto entre 8080 y 8090. Cerrá otros programas y probá de nuevo." -ForegroundColor Red
    exit 1
}

$direccion = "http://localhost:$puerto/"
Write-Host ""
Write-Host "=== Boceto de AgroAtom ===" -ForegroundColor Green
Write-Host ""
Write-Host "Con datos de muestra:   $($direccion)?muestra"
Write-Host "Con el clima real:      $direccion"
Write-Host ""
Write-Host "Dejá esta ventana abierta mientras mirás el boceto. Para apagarlo, cerrala." -ForegroundColor Yellow
Write-Host ""

Start-Process "$($direccion)?muestra"

while ($servidor.IsListening) {
    $pedido = $servidor.GetContext()
    $respuesta = $pedido.Response
    try {
        $ruta = [Uri]::UnescapeDataString($pedido.Request.Url.AbsolutePath.TrimStart('/'))
        if ($ruta -eq '') { $ruta = 'index.html' }
        $archivo = [IO.Path]::GetFullPath((Join-Path $raiz $ruta))

        if ($archivo.StartsWith($raiz, [StringComparison]::OrdinalIgnoreCase) -and (Test-Path -LiteralPath $archivo -PathType Leaf)) {
            $bytes = [IO.File]::ReadAllBytes($archivo)
            $extension = [IO.Path]::GetExtension($archivo).ToLower()
            if ($tipos.ContainsKey($extension)) { $respuesta.ContentType = $tipos[$extension] } else { $respuesta.ContentType = 'application/octet-stream' }
            $respuesta.Headers.Add('Cache-Control', 'no-store')
            $respuesta.ContentLength64 = $bytes.Length
            $respuesta.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $respuesta.StatusCode = 404
        }
    } catch {
        try { $respuesta.StatusCode = 500 } catch { }
    } finally {
        $respuesta.Close()
    }
}
