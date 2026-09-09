import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';
const root=new URL('../pages-dist/',import.meta.url);
const read=p=>readFile(new URL(p,root),'utf8');
test('Agent integration preserves denominators, failed outcomes and review boundaries',async()=>{
 const home=await read('index.html'); const page=await read('creative-qc-agent/index.html');
 for(const text of ['10/10','8/8','6/10'])assert.ok(home.includes(text));
 for(const text of ['14/14','20/20','5/8','6/10','REVIEW_ASSISTED','A04','A06','A07','A09','不是自然发生','0 Tool Calls','NEEDS_CLARIFICATION'])assert.ok(page.includes(text),text);
 const results=JSON.parse(await read('assets/creative-qc-agent/evidence/e2e-outcomes.json'));
 for(const id of ['A04','A06','A07','A09'])assert.equal(results.cases.find(c=>c.case_id===id).final_outcome,'ERROR');
 assert.equal((page.match(/<video /g)||[]).length,3);assert.doesNotMatch(page,/<video[^>]*autoplay/i);
 for(const name of ['a03','a10-fault'])assert.ok((await stat(new URL(`assets/creative-qc-agent/media/${name}.mp4`,root))).size>0);
});
test('Case study and appendix directly resolve with their own navigation',async()=>{
 for(const p of ['creative-qc-agent/index.html','creative-qc-agent/build-log/index.html']){
  const html=await read(p); assert.match(html,/href="\/"/); assert.match(html,/返回作品集/);
  const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  for(const m of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.has(m[1]),`Missing anchor ${m[1]}`);
 }
 const log=await read('creative-qc-agent/build-log/index.html');
 assert.match(log.replaceAll('<!-- -->',''),/Stage 12/);for(const n of ['01','02','03','04','05','05 1','06','07','08'])assert.ok(log.includes(`MILESTONE ${n} REPORT`));
});
