class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    size(a) { 
        var v = Math.sqrt( (a.x * a.x) + (a.y * a.y) ); 
        return v;
    }
    add(a, b) { 
        var v = new Vector( (a.x + b.x), (a.y + b.y) ); 
        return v;
    }
    sub(a, b) { 
        var v = new Vector( (a.x - b.x), (a.y - b.y) ); 
        return v;
    }
    kProduct(k, vec) { 
        var v = new Vector( (k * vec.x), (k* vec.y) ); 
        return v;
    }
    dotProduct(a, b) { 
        return (a.x * b.x) + (a.y * b.y); 
        
    }
    kDiv(k, vec) {
        var v = new Vector( (vec.x / k), (vec.y / k) );
        return v;
    }
    rotate(vec, degrees) {
        var r = new Vector( ((Math.cos(degrees) * vec.x) + ((-1) *Math.sin(degrees) * vec.y)),
                            (( Math.sin(degrees) * vec.x) + (Math.cos(degrees) * vec.y)) );
        return r;
    }
}
