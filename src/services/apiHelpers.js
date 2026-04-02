export function creerFiltreNumerique(champ, valeur) {
  return `${champ}=${valeur}`
}

export function validerSexe(valeur) {
  if (['M', 'F'].includes(valeur)) {
    return valeur
  }
  return 'all'
}
