import {ICategory, IInitialState} from "./interfaces";

export const initialCategory: ICategory = {
    id: undefined,
    name: '',
    user: {
        id: undefined,
        email: ''
    },
    dateCreated: undefined,
    tasks: [],
    userId: undefined

}

export const initialState: IInitialState = {
    isSubmit: undefined,
    currentCategory: initialCategory,
    categories: []
}