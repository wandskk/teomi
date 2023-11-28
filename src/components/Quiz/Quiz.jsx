import React, { useEffect } from "react";
import { quests } from "@/resources/utils/k10/k10";
import "@/styles/Quiz/Quiz.scss";

const Quiz = ({ result }) => {
  const [questions, setQuestions] = React.useState(quests);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Autoselecionar a opção com ID 3
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].selectedOption = 3;
    setQuestions(updatedQuestions);
  }, [currentQuestionIndex]);

  const handleOptionChange = ({ target }) => {
    const { value } = target;
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].selectedOption = +value;
    setQuestions(updatedQuestions);
  };

  function handleFinishQuiz() {
    const sum = questions
      .map((quest) => quest.selectedOption)
      .reduce((acumulator, item) => acumulator + item, 0);
    result(sum);
  }

  function handleNextClick() {
    if (currentQuestionIndex === questions.length - 1) {
      const sum = questions.reduce(
        (acumulator, item) => acumulator + item.selectedOption,
        0
      );
      result(sum);
    } else if (questions[currentQuestionIndex].selectedOption !== "") {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  return (
    <div className="quiz">
      <h1 className="quiz__title">{currentQuestion.question}</h1>
      <form className="quiz__form">
        <div className="quiz__rainbow"></div>
        <div className="quiz__fields">
          {currentQuestion.options.map((option) => (
            <div key={option.id} className="quiz__field">
              <input
                className="quiz__input"
                type="radio"
                name="option"
                id={option.id}
                value={option.id}
                checked={currentQuestion.selectedOption === +option.id}
                onChange={handleOptionChange}
              />
              <label
                className={`quiz__label ${
                  currentQuestion.selectedOption === +option.id && "--checked"
                }`}
                htmlFor={option.id}
              >
                {option.text}
              </label>
            </div>
          ))}
        </div>
      </form>
      <div className="quiz__footer">
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            className="quiz__action"
            onClick={handleFinishQuiz}
            disabled={currentQuestion.selectedOption === ""}
          >
            Concluir
          </button>
        ) : (
          <button
            className="quiz__action"
            onClick={() => handleNextClick()}
            disabled={currentQuestion.selectedOption === ""}
          >
            Avançar
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
