const chemState={
  view:'labels',configuration:'R',moleculeRotation:18,
  mixtureEE:60,specificRotation:50,pathLength:1,concentration:.1,
  initial:1,feedback:90,nonlinear:110,cycles:24
};

const viewCopy={
  labels:{
    stage:'ABSOLUTE CONFIGURATION · 絕對構型',title:'Input 輸入',sub:'Priority → orientation → R/S',
    eyebrow:'NOW · 目前判讀',result:()=>`${chemState.configuration} configuration · ${chemState.configuration} 構型`,
    sentence:()=>chemState.configuration==='R'?'最低優先序背向時，1→2→3 為順時針。旋轉整個分子不會把 R 變成 S。':'最低優先序背向時，1→2→3 為逆時針。只有形成鏡像才會把 S 變成 R。',
    badge:'<b>R/S</b><span>does not determine<br>D/L or (+)/(−)<br>不能推出另外兩者</span>'
  },
  polarimeter:{
    stage:'POLARIMETER · 旋光儀',title:'Input 輸入',sub:'Mixture × [α] × path × concentration',
    eyebrow:'LIVE MEASUREMENT · 即時測量',
    result:()=>{const a=observedRotation();return Math.abs(a)<.005?'No net rotation · 無淨旋光':a>0?'Dextrorotatory (+) · 右旋 (+)':'Laevorotatory (−) · 左旋 (−)'},
    sentence:()=>{const a=observedRotation();return Math.abs(a)<.005?'A 與 B 的旋光互相抵消；消旋不等於樣品中沒有手性分子。':`在目前理想模型下，偏振面旋轉 ${signed(a,2)}°；此正負號不能反推 D/L 或 R/S。`},
    badge:'<b>(±)</b><span>measured under stated<br>conditions · 依條件實測</span>'
  },
  amplification:{
    stage:'ENANTIOMERIC EXCESS · ee 演化',title:'Input 輸入',sub:'Seed → feedback → amplification',
    eyebrow:'NOW · 目前結果',result:()=>{const ee=finalEE();return Math.abs(ee)<.1?'A / B balanced · A / B 平衡':ee>0?'Enantiomer A leads · A 對映體領先':'Enantiomer B leads · B 對映體領先'},
    sentence:()=>{const ee=finalEE();return Math.abs(ee)<.1?'兩種對映體各占一半。':ee>0?'初始的 A 偏向經回饋後被放大。':'初始的 B 偏向經回饋後被放大。'},
    badge:'<b>ee</b><span>composition difference<br>組成差，不是名稱換算</span>'
  }
};

function signed(value,digits=1){if(Math.abs(value)<10**(-digits)/2)return (0).toFixed(digits);return `${value>0?'+':'−'}${Math.abs(value).toFixed(digits)}`}
function observedRotation(){return chemState.mixtureEE/100*chemState.specificRotation*chemState.pathLength*chemState.concentration}
function chemSeries(){let x=chemState.initial/100;const values=[x],gain=chemState.feedback/100,curve=chemState.nonlinear/100;for(let i=0;i<chemState.cycles;i++){const bounded=DemoKit.clamp(x,-.999,.999);x=Math.tanh(Math.atanh(bounded)+gain*.12*bounded*(.45+curve));values.push(x)}return values}
function finalEE(){return chemSeries().at(-1)*100}

