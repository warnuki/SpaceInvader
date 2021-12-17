import G from "./G.js";

// creation de la classe et exportation
export default class Alien extends PIXI.Sprite{
    //Constructeur
    /** constructeur de la classe Ball
     * 
     * @param {Number} speed : vitesse
     * 
     * @example
     * 
     * let p = new Pad(100, 100, 20, 0xFFFF3, 215, 20);
     * app.stage.addChild(p))
     */
    constructor(x, y, textures){
 

        //invoque le constructeur de la super classe
        super(textures["alien1_0"]);

        //propriéte d'instance
        this.x = x;
        this.y = y;
        this._sens = 1;
    }


    /**
     * Déplacemenet de la balle
     */
    move(){
        if(this._sens === 1 && this.x + 3 > G.wST){
            this._sens = -1;
            this.y += 50;
        }
        else if( this._sens === -1 && this.x - 3 < 0){
            this._sens = 1;
            this.y += 50;
        } 
        else {
            this.x += this._sens ;
        }
    }

    /**
     * Getter/ Seeter pour le sens
     */

     get sens(){
         return this._sens;

     }
     set sens(value){
         if(value < -1 || value > 1) console.warn("Attention valeur invalide");
         this._sens = Math.max( -1, Math.min(1,value));
     }

}