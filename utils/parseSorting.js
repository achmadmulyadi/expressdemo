module.exports=function(exp){
    var strSort = "";

    if (exp) {
        var sort = JSON.parse(exp);
        //console.log(sort);
        strSort = " ORDER BY ";
        sort.forEach(element => {
            if (strSort.slice(strSort.length - 3, strSort.length - 1) == "SC")
                strSort = strSort + ", ";
            strSort = strSort + `${element.selector} ${element.desc ? "DESC" : "ASC"}`;
        });
    }
    return strSort;
}