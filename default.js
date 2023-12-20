// This is a pong game application that defines the 
// game environment for two users who can 
// independently influence certain 
// elements of the game and get 
// the desired result.
// At the end of the 
// game, the winner 
// will be revealed

// bord
var bord;
var bordWidth = getWidth();
var bordHeight = getHeight() / 2;
var bordColor = Color.gray;
var bordOffset_top = getHeight() / 5;

    // paddles
    var leftPaddle;
    var rigthPaddle;
    var paddleMaxPointY = bordOffset_top + bordHeight - bordHeight / 4 - 5;
    var paddleMinPointY = bordOffset_top + 5;
    var paddleMinPointX = bordWidth;
    var paddleWidth = 8;
    var paddleHeight = bordHeight / 4;
    var paddleColor = Color.black;
    var paddleY = bordOffset_top + (bordHeight / 2) - (paddleHeight / 2);

        //ball setpoint
        var ballSetPoint;
        var ballSetPointRadius = 15;
        var ballSetPointX = bordWidth / 2;
        var ballSetPointY = bordOffset_top + bordHeight / 2 - ballSetPointRadius / 2;
        var ballSetPointColor = Color.yellow;

            //ball 
            var ball;
            var ballRadius = 10;
            var ballX = bordWidth / 2;
            var ballY = bordOffset_top + bordHeight / 2 - ballSetPointRadius / 2;
            var ballColor = Color.black;
            var ballMaxPointY = bordOffset_top + bordHeight;
            var ballMaxPointX = bordWidth;

                // move ball
                var moveing = false;
                var dX;
                var dY;
                
                // base info bord
                var infoBord;
                var infoBordW = getWidth();
                var infoBordH = bordOffset_top;
                var infoBordColor = 'rgb(50, 139, 19)';
                var infoBordX = 0;
                var infoBordY = 0;

                    // pointsLeftRigth
                    var points;
                    var pointSize = 10;
                    var numbPoints = bordHeight / pointSize;
                    var pointsStrtY = bordOffset_top;
                    var pointColor;
                    var pointsX;
                    var pointsY;
                    
                    var pointmaxipointX = bordHeight + bordOffset_top;
                    var line;
                    var lineWidth = 2;

                        // Key variables to display user and data
                        var firstUser;
                        var heandLine;
                        var userInfo;
                        var FIRST_USER_NAME = "User 1";
                        var SECOND_USER_NAME = "User 2";
                        var firstUserPoint = 5;
                        var secondUserPoint = 5;
                        var firstUserWin = 0;
                        var secondUserWin = 0;
                        var firstUserWinInfo;
                        var secondUserWinInfo;
                        var firstUserLose = 0;
                        var secondUserLose = 0;
                        var firstUserLoseInfo;
                        var secondUserLoseInfo;
                        var firstUserPointInfo;
                        var secondUserPointInfo;

                            var winner;
                            var winnerName;
                            var leter;
                            var congrats;
                            var noutes;
                            var winnerColor;
                            var TotalGameNumb = 0;
                            var STARTSTOP = "START";
                            
                            var gameOver = false;
                            var endbord;



// A function starts a program by calling the 
// appropriate functions and specifying parameters
function start() {

      dX = 0;
      dY = 0;


      stopTimer(ballMove);

      keyDownMethod(paddleControls);

      if (moveing) { ballMove(); }

      mouseClickMethod(startStop);

      boardTools();

      checkMatch();

      initializeGameUI();
}


// Draws mostly text data
function addUserInfo(title, font, color, x, y) {
      userInfo = new Text(title, font);
      userInfo.setPosition(x, y);
      userInfo.setColor(color);
      add(userInfo);
      return userInfo;
}

// Draws lines under the username
function usersHeandLine(width, height, x, y, color) {
      heandLine = new Rectangle(width, height);
      heandLine.setPosition(x, y);
      heandLine.setColor(color);
      add(heandLine);
}

