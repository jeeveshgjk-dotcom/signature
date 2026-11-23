// Net Access branded PNG icons generated from the user-supplied logo (64px indexed source).
const zlib = require("node:zlib");
function crc32(buf){let c=0xffffffff;for(const b of buf){c^=b;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0);}return (c^0xffffffff)>>>0;}
function chunk(type,data){const t=Buffer.from(type);const len=Buffer.alloc(4);len.writeUInt32BE(data.length);const crc=Buffer.alloc(4);crc.writeUInt32BE(crc32(Buffer.concat([t,data])));return Buffer.concat([len,t,data,crc]);}
const source=zlib.inflateSync(Buffer.from("eNrtlb153DAMhgGCAH/SZRxP4A28SGqP4AFSZYQUblKmTfZw4dp+3Nin4KOk8zWheVaqWN9zosAjXwAEKWmapsPkOhym58PL48PTw/3dj9+/vl7ffLv48vPz1Xe6vKVdu3Zt0KcN+hd82aD/dlOYmEXEWw7QmXhUS01mkeBIiIK0oTddMccjDMNUWDyD0Ry40RaFIVH3or4CZhpaB4IjaZ/vyQJwF0rojmQQERvgwsNDiFForIrAI89Tw5GXwGhGcWkQrfmv7VjpEJ3CGv24hgEFji06neRNSzviQshLxyczT7MfiY/wsuHMm++c0LL150s8fNjAe/oNfSdO6tV7LwsZ+KXYOPLn88qkKn6RVvWNUw3kfVaGySpBlDt8JMkla6mawWspmmrmXA1mrhiyLu/zZr74OcwOlYorNdOHarFO/RtvqTqf/SQgaMlmzmW4yWo1SYc3SsizJC4pCLeEM/pwgzW5/XeenV/zLF6r17Xgv2TNdYcnazwXD+tlCli31bluvqRU21DovfqiQuY/W4yEztydr94DZjFll+ZZ6x3Gq917gCNm2DK33W0xhvggnp+KRH/hCg4bGkEpfTPxFYLd43n+AOHtteFB2rVr18fQH49jMGo=","base64"));
const palette=source.subarray(0,36), pixels=source.subarray(36);
function png(size){
 const stride=1+size*4,raw=Buffer.alloc(size*stride);
 for(let y=0;y<size;y++){raw[y*stride]=0;for(let x=0;x<size;x++){
 const p=y*stride+1+x*4, sx=Math.min(63,Math.floor(x*64/size)), sy=Math.min(63,Math.floor(y*64/size));
 const idx=pixels[sy*64+sx]*3;for(let k=0;k<3;k++)raw[p+k]=palette[idx+k];raw[p+3]=255;
 }}
 const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(size,0);ihdr.writeUInt32BE(size,4);ihdr[8]=8;ihdr[9]=6;
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk("IHDR",ihdr),chunk("IDAT",zlib.deflateSync(raw)),chunk("IEND",Buffer.alloc(0))]);
}
module.exports=(req,res)=>{const size=Number(req.query.size);if(![16,32,64,80,128].includes(size)){res.status(400).send("Unsupported icon size");return;}res.setHeader("Content-Type","image/png");res.setHeader("Cache-Control","public, max-age=86400");res.status(200).send(png(size));};
