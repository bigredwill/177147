
Block = require("./block.js")

function Game()
{
    console.log("Game initialized...");
    this.dom = document.getElementById("game")
    this.score = 0;
    this.enabled = true;

    this.blocks = [];
    this.moved = 0;

    // for (var x = 0; x < 8; x++)
    //     for (var y = 0; y < 8; y++)
    //     {
    //         if (x+y == 14) return;
    //         var block = new Block(this);
    //         block.setPos(x, y);
    //         block.setVal((x+1)*(y+1));
    //         this.blocks.push(block);
    //     }

    this.reset();

}

Game.prototype.addScore = function(score)
{
    this.score += score;

    var eles = this.dom.getElementsByClassName("scorenum");
    for (i in eles)
    {
        var scoreDom = eles[i];
        scoreDom.innerHTML = this.score;
    }
}

Game.prototype.gameover = function()
{
    var gameover = this.dom.getElementsByClassName("gameover")[0];
    gameover.style.display = "";
    gameover.style.opacity = "1";
}

Game.prototype.reset = function()
{
    var gameover = this.dom.getElementsByClassName("gameover")[0];
    gameover.style.display = "none";
    gameover.style.opacity = "0";

    // reset score
    this.score = 0;
    var eles = this.dom.getElementsByClassName("scorenum");
    for (i in eles)
    {
        var scoreDom = eles[i];
        scoreDom.innerHTML = this.score;
    }

    this.moved = 0;
    this.enabled = true;

    var clone = this.blocks.slice()
    for (i in clone)
    {
        clone[i].destroy();
    }

    // spawn in a circle, for some reason idk
    var block = new Block(this);
    block.setPos(3, 2);
    this.blocks.push(block);

    var block = new Block(this);
    block.setPos(4, 2);
    this.blocks.push(block);

    var block = new Block(this);
    block.setPos(3, 5);
    this.blocks.push(block);

    var block = new Block(this);
    block.setPos(4, 5);
    this.blocks.push(block);

    var block = new Block(this);
    block.setPos(2, 3);
    this.blocks.push(block);

    var block = new Block(this);
    block.setPos(2, 4);
    this.blocks.push(block);

    var block = new Block(this);
    block.setPos(5, 3);
    this.blocks.push(block);

    var block = new Block(this);
    block.setPos(5, 4);
    this.blocks.push(block);
}

Game.prototype.getScore = function()
{
    return this.score;
}

Game.prototype.getBlocksAt = function(x, y)
{
    var blocks = [];
    for (i in this.blocks)
    {
        var block = this.blocks[i];
        if (block.getX() == x && block.getY() == y)
            blocks.push(block);
    }
    return blocks;
}

// randomly spawn a block in an array of points
Game.prototype.randomSpawn = function(pointArrays)
{
    if (this.blocks.length == 8*8) return;
    if (pointArrays.length == 0) return; // can't spawn if there are no points!

    var randi = Math.floor(Math.random()*pointArrays.length);
    var point = pointArrays[randi];

    var block = new Block(this);
    block.setPos(point.x, point.y);
    this.blocks.push(block);
}

// Perform a line trace from an origin to a goal.
Game.prototype.trace = function(block, xOrigin, yOrigin, xGoal, yGoal)
{
    var xDelta = xGoal - xOrigin;
    var yDelta = yGoal - yOrigin;

    // check for the sign (-/+) of delta
    var xSign = xDelta > 0 ? 1 : (xDelta < 0 ? -1 : 0)
    var ySign = yDelta > 0 ? 1 : (yDelta < 0 ? -1 : 0)

    var xFinal = xOrigin, yFinal = yOrigin;

    // ugly code, but this will allow us to do a `for i` loop
    // from intervals such as 1..9 or 9..1,
    // and 1..1 will give us a single loop.
    for (var xTrace = xOrigin + xSign; (xSign == 0 ? xTrace == xOrigin : (xGoal - xTrace)*xSign >= 0); xTrace += (xSign == 0 ? 1 : xSign))
    {
        for (var yTrace = yOrigin + ySign; (ySign == 0 ? yTrace == yOrigin : (yGoal - yTrace)*ySign >= 0); yTrace += (ySign == 0 ? 1 : ySign))
        {
            var blocksTrace = this.getBlocksAt(xTrace, yTrace);
            if (blocksTrace.length > 0)
            {
                // if there is a block we can merge into
                // ala, it isn't already merged into (length == 1)
                // and it has the same value as us, then merge into that position!
                if (block.getVal() < 256 // alteration to the game.
                    && blocksTrace.length == 1
                    && blocksTrace[0].getVal() == block.getVal())
                { xFinal = xTrace, yFinal = yTrace; }
                // we break the loop if we hit any blocks in the trace.
                return { x: xFinal, y: yFinal };
            }
            xFinal = xTrace, yFinal = yTrace;
        }
    }

    return { x: xFinal, y: yFinal };
}

