function createNumber_left(number, limit, decimal=4){

    const number_string = String(number);
    if (number_string.length == limit){
        return number;
    }
    else if (number_string.length > limit){
        
        // Décomposition du nombre en parties entières et décimales
        const number_split = number_string.split('.');

        // Check de la partie entière
        if (number_split[0].length > 12){
            return 0.0
        }
        else if (number_split[0].length >= 11 ){
            // Supérieur ou égal à 11 car si on ajout le point mais qu'on peut rien mettre derrière, cela sert à rien
            return number_split[0]
        }
        else {
            //---- Ajouter la partie décimale jusqu'à obtenir le nombre de caractère limite ;)
            const partDecimal = number_split[1] * 1 / 1000;  //multiplié par 1 pour transformer le string en number

            let number_return = number_split[0] + decimal
            let number_return_string = String(number_return)
            let diff = number_return_string.length - limit;
            if (diff >= 1){
                number_return_string = number_return_string.slice(0, number_return_string.length-diff);
                number_return = number_return_string*1;
            } 
            else {
                // Le nombre de caractères est largement inférieur à la limit, on check la limit décimal
                number_return = number_return.toFixed(decimal);
            }

            //-- Aligner à gauche
            return createString_left(String(number_return), limit)
        }
    };
    console.log(number, String(number).length);
    return 0
}