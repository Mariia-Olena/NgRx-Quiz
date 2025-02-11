import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { QuizStore } from '../../store/quiz.store';
import { patchState } from '@ngrx/signals';

@Component({
  selector: 'app-question-presenter',
  imports: [SharedModule],
  templateUrl: './question-presenter.component.html',
  styleUrl: './question-presenter.component.scss',
})
export class QuestionPresenterComponent {
  readonly store = inject(QuizStore);

  readonly question = this.store.currentQuestion;

  onSelect(index: number) {
    this.store.addAnswer(index)
  }
}
