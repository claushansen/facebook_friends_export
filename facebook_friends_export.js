function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

function exportFriends(){
var friendbox=document.querySelectorAll('[data-testid="friend_list_item"]');
var person=document.title;
console.log(friendbox.length +"  valid friends of "+person);
var friendarray=[];
friendarray.push(["Name","Link","Image"]);

for(i=0;i<friendbox.length;i++){
    let image=friendbox[i].getElementsByTagName("img")[0].src;
    let name=friendbox[i].getElementsByTagName("img")[0].getAttribute("aria-label");
    let profilelink=friendbox[i].getElementsByTagName("a")[0].href.replace('?fref=pb&hc_location=friends_tab','').replace('&fref=pb&hc_location=friends_tab','');
    let profilearray=[name,profilelink,image];
    friendarray.push(profilearray);
    console.log(name+','+profilelink+','+image);

}
console.log(friendarray);

exportToCsv(person+'_friends.csv',friendarray );

}

function ScrollAndLoad(){
if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    // you're at the bottom of the page
    clearInterval(loadFriends);
    exportFriends();
    }
window.scrollTo(0,document.body.scrollHeight);
}

var loadFriends = setInterval(function () {ScrollAndLoad();}, 3000);