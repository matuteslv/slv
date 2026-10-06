# Recorta el T50 de la foto (cielo claro detrás) con GrabCut + diferencia contra el fondo reconstruido.
import sys, cv2, numpy as np
# Uso: python3 recorte-t50.py foto.jpg salida.png [atardecer|natural]
im = cv2.imread(sys.argv[1])
X0, Y0, X1, Y1 = 105, 172, 535, 316
c = im[Y0:Y1, X0:X1].copy()
h, w = c.shape[:2]
# 1) GrabCut con un rectángulo que encierra drone y hélices
mask = np.zeros((h, w), np.uint8)
rect = (18, 14, w - 36, h - 18)
bgd, fgd = np.zeros((1, 65), np.float64), np.zeros((1, 65), np.float64)
cv2.grabCut(c, mask, rect, bgd, fgd, 8, cv2.GC_INIT_WITH_RECT)
fg = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
# 2) Fondo sin el drone (inpaint) para poder medir la diferencia
dil = cv2.dilate(fg, np.ones((9, 9), np.uint8))
B = cv2.inpaint(c, dil, 9, cv2.INPAINT_TELEA)
B = cv2.GaussianBlur(B, (0, 0), 6)
# 3) Alfa por diferencia (atrapa las hélices semitransparentes)
lab_c = cv2.cvtColor(c, cv2.COLOR_BGR2LAB).astype(np.float32)
lab_b = cv2.cvtColor(B, cv2.COLOR_BGR2LAB).astype(np.float32)
d = np.sqrt(((lab_c - lab_b) ** 2).sum(axis=2))
a_d = np.clip((d - 7) / (38 - 7), 0, 1)
zona = np.zeros((h, w), np.uint8)
cv2.rectangle(zona, (rect[0], rect[1]), (rect[0] + rect[2], rect[1] + rect[3]), 255, -1)
a_d *= (cv2.GaussianBlur(zona, (0, 0), 6) / 255.0)
a_g = cv2.GaussianBlur(fg.astype(np.float32) / 255.0, (0, 0), 0.8)
a = np.maximum(a_g * 0.98, a_d)
a[a < 0.06] = 0
# 4) Separar el color del drone del cielo
cf, bf = c.astype(np.float32), B.astype(np.float32)
A = np.maximum(a, 0.05)[..., None]
F = np.clip((cf - (1 - A) * bf) / A, 0, 255)
# 5) Clima de atardecer a contraluz: más oscuro y cálido (BGR)
TONO = sys.argv[3] if len(sys.argv) > 3 else 'atardecer'
F = F * (np.array([0.62, 0.74, 0.86]) * 0.92 if TONO == 'atardecer' else np.array([0.8, 0.8, 0.82]) * 0.8)
out = np.dstack([F, a * 255]).astype(np.uint8)
ys, xs = np.where(a > 0.05)
bx0, by0, bx1, by1 = xs.min() - 4, ys.min() - 4, xs.max() + 5, ys.max() + 5
out = out[max(0, by0):by1, max(0, bx0):bx1]
out = cv2.resize(out, None, fx=2, fy=2, interpolation=cv2.INTER_LANCZOS4)
cv2.imwrite(sys.argv[2], out)
print('recorte', out.shape, 'origen en la foto', X0 + max(0, bx0), Y0 + max(0, by0))
