const clone = require("rfdc")();

export const UserReducerTypes = {
    getUserAction: "GET_USER_ACTION",
    updateBioAction: "UPDATE_BIO_ACTION",
    updateProfilePicAction: "UPDATE_PROFILE_PIC_ACTION",
    followUserAction: "FOLLOW_USER_ACTION",
    likeListAction: "LIKE_LIST_ACTION",
    likeCommentAction: "LIKE_COMMENT_ACTION",
};

export function userReducer(state, action) {
    var stateCopy = {};
    var targetId = {};
    var i = 0;
    switch (action.type) {
        //{user: object}
        case UserReducerTypes.getUserAction:
            return { ...state, ...clone(action.payload.user) };
        //{bio: string}
        case UserReducerTypes.updateBioAction:
            stateCopy = clone(state);
            stateCopy.bio = action.payload.bio;
            return stateCopy;
        //{profPic: string}
        case UserReducerTypes.updateProfilePicAction:
            stateCopy = clone(state);
            stateCopy.profilePic = action.payload.profPic;
            return stateCopy;
        //{hasFollowed: bool, targetId: objectId}
        case UserReducerTypes.followUserAction:
            stateCopy = clone(state);
            const hasFollowed = action.payload.hasFollowed;
            targetId = action.payload.targetId;

            if (hasFollowed) {
                stateCopy.following.push(targetId);
            } else {
                for (i = 0; i < stateCopy.following.length; i++) {
                    if (stateCopy.following[i] == targetId) {
                        stateCopy.following.splice(i, 1);
                        break;
                    }
                }
            }

            return stateCopy;
        //{hasLiked: bool, targetId: objectId}
        case UserReducerTypes.likeListAction:
            stateCopy = clone(state);
            const hasLiked = action.payload.hasLiked;
            targetId = action.payload.targetId;

            if (hasLiked) {
                stateCopy.likedLists.push(targetId);
            } else {
                for (i = 0; i < stateCopy.likedLists.length; i++) {
                    if (stateCopy.likedLists[i] == targetId) {
                        stateCopy.likedLists.splice(i, 1);
                        break;
                    }
                }
            }

            return stateCopy;
        //{hasLiked: bool, targetId: objectId}
        case UserReducerTypes.likeCommentAction:
            stateCopy = clone(state);
            const commentLiked = action.payload.hasLiked;
            targetId = action.payload.targetId;

            if (commentLiked) {
                stateCopy.likedComments.push(targetId);
            } else {
                for (i = 0; i < stateCopy.likedComments.length; i++) {
                    if (stateCopy.likedComments[i] == targetId) {
                        stateCopy.likedComments.splice(i, 1);
                        break;
                    }
                }
            }

            return stateCopy;
        default:
            return state;
    }
}
