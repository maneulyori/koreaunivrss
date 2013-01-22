var http = require("http");
var url = require("url");
var iconv = require("iconv").Iconv;
var iconv_euckr_unicode = new iconv("EUC-KR", "UTF-8//TRANSLIT//IGNORE");

var board_oku_url = url.parse("http://oku.korea.ac.kr/admissions/bbs/bbsList.oku?bbs_type=m6.m1.m1");
var board_main_url_ht = new Object();

var boardList = {"E", "NG", "R", "J"}

for (var i in boardList)
{
	board_main_url_ht[boardList[i]] = url.parse("http://www.korea.ac.kr/do/Main/NoticeList.do?type="+boardList[i]);
}

function getOku(callback)
{
	http.get(board_oku_url, function (res) {
		res.on("data", function (data) {
			var buf = iconv_euckr_unicode.convert(data);
			var str = buf.toString();

			callback(str);
		});
	});
}

function parseOku(callback)
{
	//TODO: add parsing routine.
}
