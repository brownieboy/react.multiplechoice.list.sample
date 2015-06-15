var React = require('react');
// var AnswerMultipleChoiceQuestion = require("./AnswerMultipleChoiceQuestion.jsx");

var AnswerMultipleChoiceQuestion = React.createFactory(require("./AnswerMultipleChoiceQuestion.jsx"));

var arrayOfChoices = ["one", "two", "three"];


 
// React.render(<AnswerMultipleChoiceQuestion choices={arrayOfChoices} />,  document.getElementById("main"));
React.render(<AnswerMultipleChoiceQuestion choices={arrayOfChoices} />,  document.getElementById("main"));