// Draws a start to finish button
function startStopBtn() {
     var btn = new Rectangle(100, 40);
      btn.setPosition((bordWidth/2) - 50, bordOffset_top - 45);
      btn.setColor(Color.black);
      add(btn);
}

// Displays basic data on the main dashboard
function initializeGameUI() {
    startStopBtn();
    
          addUserInfo("Total Game Numb", "12pt Arial", Color.yellow, (bordWidth/2) - 60, 20);
          addUserInfo(TotalGameNumb, "10pt Arial", Color.white, (bordWidth/2), 40);
          
              addUserInfo(STARTSTOP, "18pt Arial", Color.white, (bordWidth/2) - 38, bordOffset_top - 18 );
        
                  addUserInfo(FIRST_USER_NAME, "14pt Arial", Color.red, 8, 25);
                  addUserInfo(SECOND_USER_NAME, "14pt Arial", Color.blue, bordWidth - userInfo.getWidth() - 8, 25);
            
                      usersHeandLine(userInfo.getWidth() + 6, 4, 5, 30, Color.red);
                      usersHeandLine(userInfo.getWidth() + 6, 4, getWidth() - userInfo.getWidth() - 10, 30, Color.blue);
                
                          firstUserPointInfo = addUserInfo("Points: " + firstUserPoint, "10pt Arial", Color.white, 10, 50);
                          firstUserWinInfo = addUserInfo("Wins: " + firstUserWin, "10pt Arial", Color.white, 10, 68);
                          firstUserLoseInfo = addUserInfo("Lose: " + firstUserLose, "10pt Arial", Color.white, 10, 85);
                    
                              secondUserPointInfo = addUserInfo("Points: " + secondUserPoint, "10pt Arial", Color.white, getWidth() - userInfo.getWidth() - 15, 50);
                              secondUserWinInfo = addUserInfo("Wins: " + secondUserWin, "10pt Arial", Color.white, getWidth() - userInfo.getWidth() - 6, 68);
                              secondUserLoseInfo = addUserInfo("Lose: " + secondUserLose, "10pt Arial", Color.white, getWidth() - userInfo.getWidth() - 12, 85);
}

// Updates the main data according to the current result
function updateUserInfoText(userInfo, newText) { 
    userInfo.setText(newText); 
}


// Draws a main data dashboard
function drawInfoBord(width, height, x, y, color) {
      infoBord = new Rectangle(width, height);
      infoBord.setPosition(x, y);
      infoBord.setColor(color);
      add(infoBord);
}

// Enables the game to start or end on mouse click
function startStop() {

      var numb = Randomizer.nextInt(1, 2);


      if (numb % 2 === 0) {
            dX = 5;
            dY = 5;
      }
      else {
            dX = -5;
            dY = -5;
      }

      if (endbord) {
            remove(endbord);
            remove(winner);
            remove(leter);
            remove(congrats);
            remove(noutes);
      }

      if (moveing) {
          

            moveing = false;
            stopTimer(ballMove);
      } else {
            moveing = true;
            setTimer(ballMove, 40);
      }
}

// Ensures the movement of the ball after the start of the 
// game until the end of the game, checks the ball for 
// contact with the sides or handles of the main panel 
// and changes the direction of the ball accordingly.
// End the game: click the mouse while the ball is 
// moving or lose the ball to any user
function ballMove() {

      if (ball.getX() + ball.getRadius() >= bordWidth - 5) {
            moveing = false;
            secondUserPoint -= 1;
            updateUserInfoText(secondUserPointInfo, "Points: " + secondUserPoint);
            start();

      }
      else if (ball.getX() - ball.getRadius() <= 5) {
            moveing = false;
            firstUserPoint -= 1;
            updateUserInfoText(firstUserPointInfo, "Points: " + firstUserPoint);
            start();
      }


      if (
            ball.getY() + ball.getRadius() > pointmaxipointX ||
            ball.getY() - ball.getRadius() < bordOffset_top) {
            dY = -dY;
      }

      if (
            ball.getX() + ball.getRadius() > leftPaddle.getX() &&
            ball.getX() - ball.getRadius() < leftPaddle.getX() + paddleWidth &&
            ball.getY() + ball.getRadius() > leftPaddle.getY() &&
            ball.getY() - ball.getRadius() < leftPaddle.getY() + paddleHeight) {
            dX = -dX;
      } else if (
            ball.getX() + ball.getRadius() > rigthPaddle.getX() &&
            ball.getX() - ball.getRadius() < rigthPaddle.getX() + paddleWidth &&
            ball.getY() + ball.getRadius() > rigthPaddle.getY() &&
            ball.getY() - ball.getRadius() < rigthPaddle.getY() + paddleHeight) {
            dX = -dX;
      }


      ball.move(dX, dY);
}


