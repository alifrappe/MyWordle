// import des fonctions
const lb = require('./lib'); 


// ------------------------------ // 
// FONCTIONS 
// ------------------------------ // 
// fonction pour vérifier que le mot entré soit bien de la même taille que le mot recherché
// inputs
//      - word1 : word to find
//      - word2 : user's word
function isSameLength(word1: string, word2: string){
    if (word1.length==word2.length){
        return true;
    } 
    else{
        return false;
    }
};

// fonction pour vérifier que chaque lettre est identique
// inputs
//      - word1 : word to find
//      - word2 : user's word
function isSameLetter(word1: string, word2: string){
    if (word1==word2){
        return true; 
    }
    else{
        return false;
    }
};


// fonction pour verifier chaque lettre
// inputs
//      - check : indicator
//      - word1 : word to find
//      - word2 : user's word
function isCorrect(check: string[], word1: string, word2: string){
    let coloredWord: string[]=givenWord.split("");
    let i: number =0;
    while (i<word2find.length){
        if (isSameLetter(word2find[i],givenWord[i])){
            check[i] = "_"; 
            coloredWord[i] = "\033[92m "+givenWord[i]+"\033[0m";
        }
        
        for (let n=0; n<word2find.length; n++){
            if (isSameLetter(word2find[n],givenWord[i]) && check[n] != "_"){
                check[i] = "O"; 
                coloredWord[i] = "\033[33m "+givenWord[i]+"\033[0m";
            }
            else if(check[i]=="X"){
                coloredWord[i] = "\033[91m "+givenWord[i]+"\033[0m";
            }
        }
        
        i++;
    }
    
    //affiche mot coloré
    console.log(coloredWord.join("")); 
    

    // si le mot n'a pas été trouvé renvoie false sinon true
    if (check.includes("X") || check.includes("O")){
        return false;
    }
    else{
        return true;
    }
};


//fonction qui permet de relancer le jeu
// input
//  - remainingTry : nombre d'essais restant [number]
//  - message : message à afficher [string]
function canIcontinue(remainingTry: number, message: string, word2find:string){
    if(remainingTry==0){
        console.log("You didn't find the word.");
        console.log("The word was : "+ word2find);
    }
    else{
        console.log(message);
        return lb.getInput("Enter a proposition (word length is : " + word2find.length + "):").toUpperCase();
    }
}

//// FIN FONCTIONS ////
// ------------------------------ // 







// ------------------------------ // 
// JEU                            // 
// ------------------------------ // 

// mot aléatoire à trouver
const word2find : string = lb.getRandomWord();

// // mot entré par l'utilisateur
let givenWord: string = lb.getInput("Enter a proposition (The word contains " + word2find.length + " letters):").toUpperCase();

// Nombre de coups
let remainingTry: number = 6;


// Jeu
while(remainingTry>=1){
    let check: string[] = ['X','X','X','X','X']; 
    if (isSameLength(word2find,givenWord)){
        if (isCorrect(check, word2find, givenWord)){
            console.log("Congratulations! You find it!");
            break;
        }
        else{

            remainingTry--; // un essaie est enlevé
            //test s'il reste des essayes
            givenWord = canIcontinue(remainingTry, "You were wrong. Try again. (remained " + remainingTry + " tries).",word2find);
            
        }
    }
    else{
        remainingTry--; // un essaie est enlevé
        givenWord = canIcontinue(remainingTry, "ERREUR: The entry word is not of the same length of the word you're looking for. Try again. (remained " + remainingTry + " tries).",word2find);
    }

};

// ------------------------------ // 