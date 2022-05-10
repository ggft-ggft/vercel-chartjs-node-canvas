import { fabric } from 'fabric';
import canvasDimensions from "../mbres/constants/dimensions";
import generatoreService from "../mbres/utils/utils";

module.exports = async (req, res) => {
    //res.status(200).json({ name: 'John Doe' })
    const payload = req.body;
    fabric.nodeCanvas.registerFont('./fonts/NotoSansJP-Black.otf', {
        family: 'NotoSansJP-Black'
    });

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

    var stream = canvas.createPNGStream();

    stream.on('data', function (chunk) {
        res.write(chunk);
    });
    stream.on('end', function () {
        res.end();
    });

}

