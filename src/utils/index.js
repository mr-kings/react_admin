/**
 * 加载 JavaScript
 * @param src
 * @returns {Promise<any>}
 */
export function loadScript(src) {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = src;
		script.onload = resolve;
		script.onerror = reject;
		document.head.appendChild(script);
	});
}

/**
 * 获取 url 中某个 query 参数
 * @param {String} sParam 获取哪个参数
 */
export function getUrlParameter(sParam) {
	const sPageURL = decodeURIComponent(window.location.search.substring(1));
	const sURLVariables = sPageURL.split('&');
	let sParameterName;
	let i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
}
