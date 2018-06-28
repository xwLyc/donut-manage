const NUMB = 80,
    MAXSPEED = 0.08,
    SIZE = 4,
    WIDTH = 500,
    HEIGHT = 500


const c = document.createElement('canvas'),
    ctx = c.getContext('2d')


c.width = 500
c.height = 500
ctx.translate(WIDTH / 2, HEIGHT / 2)
document.getElementById('wrapper').appendChild(c)


const particles = new Array(NUMB).fill().map((p, i) => {
    return {
        angle: 0,
        speed: i / NUMB * MAXSPEED,
        radius: i / NUMB * Math.max(WIDTH, HEIGHT) / 2,
        colour: `hsl(${i / NUMB * 360}, 80%, 50%)` // Fancy english, eh ?
    }
})


const draw = _ => {
    ctx.globalAlpha = 0.6
    ctx.fillStyle = '#fff'
    ctx.fillRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT)

    for (let p of particles) {
        p.angle += p.speed
        ctx.beginPath()
        ctx.arc(p.radius * Math.cos(p.angle), p.radius * Math.sin(p.angle), SIZE, 0, 2 * Math.PI)
        ctx.fillStyle = p.colour
        ctx.fill()
    }

    requestAnimationFrame(draw)
}


requestAnimationFrame(draw)