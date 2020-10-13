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
        case ListReducerTypes.getRankedList:
            break;
        case ListReducerTypes.updateTitle:
            break;
        case ListReducerTypes.updatePrivate:
            break;
        case ListReducerTypes.updateItem:
            break;
        case ListReducerTypes.reOrderList:
            break;
        case ListReducerTypes.createItem:
            break;
        case ListReducerTypes.deleteItem:
            break;
    }
}
