import { fabric } from 'fabric';
import canvasDimensions from "../mbres/constants/dimensions";
import generatoreService from "../mbres/utils/utils";

module.exports = async (req, res) => {
    //res.status(200).json({ name: 'John Doe' })

    if (req.method !== 'POST') {
        return res.status(500).json({ error: 'NOT ALLOWED' })
    }
    const payload = req.body;

    //importazione font custom
    fabric.nodeCanvas.registerFont("./fonts/LibreBaskerville-Regular.ttf", {
        family: "LibreBaskerville",
        weight: "regular",
        style: "normal",
    });
    fabric.nodeCanvas.registerFont("./fonts/LibreBaskerville-Bold.ttf", {
        family: "LibreBaskerville",
        weight: "bold",
        style: "normal",
    });
    fabric.nodeCanvas.registerFont("./fonts/LibreBaskerville-Italic.ttf", {
        family: "LibreBaskerville",
        weight: "regular",
        style: "italic",
    });

    var canvas = new fabric.StaticCanvas(null, { width: canvasDimensions.canvasWidth, height: canvasDimensions.canvasHeight });

    try {
        generatoreService.generateBackground(payload.tipologie, canvas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errore: "generate bottom" });
    }
    try {
        generatoreService.generateBottom(payload.anno, canvas, payload.tipologie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errore: "generate bottom" });
    }

    try {
        generatoreService.generateLogo(canvas, payload.tipologie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errore: "generate logo" });
    }

    try {
        generatoreService.generateTitle(payload.titolo, canvas, payload.tipologie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errore: "generate title" });
    }

    canvas.renderAll();
    var stream = canvas.createPNGStream();
    
    res.writeHead(200, {
        "Content-Type": "image/png"
    });
    
    stream.on('data', function (chunk) {
        res.write(chunk);
    });
    stream.on('end', function () {
        res.end();
    });

}

