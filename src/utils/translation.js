import { getStorageItem } from "../utils/storage";

const TRANSLATIONS = {
  he: {
    Player: "שחקן",
    Missions: "משימות",
    Toggle: "כיבוי / הפעלה",
    Rename: "שנה שם",
    "Remove Player": "הסר שחקן",
    "Add Player": "הוסף שחקן",
    Name: "שם",
    OK: "אישור",
    Cancel: "ביטול",
    "Are you sure?": "האם את/ה בטו/ח?",
    "Current Player": "שחקן נוכחי",
    Images: "תמונות",
    Add: "הוסף",
    Close: "סגור",
    Remove: "הסר",
    "Random Image Generators": "מחוללי קישורים לתמונה אקראית",
  },
};

export function t(key, language) {
  language =
    language || getStorageItem("language") || navigator.language.substr(0, 2);
  if (language && TRANSLATIONS[language]) {
    const translations = TRANSLATIONS[language];
    return translations[key] || translations[key.toLowerCase()] || key;
  }
  return key;
}
