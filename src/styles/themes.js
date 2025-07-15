export const themes = {
  naranja: {
    border: '2px solid orange',
    background: '#ffe5b4',
    color: '#ff6600'
  },
  azul: {
    border: '2px solid #0033A0',
    background: '#cce0ff',
    color: '#0033A0'
  },
  verde: {
    border: '2px solid #006400',
    background: '#ccffcc',
    color: '#006400'
  },
  rojo: {
    border: '2px solid #B22222',
    background: '#ffcccc',
    color: '#B22222'
  },
  gris: {
    border: '2px solid #555',
    background: '#eee',
    color: '#555'
  }
};

export function getThemeByCedula(cedula) {
  const lastDigit = parseInt(cedula.toString().slice(-1));
  if ([0, 1].includes(lastDigit)) return themes.azul;
  if ([2, 3].includes(lastDigit)) return themes.verde;
  if ([4, 5].includes(lastDigit)) return themes.rojo;
  if ([6, 7].includes(lastDigit)) return themes.gris;
  return themes.naranja;
}
