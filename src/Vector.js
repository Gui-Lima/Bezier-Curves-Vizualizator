class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    static size(a) { 
        var v = Math.sqrt( (a.x * a.x) + (a.y * a.y) ); 
        return v;
    }
    static add(a, b) { 
        var v = new Vector( (a.x + b.x), (a.y + b.y) ); 
        return v;
    }
    static sub(a, b) { 
        var v = new Vector( (a.x - b.x), (a.y - b.y) ); 
        return v;
    }
    static kProduct(k, vec) { 
        var v = new Vector( (k * vec.x), (k* vec.y) ); 
        return v;
    }
    static dotProduct(a, b) { 
        return (a.x * b.x) + (a.y * b.y); 
        
    }
    static kDiv(k, vec) {
        var v = new Vector( (vec.x / k), (vec.y / k) );
        return v;
    }
    static rotate(vec, degrees) {
        var r = new Vector( ((Math.cos(degrees) * vec.x) + ((-1) *Math.sin(degrees) * vec.y)),
                            (( Math.sin(degrees) * vec.x) + (Math.cos(degrees) * vec.y)) );
        return r;
    }
}
