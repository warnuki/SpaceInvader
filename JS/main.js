//importation
import Vaisseau from "./vaisseau.js";
import Alien from "./alien.js"
import Missile from "./missile.js"
import G from "./G.js";

let textures,v,a,m;
let tMissiles = [];
let tAliens = [];
//Création de l'application pixi
const app = new PIXI.Application({
    width : G.wST,
    height : G.hST,
    backgroundColor : 0x33333,
    antialias : true
});

document.body.appendChild(app.view);

//Chargement
const loader = PIXI.Loader.shared;
loader.add("sprite", "../asset/SpaceInvaders.json");
// Lance le chargement
loader.load((loader, resources)  => {
    textures = resources.sprite.textures;
    console.log(textures);

    createVaisseau();
    //createAlien();
    createAliens(40,5);
    

        gameloop();
        moveEnnemis();
})


/////////// ECOUTEUR D'EVENEMENT ////////////////////
window.addEventListener('keydown', (e) =>{
    //fleche gauche
    if(e.keyCode === 37){
        v.sens = -1;
    }
    //fleche droite
    else if(e.keyCode === 39){
        v.sens = 1;
    }
    // espace
    else if(e.keyCode === 32){
        tMissiles.push(createMissile());
    }
})

window.addEventListener('keyup', (e) =>{
    // fleche gauche
    if(e.keyCode === 37 && v.sens === -1){
        v.sens = 0;
    }
    // fleche droite
    else if(e.keyCode === 39 && v.sens === 1){
        v.sens = 0;
    }  
})


function gameloop(){
    requestAnimationFrame(gameloop);
    v.move();
    for(let i = 0; i < tMissiles.length; i++){
        tMissiles[i].move();
        for(let j = 0; j < tAliens.length; j++){
            if(G.collide(tMissiles[i],tAliens[j])){
                app.stage.removeChild(tAliens[j]);
                app.stage.removeChild(tMissiles[i]);
                tMissiles.splice(i,1);
                tAliens.splice(j,1); 
                break;
            }
            if(G.collide(v,tAliens[j])){
                Vaisseau.nbVies -= 1;
                console.log(Vaisseau.nbVies);
                app.stage.removeChild(tAliens[j]);
            }
        }
    }

}

function createVaisseau(){
    //v = new Vaisseau(G.wST/2, G.hST - 100, 5, textures,5);
    v = new Vaisseau(400, 200, 5, textures);
    app.stage.addChild(v); 
}

/* function createAlien(){
    a = new Alien(100, 100, textures);
    app.stage.addChild(a); 
}
 */
function createMissile(){
    m = new Missile(v.x, v.y, textures);
    app.stage.addChild(m); 
    return m;
}

function moveEnnemis() {
    setTimeout(function(){
        for(let i = 0; i < tAliens.length; i++){
            tAliens[i].move();
        }
        moveEnnemis()
    },10);
  }


//Create Aliens 
function createAliens(nbCols, nbLines){
    for(let i = 0; i < nbLines; i++){
        for(let j = 0; j < nbCols; j++){
            let temp = new Alien(100 + j*20, 100 + i*20, textures);
            tAliens.push(temp);
            app.stage.addChild(temp);
        }
    }
}

