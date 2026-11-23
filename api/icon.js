// Simple PNG icon endpoint for the Outlook add-in. Temporary neutral branding.
const zlib = require("node:zlib");
function crc32(buf){let c=0xffffffff;for(const b of buf){c^=b;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0);}return (c^0xffffffff)>>>0;}
function chunk(type,data){const t=Buffer.from(type);const len=Buffer.alloc(4);len.writeUInt32BE(data.length);const crc=Buffer.alloc(4);crc.writeUInt32BE(crc32(Buffer.concat([t,data])));return Buffer.concat([len,t,data,crc]);}
function png(size){
 const stride=1+size*4,raw=Buffer.alloc(size*stride);
 for(let y=0;y<size;y++){raw[y*stride]=0;for(let x=0;x<size;x++){
 const p=y*stride+1+x*4;const u=x/size,v=y/size;
 const border=u<.07||u>.93||v<.07||v>.93;
 const stroke=Math.abs(u-.27)<.07||Math.abs(u-.73)<.07||Math.abs((u+v)-1)<.085;
 const on=!border&&stroke&&v>.18&&v<.82&&u>.17&&u<.83;
 const color=on?[255,255,255,255]:[17,89,173,255];
 for(let k=0;k<4;k++)raw[p+k]=color[k];
 }}
 const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(size,0);ihdr.writeUInt32BE(size,4);ihdr[8]=8;ihdr[9]=6;
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk("IHDR",ihdr),chunk("IDAT",zlib.deflateSync(raw)),chunk("IEND",Buffer.alloc(0))]);
}
module.exports=(req,res)=>{const size=Number(req.query.size);if(![16,32,64,80,128].includes(size)){res.status(400).send("Unsupported icon size");return;}res.setHeader("Content-Type","image/png");res.setHeader("Cache-Control","public, max-age=86400");res.status(200).send(png(size));};
