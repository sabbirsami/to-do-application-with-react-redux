import initialState from "./initialState";
import {
    ADDED,
    ALLCOMPLETED,
    CLEARCOMPLETED,
    COLORSELECTED,
    DELETED,
    TOGGLED,
} from "./actionTypes";

const nextTodoId = (todos) => {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), 0);
    return maxId + 1;
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDED:
            return [
                ...state,
                {
                    id: nextTodoId(state),
                    text: action.payload,
                },
            ];
        case TOGGLED:
            return state.map((todo) => {
                if (todo.id !== action.payload) {
                    return todo;
                } else {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    };
                }
            });
        case COLORSELECTED:
            return state.map((todo) => {
                const { todoId, color } = action.payload;
                if (todo.id !== todoId) {
                    return todo;
                } else {
                    return {
                        ...todo,
                        color: color,
                    };
                }
            });
        case DELETED:
            return state.filter((todo) => todo.id !== action.payload);
        case ALLCOMPLETED:
            return state.map((todo) => {
                return {
                    ...todo,
                    completed: true,
                };
            });
        case CLEARCOMPLETED:
            return state.filter((todo) => !todo.completed);

        default:
            return state;
    }
};

export default reducer;
