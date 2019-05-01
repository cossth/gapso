
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
    
    // Gets city's x coordinate
    public get X(): number{
        return this.x;
    }
    
    // Gets city's y coordinate
    public get Y(): number{
        return this.y;
    }
    
    // Gets the distance to given city
    public distanceTo(city: City): number{
        let xDistance = Math.abs(this.X - city.X);
        let  yDistance = Math.abs(this.Y - city.Y);
        let distance = Math.sqrt( (xDistance*xDistance) + (yDistance*yDistance) );
        
        return distance;
    }
}