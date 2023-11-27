const options = [
  { id: "1", text: "Tempo nenhum", value: 1 },
  { id: "2", text: "Um pouco do tempo", value: 2 },
  { id: "3", text: "Algumas vezes", value: 3 },
  { id: "4", text: "A maior parte do tempo", value: 4 },
  { id: "5", text: "Todo o tempo", value: 5 },
];

export const quests = [
  {
    id: 1,
    question: "Com que frequência você se sentiu cansado sem um bom motivo?",
    options,
    selectedOption: "3",
  },
  {
    id: 2,
    question: "Com que frequência você se sentiu nervoso?",
    options,
    selectedOption: "3",
  },
  {
    id: 3,
    question:
      "Com que frequência você se sentiu tão nervoso que nada poderia acalmá-lo?",
    options,
    selectedOption: "3",
  },
  {
    id: 4,
    question: "Com que frequência você se sentiu sem esperança?",
    options,
    selectedOption: "3",
  },
  {
    id: 5,
    question: "Com que frequência você se sentiu inquieto ou inquieto?",
    options,
    selectedOption: "3",
  },
  {
    id: 6,
    question:
      "Com que frequência você se sentiu tão inquieto que não conseguia ficar parado?",
    options,
    selectedOption: "3",
  },
  {
    id: 7,
    question: "Com que frequência você se sentiu deprimido?",
    options,
    selectedOption: "3",
  },
  {
    id: 8,
    question: "Com que frequência você sentiu que tudo é um esforço?",
    options,
    selectedOption: "3",
  },
  {
    id: 9,
    question:
      "Com que frequência você se sentiu tão triste que nada poderia animá-lo?",
    options,
    selectedOption: "3",
  },
  {
    id: 10,
    question: "Com que frequência você se sentiu inútil?",
    options,
    selectedOption: "3",
  },
];

export function baseResult(value) {
  if (value >= 10 && value <= 15) return "Baixo";
  if (value >= 16 && value <= 21) return "Moderado";
  if (value >= 22 && value <= 29) return "Alto";
  if (value >= 30 && value <= 50) return "Muito alto";
  return "Valor inválido";
}
