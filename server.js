//http://localhost:8000/?r=https://dcmdev.wiley.com/alfresco/s/com/wiley/wpp/cmh/dcm/version
const app = require('express')();
const apiProxy = require('http-proxy').createProxyServer();
const DEFAULT_PORT = 8000;

app.all("*", function(req, res) {  
		const r = req.query.r;
		const protocol = r.split(":")[0];
		const target = r.split("/")[0]+"//"+r.split("/")[2];
		const request = "/"+r.split("/").splice(3).join("/");
		console.log({protocol, target, request});	
		req.url = request;
		
		if(protocol === "https") {
			apiProxy.web(req, res, {
				target,
				changeOrigin: true,
			        protocol: 'https:',
				port: 443,
				secure: false
			});
		} else {
			apiProxy.web(req, res, {
				target,
				changeOrigin: true
			});
		}
});

app.listen(process.argv[3] || DEFAULT_PORT);