// Checks which user has lost points 
// and updates the result on the main panel
function checkMatch() {

      if (firstUserPoint <= 0) {
            gameOver = true;
            firstUserLose += 1;
            secondUserWin += 1;
            TotalGameNumb +=1;
            updateUserInfoText(secondUserLoseInfo, "Lose: " + secondUserLose);
            updateUserInfoText(firstUserWinInfo, "Wins: " + firstUserWin);
            firstUserPoint = 5;
            secondUserPoint = 5;
            winnerName = SECOND_USER_NAME;
            winnerColor = Color.blue;
            addNote();

      }
      if (secondUserPoint <= 0) {
            gameOver = true;
            secondUserLose += 1;
            firstUserWin += 1;
            TotalGameNumb +=1;
            updateUserInfoText(secondUserLoseInfo, "Lose: " + secondUserLose);
            updateUserInfoText(firstUserWinInfo, "Win: " + firstUserWin);
            firstUserPoint = 5;
            secondUserPoint = 5;
            winnerName = FIRST_USER_NAME;
            winnerColor = Color.red;
            addNote();
      }

}

// Retrieves basic data about users' 
// game results and start and finish
function addNote() {

      endbord = new Rectangle(bordWidth / 2, bordHeight / 2);
      endbord.setPosition((bordWidth / 2) / 2, bordOffset_top + (bordHeight / 2) / 2);
      endbord.setColor(winnerColor);
      add(endbord);

      winner = new Text(winnerName, "14pt Arial");
      winner.setPosition(endbord.getX() + (endbord.getWidth() / 2) - (winner.getWidth() / 2), endbord.getY() + winner.getHeight() + 5);
      winner.setColor(Color.yellow);
      add(winner);

      leter = new Text("You Win", "17pt Arial");
      leter.setPosition(endbord.getX() + (endbord.getWidth() / 2) - (leter.getWidth() / 2), winner.getY() + leter.getHeight() + 5);
      leter.setColor(Color.green);
      add(leter);

      congrats = new Text("Congratulations, it's good", "12pt Arial");
      congrats.setPosition(endbord.getX() + (endbord.getWidth() / 2) - (congrats.getWidth() / 2), leter.getY() + congrats.getHeight() + 5);
      congrats.setColor(Color.white);
      add(congrats);

      noutes = new Text("Click to repeat", "10pt Arial");
      noutes.setPosition(endbord.getX() + (endbord.getWidth() / 2) - (noutes.getWidth() / 2), congrats.getY() + noutes.getHeight() * 2);
      noutes.setColor(Color.black);
      add(noutes);


}

// Controls the ball with the handles
function paddleControls(e) {

      var startY;
      
      // Left paddle controls
      if (e.keyCode == Keyboard.letter('S')) {
            startY = leftPaddle.getY();
            if (startY <= paddleMaxPointY) {
                  leftPaddle.move(0, 5);
            }
      }
      if (e.keyCode == Keyboard.letter('W')) {
            startY = leftPaddle.getY();
            if (startY >= paddleMinPointY) {
                  leftPaddle.move(0, -5);
            }
      }

      // Right paddle controls 
      if (e.keyCode == Keyboard.letter('L')) {
            startY = rigthPaddle.getY();
            if (startY <= paddleMaxPointY) {
                  rigthPaddle.move(0, 5);
            }
      }
      if (e.keyCode == Keyboard.letter('O')) {
            startY = rigthPaddle.getY();
            if (startY >= paddleMinPointY) {
                  rigthPaddle.move(0, -5);
            }
      }

}

