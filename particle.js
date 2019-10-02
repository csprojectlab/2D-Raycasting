class Particle {
    constructor () {
        this.pos = createVector (width / 2, height / 2);
        this.rays = [];
        for (let angle = 0; angle < 360; angle += 1)    // Think of rays every 10 degrees
            this.rays.push(new Ray(this.pos, radians(angle)));        
    }

    /**
     * API's: show, look, update
     */
    show () {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for (let ray of this.rays)
            ray.show();
    }   // End of show function.

    look (walls) {
        for (let ray of this.rays) {
            let closest = null;    // Keep track of nearest point.
            let record = Infinity;
            for (let wall of walls) {   // We need to find closest wall to create shadow.
                const pt = ray.cast(wall);
                if (pt) {
                    const dist = p5.Vector.dist(this.pos, pt);                    
                    if (dist < record) {
                        record = dist;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                stroke(255, 50);
                line (this.pos.x, this.pos.y, closest.x, closest.y)
            }            
        }
    } // End of wall function.

    update (x, y) {
        this.pos.set(x, y);
    }  // End of update function.
} // End of particle.