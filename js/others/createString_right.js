/**
 * Creation d'une chaîne de caractères aligné à droite avec un nombre de caractère limite
 * 
 * @param {String} text : information que l'on souhaite avoir dans le résultat final
 * @param {int} limit : nombre de caractère limite souhaité
 * @return {String} text : chaîne de caractère en sortie
 */
function createString_right(text, limit){

    if (text.length > limit){
        text = text.substring(0, limit);
    } 
    else if (text.length < limit){
        for (let i=text.length; i<limit+1; i++){
            text += ' ';
        }
    }

    return text

}