function goodRating() {
    console.log("good");
    $('#textarea').prop('disabled', true);
}

function badRating() {
    console.log("bad");
    $('#textarea').prop('disabled', false);
}

function submitRating() {
    console.log("submit");
    $('#but1').prop('disabled', true);
    $('#rbut1').prop('disabled', true);
    $('#rbut2').prop('disabled', true);
    $('#textarea').prop('disabled', true);
    setTimeout(function(){
    	$('#but1').prop('disabled', false);
        $('#rbut1').prop('disabled', false);
        $('#rbut2').prop('disabled', false);
        $('#textarea').prop('disabled', false);
        $("#maincontent").empty(); 
    }, 10000);
    check();
}
	
function connectDB(i) {
	db = openDatabase("myDB", "1.0", "count rating", 100);
	db.transaction(function (tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS myDB (id INTEGER PRIMARY KEY AUTOINCREMENT, mark INTEGER, description TEXT);",[],null,null)
	});
			if(i===1)
			{
				var description = $("textarea").val()	
			}
			else
			{
				var description = "";
			}
			db.transaction(function(tx) {
			tx.executeSql("INSERT INTO myDB (mark, description) values(?, ?)", [i, description], null, function(){console.log("Creation error")});
					});	
			if(i===1)
				{
				db.transaction(function(tx){
					tx.executeSql("SELECT count(*) as cnt FROM myDB WHERE mark = 1;",
							[],function(tx,result){
						if (result.rows.length == 0){
							$("#maincontent").append('<li class="title">Nothing found</li><hr/>');
						}
						else
							for (var i=0; i<result.rows.length;i++){
								var a = result.rows.item(i);
								$("#maincontent").append('<p>Не понравилось</p><li>'+a['cnt']+'</li><hr/>');
							}
					}, null)
				})
				db.transaction(function(tx){
					tx.executeSql("SELECT count(*) as cnt FROM myDB WHERE mark = 0;",
							[],function(tx,result){
						if (result.rows.length == 0){
							$("#maincontent").append('<li class="title">Nothing found</li><hr/>');
						}
						else
							for (var i=0; i<result.rows.length;i++){
								var a = result.rows.item(i);
								$("#maincontent").append('<p>Понравилось</p><li>'+a['cnt']+'</li><hr/>');
							}
					}, null)
				})
				db.transaction(function(tx){
					tx.executeSql("SELECT * FROM myDB WHERE mark = 1;",
							[],function(tx,result){
						if (result.rows.length == 0){
							$("#maincontent").append('<li class="title">Nothing found</li><hr/>');
						}
						else
							for (var i=0; i<result.rows.length;i++){
								var a = result.rows.item(i);
								$("#maincontent").append('<li>'+a['description']+'</li><hr/>');
								
							}
					}, null)
				})
				}
	}

function check()
{
    var inp = document.getElementsByName('rate');
    for (var i = 0; i < inp.length; i++) {
        if (inp[i].type == "radio" && inp[i].checked) {
        	connectDB(i);
        }
    }
}
