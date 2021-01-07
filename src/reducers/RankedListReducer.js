const clone = require("rfdc")();

export const ListReducerTypes = {
    getRankedList: "GET_R_LIST",
    updateTitle: "UPDATE_TITLE",
    updatePrivate: "UPDATE_PRIVATE",
    updateItem: "UPDATE_ITEM",
    reOrderList: "RE_ORDER",
    createItem: "CREATE_ITEM",
    deleteItem: "DELETE_ITEM",
};

export function initRankedList() {
    return {
        private: false,
        rankItems: [],
        title: "Edit Title",
    };
}

export function createRankedItem(
    ranking = 1,
    itemName = "",
    description = "",
    picture = "",
    listTitle = "",
    priv = false
) {
    return {
        new: true,
        ranking: ranking,
        itemName: itemName,
        description: description,
        picture: picture,
        listTitle: listTitle,
        private: priv,
        itemId: Math.floor(Math.random() * 999999999 + 1),
    };
}

function reOrder(arr, startIndex, endIndex) {
    const result = Array.from(arr);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

function updateParentProperties(state) {
    for (let i = 0; i < state.rankItems.length; i++) {
        state.rankItems[i].private = state.private;
        state.rankItems[i].listTitle = state.title;
    }
}

export function rankedListReducer(state, action) {
    let stateCopy = {};
    let p = {};
    switch (action.type) {
        //{isNew: bool, rankedList: object}
        case ListReducerTypes.getRankedList:
            return action.payload.isNew
                ? { ...state, ...initRankedList() }
                : { ...state, ...clone(action.payload.rankedList) };
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
            p = action.payload;
            stateCopy = clone(state);
            stateCopy.rankItems[p.index].itemName = p.itemName;
            stateCopy.rankItems[p.index].description = p.description;
            stateCopy.rankItems[p.index].picture = p.picture;
            updateParentProperties(stateCopy);
            return stateCopy;
        // {startIndex: number, endIndex: number}
        case ListReducerTypes.reOrderList:
            stateCopy = clone(state);
            stateCopy.rankItems = reOrder(
                clone(stateCopy.rankItems),
                action.payload.startIndex,
                action.payload.endIndex
            );

            for (let i = 0; i < stateCopy.rankItems.length; i++) {
                stateCopy.rankItems[i].ranking = i + 1;
            }
            updateParentProperties(stateCopy);
            return stateCopy;
        //{itemName: string, description: string, picture: string}
        case ListReducerTypes.createItem:
            p = action.payload;
            stateCopy = clone(state);
            stateCopy.rankItems.push(
                createRankedItem(
                    stateCopy.rankItems.length + 1,
                    p.itemName,
                    p.description,
                    p.picture,
                    stateCopy.title,
                    stateCopy.private
                )
            );
            updateParentProperties(stateCopy);
            return stateCopy;
        //{index: number}
        case ListReducerTypes.deleteItem:
            stateCopy = clone(state);
            stateCopy.rankItems.splice(action.payload.index, 1);
            for (let i = 0; i < stateCopy.rankItems.length; i++) {
                stateCopy.rankItems[i].ranking = i + 1;
            }
            updateParentProperties(stateCopy);
            return stateCopy;
        default:
            return state;
    }
}
