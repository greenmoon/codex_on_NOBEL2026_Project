const initialState={demand:-2,rate:-1.5,credibility:70,stickiness:.18};
const econState={...initialState};

function signed(value,digits=2,suffix='%'){
  const rounded=Math.abs(value).toFixed(digits);
  return `${value>0?'+':value<0?'−':''}${rounded}${suffix}`;
}

function econMetrics(){
  const credibility=econState.credibility/100;
  const effectiveRate=econState.rate*(.45+.55*credibility);
  const gap=econState.demand-.85*effectiveRate;
  const inflation=econState.stickiness*gap+.12*econState.demand;
  const baselineGap=econState.demand;
  const baselineInflation=(econState.stickiness+.12)*econState.demand;
  const baselineRisk=Math.hypot(baselineGap,baselineInflation);
  const policyRisk=Math.hypot(gap,inflation);
  const gain=baselineRisk<.01?0:(1-policyRisk/baselineRisk)*100;
  return{effectiveRate,gap,inflation,baselineGap,baselineInflation,gain:DemoKit.clamp(gain,-99,99)};
}

function updateOutputs(){
  const m=econMetrics();
  DemoKit.metric('gapOutput',signed(m.gap));
  DemoKit.metric('inflationOutput',signed(m.inflation));
  DemoKit.metric('gainOutput',`${Math.round(m.gain)}%`);
}

function response(amplitude,t,damping=.26){
  return amplitude*Math.exp(-damping*t)*(Math.cos(t*1.38)+.18*Math.sin(t*1.38));
}

const canvas=document.getElementById('economicsCanvas');
const econController=DemoKit.animator(canvas,(ctx,w,h,time)=>{
  DemoKit.clear(ctx,w,h);
  const m=econMetrics();
  const left=w<560?42:64,right=w-22,top=64,bottom=h-70;
  const plotW=right-left,plotH=bottom-top,mid=top+plotH/2;
  const maxY=Math.max(4.5,Math.abs(m.baselineGap)*1.35,Math.abs(m.gap)*1.35);
  const yFor=value=>mid-value/maxY*(plotH*.44);
  ctx.strokeStyle='#26364c';ctx.lineWidth=1;
  for(let i=-2;i<=2;i++){
    const y=mid+i*plotH/4;ctx.beginPath();ctx.moveTo(left,y);ctx.lineTo(right,y);ctx.stroke();
  }
  ctx.strokeStyle='#65dfa5';ctx.setLineDash([6,7]);ctx.beginPath();ctx.moveTo(left,mid);ctx.lineTo(right,mid);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle='#9eacc0';ctx.font=`${w<560?9:11}px ui-monospace,monospace`;ctx.textAlign='left';
  ctx.fillText('+ OUTPUT GAP',left,top-18);ctx.fillText('TARGET 0%',left+4,mid-8);ctx.fillText('− OUTPUT GAP',left,bottom+29);

  function curve(amplitude,color,width){
    ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();
    for(let i=0;i<=120;i++){
      const t=i/120*8,x=left+i/120*plotW,y=yFor(response(amplitude,t));
      i?ctx.lineTo(x,y):ctx.moveTo(x,y);
    }
    ctx.stroke();
  }
  curve(m.baselineGap,'#77869b',2.5);
  curve(m.gap,'#ffb45c',4);

  const phase=(time*.55)%1,t=phase*8,x=left+phase*plotW;
  const yBaseline=yFor(response(m.baselineGap,t)),yPolicy=yFor(response(m.gap,t));
  ctx.strokeStyle='#ffffff33';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,top);ctx.lineTo(x,bottom);ctx.stroke();
  [['#77869b',yBaseline],['#ffb45c',yPolicy]].forEach(([color,y])=>{ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=12;ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;});

  ctx.fillStyle='#eef5ff';ctx.textAlign='right';ctx.font=`700 ${w<560?10:12}px ui-monospace,monospace`;
  ctx.fillText(`NO RESPONSE ${signed(m.baselineGap,2)}`,right,top-18);
  ctx.fillStyle='#ffb45c';ctx.fillText(`STABILISED ${signed(m.gap,2)}`,right,top-2);
  ctx.fillStyle='#9eacc0';ctx.textAlign='center';ctx.font='10px ui-monospace,monospace';ctx.fillText('QUARTERS AFTER SHOCK · 衝擊後季度',left+plotW/2,h-22);
  updateOutputs();
});

DemoKit.range('demandShock','demandShockValue',v=>signed(v,1),v=>econState.demand=v);
DemoKit.range('policyRate','policyRateValue',v=>signed(v,1,' pp'),v=>econState.rate=v);
DemoKit.range('credibility','credibilityValue',v=>`${Math.round(v)}%`,v=>econState.credibility=v);
DemoKit.range('stickiness','stickinessValue',v=>v.toFixed(2),v=>econState.stickiness=v);
DemoKit.wireButton(econController);

document.getElementById('resetDemo').addEventListener('click',()=>{
  [['demandShock',initialState.demand],['policyRate',initialState.rate],['credibility',initialState.credibility],['stickiness',initialState.stickiness]].forEach(([id,value])=>{
    const input=document.getElementById(id);input.value=value;input.dispatchEvent(new Event('input'));
  });
  econController.reset();
});
updateOutputs();
