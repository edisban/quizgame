export const initialState = {
  currentIndex: 0,
  score: 0,
  selected: null,
  answers: [],
  showModal: false,
};

export function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT":
      return { ...state, selected: action.payload };
    case "NEXT":
      return { ...state, currentIndex: state.currentIndex + 1, selected: null };
    case "INCREMENT_SCORE":
      return { ...state, score: state.score + 1 };
    case "ADD_ANSWER":
      return { ...state, answers: [...state.answers, action.payload] };
    case "SHOW_MODAL":
      return { ...state, showModal: true };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