function setText(id,text){const node=document.getElementById(id);if(node)node.textContent=text}
function updateView(){
  const copy=viewCopy[chemState.view];
  document.querySelectorAll('.view-switch button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view===chemState.view)));
  document.querySelectorAll('.control-panel').forEach(panel=>panel.classList.toggle('is-hidden',panel.dataset.panel!==chemState.view));
  setText('stageLabel',copy.stage);setText('controlsTitle',copy.title);setText('controlsSubtitle',copy.sub);setText('resultEyebrow',copy.eyebrow);setText('resultTitle',copy.result());setText('resultSentence',copy.sentence());
  document.getElementById('relationBadge').innerHTML=copy.badge;
  updateMetrics();updateIpo();chemController.reset();
}

function updateMetrics(){
  if(chemState.view==='labels'){
    setText('metricLabel1','ABSOLUTE · 絕對構型');setText('metricValue1',chemState.configuration);setText('metricNote1','CIP priority · CIP 優先序');
    setText('metricLabel2','D/L · 相對構型');setText('metricValue2','Not assigned');setText('metricNote2','Needs a Fischer reference · 需 Fischer 參考');
    setText('metricLabel3','ROTATION · 旋光');setText('metricValue3','Not measured');setText('metricNote3','Needs an experiment · 需實驗測量');
  }else if(chemState.view==='polarimeter'){
    const alpha=observedRotation(),a=(100+chemState.mixtureEE)/2,b=100-a;
    setText('metricLabel1','OBSERVED α · 實測角');setText('metricValue1',`${signed(alpha,2)}°`);setText('metricNote1','Ideal model · 理想模型');
    setText('metricLabel2','DIRECTION · 方向');setText('metricValue2',Math.abs(alpha)<.005?'0 / racemic':alpha>0?'(+) clockwise':'(−) counterclockwise');setText('metricNote2','Viewed toward source · 面向光源觀察');
    setText('metricLabel3','MIXTURE · 混合比例');setText('metricValue3',`A ${a.toFixed(0)} : B ${b.toFixed(0)}`);setText('metricNote3',`ee = ${signed(chemState.mixtureEE,0)}%`);
  }else{
    const ee=finalEE(),major=(100+Math.abs(ee))/2,amp=Math.abs(chemState.initial)<.05?0:Math.abs(ee/chemState.initial);
    setText('metricLabel1','FINAL ee · 最終 ee');setText('metricValue1',`${signed(ee,1)}%`);setText('metricNote1','+ favors A；− favors B');
    setText('metricLabel2','MAJOR : MINOR · 主／次');setText('metricValue2',`${major.toFixed(0)} : ${(100-major).toFixed(0)}`);setText('metricNote2','Converted from final ee · 由 ee 換算');
    setText('metricLabel3','AMPLIFICATION · 放大');setText('metricValue3',`${amp.toFixed(1)}×`);setText('metricNote3','Final bias ÷ initial bias · 最終／初始');
  }
  const copy=viewCopy[chemState.view];setText('resultTitle',copy.result());setText('resultSentence',copy.sentence());
}

function updateIpo(){
  const data={
    labels:['Priority order','為四個取代基排定 CIP 優先序 1–4。','Orient in 3D','讓最低優先序 4 背向，再追蹤 1→2→3。','Assign R or S','順時針為 R；逆時針為 S。','priority 4 points away: 1 → 2 → 3 = clockwise ⇒ R','R/S 是空間排列，不是旋光方向。'],
    polarimeter:['Mixture + conditions','設定 ee、比旋光度、光程與濃度。','Plane-polarized light','線偏振光通過手性樣品後，偏振面旋轉。','Observed angle α','讀出角度及 (+)/(−) 方向；不能反推 D/L。','αobs = (ee / 100) · [α]reference · l · c','此式為理想雙對映體教學模型。'],
    amplification:['Minute chiral seed','給反應極小的 A/B 初始組成差。','Nonlinear feedback','產物促進同手性產物持續生成。','One form dominates','小偏向可逐輪放大為明顯 ee。','eeₙ₊₁ = tanh[(1 + feedback) · atanh(eeₙ) + seed]','概念模型，不代表特定反應產率。']
  }[chemState.view];
  ['ipoInputTitle','ipoInputText','ipoProcessTitle','ipoProcessText','ipoOutputTitle','ipoOutputText'].forEach((id,i)=>setText(id,data[i]));
  document.getElementById('formulaText').innerHTML=`<code>${data[6]}</code> · ${data[7]}`;
}

function pill(ctx,x,y,text,color){ctx.font='700 11px ui-monospace,monospace';const width=ctx.measureText(text).width+20;ctx.fillStyle='#07111fe8';ctx.strokeStyle=color;ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(x-width/2,y-15,width,30,15);ctx.fill();ctx.stroke();ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,x,y);ctx.textAlign='left';ctx.textBaseline='alphabetic'}
function line(ctx,x1,y1,x2,y2,color,width=2,dash=[]){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dash);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.setLineDash([])}

