function Time() { this.init_time = (new Date).getTime(); this.last_update = 0; this.waiting = false }
Time.prototype.get_ticks = function () { return (new Date).getTime() - this.init_time };
Time.prototype.wait = function (a) { this.waiting = true; var b = this; setTimeout(function () { b.waiting = false }, a) };
Time.prototype.tick = function () { var a = (new Date).getTime(), b = a - this.last_update; this.last_update = a; return b };
Time.prototype.fps = function (a) { this.wait(1E3 / a) }; Time.prototype.lock = function () { this.waiting = true };
Time.prototype.unlock = function () { this.waiting = false };
function JsGame() { }
JsGame.prototype = new Time; JsGame.prototype.running = false; JsGame.prototype.interval = null;
JsGame.prototype.loop = function (a) { if (!this.running) { this.running = true; var b = this; this.interval = setInterval(function () { b.waiting || a && a() }, 0) } };
JsGame.prototype.stop = function () { clearInterval(this.interval); this.running = false };
JsGame.prototype.is_ready = function (a) { this.waiting = true; var b = this, c = setInterval(function () { if (a) if (a()) { clearInterval(c); b.waiting = false } }, 300) };
function Surface() {
    switch (arguments.length) {
        case 1:
            if (arguments[0] instanceof HTMLCanvasElement) {
                this.canvas = arguments[0]; this.width = this.canvas.width;
                this.height = this.canvas.height; this.ctx = this.canvas.getContext("2d")
            }
            if (arguments[0] instanceof HTMLImageElement) {
                this.width = arguments[0].width; this.height = arguments[0].height; this.canvas = document.createElement("canvas");
                this.canvas.width = this.width; this.canvas.height = this.height;
                this.ctx = this.canvas.getContext("2d"); this.ctx.drawImage(arguments[0], 0, 0, this.width, this.height)
            } break;
        case 2:
            this.width = arguments[0]; this.height = arguments[1];
            this.canvas = document.createElement("canvas");
            this.canvas.width = this.width; this.canvas.height = this.height;
            this.ctx = this.canvas.getContext("2d"); break;
        case 3:
            this.width = arguments[0]; this.height = arguments[1];
            this.canvas = document.createElement("canvas");
            this.canvas.width = this.width; this.canvas.height = this.height;
            this.ctx = this.canvas.getContext("2d"); this.fill(arguments[2])
    }
}
Surface.prototype.clear = function () { this.ctx.clearRect(0, 0, this.width, this.height) };
Surface.prototype.draw = function (a, b, c) { this.ctx.drawImage(a.canvas, b, c) };
Surface.prototype.get_pixel = function (a, b) { var c = this.ctx.getImageData(0, 0, this.width, this.height).data, d = (b * this.width + a) * 4; return [c[d + 0], c[d + 1], c[d + 2], c[d + 3]] };
Surface.prototype.set_pixel = function (a, b, c) { var d = this.ctx.getImageData(0, 0, this.width, this.height).data; a = (b * this.width + a) * 4; d[a + 0] = c[0]; d[a + 1] = c[1]; d[a + 2] = c[2]; d[a + 3] = c[3] };
Surface.prototype.clone = function () { var a = new Surface(this.width, this.height); a.ctx.drawImage(this.canvas, 0, 0); return a };
Surface.prototype.subsurface = function (a, b, c, d) { var e = new Surface(c, d); e.ctx.drawImage(this.canvas, a, b, c, d, 0, 0, c, d); return e };
Surface.prototype.save = function () { this.ctx.save() }; Surface.prototype.scale = function (a, b) { this.ctx.scale(a, b) };
Surface.prototype.translate = function (a, b) { this.ctx.translate(a, b) }; Surface.prototype.restore = function () { this.ctx.restore() };
Surface.prototype.strokeStyle = function (a) { this.ctx.strokeStyle = a }; Surface.prototype.beginPath = function () { this.ctx.beginPath() };
Surface.prototype.line = function (a, b, c, d) { this.ctx.moveTo(a, b); this.ctx.lineTo(c, d) };
Surface.prototype.stroke = function () { this.ctx.stroke() };
Surface.prototype.fill = function (a) { this.ctx.fillStyle = a; this.ctx.fillRect(0, 0, this.width, this.height) };
Surface.prototype.fillRect = function (a, b, c, d, e) { this.ctx.fillStyle = e; this.ctx.fillRect(a, b, c, d) };
Display = { attach: function (a) { return new Surface(a) } };
function Font() { this.name = "sans-serif"; this.italic = this.bold = false; this.textBaseline = "top"; this.textAlign = "start" }
Font.prototype.render = function (a, b, c, d) {
    var e = 10; if (b) e = b; if (e < 10) e = 10; b = "black"; if (c) b = c; c = "white"; if (d) c = d;
    var h = e * a.length * 3, f = e * 2; d = new Surface(h, f, "white");
    var i = d.ctx; i.fillStyle = "black"; i.textBaseline = this.textBaseline; i.textAlign = this.textAlign; var g = "";
    if (this.bold) g += "bold "; if (this.italic) g += "italic "; g = g + e.toString() + "px " + this.name; i.font = g; i.fillText(a, 0, 0); f = d.ctx.getImageData(0, 0, h, f); h = 0; g = 1E4;
    for (var l = 0, k = 0; k < f.height; k++)
        for (var j = 0; j < f.width; j++)
            if (f.data[(k * f.width + j) * 4] < 255) {
                h = Math.max(h, j); g = Math.min(g, j); l = Math.max(l, k)
            }
    d.clear(); d.fill(c); i.fillStyle = b; i.fillText(a, 0, 0); f = Math.max(l + 1, e);
    a = new Surface(h - g + 1, f, c);
    a.ctx.drawImage(d.canvas, g, 0, h, f, 0, 0, h - g, f);
    return a
};
