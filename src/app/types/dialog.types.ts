export type TQuestionTypes = {
  label: string;
  value: string;
};

export type TQuestion = {
  id: string;
  question: string;
  answer: string[];
  answerType: string;
};

export type TMyAnswer = {
  id: string;
  question: string;
  answerType: string;
  my_answer: {
    text?: string;
    checkboxes?: any[];
  };
};
