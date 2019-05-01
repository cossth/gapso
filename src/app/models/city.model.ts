
export class City {
    x : number;
    y : number;
        
    constructor( x: number, y: number){
        if (x == undefined){
            this.x = Math.random()*200;
        }
        else{
            this.x = x;
        }
        if (y == undefined){
            this.y = Math.random()*200; 
        }
        else{
            this.y = y;
        }
    }
    
    public get X(): number{
        return this.x;
    }
    
    public get Y(): number{
        return this.y;
    }
    
    public distanceTo(city: City): number{
        let xDistance = Math.abs(this.X - city.X);
        let  yDistance = Math.abs(this.Y - city.Y);
        let distance = Math.sqrt( (xDistance*xDistance) + (yDistance*yDistance) );
        
        return distance;
    }
}