Game.prototype.moveUp = function()
{
    if (!this.enabled) { return; }

    for (var y = 0; y < 8; y++)
    {
        for (var x = 0; x < 8; x++)
        {
            var blocks = this.getBlocksAt(x, y);
            if (blocks.length > 0 && blocks[0].getVal() < 256)
            {
                var hitPos = this.trace(blocks[0], x, y, x, 0);

                if (hitPos.x != x || hitPos.y != y) this.moved++;

                for (i in blocks)
                {
                    var block = blocks[i];
                    block.setPos(hitPos.x, hitPos.y);
                }
            }
        }
    }
    
    var _this = this;
    this.enabled = false;
    setTimeout(function() {
        _this.enabled = true;
        _this.finalSweep();
    }, 150);
}

Game.prototype.moveDown = function()
{
    if (!this.enabled) { return; }

    for (var y = 7; y >= 0; y--)
    {
        for (var x = 0; x < 8; x++)
        {
            var blocks = this.getBlocksAt(x, y);
            if (blocks.length > 0 && blocks[0].getVal() < 256)
            {
                var hitPos = this.trace(blocks[0], x, y, x, 7);

                if (hitPos.x != x || hitPos.y != y) this.moved++;

                for (i in blocks)
                {
                    var block = blocks[i];
                    block.setPos(hitPos.x, hitPos.y);
                }
            }
        }
    }

    var _this = this;
    this.enabled = false;
    setTimeout(function() {
        _this.enabled = true;
        _this.finalSweep();
    }, 150);
}

Game.prototype.moveLeft = function()
{
    if (!this.enabled) { return; }
    
    for (var x = 0; x < 8; x++)
    {
        for (var y = 0; y < 8; y++)
        {
            var blocks = this.getBlocksAt(x, y);
            if (blocks.length > 0 && blocks[0].getVal() < 256)
            {
                var hitPos = this.trace(blocks[0], x, y, 0, y);

                if (hitPos.x != x || hitPos.y != y) this.moved++;

                for (i in blocks)
                {
                    var block = blocks[i];
                    block.setPos(hitPos.x, hitPos.y);
                }
            }
        }
    }

    var _this = this;
    this.enabled = false;
    setTimeout(function() {
        _this.enabled = true;
        _this.finalSweep();
    }, 150);
}

Game.prototype.moveRight = function()
{
    if (!this.enabled) { return; }
    
    for (var x = 7; x >= 0; x--)
    {
        for (var y = 0; y < 8; y++)
        {
            var blocks = this.getBlocksAt(x, y);
            if (blocks.length > 0 && blocks[0].getVal() < 256)
            {
                var hitPos = this.trace(blocks[0], x, y, 7, y);

                if (hitPos.x != x || hitPos.y != y) this.moved++;

                for (i in blocks)
                {
                    var block = blocks[i];
                    block.setPos(hitPos.x, hitPos.y);
                }
            }
        }
    }

    var _this = this;
    this.enabled = false;
    setTimeout(function() {
        _this.enabled = true;
        _this.finalSweep();
    }, 150);
}

// legacy function
Game.prototype.getFreeSpaces = function()
{
    var freeSpots = [];
    for (var x = 0; x < 8; x++)
    {
        for (var y = 0; y < 8; y++)
        {
            var blocks = this.getBlocksAt(x, y);
            if (blocks.length == 0) freeSpots.push({x: x, y: y});
        }
    }
}

Game.prototype.hasNeighbors = function(x, y)
{
    var block = this.getBlocksAt(x, y)[0];

    if (!block) return true;
    if (block.getVal() == 256) return false;

    var block1 = this.getBlocksAt(x+1, y)[0];
    var block2 = this.getBlocksAt(x-1, y)[0];
    var block3 = this.getBlocksAt(x, y+1)[0];
    var block4 = this.getBlocksAt(x, y-1)[0];

    return (block1 ? block1.getVal() == block.getVal() : false)
        || (block2 ? block2.getVal() == block.getVal() : false)
        || (block3 ? block3.getVal() == block.getVal() : false)
        || (block4 ? block4.getVal() == block.getVal() : false);
}

Game.prototype.isGameOver = function()
{
    for (var x = 0; x < 8; x++)
    {
        for (var y = 0; y < 8; y++)
        {
            if (this.hasNeighbors(x, y)) {
                return false;
            }
        }
    }
    return true;
}

// do a final sweep of the board to clean things up
// and undo merging animations
Game.prototype.finalSweep = function()
{
    for (i in this.blocks) {
        this.blocks[i].unpulse();
    }

    var freeSpots = [];
    for (var x = 0; x < 8; x++)
    {
        for (var y = 0; y < 8; y++)
        {
            var blocks = this.getBlocksAt(x, y);
            if (blocks.length == 0) freeSpots.push({x: x, y: y});
            if (blocks.length > 1)
            {
                for (i in blocks) {
                    var block = blocks[i];
                    if (i == 0)
                    {
                        block.setVal(block.getVal()*2);
                        if (block.getVal() == 256) this.addScore(1);
                    }
                    else
                    {
                        block.destroy();
                    }
                }
            }
        }
    }

    if (this.moved > 0)
        this.randomSpawn(freeSpots);

    if (this.blocks.length == 8*8 || freeSpots.length == 0)
    {
        if (this.isGameOver())
        {
            this.gameover();
        }
    }

    this.moved = 0;
}

module.exports = Game;
