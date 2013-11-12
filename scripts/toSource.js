function toSource(obj) {
	var res = '';
	for (var key in obj) {
		res += "Ключ: " + key + " значение:" + obj[key] + '\n';
	}
	return res;
}

