// Use dynamic import for inquirer
import("inquirer").then((inquirer) => {
    const fs = require("fs");
    const { Triangle, Circle, Square } = require("./lib/shapes");
// implements inquirer to prompt user with questions 
    async function getUserInput() {
        const userInput = await inquirer.default.prompt([
            {
                type: "input",
                name: "text",
                message: "Enter up to three characters:",
                validate: (input) => input.length <= 3,
            },
            {
                type: "input",
                name: "textColor",
                message: "Enter text color (color keyword or hexadecimal):",
            },
            {
                type: "list",
                name: "shape",
                message: "Choose a shape:",
                choices: ["circle", "triangle", "square"],
            },
            {
                type: "input",
                name: "shapeColor",
                message: "Enter shape color (color keyword or hexadecimal):",
            },
        ]);

        const shape =
            userInput.shape === "circle"
                ? new Circle()
                : userInput.shape === "triangle"
                ? new Triangle()
                : new Square();

        shape.setColor(userInput.shapeColor);
// svg file size 
        const svg = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                        ${shape.render()}
                        <text x="50%" y="50%" font-size="60" fill="${userInput.textColor}" dominant-baseline="middle" text-anchor="middle">${userInput.text}</text>
                    </svg>`;
// creates file type svg 
        fs.writeFileSync("logo.svg", svg);
        console.log("Generated logo.svg");
    }

    getUserInput();
});
