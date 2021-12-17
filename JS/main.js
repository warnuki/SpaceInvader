//importation
import Vaisseau from "./vaisseau.js";
import Alien from "./alien.js"
import Missile from "./missile.js"
import G from "./G.js";

let textures,v,a,m;
let tMissiles = [];
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
    createAlien();
   

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
    }
}

function createVaisseau(){
    v = new Vaisseau(100, 300, 5, textures);
    app.stage.addChild(v); 
}

function createAlien(){
    a = new Alien(100, 100, textures);
    app.stage.addChild(a); 
}

function createMissile(){
    m = new Missile(v.x, v.y, textures);
    app.stage.addChild(m); 
    return m;
}

function moveEnnemis() {
    setTimeout(function(){
        a.move();
        moveEnnemis()
    },10);
  }




