# Arma la imagen de portada: campo al atardecer (de la captura de referencia, sin textos)
# con el T50 recortado más cerca y sus dos columnas de pulverización.
# Uso: python3 portada-compuesta.py captura.webp t50-recorte-natural.png carpeta-salida
import sys, cv2, numpy as np

captura, recorte, salida = sys.argv[1], sys.argv[2], sys.argv[3]
fondo = cv2.imread(captura)
H, W = fondo.shape[:2]

# 1) Borrar la interfaz que trae la captura. En las zonas de texto se borran solo las letras
#    (top-hat: lo que es más claro que su entorno y más fino que 25 px); los botones lima, el
#    logo y la franja de datos se borran enteros.
gris = cv2.cvtColor(fondo, cv2.COLOR_BGR2GRAY)
tophat = cv2.morphologyEx(gris, cv2.MORPH_TOPHAT, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (27, 27)))
zonas_texto = [(60, 780, 1086, 890), (552, 34, 1260, 96), (60, 196, 655, 244), (60, 262, 840, 352), (60, 350, 726, 440), (60, 446, 785, 524), (340, 548, 636, 632)]
zonas_llenas = [(56, 14, 375, 106), (1388, 18, 1552, 96), (60, 548, 322, 630)]
masc = np.zeros((H, W), np.uint8)
for x0, y0, x1, y1 in zonas_texto:
    masc[y0:y1, x0:x1] = np.where(tophat[y0:y1, x0:x1] > 22, 255, 0)
for x0, y0, x1, y1 in zonas_llenas:
    masc[y0:y1, x0:x1] = 255
# 2) Borrar el drone chico y la parte alta de sus conos (queda la nube de abajo)
cv2.rectangle(masc, (1082, 412), (1218, 470), 255, -1)
cv2.ellipse(masc, (1104, 488), (16, 26), 0, 0, 360, 255, -1)
cv2.ellipse(masc, (1186, 488), (16, 26), 0, 0, 360, 255, -1)
masc = cv2.dilate(masc, np.ones((5, 5), np.uint8))
limpio = cv2.inpaint(fondo, masc, 7, cv2.INPAINT_TELEA)
cv2.imwrite(f'{salida}/fondo-limpio.png', limpio)

# 3) Pulverización nueva y drone más cerca
dr = cv2.imread(recorte, cv2.IMREAD_UNCHANGED)
ANCHO = 360
k = ANCHO / dr.shape[1]
dr = cv2.resize(dr, (ANCHO, round(dr.shape[0] * k)), interpolation=cv2.INTER_AREA)
X0, Y0 = 968, 350
boquillas = [(X0 + 134 * k, Y0 + 189 * k), (X0 + 525 * k, Y0 + 188 * k)]
SUELO = 590

img = limpio.astype(np.float32)
rng = np.random.default_rng(7)
grano = cv2.GaussianBlur(rng.random((H, W)).astype(np.float32), (0, 0), 6)
grano = (grano - grano.min()) / (grano.max() - grano.min())
niebla = np.zeros((H, W), np.float32)
for bx, by in boquillas:
    cono = np.zeros((H, W), np.float32)
    pts = np.array([[bx - 4, by], [bx + 4, by], [bx + 70, SUELO], [bx - 58, SUELO]], np.int32)
    cv2.fillConvexPoly(cono, pts, 1.0)
    caida = np.clip((np.arange(H) - by) / (SUELO - by), 0, 1)[:, None]
    cono *= 0.55 - 0.25 * caida
    niebla += cv2.GaussianBlur(cono, (0, 0), 9) + 0.5 * cv2.GaussianBlur(cono, (0, 0), 26)
    nube = np.zeros((H, W), np.float32)
    cv2.ellipse(nube, (int(bx + 10), SUELO - 4), (120, 30), 0, 0, 360, 0.42, -1)
    niebla += cv2.GaussianBlur(nube, (0, 0), 22)
niebla = np.clip(niebla * (0.55 + 0.6 * grano), 0, 0.8)[..., None]
tono = np.array([150, 182, 204], np.float32)  # polvo beige cálido (BGR)
img = img * (1 - niebla) + tono * niebla

a = dr[..., 3:4].astype(np.float32) / 255
h, w = dr.shape[:2]
zona = img[Y0:Y0 + h, X0:X0 + w]
img[Y0:Y0 + h, X0:X0 + w] = zona * (1 - a) + dr[..., :3].astype(np.float32) * a
# 4) Oscurecer de a poco el lado izquierdo, donde va el texto del sitio
x = np.arange(W) / W
t = np.clip(x / 0.6, 0, 1)
luz = 0.3 + 0.7 * (t * t * (3 - 2 * t))
img *= luz[None, :, None]
out = np.clip(img, 0, 255).astype(np.uint8)
cv2.imwrite(f'{salida}/portada-compuesta.png', out)
print('listo', out.shape, 'boquillas', [(round(bx), round(by)) for bx, by in boquillas])
