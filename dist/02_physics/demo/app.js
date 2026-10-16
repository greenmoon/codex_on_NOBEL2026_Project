const iceState = {
  view: 'cone',
  topology: 'track',
  energy: 5,
  zenith: 120,
  depth: 2000,
  clarity: 100,
  threshold: 100,
  beta: 0.999,
  refractiveIndex: 1.32,
  scatteringLength: 35,
  absorptionLength: 100
};

function energyLabel(log) {
  const gev = Math.pow(10, log);
  if (gev >= 1e6) return `${(gev / 1e6).toFixed(1)} PeV`;
  if (gev >= 1e3) return `${(gev / 1e3).toFixed(1)} TeV`;
  return `${Math.round(gev)} GeV`;
}

function cherenkovInfo() {
  const product = iceState.beta * iceState.refractiveIndex;
  const active = product > 1;
  const angleRad = active ? Math.acos(1 / product) : 0;
  const yieldFactor = active ? 1 - 1 / (product * product) : 0;
  return {
    product,
    active,
    angleRad,
    angleDeg: angleRad * 180 / Math.PI,
    iceLightSpeed: 1 / iceState.refractiveIndex,
    survival100m: Math.exp(-100 / iceState.absorptionLength),
    yieldFactor
  };
}

function iceMetrics() {
  const power = DemoKit.clamp((iceState.energy - 1.7) / 5.3, 0, 1);
  const clarity = iceState.clarity / 100;
  const threshold = iceState.threshold / 100;
  const topology = iceState.topology === 'track' ? 1 : 0.72;
  const c = cherenkovInfo();
  const defaultYield = 1 - 1 / Math.pow(0.999 * 1.32, 2);
  const lightFactor = DemoKit.clamp(c.yieldFactor / defaultYield, 0, 1.35);
  const absorptionFactor = c.survival100m / Math.exp(-1);
  const scatteringFactor = DemoKit.clamp(Math.sqrt(iceState.scatteringLength / 35), 0.55, 1.5);
  const hits = Math.round(DemoKit.clamp((32 + power * 720) * clarity * topology * lightFactor * Math.sqrt(absorptionFactor * scatteringFactor) / Math.sqrt(threshold), 0, 1100));
  const pe = c.active ? (0.18 + Math.pow(10, power * 3.9)) * clarity * lightFactor * absorptionFactor / Math.sqrt(threshold) : 0;
  const error = hits === 0 ? 99 : (iceState.topology === 'track' ? 0.18 : 3.2) + (iceState.topology === 'track' ? 11 : 35) / Math.sqrt(Math.max(4, hits));
  return { power, hits, pe, error, cherenkov: c };
}

function updateMetrics() {
  const c = cherenkovInfo();
  const m = iceMetrics();
  const banner = document.getElementById('thresholdBanner');
  DemoKit.metric('thresholdStatus', c.active ? 'CHERENKOV ON · 產生光錐' : 'BELOW THRESHOLD · 未產生光錐');
  DemoKit.metric('thresholdEquation', `βn = ${c.product.toFixed(3)} ${c.active ? '>' : '≤'} 1`);
  banner.classList.toggle('is-off', !c.active);
  DemoKit.metric('iceLightSpeed', `${c.iceLightSpeed.toFixed(3)}c`);
  DemoKit.metric('coneAngle', c.active ? `${c.angleDeg.toFixed(1)}°` : '—');
  DemoKit.metric('photonSurvival', `${(c.survival100m * 100).toFixed(1)}%`);
  DemoKit.metric('hitDOMs', m.hits.toLocaleString());
  DemoKit.metric('totalPE', m.pe >= 1000 ? `${(m.pe / 1000).toFixed(1)}k PE` : `${m.pe.toFixed(1)} PE`);
  DemoKit.metric('angularError', m.error >= 99 ? '—' : `${m.error.toFixed(1)}°`);
}

function iceColor(q) {
  return q < 0.34 ? '#ff6b5f' : q < 0.67 ? '#78ef9e' : '#66a7ff';
}

function drawArrow(ctx, x1, y1, x2, y2, color) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 10 * Math.cos(angle - 0.45), y2 - 10 * Math.sin(angle - 0.45));
  ctx.lineTo(x2 - 10 * Math.cos(angle + 0.45), y2 - 10 * Math.sin(angle + 0.45));
  ctx.closePath();
  ctx.fill();
}

