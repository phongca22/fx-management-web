export const removeAccents = (text: any): string => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[Đđ]/, 'd');
