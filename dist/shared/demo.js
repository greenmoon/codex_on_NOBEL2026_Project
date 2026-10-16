(function(){
  const dpr=()=>Math.min(2,window.devicePixelRatio||1);
  function fit(canvas){
    const rect=canvas.getBoundingClientRect(),ratio=dpr();
    const width=Math.max(1,Math.round(rect.width*ratio)),height=Math.max(1,Math.round(rect.height*ratio));
    if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height}
    const ctx=canvas.getContext('2d');ctx.setTransform(ratio,0,0,ratio,0,0);
    return{ctx,width:rect.width,height:rect.height};
  }
  function animator(canvas,draw,{autoplay=true}={}){
    const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches,speed=reducedMotion?.35:1;
    let running=autoplay,time=0,last=performance.now();
    function frame(now){const delta=Math.min(.05,(now-last)/1000);last=now;if(running)time+=delta*speed;const s=fit(canvas);draw(s.ctx,s.width,s.height,time,running);requestAnimationFrame(frame)}
    const observer=new ResizeObserver(()=>{const s=fit(canvas);draw(s.ctx,s.width,s.height,time,running)});observer.observe(canvas);requestAnimationFrame(frame);
    return{toggle(){running=!running;return running},reset(){time=0},redraw(){const s=fit(canvas);draw(s.ctx,s.width,s.height,time,running)},get running(){return running},get reducedMotion(){return reducedMotion}};
  }
  function range(id,outputId,format,onChange){
    const input=document.getElementById(id),output=document.getElementById(outputId);if(!input||!output)return null;
    const sync=()=>{output.value=format(Number(input.value));if(onChange)onChange(Number(input.value))};input.addEventListener('input',sync);input.addEventListener('change',sync);input.addEventListener('pointerup',sync);sync();return input;
  }
  function choices(selector,onChange){
    const buttons=[...document.querySelectorAll(selector)];buttons.forEach(button=>button.addEventListener('click',()=>{buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));onChange(button.dataset.value,button)}));return buttons;
  }
  function clear(ctx,w,h){ctx.clearRect(0,0,w,h);const g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,'#071525');g.addColorStop(1,'#0b2030');ctx.fillStyle=g;ctx.fillRect(0,0,w,h)}
  function metric(id,value){const node=document.getElementById(id);if(node)node.textContent=value}
  function wireButton(controller,id='toggleMotion'){const button=document.getElementById(id);if(!button)return;const render=()=>{button.textContent=controller.running?'Pause 暫停':'Play 播放';button.dataset.motion=controller.running?'running':'paused'};render();button.addEventListener('click',()=>{controller.toggle();render()})}
  window.DemoKit={animator,range,choices,clear,metric,wireButton,clamp:(v,a,b)=>Math.max(a,Math.min(b,v)),lerp:(a,b,t)=>a+(b-a)*t};
})();
(()=>{const source=document.currentScript?.src;if(!source||window.__nobelGlobalNavRequested)return;window.__nobelGlobalNavRequested=true;const script=document.createElement('script');script.src=new URL('global-nav.js',source);document.head.append(script);})();