function drawLabels(ctx,w,h,t){
  const cx=w/2,cy=h*.45,scale=Math.min(w,h)*.23,spin=chemState.moleculeRotation*Math.PI/180;
  ctx.fillStyle='#9eacc0';ctx.font='700 10px ui-monospace,monospace';ctx.textAlign='center';ctx.fillText('GENERIC CHIRAL CENTRE · 通用手性中心',cx,74);
  const base=chemState.configuration==='R'?[-Math.PI/2,Math.PI/6,5*Math.PI/6]:[-Math.PI/2,5*Math.PI/6,Math.PI/6];
  const colors=['#b897ff','#54d6c0','#ffca7a'];
  const points=base.map((angle,index)=>({x:cx+Math.cos(angle+spin)*scale,y:cy+Math.sin(angle+spin)*scale,label:String(index+1),color:colors[index]}));
  points.forEach((p,index)=>{line(ctx,cx,cy,p.x,p.y,p.color,index===0?5:3);ctx.fillStyle='#091422';ctx.strokeStyle=p.color;ctx.lineWidth=2;ctx.beginPath();ctx.arc(p.x,p.y,20,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle=p.color;ctx.font='800 14px ui-monospace,monospace';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(p.label,p.x,p.y)});
  const p4={x:cx+Math.cos(spin+Math.PI)*scale*.65,y:cy+Math.sin(spin+Math.PI)*scale*.65};
  for(let i=1;i<=5;i++){const f=i/6;line(ctx,cx+(p4.x-cx)*(f-.05),cy+(p4.y-cy)*(f-.05),cx+(p4.x-cx)*(f+.05),cy+(p4.y-cy)*(f+.05),'#718097',2)}
  pill(ctx,p4.x,p4.y,'4 · AWAY 背向','#8fa1b9');
  ctx.fillStyle='#eef5ff';ctx.strokeStyle='#b897ff';ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,17,0,Math.PI*2);ctx.fill();ctx.stroke();
  const path=[...points,points[0]];ctx.strokeStyle='#f4efff';ctx.lineWidth=2;ctx.setLineDash([6,5]);ctx.lineDashOffset=-t*24;ctx.beginPath();path.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();ctx.setLineDash([]);ctx.lineDashOffset=0;
  pill(ctx,cx,Math.min(h-86,cy+scale+64),`${chemState.configuration} · ${chemState.configuration==='R'?'CLOCKWISE 順時針':'COUNTERCLOCKWISE 逆時針'}`,'#b897ff');
  ctx.fillStyle='#9eacc0';ctx.font='600 10px ui-monospace,monospace';ctx.textAlign='center';ctx.fillText(w<500?'ROTATE VIEW ≠ CHANGE R/S · 旋轉 ≠ 換構型':'ROTATE THE VIEW ≠ CHANGE CONFIGURATION · 旋轉視角 ≠ 改變構型',cx,h-48);
}

