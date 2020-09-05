const clone = require('rfdc')()

export const UserReducerTypes = {
    getUserAction: 'GET_USER_ACTION',
    updateBioAction: 'UPDATE_BIO_ACTION',
    updateProfilePicAction: 'UPDATE_PROFILE_PIC_ACTION',
    followUserAction: 'FOLLOW_USER_ACTION',
    likeListAction: 'LIKE_LIST_ACTION'
}

export function userReducer(state, action) {
    switch (action.type) {
        //{user: object}
        case UserReducerTypes.getUserAction:
            return clone(action.payload.user);
        //{bio: string}
        case UserReducerTypes.updateBioAction:
            const stateCopy = clone(state);
            stateCopy.bio = action.payload.bio;
            return stateCopy;
        //{profPic: string}
        case UserReducerTypes.updateProfilePicAction:
            const stateCopy = clone(state);
            stateCopy['prof_pic'] = action.payload.profPic;
            return stateCopy;
        //{hasFollowed: bool, targetId: objectId}
        case UserReducerTypes.followUserAction:
            const stateCopy = clone(state);
            const hasFollowed = action.payload.hasFollowed;
            const targetId = action.payload.targetId;

            if (hasFollowed) {
                stateCopy.following.push(targetId);
            } else {
                for (var i = 0; i < stateCopy.following.length; i++) {
                    if (stateCopy.following[i]['$oid'] === targetId['$oid']) {
                        stateCopy.following.splice(i, 1);
                        break;
                    }
                }
            }

            return stateCopy;
        //{hasLiked: bool, targetId: objectId}
        case UserReducerTypes.likeListAction:
            const stateCopy = clone(state);
            const hasLiked = action.payload.hasLiked;
            const targetId = action.payload.targetId;

            if (hasLiked) {
                stateCopy['liked_lists'].push(targetId);
            } else {
                for (var i = 0; i < stateCopy.following.length; i++) {
                    if (stateCopy['liked_lists'][i]['$oid'] === targetId['$oid']) {
                        stateCopy['liked_lists'].splice(i, 1);
                        break;
                    }
                }
            }

            return stateCopy;
    }
}
