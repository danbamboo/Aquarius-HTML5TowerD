/**
* Copies the x, y and diameter properties from any given object to this Line.
* @method Phaser.Line#copyFrom
* @param {any} source - The object to copy from.
* @return {Line} This Line object.
*/
var CopyFrom = function (source, dest)
{
    return dest.setTo(source.x1, source.y1, source.x2, source.y2);
};

module.exports = CopyFrom;
