const clone = require("rfdc")();

export const ListReducerTypes = {
    getRankedList: "GET_R_LIST",
    updateTitle: "UPDATE_TITLE",
    updatePrivate: "UPDATE_PRIVATE",
    updateItem: "UPDATE_ITEM",
    reOrderList: "RE_ORDER",
    createItem: "CREATE_ITEM",
    deleteItem: "DELETE_ITEM"
};

export function initRankedList() {
    return {
        private: false,
        "rank_list": [],
        title: ""
    };
}

export function createRankedItem(rank = 1, itemName = "", description = "", picture = "", parentTitle = "", private = false) {
    return {
        rank: rank,
        "item_name": itemName,
        description: description,
        picture: picture,
        "parent_title": parentTitle,
        private: private
    };
}

function reOrder(arr, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function updateParentProperties(state) {
    for (let i = 0; i < state["rank_list"].length; i++) {
        state["rank_list"][i].private = state.private;
        state["rank_list"][i]["parent_title"] = state.title;
    }
}

export function rankedListReducer(state, action) {
    let stateCopy = {}

    switch (action.type) {
        //{isNew: bool, rankedList: object}
        case ListReducerTypes.getRankedList:
            return action.payload.isNew ? { ...state, ...initRankedList() } : { ...state, clone(rankedList) };
        //{title: string}
        case ListReducerTypes.updateTitle:
            stateCopy = clone(state);
            stateCopy.title = action.payload.title;
            updateParentProperties(stateCopy);
            return stateCopy;
        //{private: bool}
        case ListReducerTypes.updatePrivate:
            stateCopy = clone(state);
            stateCopy.private = action.payload.private;
            updateParentProperties(stateCopy);
            return stateCopy;
        //{index: number, itemName: string, description: string, picture: string}
        case ListReducerTypes.updateItem:
            const p = action.payload;
            stateCopy = clone(state);
            stateCopy["rank_list"][p.index]["item_name"] = p.itemName;
            stateCopy["rank_list"][p.index]["description"] = p.description;
            stateCopy["rank_list"][p.index]["picture"] = p.picture;
            updateParentProperties(stateCopy);
            return stateCopy;
        //{startIndex: number, endIndex: number}
        case ListReducerTypes.reOrderList:
            stateCopy = clone(state);
            stateCopy["rank_list"] = reOrder(stateCopy["rank_list"], action.payload.startIndex, action.payload.endIndex);
            for (let i = 0; i < stateCopy["rank_list"].length; i++) {
                stateCopy["rank_list"][i].rank = i + 1;
            }
            updateParentProperties(stateCopy);
            return stateCopy;
        //{itemName: string, description: string, picture: string}
        case ListReducerTypes.createItem:
            const p = action.payload;
            stateCopy = clone(state);
            stateCopy["rank_list"].push(createRankedItem(stateCopy["rank_list"].length + 1, p.itemName, p.description, p.picture, stateCopy.title, stateCopy.private));
            updateParentProperties(stateCopy);
            return stateCopy;
        //{index: number}
        case ListReducerTypes.deleteItem:
            stateCopy = clone(state);
            stateCopy["rank_list"].splice(action.payload.index, 1);
            for (let i = 0; i < stateCopy["rank_list"].length; i++) {
                stateCopy["rank_list"][i].rank = i + 1;
            }
            updateParentProperties(stateCopy);
            return stateCopy;
        default:
            return state;
    }
}
