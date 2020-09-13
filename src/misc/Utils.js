export function containsId(idList, id) {
    console.log(idList);
    console.log(id);
    for (var i = 0; i < idList.length; i++) {
        if (idList[i]['$oid'] === id['$oid']) {
            return true;
        }
    }

    return false;
}