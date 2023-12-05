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
        else if (number_split[0].length == 12){
            return number_split[0]
        }
        else {
            //TODO: ajouter la partie décimale jusqu'à obtenir le nombre de caractère limite ;)
            //TODO: aligner à gauche
            console.log('1');
        }
        
    
    };
    console.log(number, String(number).length);
    return 0
}