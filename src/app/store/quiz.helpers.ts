import { Question } from "../models/question.model";

export function calculateCorrectAnswers(questions: Question[], answers: number[]): number {
  return answers.filter((answer, index) => answer === questions[index].correctIndex).length
}