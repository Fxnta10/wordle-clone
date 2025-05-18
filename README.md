# Wordle Clone

A browser-based **Wordle Clone** built with **Vanilla JavaScript**, **Node.js**, and **Express**. Guess the n-letter word within 6 attempts, with interactive feedback for each guess.


## 🎯 Features
- Random n-letter word generation from an API
- Interactive grid for guessing
- Letter color hints:
  - 🟩 **Green:** Correct letter in the correct position
  - 🟨 **Yellow:** Correct letter in the wrong position
  - ⬜ **Gray:** Incorrect letter
- Restart game or fetch a new word instantly
- Responsive and clean UI

## 🛠️ Technologies Used
- **Frontend:** Vanilla JavaScript, HTML, CSS
- **Backend:** Node.js, Express
- **API:** Random Word API for word fetching


## ⚙️ Installation & Setup
1. **Clone the repository:**
    ```sh
    git clone https://github.com/Fxnta10/wordle-clone.git
    cd wordle-clone
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Run the server:**
    ```sh
    node server.js
    ```

4. Open your browser and visit:
    ```
    http://localhost:3000
    ```

## 📝 How to Play
1. Enter your guess in the grid.
2. Press **Enter** to submit your guess.
3. Color hints will indicate the correctness of your guess:
   - **Green:** Correct letter in the right spot
   - **Yellow:** Correct letter in the wrong spot
   - **Gray:** Letter not in the word
4. You have **6 attempts** to guess the word.
5. Use the **Next Word** button to fetch a new word.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/Fxnta10/wordle-clone/issues).

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Acknowledgments
- [Random Word API](https://random-word-api.herokuapp.com/home) for word generation
- Inspired by the original **Wordle** game.

---

