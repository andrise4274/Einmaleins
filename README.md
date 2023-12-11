# Einmaleins

#### Video Demo:  https://youtu.be/VB5PciUeD88
#### Description:
This is a simple browser game to learn the multiplication tables, or "Einmaleins" in German, by heart. It works without backend to be able to run it for free on Github pages. It works with buttons instead of keyboard inputs to make it playable on mobile devices. The code and techniques used are inspired by the two turtorials: [Code a 2D Game Using JavaScript, HTML, and CSS (w/ Free Game Assets) – Tutorial](https://www.youtube.com/watch?v=7BHs1BzA4fs) and [https://www.youtube.com/watch?v=8xPsg6yv7TU](https://www.youtube.com/watch?v=8xPsg6yv7TU).

#### Functionality
The game is a jumping game where a random multiplication (from the multiplication tables) is shown in a non-editable textfield, and the player has 3 possible answers. Either left, middle or right, which can be selected by the 3 buttons at the bottom of the page. The possible answers are displayed 3 rows of 3 clouds each (with possible answers). If the guess is correct, the player jumps on the correct cloud and gets resetted back in the middle. This reset time ensures that the user cannot select all 3 answers without loosing much time. The clouds below get replaced by one cloud where the player stands and a new row of clouds is shown above the 2 remaining rows. The clouds travel down the canvas at a constant speed. If the user is to slow, and the possible answers go out of the window the game is over and the points are displayed.
##### Levels
The difficulty is tuned via the speed the rows of clouds travel down. This is constant throughout the game, only dependent on which level is selected. There are 4 different levels:
- comfortable (default)
- medium
- hard
- super difficult
##### start/reload
The game can be started via the start button, which then gets replaced by a reload button. It reloads the page to start a new game.

## Code
The project has the following files:
- app.js
- data.js
- index.html
- styles.css
- /pictures
- /audio
The pictures and audio folder store the respective image and audio files for a better gaming experience. All html elements are included in index.html and styles.css holds some basic css code, including the default for all images display: none; to ensure that the images are only drawn by the JavaScript code. The main JavaScript code is in app.js which stears the game. In data.js each of the multiplication tables calculations from 1x1 to 10x10 are stored in a multi dimensional array in the following form:
```
[ "1 x 1", [ 0, 1, 3 ], 1 ]
```
where the first element is the string of the multiplication, the second element is an array with the 3 possible answers and the last element is the index with the correct result. These properties are used by app.js to display a multiplication with 3 possible answers and check if the guess from the user was correct.

### app.js
<<<<<<< HEAD
Everything inside app.js is in the **window.addEventListener('load', function() })** function to ensure that everything is fully loaded before starting the game. Some global variables which keep track of the state of the game are initialized. Further the array platforms and bottomLine store the rows of clouds and the lowest single cloud throughout the game. The array indicies is initialized with indicies from 0 to 99 to index into the data array. To choose the next multiplication question, one index of indicies is chosen at random to get the next question from data. If the user guesses a wrong answer, it gets pushed to the indicies array twice, which enhances the probability that this question is chosen again. This helpes the user to practice more of the questions which are still unfamiliar.
=======
Everything inside app.js is in the **window.addEventListener('load', function() })** function to ensure that everything is fully loaded before starting the game. Some global variables which keep track of the state of the game are initialized. Further the array platforms and bottomLine store the rows of clouds and the lowest single cloud throughout the game. The array indicies is initialized with indicies from 0 to 99 to index into the data array. To choose the next multiplication question, one index of indicies is chosen at random to get the next question from data. If the user guesses a wrong answer, it gets pushed to the indicies array, which enhances the probability that this question is chosen again. This helpes the user to practice more of the questions which are still unfamiliar.
>>>>>>> mode_selection

Each class inherits from class Game and has its own update and draw method which are called in Game's draw and update method.
#### event listeners
- the start button sets running = true, hides itself and makes the reload button visible
- the reload button reloads the game
- the select level option sets the speed of the game dependant on the selected level
- each of the buttons on the bottom of the page has a similar event listener:
 -> It checks wheter the player is jumping or resetting:
<<<<<<< HEAD
 -> if not, it stores the guess in a global variable and sets jumping=true. Then it checks wheter the guess was correct or not and sets the global variable correct, if the guess was incorrect the correct variable is also set and the index of the multiplication is pushed twice to indicies.
=======
 -> if not, it stores the guess in a global variable and sets jumping=true. Then it checks wheter the guess was correct or not and sets the global variable correct, if the guess was incorrect the correct variable is also set and the index of the multiplication is pushed to indicies.
>>>>>>> mode_selection

 #### class Platform
It handles a platform of 3 clouds which stand for the 3 possible answers of a multiplication. It draws 3 Images and the 3 possible answers on the same height. This height goes down by Game speed.

#### class Net
It handles the bottom cloud on which the player stands before each jump. It goes down at game speed.

#### class Player
It handles everything with the player as its position and speed. In addition to update() and draw() it has the 6 methods:
- upjump()
- leftjump()
- rightjump()
- falseupjump()
- falseleftjump()
- falserightjump()
which handle the jumping animations. It contains the player image and a right and wrong image.

#### class game
It handles the game and calls the update and draw methods of the other classes. It creates a player and a net as its attributes. It has methods:
- settfMul() -> which displays multiplication on top of the screen.
- initPlatforms() -> initializes the platforms and pushes them into platforms[] array
- createPlatform() -> creates new platform on top of the existing ones and adds it to platforms[] array
- update() -> calls correct jump() method of player, keeps track of game state and checks if game is over. Calls update method of other classes.
- draw() -> class draw methods of other classes.


#### animation
First a new game is initialized and the initPlatforms() of Game is called. When startbutton triggers animate() function the canvas is cleared, the update and draw method is called and with requestAnimationFrame(animate); this is done in an endless loop.
Until the stop button is clicked which triggers cancelAnimationFrame(animate);

