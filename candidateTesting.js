
let candidateName = "";
// TODO 1.2a: Define question, correctAnswer, and candidateAnswer //
let question = "Who was the first American woman in space? ";
let correctAnswer = "Sally Ride";
let candidateAnswer = "";
let questions = ["Who was the first American woman in space? " ,"True or false: 5 kilometer == 5000 meters? " ,"(5 + 3)/2 * 10 = ? " ,"Given the array [8, 'Orbit', 'Trajectory', 45], what entry is at index 2? " ,"What is the minimum crew size for the ISS? "];
let correctAnswers = ["Sally Ride", "true", "40", "Trajectory", "3"];
let candidateAnswers= [];
let result = "";
let position = [1, 2, 3, 4, 5];

 

function askForName() {
  // TODO 1.1b: Ask for candidate's name //
candidateName = input.question("Candidate Name: ");
return candidateName;
}

function askQuestion() {
  // TODO 1.2b: Ask candidate the question and assign the response as candidateAnswer //
  for (i = 0; i < questions.length; i++) {
    candidateAnswers[i] = input.question(position[i] + ") " + questions[i]);
    candidateAnswers.push(candidateAnswers);
    console.log(`Your Answer: ${candidateAnswers[i]}`);
    console.log(`Correct Answer: ${correctAnswers[i]} \n`);
  } 

}

function gradeQuiz(candidateAnswers) {

  // TODO 1.2c: Let the candidate know if they have answered the question correctly or incorrectly // 
 let total = 0;

 for (i = 0; i < correctAnswers.length; i++) {
   if (correctAnswers[i].toLowerCase() === candidateAnswers[i].toLowerCase()) {
    total++;
   } 
  }
  let grade = 0;
  grade = (total / questions.length) * 100;
  if (grade >= 80 ) {
    result = "PASSED";
   } else {
    result = "FAILED";
  } 
  console.log(`>>> Overall Grade: ${grade}% (${total} of ${questions.length} responses correct) <<<`);
  console.log(`>>> Status: ${result} <<<`);

  return grade;
}

function runProgram() {
  askForName();
  // TODO 1.1c: Ask for candidate's name //
  askQuestion();
  gradeQuiz(candidateAnswers[i]);
}

runProgram();

