# Math Shooter

[View Live](http://tnharvey.github.io/mathShooter/)

Math Shooter is an interactive game that combines math challenges with engaging gameplay. Players control a spaceship and must answer math problems by shooting the correct answers while avoiding enemies and collecting power-ups. This game is a vibe coding project that I work on periodically in my spare time, started as an experiment to see what I could do via vibe coding and continued out of surprise at how enjoyable it was to code with Gemini. I started this with ChatGPT, then tried it in Claude, but found I tended to get consistent results from Gemini and have stayed there.

## Previous Iterations

In the First Gen folder you can see the earliest version with no spritesheet, no reporting, and just basic gameplay. In the Second Gen folder, you'll see a version with reporting and sprites. I also attempted a version with accounts for parents/teachers and kids using firebase to play with handling account creation and see how Firebase Studio worked. It worked well for a bit but I ran into some errors that Gemini couln't overcome and decided it was too early for account creation anyways. Progress returned to the main game, where I've focused on creating a journey-based approach to the game. After that, versioning was brought over to GitHub and you can see changes via the history of the project.

## Current State
I'm currently working on creating a journey/story based version of the game where the player starts off as a cadet and actually learns about math as they progress. The journey currently starts with Addition as it pertains to early multiplication and then graduates the learner into Multiplication. From there, they progress through various levels, learning how multiplication works and playing simple challenges. I'll eventually expand each level to allow for more practive before progressing.

## Planned Updates

- More time in each challenge for practice and evaluation
- A final stage of multiplication where the learner must complete the entire multiplication table through repeated waves of enemies.
- The legacy version of the game will then be playable to include enemies and I'll begin developing a leaderboard, weapons upgrades, etc.
- Account based version hosted with DB so I can create teacher/parent accounts who create the student accounts and reporting for adults and organziations
- Additional forms of gameplay with levels and games that challenge recognizing factors, breaking numbers down through division, etc.

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
