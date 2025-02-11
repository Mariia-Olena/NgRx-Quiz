import { computed, effect } from '@angular/core';
import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialQuizSlice, QuizSlice } from './quiz.slice';
import { addAnswer, resetQuiz } from './quiz.updaters';
import { calculateCorrectAnswers } from './quiz.helpers';

export const QuizStore = signalStore(
  { providedIn: 'root' },
  withState(initialQuizSlice),
  withComputed((store) => {
    const currentQuestionIndex = computed(() => store.answers().length);
    const isDone = computed(() => store.answers().length === store.questions().length);
    const currentQuestion = computed(() => store.questions()[currentQuestionIndex()]);
    const questionsCount = computed(() => store.questions().length);
    const correctCount = computed(() => calculateCorrectAnswers(store.questions(), store.answers()));

    return {
      currentQuestionIndex,
      isDone,
      currentQuestion,
      questionsCount,
      correctCount,
    };
  }),
  withMethods((store) => ({
    addAnswer: (index: number) => patchState(store, addAnswer(index)),
    reset: () => patchState(store, resetQuiz()),
  })),
  withHooks((store) => ({
    onInit: () => {
      const stateFromLS: QuizSlice | '' = JSON.parse(localStorage.getItem('quiz') || '');
      if (stateFromLS) {
        patchState(store, stateFromLS)
      }

      effect(() => {
        const state = getState(store);
        localStorage.setItem('quiz', JSON.stringify(state))
      });
    },
  }))
);
