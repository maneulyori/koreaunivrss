var http = require("http");
var url = require("url");
var iconv = require("iconv").Iconv;
var iconv_euckr_unicode = new iconv("EUC-KR", "UTF-8//TRANSLIT//IGNORE");

var board_oku_url = url.parse("http://oku.korea.ac.kr/admissions/bbs/bbsList.oku?bbs_type=m6.m1.m1");
var board_main_url_ht = new Object();

var boardList = ["E", "NG", "R", "J"];

for (var i in boardList)
{
	board_main_url_ht[boardList[i]] = url.parse("http://www.korea.ac.kr/do/Main/NoticeList.do?type="+boardList[i]);
}

function fetchData(boardUrl, callback)
{
	http.get(boardUrl, function (res) {
		var isFinished = false;
		var contentArr = new Array();

		res.on("end", function() {
			var size = 0;
			
			var buf = Buffer.concat(contentArr);

			var unibuf = iconv_euckr_unicode.convert(buf);

			callback(unibuf.toString());
		});

		res.on("data", function (data) {
			contentArr.push(data);
		});
	});
}

function parseOku(str, callback)
{
	var result = str.match(/^\t(.*)facebook(.*)style(.*)<\/a>$/gm);

	for(var i=0; i<result.length; i++)
	{
		console.log(result[i]);
	}
}

fetchData(board_oku_url, function(str) {parseOku(str, parseOku);});
