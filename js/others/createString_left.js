/**
 * Creation d'une chaîne de caractères aligné à gauche avec un nombre de caractère limite
 * 
 * @param {String} text : information que l'on souhaite avoir dans le résultat final
 * @param {int} limit : nombre de caractère limite souhaité
 * @return {String} text : chaîne de caractère en sortie
 */
function createString_left(text, limit){

    if (text.length > limit){
        text = text.substring(0, limit);
    } 
    else if (text.length < limit){
        let zero = '';
        for (let i=0; i<(limit-text.length)+1; i++){
            zero += ' ';
        }
        zero += text;
    }

    return text

}