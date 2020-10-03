const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const SortOptions = {
    likesDesc: 0,
    dateDesc: 1,
    dateAsc: 2
};

export function containsId(idList, id) {

    for (var i = 0; i < idList.length; i++) {
        if (idList[i]['$oid'] === id['$oid']) {
            return true;
        }
    }

    return false;
}

export function tsToDate(timeStamp) {
    const date = new Date(timeStamp);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export function tsToDelta(timeStamp) {
    const mins = 1000 * 60;
    const date = new Date(timeStamp);
    const currentDate = Date.now();
    console.log(currentDate);
    const diffInMs = currentDate - date.getTime();

    const diffInDays = diffInMs / (mins * 60 * 24);
    const diffInHours = diffInMs / (mins * 60);
    const diffInMinutes = diffInMs / mins;
    const diffInSec = diffInMs / 1000;

    if (diffInSec <= 0 || (diffInSec >= 0 && diffInSec < 60)) {
        return 'Just Now';
    } else if (diffInMinutes >= 1 && diffInMinutes < 60) {
        return Math.round(diffInMinutes) + 'm ago';
    } else if (diffInHours >= 1 && diffInHours < 24) {
        return Math.round(diffInHours) + 'h ago';
    } else if (diffInDays >= 1 && diffInDays < 30) {
        if (diffInDays >= 1 && diffInDays < 7) {
            return Math.round(diffInDays) + 'd ago'
        } else {
            return Math.round(diffInDays / 7) + 'w ago';
        }
    } else if (diffInDays >= 30 && diffInDays < 365) {
        return Math.round(diffInDays / 30) + 'mo ago';
    } else {
        return Math.round(diffInDays / 365) + 'y ago';
    }
}