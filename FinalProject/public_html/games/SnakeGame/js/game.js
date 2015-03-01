/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



init = function()
{
        document.game = new SnakeGame();
        document.game.init(null);

        document.game.canvas = document.getElementById('snake');
        document.game.canvas.focus();

        if (document.game.canvas.getContext)
        {
            document.game.ctx = document.game.canvas.getContext('2d');

        } 
        else 
        {
            return 1;
        }

        document.game.scoreDisplay = document.getElementById("snakeScore");


        document.game.canvas.addEventListener('keydown', function(event)
        {

            var controlScheme = document.getElementById("Absolute");
            
            if(event.keyCode === 37) // left key
            {
                if (controlScheme.checked === true)
                {
                    document.game.goEast();
                }
                else
                {
                    document.game.turnLeft();
                }
                
            }
            
            else if(event.keyCode === 39)// right key
            {
                if (controlScheme.checked === true)
                {
                    document.game.goWest();
                }
                else
                {
                    document.game.turnRight();
                }
                
            }
            
            else if (event.keyCode === 9)// tab key
            {
                setInterval(function(){document.getElementById('snake').focus();}, 1);
            }
            
            else if (event.keyCode === 38)// up key
            {
                if (controlScheme.checked === true)
                {
                    document.game.goNorth();
                }

                event.preventDefault();
                               
            }
            
            else if (event.keyCode === 40)// down key
            {
                if (controlScheme.checked === true)
                {
                    document.game.goSouth();
                }

                event.preventDefault();
                                
            }
            
            else if (event.keyCode === 32)// space key
            {
                event.preventDefault();
            } 
            
        }, false);


        
        


        optionMenu();

                
        return 0;
};



run = function (game, ctx, w, h, timer)
{
    
    game.print(ctx, w, h);
    var runTime = game.update(timer);
    
    if (runTime === false)
    {
        optionMenu();
    }

};


optionMenu = function()
{
    var colourControls = document.getElementById("ColourBoard");
    var speedControls = document.getElementById("SpeedBoard");
    var levelControls = document.getElementById("LevelBoard");
    var controlControls = document.getElementById("ControlBoard");
    var borderControls = document.getElementById("BorderBoard");
    var startButton = document.getElementById("StartButton");
    
    colourControls.style.visibility = "visible";  
    speedControls.style.visibility = "visible";       
    levelControls.style.visibility = "visible";        
    controlControls.style.visibility = "visible";      
    borderControls.style.visibility = "visible";
    startButton.style.visibility = "visible";
       
};



runGame = function()
{
    var slow = document.getElementById("SlowSpeed");
    var medium = document.getElementById("MediumSpeed");
    var fast = document.getElementById("FastSpeed");


    if (slow.checked)
    {
        var timer = setInterval(function(){run(document.game, document.game.ctx, 10, 10, timer);}, slow.value);
    }
    else if (medium.checked)
    {
        var timer = setInterval(function(){run(document.game, document.game.ctx, 10, 10, timer);}, medium.value);
    }
    else if (fast.checked)
    {
        var timer = setInterval(function(){run(document.game, document.game.ctx, 10, 10, timer);}, fast.value);
    }
    
    //optionMenu();
};




startGame = function()
{
    var colourControls = document.getElementById("ColourBoard");
    var speedControls = document.getElementById("SpeedBoard");
    var levelControls = document.getElementById("LevelBoard");
    var controlControls = document.getElementById("ControlBoard");
    var borderControls = document.getElementById("BorderBoard");
    var startButton = document.getElementById("StartButton");

    colourControls.style.visibility = "hidden";  
    speedControls.style.visibility = "hidden";       
    levelControls.style.visibility = "hidden";        
    controlControls.style.visibility = "hidden";      
    borderControls.style.visibility = "hidden";
    startButton.style.visibility = "hidden";

    document.getElementById('snake').focus()

    document.game.init();
    runGame();
};