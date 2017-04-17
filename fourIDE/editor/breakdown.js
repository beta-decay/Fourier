function breakDownCheck() {
	var lines = [''];
	var vpos = 0;
	var hpos = 0;
	var bdCode = document.getElementById("code").value;
	
	while (hpos < bdCode.length) {
		var currChr = bdCode[hpos];
		
		if ('{|['.indexOf(currChr) != -1) {
			lines[vpos] += bdCode[hpos];
			hpos += 1;
			var tempvpos = vpos;
			
			while ('}|]'.indexOf(bdCode[hpos]) != -1) {
				
			}
		}
	}
}