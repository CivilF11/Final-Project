/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function SnakeGame ()
{
    this.init = function ()
    {
        var width = 500 / 10;
        var height = 500 / 10;

        this.board = new Array(height);

        for (var x = 0; x < height; x++)
        {
            this.board[x] = new Array(width);                       
        }



        this.snake = new Array(1000);

        for (var x = 0; x < 1000; x++)
        {
            this.snake[x] = new Array(2);
        }

        this.snake[0][0] = 23;
        this.snake[0][1] = 25;

        this.snake[1][0] = 24;
        this.snake[1][1] = 25;

        this.snake[2][0] = 25;
        this.snake[2][1] = 25;

        this.snake[3][0] = 26;
        this.snake[3][1] = 25;

        this.snake[4][0] = 27;
        this.snake[4][1] = 25;


        this.board[this.snake[0][0]][this.snake[0][1]] = 1;
        this.board[this.snake[1][0]][this.snake[1][1]] = 1;
        this.board[this.snake[2][0]][this.snake[2][1]] = 1;
        this.board[this.snake[3][0]][this.snake[3][1]] = 1;
        this.board[this.snake[4][0]][this.snake[4][1]] = 1;


        this.food = new Array(6);

        for (var x = 0; x < this.food.length; x++)
        {
            this.food[x] = new Array(2);
        }


        for (var food = 0; food < this.food.length; food++)
        {
            var x = Math.floor(Math.random() * 49) + 0;
            var y = Math.floor(Math.random() * 49) + 0;

            this.food[food][0] = x;
            this.food[food][1] = y;

            this.board[this.food[food][0]][this.food[food][1]] = 2;                     


        }


        this.snakeLength = 5;
        this.score = 0;
        this.direction = "N";

        this.sectionsToAdd = 0;
    };



    this.goNorth = function()
    {
        this.direction = "N";
    };
    
    this.goEast = function()
    {
        this.direction = "E";
    };
    
    this.goSouth = function()
    {
        this.direction = "S";
    };
    
    this.goWest = function()
    {
        this.direction = "W";
    };





    this.turnLeft = function()
    {

        if (this.direction === "N")
        {
            this.direction = "E";
        }
        else if (this.direction === "E")
        {
            this.direction = "S";
        }
        else if (this.direction === "S")
        {
            this.direction = "W";
        }
        else if (this.direction === "W")
        {
            this.direction = "N";
        }

    };



    this.turnRight = function()
    {

        if (this.direction === "N")
        {
            this.direction = "W";
        }
        else if (this.direction === "E")
        {
            this.direction = "N";
        }
        else if (this.direction === "S")
        {
            this.direction = "E";
        }
        else if (this.direction === "W")
        {
            this.direction = "S";
        }
    };



    this.update = function(timer)
    {
        if (this.sectionsToAdd > 0)
        {                                   

            for (var thisSection = this.snakeLength - 1; thisSection > -1; thisSection -= 1)
            {
                this.snake[thisSection + 1][0] = this.snake[thisSection][0];
                this.snake[thisSection + 1][1] = this.snake[thisSection][1];     

            }

            this.sectionsToAdd -= 1;
            this.snakeLength += 1;
        }
        else
        {
            this.board[this.snake[this.snakeLength - 1][0]][this.snake[this.snakeLength - 1][1]] = 0;

            for (var thisSection = this.snakeLength - 1; thisSection > 0; thisSection -= 1)
            {
                this.snake[thisSection][0] = this.snake[thisSection - 1][0];
                this.snake[thisSection][1] = this.snake[thisSection - 1][1];
            }
        }



        if (this.direction === "N")
        {
            this.snake[0][0] -= 1;
        }
        else if (this.direction === "E")
        {
            this.snake[0][1] -= 1;
        }
        else if (this.direction === "S")
        {
            this.snake[0][0] += 1;
        }
        else if (this.direction === "W")
        {
            this.snake[0][1] += 1;
        }
        
        var borders = document.getElementById("Infinite");
        
        if (borders.checked === true)
        {
            // infinite grid
            if (this.snake[0][0] === -1) //north side
            {
                this.snake[0][0] = 49;
            }
            else if (this.snake[0][1] === -1) //east side
            {
                this.snake[0][1] = 49;
            }
            else if (this.snake[0][0] === 50) //south side
            {
               this.snake[0][0] = 0;
            }
            else if (this.snake[0][1] === 50) //west side
            {
                this.snake[0][1] = 0;
            }
        }
        else
        {
            // closed grid
            if (this.snake[0][0] >= 50 || this.snake[0][0] < 0) //north & south side
            {
                clearInterval(timer);
                return false;
            }
            else if (this.snake[0][1] >= 50 || this.snake[0][1] < 0) //east & west side
            {
                clearInterval(timer);
                return false;
            }
        }


        


        if (this.board[this.snake[0][0]][this.snake[0][1]] === 2)
        {
            for (var x = 0; x < this.food.length; x++)
            {
                if (this.food[x][0] === this.snake[0][0] && this.food[x][1] === this.snake[0][1])
                {
                    this.food[x][0] = Math.floor(Math.random() * 49) + 0;
                    this.food[x][1] = Math.floor(Math.random() * 49) + 0;

                    if (this.board[this.food[x][0]][this.food[x][1]] === 1 || this.board[this.food[x][0]][this.food[x][1]] === 2)
                    {
                        x--;
                    }
                    else
                    {
                        this.board[this.food[x][0]][this.food[x][1]] = 2;
                    }
                }
            }

            this.sectionsToAdd += 3;
            this.score++;
        }
        else if (this.board[this.snake[0][0]][this.snake[0][1]] === 1)
        {
            clearInterval(timer);
            return false;
        }

        this.board[this.snake[0][0]][this.snake[0][1]] = 1;                   

        return true;
    };



    this.print = function(ctx,w,h)
    {
        var snakeColour = document.getElementById("SnakeColour");
        var backgroundColour = document.getElementById("BackgroundColour");
        var foodColour = document.getElementById("FoodColour");
                
        for (var x = 0; x < this.board.length; x++)
        {
            for (var y = 0; y < this.board[x].length; y++)
            {

                if (this.board[x][y] === 1)
                {
                    //ctx.fillStyle = "black";
                    ctx.fillStyle = snakeColour.value;
                }
                else if (this.board[x][y] === 2)
                {
                    //ctx.fillStyle = "green";
                    ctx.fillStyle = foodColour.value;
                }
                else
                {
                    //ctx.fillStyle = "white";
                    ctx.fillStyle = backgroundColour.value;
                }




                ctx.fillRect(y*h,x*w,h,w);
            }
        }

        this.scoreDisplay.innerHTML = this.score;
    };



    this.start = function(ctx,w,h)
    {
        for (var t = 0; t < this.turns; t++)
        {
            this.print(ctx,w,h);
        }
    };

}




        
        
        
        

        