function drawConeView(ctx, w, h, t) {
  const c = cherenkovInfo();
  const midY = h * 0.52;
  const particleX = w * 0.72;
  const left = Math.max(34, w * 0.08);
  const right = w - left;
  const phase = (t * 0.45) % 1;

  ctx.strokeStyle = '#29405c';
  ctx.lineWidth = 1;
  for (let i = 1; i < 5; i++) {
    const y = h * i / 5;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
  }

  drawArrow(ctx, left, midY, right, midY, '#92a4bb');
  ctx.fillStyle = '#9eacc0';
  ctx.font = '12px ui-monospace, monospace';
  ctx.fillText('CHARGED SECONDARY · 帶電次級粒子', left, midY - 18);

  const waveSpeedScale = c.iceLightSpeed / iceState.beta;
  for (let i = 1; i <= 6; i++) {
    const age = (i + phase) / 7;
    const sourceX = particleX - age * w * 0.52;
    const radius = age * w * 0.52 * waveSpeedScale;
    ctx.strokeStyle = `rgba(114,166,255,${0.12 + (1 - age) * 0.22})`;
    ctx.beginPath();
    ctx.arc(sourceX, midY, Math.max(2, radius), 0, Math.PI * 2);
    ctx.stroke();
  }

  if (c.active) {
    const coneLength = Math.min(w * 0.60, (h * 0.40) / Math.max(0.12, Math.tan(c.angleRad)));
    const endX = particleX - coneLength;
    const spread = coneLength * Math.tan(c.angleRad);
    const gradient = ctx.createLinearGradient(particleX, midY, endX, midY);
    gradient.addColorStop(0, 'rgba(114,166,255,.26)');
    gradient.addColorStop(1, 'rgba(114,166,255,.02)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(particleX, midY);
    ctx.lineTo(endX, midY - spread);
    ctx.lineTo(endX, midY + spread);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#72a6ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(particleX, midY);
    ctx.lineTo(endX, midY - spread);
    ctx.moveTo(particleX, midY);
    ctx.lineTo(endX, midY + spread);
    ctx.stroke();

    const scatterStrength = 1 - DemoKit.clamp((iceState.scatteringLength - 10) / 70, 0, 1);
    for (let side = -1; side <= 1; side += 2) {
      for (let i = 0; i < 13; i++) {
        const p = (i / 13 + phase) % 1;
        const distancePx = p * coneLength;
        const distanceM = p * 150;
        const jitter = Math.sin(i * 8.17 + t * 2.2) * 13 * scatterStrength * p;
        const x = particleX - distancePx;
        const y = midY + side * distancePx * Math.tan(c.angleRad) + jitter;
        const survival = Math.exp(-distanceM / iceState.absorptionLength);
        ctx.globalAlpha = 0.18 + 0.82 * survival;
        ctx.fillStyle = Math.abs(jitter) > 3 ? '#78ef9e' : '#72a6ff';
        ctx.beginPath();
        ctx.arc(x, y, 2.2 + survival * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = '#eef5ff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(particleX, midY, 42, Math.PI - c.angleRad, Math.PI + c.angleRad);
    ctx.stroke();
    ctx.fillStyle = '#eef5ff';
    ctx.font = '700 13px ui-monospace, monospace';
    ctx.fillText(`θᴄ ${c.angleDeg.toFixed(1)}°`, particleX - 91, midY - 9);
  } else {
    ctx.fillStyle = '#ff9b91';
    ctx.font = '700 15px ui-monospace, monospace';
    ctx.fillText('NO CONE · 未達門檻', left, h * 0.22);
  }

  ctx.shadowBlur = 18;
  ctx.shadowColor = '#eef5ff';
  ctx.fillStyle = '#eef5ff';
  ctx.beginPath();
  ctx.arc(particleX, midY, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#d7e3f2';
  ctx.font = '12px ui-monospace, monospace';
  ctx.fillText(`v = ${iceState.beta.toFixed(3)}c`, Math.min(particleX + 12, w - 102), midY + 5);
  ctx.fillText(`c/n = ${c.iceLightSpeed.toFixed(3)}c`, left, h - 24);
}

function drawDetectorView(ctx, w, h, t) {
  const m = iceMetrics();
  const phase = (t * 0.24) % 1;
  const scale = Math.min(w * 0.42, h * 0.48);
  const cx = w * 0.5;
  const top = h * 0.17;
  const vertical = h * 0.66;
  function project(x, z) {
    return { x: cx + (x - z) * scale * 0.72, y: top + (x + z) * scale * 0.22 };
  }

  const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, z]) => project(x, z));
  ctx.strokeStyle = '#4c638055';
  ctx.lineWidth = 1;
  ctx.beginPath();
  corners.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  corners.forEach((p, i) => {
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x, p.y + vertical);
    ctx.lineTo(corners[(i + 1) % 4].x, corners[(i + 1) % 4].y + vertical);
  });
  ctx.stroke();

  const depthY = DemoKit.clamp((iceState.depth - 1450) / 1000, 0, 1);
  const angle = (iceState.zenith - 90) * Math.PI / 180;
  const vx = Math.cos(angle);
  const vy = Math.sin(angle);
  const eventX = cx;
  const eventY = top + depthY * vertical;

  if (m.cherenkov.active && iceState.topology === 'track') {
    const coneLength = Math.min(w, h) * 0.28;
    const theta = m.cherenkov.angleRad;
    const e1 = angle + Math.PI - theta;
    const e2 = angle + Math.PI + theta;
    ctx.fillStyle = 'rgba(114,166,255,.12)';
    ctx.strokeStyle = 'rgba(114,166,255,.65)';
    ctx.beginPath();
    ctx.moveTo(eventX, eventY);
    ctx.lineTo(eventX + Math.cos(e1) * coneLength, eventY + Math.sin(e1) * coneLength);
    ctx.lineTo(eventX + Math.cos(e2) * coneLength, eventY + Math.sin(e2) * coneLength);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  for (let gx = -3; gx <= 3; gx++) {
    for (let gz = -3; gz <= 3; gz++) {
      const p = project(gx / 3, gz / 3);
      ctx.strokeStyle = '#30445f77';
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x, p.y + vertical);
      ctx.stroke();
      for (let j = 0; j < 10; j++) {
        const y = p.y + vertical * j / 9;
        const dx = p.x - eventX;
        const dy = y - eventY;
        const distance = iceState.topology === 'track' ? Math.abs(dx * vy - dy * vx) : Math.hypot(dx, dy);
        const reach = m.cherenkov.active ? (iceState.topology === 'track' ? w * 0.15 : w * 0.24) * (0.25 + 0.75 * m.power) * iceState.clarity / 100 : 0;
        const hit = distance < reach;
        const arrival = DemoKit.clamp(distance / Math.max(1, reach), 0, 1);
        const wave = Math.abs(arrival - phase) < 0.12;
        ctx.fillStyle = hit ? iceColor(arrival) : '#41516a';
        ctx.globalAlpha = hit ? (wave ? 1 : 0.58) : 0.35;
        ctx.shadowBlur = wave ? 14 : 0;
        ctx.shadowColor = ctx.fillStyle;
        ctx.beginPath();
        ctx.arc(p.x, y, hit ? (wave ? 4.5 : 2.8) : 1.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }
  }

  ctx.lineWidth = 3;
  ctx.strokeStyle = m.cherenkov.active ? '#f2f7ff' : '#ff8d83';
  ctx.shadowBlur = m.cherenkov.active ? 12 : 0;
  ctx.shadowColor = '#72a6ff';
  ctx.beginPath();
  if (iceState.topology === 'track') {
    ctx.moveTo(eventX - vx * w * 0.55, eventY - vy * w * 0.55);
    ctx.lineTo(eventX + vx * w * 0.55, eventY + vy * w * 0.55);
  } else {
    ctx.arc(eventX, eventY, 18 + phase * w * 0.18, 0, Math.PI * 2);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#f2f7ff';
  ctx.beginPath();
  ctx.arc(eventX, eventY, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#9eacc0';
  ctx.font = '11px ui-monospace, monospace';
  ctx.fillText(`${iceState.topology.toUpperCase()} · ${energyLabel(iceState.energy)} · ${iceState.depth} m`, 18, h - 22);
}

const iceController = DemoKit.animator(document.getElementById('icecubeCanvas'), (ctx, w, h, t) => {
  DemoKit.clear(ctx, w, h);
  if (iceState.view === 'cone') drawConeView(ctx, w, h, t);
  else drawDetectorView(ctx, w, h, t);
  updateMetrics();
});

function setView(view) {
  iceState.view = view;
  document.querySelectorAll('[data-controls]').forEach(node => { node.hidden = node.dataset.controls !== view; });
  document.querySelectorAll('[data-output]').forEach(node => { node.hidden = node.dataset.output !== view; });
  const cone = view === 'cone';
  DemoKit.metric('viewDescription', cone ? '2D explains the threshold and 41° cone · 2D 解釋門檻與 41° 光錐' : '3D shows DOM timing across the ice · 3D 顯示 DOM 的空間時間差');
  DemoKit.metric('stageLabel', cone ? 'CHERENKOV GEOMETRY · 2D 光錐' : 'ICECUBE VOLUME · 3D 偵測器');
  DemoKit.metric('controlSubtitle', cone ? 'Change the threshold and cone · 改變門檻與光錐' : 'Reconstruct one event · 重建單一事件');
  const legend = document.getElementById('stageLegend');
  legend.innerHTML = cone
    ? '<span><i style="--legend:#f8fbff"></i>particle 粒子</span><span><i style="--legend:#72a6ff"></i>direct 直達光</span><span><i style="--legend:#78ef9e"></i>scattered 散射光</span>'
    : '<span><i style="--legend:#ff6b5f"></i>early 早</span><span><i style="--legend:#78ef9e"></i>middle 中</span><span><i style="--legend:#66a7ff"></i>late 晚</span>';
  document.getElementById('icecubeCanvas').setAttribute('aria-label', cone ? 'Animated 2D Cherenkov threshold and cone geometry' : 'Animated 3D projected IceCube detector with timed DOM hits');
  iceController.reset();
}

DemoKit.choices('[data-choice="view"] button', setView);
DemoKit.choices('[data-choice="topology"] button', value => { iceState.topology = value; iceController.reset(); });
DemoKit.range('beta', 'betaValue', value => `${value.toFixed(3)}c`, value => { iceState.beta = value; iceController.reset(); });
DemoKit.range('refractiveIndex', 'refractiveIndexValue', value => value.toFixed(2), value => { iceState.refractiveIndex = value; iceController.reset(); });
DemoKit.range('scatteringLength', 'scatteringLengthValue', value => `${value} m`, value => { iceState.scatteringLength = value; iceController.reset(); });
DemoKit.range('absorptionLength', 'absorptionLengthValue', value => `${value} m`, value => { iceState.absorptionLength = value; iceController.reset(); });
DemoKit.range('energy', 'energyValue', energyLabel, value => { iceState.energy = value; iceController.reset(); });
DemoKit.range('zenith', 'zenithValue', value => `${value}°`, value => { iceState.zenith = value; iceController.reset(); });
DemoKit.range('depth', 'depthValue', value => `${value} m`, value => { iceState.depth = value; iceController.reset(); });
DemoKit.range('clarity', 'clarityValue', value => `${(value / 100).toFixed(2)}×`, value => { iceState.clarity = value; iceController.reset(); });
DemoKit.range('threshold', 'thresholdValue', value => `${(value / 100).toFixed(2)} PE`, value => { iceState.threshold = value; iceController.reset(); });
DemoKit.wireButton(iceController);
function setConePreset(beta, refractiveIndex, scatteringLength, absorptionLength) {
  const values = { beta, refractiveIndex, scatteringLength, absorptionLength };
  Object.entries(values).forEach(([id, value]) => {
    const input = document.getElementById(id);
    input.value = String(value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  iceController.reset();
}
document.getElementById('belowThreshold').addEventListener('click', () => setConePreset(0.72, 1.32, 35, 100));
document.getElementById('iceDefault').addEventListener('click', () => setConePreset(0.999, 1.32, 35, 100));
document.getElementById('resetDemo').addEventListener('click', () => iceController.reset());
setView('cone');
updateMetrics();
