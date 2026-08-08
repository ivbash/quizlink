import type { EditorQuestion } from '../model/types';
import { uuid } from './uuid';

export function createQuestion(): EditorQuestion {
  return {
    editorId: uuid(),
    text: '',
    time: 0,
    answers: [
      { isCorrect: false, text: '' },
      { isCorrect: false, text: '' },
      { isCorrect: false, text: '' },
      { isCorrect: false, text: '' },
    ],
  };
}
