const TRANSLATIONS = {
    "Player": "שחקן",
    "Missions": "משימות",
    "Toggle": "כיבוי / הפעלה",
    "Rename": "שנה שם",
    "Remove Player": "הסר שחקן",
    "Add Player": "הוסף שחקן",
    "Name": "שם",
    "OK": "אישור",
    "Cancel": "ביטול",
    "Are you sure?": "האם את/ה בטו/ח?",
    "Current Player": "שחקן נוכחי",
    "Images": "תמונות",
    "Add": "הוסף",
    "Close": "סגור",
    "Remove": "הסר",
    "Random Image Generators": "מחוללי קישורים לתמונה אקראית"
};

export function t(key) {
    return TRANSLATIONS[key] || TRANSLATIONS[key.toLowerCase()] || key;
}