function drawPolarimeter(ctx,w,h,t){
  const alpha=observedRotation(),rad=alpha*Math.PI/180,beamY=h*.46,left=30,right=w-30,tubeL=w*.34,tubeR=w*.68;
  const glow=ctx.createLinearGradient(left,0,right,0);glow.addColorStop(0,'#aab8ff');glow.addColorStop(.5,'#b897ff');glow.addColorStop(1,alpha>=0?'#54d6c0':'#ffca7a');
  line(ctx,left,beamY,right,beamY,'#40536d',1,[5,5]);ctx.strokeStyle=glow;ctx.lineWidth=3;ctx.beginPath();for(let x=left;x<=right;x+=4){const y=beamY+Math.sin((x-left)*.11-t*5)*7*(x<tubeL||x>tubeR?.7:.35);x===left?ctx.moveTo(x,y):ctx.lineTo(x,y)}ctx.stroke();
  ctx.fillStyle='#10253a99';ctx.strokeStyle='#54d6c0';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(tubeL,beamY-62,tubeR-tubeL,124,24);ctx.fill();ctx.stroke();
  ctx.fillStyle='#54d6c0';ctx.font='800 10px ui-monospace,monospace';ctx.textAlign='center';ctx.fillText('CHIRAL SAMPLE · 手性樣品',w*.51,beamY-78);
  for(let i=0;i<12;i++){const x=tubeL+16+((i*47+t*18)%(Math.max(20,tubeR-tubeL-32))),y=beamY-44+(i%4)*28;ctx.globalAlpha=.25+.35*(i%3)/2;ctx.fillStyle=i%2?'#54d6c0':'#b897ff';ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;
  const dialX=Math.min(right-10,w*.82),dialR=Math.min(68,w*.15);ctx.strokeStyle='#40536d';ctx.lineWidth=1;ctx.beginPath();ctx.arc(dialX,beamY,dialR,0,Math.PI*2);ctx.stroke();line(ctx,dialX,beamY-dialR,dialX,beamY+dialR,'#53647b',1,[4,4]);
  const outAngle=-Math.PI/2+rad;line(ctx,dialX-Math.cos(outAngle)*dialR,beamY-Math.sin(outAngle)*dialR,dialX+Math.cos(outAngle)*dialR,beamY+Math.sin(outAngle)*dialR,alpha>=0?'#54d6c0':'#ffca7a',4);
  ctx.strokeStyle=alpha>=0?'#54d6c0':'#ffca7a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(dialX,beamY,dialR*.68,-Math.PI/2,outAngle,alpha<0);ctx.stroke();
  const directionLabel=Math.abs(alpha)<.005?'ZERO 零':alpha>0?(w<500?'(+) CW 順時針':'(+) CLOCKWISE 順時針'):(w<500?'(−) CCW 逆時針':'(−) COUNTERCLOCKWISE 逆時針');
  const dialLabelX=w<500?w/2:dialX;
  pill(ctx,dialLabelX,beamY+dialR+36,`${signed(alpha,2)}° · ${directionLabel}`,alpha>=0?'#54d6c0':'#ffca7a');
  ctx.fillStyle='#9eacc0';ctx.font='700 9px ui-monospace,monospace';ctx.textAlign='center';ctx.fillText(w<500?'SOURCE VIEW · 面向光源':'VIEWED TOWARD SOURCE · 面向光源觀察',dialLabelX,beamY-dialR-20);
  const a=(100+chemState.mixtureEE)/2,b=100-a,barX=35,barY=h-65,barW=w-70;ctx.fillStyle='#1b2c43';ctx.beginPath();ctx.roundRect(barX,barY,barW,14,7);ctx.fill();ctx.save();ctx.beginPath();ctx.roundRect(barX,barY,barW,14,7);ctx.clip();ctx.fillStyle='#b897ff';ctx.fillRect(barX,barY,barW*a/100,14);ctx.fillStyle='#54d6c0';ctx.fillRect(barX+barW*a/100,barY,barW*b/100,14);ctx.restore();ctx.fillStyle='#c9adff';ctx.textAlign='left';ctx.fillText(`A ${a.toFixed(0)}%`,barX,barY-8);ctx.fillStyle='#63dfca';ctx.textAlign='right';ctx.fillText(`B ${b.toFixed(0)}%`,barX+barW,barY-8);
}

function drawAmplification(ctx,w,h,t){
  const values=chemSeries(),visible=Math.min(values.length,Math.max(2,Math.floor(t*7)+1)),pad={l:48,r:24,t:55,b:60},pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
  ctx.strokeStyle='#30445f';ctx.lineWidth=1;for(let y=0;y<=4;y++){const py=pad.t+ph*y/4;ctx.beginPath();ctx.moveTo(pad.l,py);ctx.lineTo(w-pad.r,py);ctx.stroke()}
  ctx.fillStyle='#9eacc0';ctx.font='10px ui-monospace,monospace';ctx.textAlign='left';ctx.fillText('100%',8,pad.t+4);ctx.fillText('50%',14,pad.t+ph/2+4);ctx.fillText('0%',20,pad.t+ph+4);ctx.fillText('REACTION CYCLES · 反應輪數',pad.l,h-20);
  function curve(side,color){ctx.strokeStyle=color;ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<visible;i++){const x=pad.l+pw*i/Math.max(1,values.length-1),fraction=side==='A'?(1+values[i])/2:(1-values[i])/2,y=pad.t+ph*(1-fraction);i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke()}
  curve('A','#b897ff');curve('B','#54d6c0');const last=values[Math.min(visible-1,values.length-1)],px=pad.l+pw*(visible-1)/Math.max(1,values.length-1);[['A',(1+last)/2,'#b897ff'],['B',(1-last)/2,'#54d6c0']].forEach(([label,f,color])=>{const py=pad.t+ph*(1-f);ctx.fillStyle=color;ctx.beginPath();ctx.arc(px,py,5,0,Math.PI*2);ctx.fill();ctx.fillText(label,px+8,py+4)});
}

function updateLegend(){
  const html={labels:'<span class="legend-chip"><strong>1→2→3</strong> · CIP 優先序</span><span class="legend-chip">4 AWAY · 4 背向</span>',polarimeter:'<span><i style="--legend:#b897ff"></i>A reference</span><span><i style="--legend:#54d6c0"></i>B mirror</span>',amplification:'<span><i style="--legend:#b897ff"></i>A enantiomer</span><span><i style="--legend:#54d6c0"></i>B enantiomer</span><span><i style="--legend:#8793a7"></i>racemic 消旋</span>'}[chemState.view];
  document.getElementById('stageLegend').innerHTML=html;
}

const chemController=DemoKit.animator(document.getElementById('chemistryCanvas'),(ctx,w,h,t)=>{
  DemoKit.clear(ctx,w,h);if(chemState.view==='labels')drawLabels(ctx,w,h,t);else if(chemState.view==='polarimeter')drawPolarimeter(ctx,w,h,t);else drawAmplification(ctx,w,h,t);updateMetrics();updateLegend();
});

document.querySelectorAll('.view-switch button').forEach(button=>button.addEventListener('click',()=>{chemState.view=button.dataset.view;updateView()}));
document.querySelectorAll('.config-choice button').forEach(button=>button.addEventListener('click',()=>{chemState.configuration=button.dataset.config;document.querySelectorAll('.config-choice button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));setText('configurationValue',chemState.configuration);chemController.reset();updateMetrics()}));
DemoKit.range('moleculeRotation','moleculeRotationValue',v=>`${v.toFixed(0)}°`,v=>{chemState.moleculeRotation=v;chemController.redraw()});
DemoKit.range('mixtureEE','mixtureEEValue',v=>`${signed(v,0)}%`,v=>{chemState.mixtureEE=v;chemController.redraw();updateMetrics()});
DemoKit.range('specificRotation','specificRotationValue',v=>`${signed(v,0)}°`,v=>{chemState.specificRotation=v;chemController.redraw();updateMetrics()});
DemoKit.range('pathLength','pathLengthValue',v=>`${v.toFixed(1)} dm`,v=>{chemState.pathLength=v;chemController.redraw();updateMetrics()});
DemoKit.range('concentration','concentrationValue',v=>`${v.toFixed(2)} g/mL`,v=>{chemState.concentration=v;chemController.redraw();updateMetrics()});
DemoKit.range('initialEE','initialEEValue',v=>`${signed(v,1)}%`,v=>{chemState.initial=v;chemController.reset();updateMetrics()});
DemoKit.range('feedback','feedbackValue',v=>`${(v/100).toFixed(2)}×`,v=>{chemState.feedback=v;chemController.reset();updateMetrics()});
DemoKit.range('nonlinear','nonlinearValue',v=>`${(v/100).toFixed(2)}`,v=>{chemState.nonlinear=v;chemController.reset();updateMetrics()});
DemoKit.range('cycles','cyclesValue',v=>`${v}`,v=>{chemState.cycles=v;chemController.reset();updateMetrics()});

function setRange(id,value){const input=document.getElementById(id);input.value=value;input.dispatchEvent(new Event('input',{bubbles:true}))}
document.getElementById('mirrorMolecule').addEventListener('click',()=>{chemState.configuration=chemState.configuration==='R'?'S':'R';document.querySelectorAll('.config-choice button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.config===chemState.configuration)));setText('configurationValue',chemState.configuration);chemController.reset();updateMetrics()});
document.getElementById('presetRacemic').addEventListener('click',()=>setRange('mixtureEE',0));
document.getElementById('presetPlus').addEventListener('click',()=>{setRange('specificRotation',50);setRange('mixtureEE',100)});
document.getElementById('presetMinus').addEventListener('click',()=>{setRange('specificRotation',50);setRange('mixtureEE',-100)});
DemoKit.wireButton(chemController);document.getElementById('resetDemo').addEventListener('click',()=>chemController.reset());
updateView();
