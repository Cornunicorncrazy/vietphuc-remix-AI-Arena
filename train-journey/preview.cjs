const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {answer}=require('./gemini-qa.cjs');
const root=path.join(__dirname,'dist');
const types={'.css':'text/css','.js':'application/javascript','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.html':'text/html; charset=utf-8'};
http.createServer(async(req,res)=>{
  if(req.url?.split('?')[0]==='/api/tet-qa'){
    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.setHeader('Cache-Control','no-store');
    if(req.method!=='POST'){res.writeHead(405);return res.end(JSON.stringify({error:'Method not allowed'}))}
    let body='';
    try{
      for await(const chunk of req){body+=chunk;if(body.length>30000)throw new TypeError('Request too large')}
      const data=JSON.parse(body);
      const result=await answer(data.messages,data.language,process.env.GEMINI_API_KEY);
      return res.end(JSON.stringify(result));
    }catch(error){
      const status=error instanceof TypeError||error instanceof SyntaxError?400:503;
      res.writeHead(status);
      return res.end(JSON.stringify({error:status===400?'Invalid question':'Assistant temporarily unavailable'}));
    }
  }
  const file=path.join(root,req.url.split('?')[0]==='/'?'index.html':decodeURIComponent(req.url.split('?')[0]));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end()}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found')}res.setHeader('Content-Type',types[path.extname(file).toLowerCase()]||'application/octet-stream');res.end(data)})
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
