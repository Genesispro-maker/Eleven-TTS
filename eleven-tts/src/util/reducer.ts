interface StateType {
    state: {
        boost: number,
        stability: number,
    },
    action: | {
        type: "boost",
        value: number,
    } | {
        type: "stability",
        value: number,
    }
}

type params = [state: StateType["state"], action: StateType["action"]]

export function reducer(...[state, action]: params): StateType["state"]{
    switch(action.type){
        case "boost":
            return {
               ...state, boost: action.value
            }
        case "stability":
            return {
                ...state, stability: action.value
            }
        default: 
        return state
    }
}