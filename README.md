# Math Shooter

Math Shooter is an interactive game that combines math challenges with engaging gameplay. Players control a spaceship and must answer math problems by shooting the correct answers while avoiding enemies and collecting power-ups.

## Project Structure

The project is organized as follows:

```
math-shooter
├── src
│   ├── index.html        # Main HTML structure of the application
│   ├── styles.css        # Styles for the application
│   ├── main.js           # Entry point for the JavaScript application
│   ├── game              # Game logic and mechanics
│   │   ├── gameState.js  # Manages game states
│   │   ├── gameLoop.js   # Contains the game loop logic
│   │   ├── spaceship.js   # Defines the spaceship object
│   │   ├── enemies.js     # Manages enemy behavior
│   │   ├── answers.js      # Handles answer generation and management
│   │   ├── powerups.js     # Manages power-up objects
│   │   ├── particles.js     # Handles particle effects
│   │   └── stars.js        # Manages background stars
│   ├── ui                # User interface components
│   │   ├── menu.js       # Manages the main menu UI
│   │   ├── levelSelect.js # Manages the level selection UI
│   │   ├── screens.js     # Handles different screens in the game
│   │   └── events.js      # Manages event listeners for user interactions
│   └── assets            # Directory for game assets (images, sounds, etc.)
└── README.md             # Documentation for the project
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd math-shooter
   ```

3. Open `src/index.html` in a web browser to play the game.

## Gameplay

- Control the spaceship using the arrow keys or mouse.
- Shoot the correct answers to math problems that fall from the top of the screen.
- Avoid enemy attacks and collect power-ups to enhance your abilities.
- Aim for the highest score by answering correctly and defeating enemies.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.