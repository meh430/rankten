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