// The ball is considered lost even after 
// touching the barriers on the right and left
function drawLeftRightPoints() {

      for (var i = 0; i < (numbPoints * 2); i++) {
            if (i >= numbPoints) {
                  pointsX = bordWidth - 2;
                  pointsStrtY = pointsStrtY;
                  pointColor = Color.blue;
                  pointsY = pointsStrtY + (i - numbPoints) * (pointSize);
            } else {
                  pointColor = Color.red;
                  pointsX = -8
                  pointsY = pointsStrtY + i * (pointSize);
            }

            points = new Rectangle(10, 10);
            points.setPosition(pointsX, pointsY);
            points.setColor(pointColor);
            points.setRotation(45);
            add(points);
      }

}

// Draw the basic tools on the board
function boardTools() {
      drawBord(bordWidth, bordHeight, 0, bordOffset_top, bordColor);
      drawLeftPaddle(paddleWidth, paddleHeight, paddleY, 15, paddleColor);
      drawRigthPaddle(paddleWidth, paddleHeight, paddleY, getWidth() - 15 - paddleWidth, paddleColor);
      drawBallSetPoint(ballSetPointRadius, ballSetPointX, ballSetPointY, ballSetPointColor);

      // Center Line
      drawLine(
            bordWidth / 2,
            bordOffset_top,
            bordWidth / 2,
            bordOffset_top + bordHeight,
            Color.yellow,
            lineWidth
      );
    
          drawBall(ballRadius, ballX, ballY, ballColor);
          drawInfoBord(infoBordW, infoBordH, infoBordX, infoBordY, infoBordColor);
              //drawLeft Right Points                
              drawLeftRightPoints();
        
                  // line Right
                  drawLine(
                        bordWidth - 7,
                        bordOffset_top,
                        bordWidth - 7,
                        bordOffset_top + bordHeight,
                        Color.green,
                        0.5
                  );
                      // line Right
                      drawLine(
                            7,
                            bordOffset_top,
                            7,
                            bordOffset_top + bordHeight,
                            Color.green,
                            0.5
                      );
                          // line top
                          drawLine(
                                0,
                                bordOffset_top,
                                bordWidth,
                                bordOffset_top,
                                Color.black,
                                5
                          );
                              //line bottom
                              drawLine(
                                    0,
                                    bordOffset_top + bordHeight,
                                    bordWidth,
                                    bordOffset_top + bordHeight,
                                    Color.black,
                                    5
                              );
    
}

// Draw a ball
function drawBall(radius, x, y, color) {
      ball = new Circle(radius);
      ball.setPosition(x, y);
      ball.setColor(color);
      add(ball);
}

// Draw the basic position to stop the ball
function drawBallSetPoint(radius, x, y, color) {
      ballSetPoint = new Circle(radius);
      ballSetPoint.setPosition(x, y);
      ballSetPoint.setColor(color);
      add(ballSetPoint);
}

// Draws lines in the center and edges of the panel
function drawLine(x1, y1, x2, y2, color, width) {
      line = new Line(x1, y1, x2, y2);
      line.setColor(color);
      line.setLineWidth(width);
      add(line);
}

// Draws the left handle to catch the ball
function drawLeftPaddle(width, height, y, x, color) {
      leftPaddle = new Rectangle(width, height);
      leftPaddle.setPosition(x, y);
      leftPaddle.setColor(color);
      add(leftPaddle);
}

// Draws the right handle to catch the ball
function drawRigthPaddle(width, height, y, x, color) {
      rigthPaddle = new Rectangle(width, height);
      rigthPaddle.setPosition(x, y);
      rigthPaddle.setColor(color);
      add(rigthPaddle);
}

// Draws the main panel
function drawBord(width, height, x, y, color) {
      bord = new Rectangle(width, height);
      bord.setPosition(x, y);
      bord.setColor(color);
      add(bord);
}