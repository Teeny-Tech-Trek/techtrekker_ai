import { useRef, useMemo, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

/* ═══════════════════════════════════════════════════════════════════ */
/*  SEEDED PRNG                                                         */
/* ═══════════════════════════════════════════════════════════════════ */

function seededRng(seed) {
  let s = (seed >>> 0) || 1
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0
    return s / 0x100000000
  }
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  CANVAS 2D HELPERS                                                   */
/* ═══════════════════════════════════════════════════════════════════ */

function rrect(ctx, x, y, w, h, r) {
  const R = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + R, y)
  ctx.lineTo(x + w - R, y)
  ctx.arcTo(x + w, y,     x + w, y + R,     R)
  ctx.lineTo(x + w, y + h - R)
  ctx.arcTo(x + w, y + h, x + w - R, y + h, R)
  ctx.lineTo(x + R, y + h)
  ctx.arcTo(x,     y + h, x, y + h - R,     R)
  ctx.lineTo(x,     y + R)
  ctx.arcTo(x,     y,     x + R, y,         R)
  ctx.closePath()
}

function wrapText(ctx, txt, x, y, maxW, lh) {
  const words = txt.split(' ')
  let line = ''
  for (const word of words) {
    const t = line ? line + ' ' + word : word
    if (ctx.measureText(t).width > maxW && line) {
      ctx.fillText(line, x, y); line = word; y += lh
    } else { line = t }
  }
  ctx.fillText(line, x, y)
}

const TEX_W = 800, TEX_H = 500, TEX_R = 55

/* ═══════════════════════════════════════════════════════════════════ */
/*  FAST GRAIN  (ImageData — ~50× faster than fillRect loop)          */
/* ═══════════════════════════════════════════════════════════════════ */

function fastGrain(ctx, W, H, rng) {
  const tmp = document.createElement('canvas')
  tmp.width = W; tmp.height = H
  const tCtx = tmp.getContext('2d')
  const id   = tCtx.createImageData(W, H)
  const d    = id.data
  for (let i = 0; i < d.length; i += 4) {
    const v  = (rng() * 255) | 0
    d[i] = d[i + 1] = d[i + 2] = v
    d[i + 3] = (rng() * 7) | 0
  }
  tCtx.putImageData(id, 0, 0)
  ctx.save()
  rrect(ctx, 0, 0, W, H, TEX_R)
  ctx.clip()
  ctx.drawImage(tmp, 0, 0)
  ctx.restore()
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  ILLUSTRATIONS                                                       */
/* ═══════════════════════════════════════════════════════════════════ */

function drawPreview(ctx) {
  ctx.save()
  ctx.fillStyle = 'rgba(6,16,44,0.90)'
  rrect(ctx, 548, 138, 234, 334, 12); ctx.fill()
  const sh = ctx.createLinearGradient(548, 138, 782, 180)
  sh.addColorStop(0, 'rgba(147,197,253,0.12)'); sh.addColorStop(1, 'transparent')
  ctx.fillStyle = sh; rrect(ctx, 548, 138, 234, 334, 12); ctx.fill()
  ctx.restore()

  ctx.save()
  ctx.fillStyle = 'rgba(255,255,255,0.08)'; rrect(ctx, 549, 139, 232, 30, 11); ctx.fill()
  ;[[559,154,'#ff6b6b'],[571,154,'#ffd93d'],[583,154,'#6bcb77']].forEach(([x,y,c]) => {
    ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.fillStyle=c; ctx.fill()
  })
  ctx.fillStyle='rgba(147,197,253,0.85)'; ctx.font='600 10px monospace'
  ctx.textAlign='left'; ctx.fillText('workflow.agent.js',598,158)
  ctx.restore()

  const lines=[
    {w:0.72,c:'#93c5fd',i:0},{w:0.46,c:'#86efac',i:14},
    {w:0.83,c:'#93c5fd',i:14},{w:0.34,c:'#f9a8d4',i:14},
    {w:0.60,c:'#fde68a',i:14},{w:0.55,c:'#93c5fd',i:0},
    {w:0.68,c:'#86efac',i:14},{w:0.42,c:'#f9a8d4',i:0},
  ]
  lines.forEach(({w,c,i},idx) => {
    const ly = 184 + idx * 26
    ctx.save()
    ctx.fillStyle='rgba(255,255,255,0.35)'; ctx.font='10px monospace'
    ctx.textAlign='right'; ctx.fillText(idx+1,574,ly+9)
    ctx.fillStyle=c; ctx.fillRect(582+i,ly,Math.round(w*(158-i)),10)
    ctx.globalCompositeOperation='screen'
    ctx.fillStyle=c+'30'; ctx.fillRect(582+i,ly-2,Math.round(w*(158-i)),14)
    ctx.restore()
  })

  ctx.save(); ctx.fillStyle='rgba(59,130,246,0.10)'; ctx.fillRect(549,236,232,26); ctx.restore()

  ctx.save()
  const bG=ctx.createLinearGradient(692,434,770,458)
  bG.addColorStop(0,'rgba(59,130,246,0.95)'); bG.addColorStop(1,'rgba(37,99,235,0.80)')
  ctx.fillStyle=bG; rrect(ctx,692,434,78,24,6); ctx.fill()
  ctx.strokeStyle='rgba(147,197,253,0.50)'; ctx.lineWidth=1; rrect(ctx,692,434,78,24,6); ctx.stroke()
  ctx.fillStyle='#fff'; ctx.font='bold 11px system-ui'; ctx.textAlign='center'; ctx.fillText('▶  RUN',731,450)
  ctx.restore()

  ctx.save()
  ctx.fillStyle='#34d399'; ctx.beginPath(); ctx.arc(562,449,5.5,0,Math.PI*2); ctx.fill()
  ctx.globalCompositeOperation='screen'
  ctx.fillStyle='#34d39960'; ctx.beginPath(); ctx.arc(562,449,13,0,Math.PI*2); ctx.fill()
  ctx.restore()
  ctx.fillStyle='rgba(255,255,255,0.90)'; ctx.font='600 11px system-ui'
  ctx.textAlign='left'; ctx.fillText('ACTIVE',573,453)

  ctx.save(); ctx.strokeStyle='rgba(147,197,253,0.70)'; ctx.lineWidth=1.5
  rrect(ctx,548,138,234,334,12); ctx.stroke(); ctx.restore()
}

function drawCity(ctx, rng) {
  ctx.save()
  const skyG=ctx.createLinearGradient(548,138,548,430)
  skyG.addColorStop(0,'rgba(12,3,40,0.95)'); skyG.addColorStop(1,'rgba(28,6,58,0.78)')
  ctx.fillStyle=skyG; rrect(ctx,548,138,234,334,12); ctx.fill(); ctx.restore()

  for (let i=0;i<28;i++) {
    ctx.save(); ctx.fillStyle=`rgba(200,180,255,${0.25+rng()*0.60})`
    ctx.beginPath(); ctx.arc(558+rng()*214,144+rng()*160,rng()*1.5,0,Math.PI*2); ctx.fill(); ctx.restore()
  }
  const base=410
  const bldgs=[{x:556,h:82,w:28},{x:590,h:122,w:24},{x:620,h:90,w:30},
               {x:656,h:106,w:26},{x:688,h:70,w:28},{x:722,h:114,w:24},{x:752,h:84,w:22}]
  bldgs.forEach(({x,h,w})=>{
    ctx.save()
    const bg=ctx.createLinearGradient(x,base-h,x+w,base)
    bg.addColorStop(0,'rgba(180,70,255,0.95)'); bg.addColorStop(.5,'rgba(120,28,220,0.78)'); bg.addColorStop(1,'rgba(48,6,100,0.52)')
    ctx.fillStyle=bg; ctx.fillRect(x,base-h,w,h)
    for (let wy=base-h+8;wy<base-6;wy+=14)
      for (let wx=x+3;wx<x+w-5;wx+=9)
        if(rng()>0.38){ctx.fillStyle=rng()>.55?'rgba(255,220,100,0.88)':'rgba(170,130,255,0.65)';ctx.fillRect(wx,wy,5,8)}
    ctx.restore()
  })
  ctx.save()
  const hg=ctx.createLinearGradient(548,base,782,base)
  hg.addColorStop(0,'transparent'); hg.addColorStop(.15,'rgba(200,80,255,0.95)')
  hg.addColorStop(.85,'rgba(200,80,255,0.95)'); hg.addColorStop(1,'transparent')
  ctx.strokeStyle=hg; ctx.lineWidth=2.5
  ctx.beginPath(); ctx.moveTo(548,base); ctx.lineTo(782,base); ctx.stroke(); ctx.restore()

  ctx.save(); ctx.globalCompositeOperation='screen'
  const refG=ctx.createLinearGradient(548,base,548,base+60)
  refG.addColorStop(0,'rgba(160,50,255,0.40)'); refG.addColorStop(1,'transparent')
  ctx.fillStyle=refG; ctx.fillRect(548,base,234,60); ctx.restore()

  ctx.save(); ctx.globalCompositeOperation='screen'
  bldgs.forEach(({x,h,w})=>{
    const tg=ctx.createRadialGradient(x+w/2,base-h,0,x+w/2,base-h,26)
    tg.addColorStop(0,'rgba(210,120,255,0.60)'); tg.addColorStop(1,'transparent')
    ctx.fillStyle=tg; ctx.fillRect(x-16,base-h-26,w+32,52)
  })
  ctx.restore()

  ctx.save(); ctx.strokeStyle='rgba(216,180,254,0.82)'; ctx.lineWidth=1.5
  rrect(ctx,548,138,234,334,12); ctx.stroke(); ctx.restore()
}

function drawHouse(ctx, rng) {
  ctx.save()
  const skyG=ctx.createLinearGradient(548,138,548,360)
  skyG.addColorStop(0,'rgba(3,16,30,0.95)'); skyG.addColorStop(1,'rgba(8,38,26,0.65)')
  ctx.fillStyle=skyG; rrect(ctx,548,138,234,334,12); ctx.fill(); ctx.restore()

  ctx.save(); ctx.globalCompositeOperation='screen'
  const mG=ctx.createRadialGradient(722,170,5,722,170,38)
  mG.addColorStop(0,'rgba(225,242,255,0.98)'); mG.addColorStop(.28,'rgba(160,205,255,0.52)'); mG.addColorStop(1,'transparent')
  ctx.fillStyle=mG; ctx.fillRect(686,138,74,74); ctx.restore()

  for (let i=0;i<24;i++){
    ctx.save(); ctx.fillStyle=`rgba(180,215,255,${0.28+rng()*0.58})`
    ctx.beginPath(); ctx.arc(558+rng()*212,142+rng()*148,rng()*1.5,0,Math.PI*2); ctx.fill(); ctx.restore()
  }
  const hx=568,hy=420,hw=142,hh=94
  ctx.save()
  const wG=ctx.createLinearGradient(hx,hy-hh,hx+hw,hy)
  wG.addColorStop(0,'#1c3f28'); wG.addColorStop(1,'#0e2218')
  ctx.fillStyle=wG; ctx.fillRect(hx,hy-hh,hw,hh); ctx.restore()

  ctx.save()
  const rG=ctx.createLinearGradient(hx,hy-hh-56,hx+hw,hy-hh)
  rG.addColorStop(0,'#0c1e16'); rG.addColorStop(1,'#193824'); ctx.fillStyle=rG
  ctx.beginPath(); ctx.moveTo(hx-16,hy-hh); ctx.lineTo(hx+hw/2,hy-hh-56); ctx.lineTo(hx+hw+16,hy-hh); ctx.closePath(); ctx.fill()
  ctx.strokeStyle='rgba(0,210,150,0.38)'; ctx.lineWidth=1.5
  ctx.beginPath(); ctx.moveTo(hx-16,hy-hh); ctx.lineTo(hx+hw/2,hy-hh-56); ctx.lineTo(hx+hw+16,hy-hh); ctx.stroke(); ctx.restore();

  const windows = [[hx+14,hy-hh+14,36,28],[hx+hw-50,hy-hh+14,36,28]]
  windows.forEach(([wx,wy,ww,wh])=>{
    ctx.save()
    const winG=ctx.createRadialGradient(wx+ww/2,wy+wh/2,2,wx+ww/2,wy+wh/2,ww)
    winG.addColorStop(0,'rgba(255,228,110,0.98)'); winG.addColorStop(.6,'rgba(255,162,62,0.78)'); winG.addColorStop(1,'rgba(200,100,30,0.36)')
    ctx.fillStyle=winG; ctx.fillRect(wx,wy,ww,wh)
    ctx.globalCompositeOperation='screen'
    const bG=ctx.createRadialGradient(wx+ww/2,wy+wh/2,2,wx+ww/2,wy+wh/2,36)
    bG.addColorStop(0,'rgba(255,192,62,0.58)'); bG.addColorStop(1,'transparent')
    ctx.fillStyle=bG; ctx.fillRect(wx-22,wy-12,ww+44,wh+28); ctx.restore()
  })

  ctx.save(); ctx.fillStyle='#0a1810'; ctx.fillRect(hx+hw/2-17,hy-40,34,40); ctx.restore()

  ctx.save()
  const gG=ctx.createLinearGradient(548,hy,548,472)
  gG.addColorStop(0,'rgba(18,56,38,0.84)'); gG.addColorStop(1,'rgba(8,26,18,0.95)')
  ctx.fillStyle=gG; ctx.fillRect(548,hy,234,472-hy); ctx.restore()

  ctx.save()
  ctx.shadowColor='rgba(255,255,255,0.3)'; ctx.shadowBlur=6
  ctx.fillStyle='rgba(255,255,255,0.97)'; rrect(ctx,703,348,54,46,5); ctx.fill()
  ctx.shadowBlur=0; ctx.fillStyle='#14532d'; ctx.font='bold 12px system-ui'
  ctx.textAlign='center'; ctx.fillText('FOR',730,368); ctx.fillText('SALE',730,383)
  ctx.strokeStyle='rgba(255,255,255,0.55)'; ctx.lineWidth=2
  ctx.beginPath(); ctx.moveTo(730,394); ctx.lineTo(730,416); ctx.stroke(); ctx.restore()

  ctx.save(); ctx.strokeStyle='rgba(94,234,212,0.82)'; ctx.lineWidth=1.5
  rrect(ctx,548,138,234,334,12); ctx.stroke(); ctx.restore()
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  CARD TEXTURE FACTORY                                                */
/* ═══════════════════════════════════════════════════════════════════ */

function makeCardTexture(cfg) {
  const C = document.createElement('canvas')
  C.width = TEX_W; C.height = TEX_H
  const ctx = C.getContext('2d')
  const rng = seededRng(cfg.seed || 42)

  // 1 — glass background
  ctx.save()
  const bgG=ctx.createLinearGradient(0,0,TEX_W*.8,TEX_H)
  bgG.addColorStop(0,cfg.g0+'f2'); bgG.addColorStop(.48,cfg.g1+'de'); bgG.addColorStop(1,cfg.g2+'ea')
  ctx.fillStyle=bgG; rrect(ctx,0,0,TEX_W,TEX_H,TEX_R); ctx.fill(); ctx.restore()

  // 2 — centre glow
  if (!cfg.disableGlow) {
    ctx.save(); ctx.globalCompositeOperation='screen'
    const cg=ctx.createRadialGradient(TEX_W*.38,TEX_H*.44,10,TEX_W*.38,TEX_H*.44,TEX_W*.52)
    cg.addColorStop(0,cfg.glow+'22'); cg.addColorStop(1,'transparent')
    ctx.fillStyle=cg; ctx.fillRect(0,0,TEX_W,TEX_H); ctx.restore()
  }

  // 3 — top-left shine
  ctx.save(); ctx.globalCompositeOperation='screen'
  const tlG=ctx.createLinearGradient(0,0,TEX_W*.52,TEX_H*.32)
  tlG.addColorStop(0,cfg.shine+'28'); tlG.addColorStop(1,'transparent')
  ctx.fillStyle=tlG; ctx.fillRect(0,0,TEX_W,TEX_H); ctx.restore()

  // 4 — top reflection
  ctx.save()
  const reflG=ctx.createLinearGradient(0,0,0,90)
  reflG.addColorStop(0,cfg.shine+'20'); reflG.addColorStop(1,'transparent')
  ctx.fillStyle=reflG; rrect(ctx,5,5,TEX_W-10,84,TEX_R-4); ctx.fill(); ctx.restore()

  // 5 — bottom vignette
  ctx.save()
  const botG=ctx.createLinearGradient(0,TEX_H-60,0,TEX_H)
  botG.addColorStop(0,'transparent'); botG.addColorStop(1,'rgba(0,0,0,0.25)')
  ctx.fillStyle=botG; ctx.fillRect(0,TEX_H-60,TEX_W,60); ctx.restore()

  // 6 — border
  ctx.save()
  const brdG=ctx.createLinearGradient(0,0,TEX_W,TEX_H)
  brdG.addColorStop(0,cfg.shine+'ee'); brdG.addColorStop(.4,cfg.shine+'55'); brdG.addColorStop(1,cfg.shine+'aa')
  ctx.strokeStyle=brdG; ctx.lineWidth=2.5; rrect(ctx,1.5,1.5,TEX_W-3,TEX_H-3,TEX_R); ctx.stroke(); ctx.restore()

  // 7 — badge
  ctx.save()
  const bdG=ctx.createLinearGradient(570,14,TEX_W-14,48)
  bdG.addColorStop(0,cfg.badgeBg0); bdG.addColorStop(1,cfg.badgeBg1)
  ctx.fillStyle=bdG; rrect(ctx,570,13,TEX_W-584,30,15); ctx.fill()
  ctx.strokeStyle=cfg.shine+'80'; ctx.lineWidth=1; rrect(ctx,570,13,TEX_W-584,30,15); ctx.stroke()
  ctx.fillStyle=cfg.shine; ctx.font='600 11px system-ui,sans-serif'
  ctx.textAlign='center'; ctx.fillText(cfg.badge,570+(TEX_W-584)/2,32); ctx.restore()

  // 8 — icon
  ctx.save()
  const iconG=ctx.createRadialGradient(51,70,4,51,70,34)
  iconG.addColorStop(0,cfg.iconBg1); iconG.addColorStop(1,cfg.iconBg0)
  ctx.fillStyle=iconG; rrect(ctx,22,52,58,58,15); ctx.fill()
  ctx.strokeStyle=cfg.shine+'aa'; ctx.lineWidth=1.5; rrect(ctx,22,52,58,58,15); ctx.stroke()
  ctx.globalCompositeOperation='screen'
  const ig=ctx.createRadialGradient(51,70,2,51,70,28)
  ig.addColorStop(0,cfg.shine+'44'); ig.addColorStop(1,'transparent')
  ctx.fillStyle=ig; ctx.fillRect(16,44,70,72); ctx.restore()
  ctx.save(); ctx.fillStyle=cfg.shine; ctx.font='700 22px system-ui'; ctx.textAlign='center'
  ctx.shadowColor=cfg.shine; ctx.shadowBlur=14; ctx.fillText(cfg.iconChar,51,88); ctx.shadowBlur=0; ctx.restore()

  // 9 — title
  ctx.save()
  ctx.fillStyle='#ffffff'
  ctx.font='800 54px system-ui,sans-serif'
  ctx.textAlign='left'
  ctx.shadowColor=cfg.shine
  ctx.shadowBlur=28
  ctx.fillText(cfg.title,26,188)
  ctx.shadowColor='rgba(255,255,255,0.72)'
  ctx.shadowBlur=8
  ctx.fillText(cfg.title,26,188)
  ctx.restore()

  // 10 — subtitle
  ctx.save()
  ctx.fillStyle='#eaf7ff'
  ctx.font='700 21px system-ui,sans-serif'
  ctx.textAlign='left'
  ctx.shadowColor=cfg.shine
  ctx.shadowBlur=16
  ctx.fillText(cfg.sub,26,220)
  ctx.restore()

  // 11 — description
  ctx.save()
  ctx.fillStyle='rgba(255,255,255,0.95)'
  ctx.font='650 16px system-ui,sans-serif'
  ctx.shadowColor='rgba(255,255,255,0.35)'
  ctx.shadowBlur=8
  wrapText(ctx,cfg.desc,26,258,450,24)
  ctx.restore()

  // 12 — divider
  ctx.save()
  const divG=ctx.createLinearGradient(26,300,500,300)
  divG.addColorStop(0,cfg.shine+'50'); divG.addColorStop(.6,cfg.shine+'20'); divG.addColorStop(1,'transparent')
  ctx.strokeStyle=divG; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(26,300); ctx.lineTo(500,300); ctx.stroke(); ctx.restore()

  // 13 — arrow button
  ctx.save()
  const abG=ctx.createRadialGradient(51,443,5,51,443,28)
  abG.addColorStop(0,cfg.iconBg1); abG.addColorStop(1,cfg.iconBg0)
  ctx.fillStyle=abG; rrect(ctx,22,424,58,58,15); ctx.fill()
  ctx.strokeStyle=cfg.shine+'a8'; ctx.lineWidth=1.5; rrect(ctx,22,424,58,58,15); ctx.stroke()
  ctx.globalCompositeOperation='screen'; ctx.fillStyle=cfg.shine+'28'
  rrect(ctx,22,424,58,58,15); ctx.fill(); ctx.restore()
  ctx.save(); ctx.fillStyle=cfg.shine; ctx.font='bold 22px system-ui'; ctx.textAlign='center'
  ctx.shadowColor=cfg.shine; ctx.shadowBlur=12; ctx.fillText('↗',51,460); ctx.shadowBlur=0; ctx.restore()

  // 14 — illustration
  if (cfg.type==='preview') drawPreview(ctx)
  if (cfg.type==='city')    drawCity(ctx,rng)
  if (cfg.type==='house')   drawHouse(ctx,rng)

  // 15 — grain
  fastGrain(ctx,TEX_W,TEX_H,rng)

  const tex=new THREE.CanvasTexture(C); tex.needsUpdate=true
  return tex
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  CARD DEFINITIONS                                                    */
/* ═══════════════════════════════════════════════════════════════════ */

const CARD_DEFS = [
  {
    w:5.4,h:3.4, pos:[0.2,3.55,0.0], rot:[-0.06,-0.10,0.05],
    emissiveHex:'#071840', emissiveIntensity:0.55,
    edgeColor:'#3b82f6', lightColor:0x3b82f6, glowOpacity:0, lightIntensity:0,
    url:'https://neoscript.techtrekkers.ai/',
    cfg:{ seed:11, g0:'#050c38',g1:'#0c1c70',g2:'#081450',
      glow:'#3b82f6',shine:'#93c5fd',disableGlow:true,
      badgeBg0:'rgba(37,99,235,0.52)',badgeBg1:'rgba(29,78,216,0.22)',badge:'✦  AUTOMATION',
      iconBg0:'rgba(30,64,175,0.28)',iconBg1:'rgba(59,130,246,0.62)',iconChar:'</>',
      title:'Neo Script',sub:'AI Automation Engine',
      desc:'Create, execute, and scale intelligent workflows with autonomous agents.',type:'preview' },
  },
  {
    w:4.9,h:3.06, pos:[-2.05,-0.10,1.8], rot:[0.04,0.20,-0.04],
    emissiveHex:'#120328', emissiveIntensity:0.50,
    edgeColor:'#a855f7', lightColor:0xa855f7, glowOpacity:0.16,
    url:'https://nettwin.techtrekkers.ai/',
    cfg:{ seed:22, g0:'#0c0122',g1:'#1c054c',g2:'#14033a',
      glow:'#a855f7',shine:'#d8b4fe',
      badgeBg0:'rgba(126,34,206,0.52)',badgeBg1:'rgba(88,28,135,0.22)',badge:'⬡  NET TWIN',
      iconBg0:'rgba(76,29,149,0.28)',iconBg1:'rgba(147,51,234,0.62)',iconChar:'⬡',
      title:'Net Twin',sub:'Net Twin Intelligence',
      desc:'Simulate, analyze, and optimize real-world systems.',type:'city' },
  },
  {
    w:4.85,h:3.02, pos:[3.28,0.06,2.8], rot:[0.05,-0.16,0.03],
    emissiveHex:'#011812', emissiveIntensity:0.50,
    edgeColor:'#14b8a6', lightColor:0x14b8a6, glowOpacity:0, lightIntensity:0,
    url:'https://nexestate.techtrekkers.ai/',
    cfg:{ seed:33, g0:'#011410',g1:'#022e24',g2:'#01221a',
      glow:'#14b8a6',shine:'#5eead4',disableGlow:true,
      badgeBg0:'rgba(15,118,110,0.52)',badgeBg1:'rgba(13,148,136,0.22)',badge:'⌂  REAL ESTATE AI',
      iconBg0:'rgba(17,94,89,0.28)',iconBg1:'rgba(20,184,166,0.62)',iconChar:'⌂',
      title:'Nex Estate',sub:'AI Real Estate Agent',
      desc:'Smarter property decisions and a fully automated sales pipeline.',type:'house' },
  },
]

/* ═══════════════════════════════════════════════════════════════════ */
/*  GLOW TEXTURE CACHE                                                  */
/* ═══════════════════════════════════════════════════════════════════ */

const glowTexCache = {}
function getGlowTex(color) {
  if (glowTexCache[color]) return glowTexCache[color]
  const C=document.createElement('canvas'); C.width=C.height=256
  const ctx=C.getContext('2d')
  const g=ctx.createRadialGradient(128,128,8,128,128,128)
  g.addColorStop(0,color+'cc'); g.addColorStop(.35,color+'44'); g.addColorStop(1,'transparent')
  ctx.fillStyle=g; ctx.fillRect(0,0,256,256)
  const t=new THREE.CanvasTexture(C); t.needsUpdate=true
  return (glowTexCache[color]=t)
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  CONNECTION BEAMS  (FIX-v4-E: clamped endpoint, thinner tube)      */
/* ═══════════════════════════════════════════════════════════════════ */

const ORB_Y   = -1.76
const ORB_POS = [0, ORB_Y, 0]

function ConnectionBeam({ startPos, endPos, color }) {
  const matRef = useRef()
  const curve  = useMemo(() => {
    const s = new THREE.Vector3(...startPos)
    const e = new THREE.Vector3(...endPos)
    // mid-point arcs upward — gives cable-like curve
    const m = new THREE.Vector3((s.x+e.x)/2, Math.max(s.y,e.y)+0.4, (s.z+e.z)/2-0.3)
    return new THREE.QuadraticBezierCurve3(s,m,e)
  },[])
  const tubeGeo = useMemo(()=>new THREE.TubeGeometry(curve,24,0.008,5,false),[curve])

  useFrame(({clock})=>{
    if (matRef.current) matRef.current.opacity=0.14+Math.sin(clock.elapsedTime*2.0)*0.10
  })
  return (
    <mesh geometry={tubeGeo} renderOrder={0}>
      <meshBasicMaterial ref={matRef} color={color} transparent opacity={0.18}
        blending={THREE.AdditiveBlending} depthWrite={false}/>
    </mesh>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  CENTRAL ORB                                                         */
/* ═══════════════════════════════════════════════════════════════════ */

function CentralOrb() {
  const gemRef=useRef(), haloRef=useRef()
  useFrame(({clock:{elapsedTime:t}})=>{
    if (gemRef.current){
      gemRef.current.position.y=ORB_Y+Math.sin(t*1.85)*0.092
      gemRef.current.rotation.y=t*0.95; gemRef.current.rotation.x=t*0.45
    }
    if (haloRef.current){
      haloRef.current.scale.setScalar(1+Math.sin(t*2.2)*0.12)
      haloRef.current.material.opacity=0.06+Math.sin(t*2.0)*0.025
    }
  })
  return (
    <group>
      <mesh ref={haloRef} position={ORB_POS} renderOrder={0}>
        <sphereGeometry args={[0.44,16,16]}/>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.10}
          blending={THREE.AdditiveBlending} depthWrite={false}/>
      </mesh>
      <mesh ref={gemRef} position={ORB_POS} renderOrder={1}>
        <octahedronGeometry args={[0.21,0]}/>
        <meshPhysicalMaterial color="#ffffff" emissive="#ffffff"
          emissiveIntensity={0.65} metalness={0.92} roughness={0.04} transparent opacity={0.86}/>
      </mesh>
      <pointLight color="#ffffff" intensity={0} distance={8} position={ORB_POS}/>
    </group>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  PARTICLES                                                           */
/* ═══════════════════════════════════════════════════════════════════ */

function Particles({ count=90 }) {
  const ref=useRef()
  const {initPos,speeds}=useMemo(()=>{
    const rng=seededRng(99)
    const initPos=new Float32Array(count*3),speeds=new Float32Array(count)
    for (let i=0;i<count;i++){
      initPos[i*3]=(rng()-.5)*20; initPos[i*3+1]=(rng()-.5)*13; initPos[i*3+2]=(rng()-.5)*12-1
      speeds[i]=0.30+rng()*0.75
    }
    return {initPos,speeds}
  },[count])
  const livePos=useMemo(()=>initPos.slice(),[initPos])

  useFrame(({clock:{elapsedTime:t}})=>{
    if (!ref.current) return
    const p=ref.current.geometry.attributes.position.array
    for (let i=0;i<count;i++) p[i*3+1]=initPos[i*3+1]+Math.sin(t*speeds[i]+i*1.7)*0.32
    ref.current.geometry.attributes.position.needsUpdate=true
  })
  return (
    <points ref={ref} renderOrder={0}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={livePos} count={count} itemSize={3}/>
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#ffffff" transparent opacity={0.32}
        blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation/>
    </points>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  CARD                                                                */
/*  FIX-v4-A: BoxGeometry (NOT RoundedBox) — correct UV mapping       */
/*  FIX-v4-B: renderOrder layering stops z-fighting / blinking        */
/*  FIX-v4-D: EdgesGeometry on BoxGeometry — no z-fighting with face  */
/* ═══════════════════════════════════════════════════════════════════ */

function Card({ def, phase }) {
  const meshRef=useRef(), haloRef=useRef(), edgesRef=useRef(), lightRef=useRef()
  const [hovered,setHovered]=useState(false)
  const hoverProg=useRef(0), entranceProg=useRef(0), entranceDelay=useRef(Math.min(phase*0.06,0.18))
  const ENTRANCE_DURATION=1

  const texture  = useMemo(()=>makeCardTexture(def.cfg),[def.cfg])
  const edgeGeo  = useMemo(()=>new THREE.BoxGeometry(def.w,def.h,0.052),[def.w,def.h])
  const glowTex  = useMemo(()=>getGlowTex(def.edgeColor),[def.edgeColor])

  useEffect(()=>{
    document.body.style.cursor=hovered?'pointer':''
    return ()=>{ document.body.style.cursor='' }
  },[hovered])

  const openCardUrl = (event) => {
    event.stopPropagation()
    if (!def.url) return
    window.open(def.url, '_blank', 'noopener,noreferrer')
  }

  useFrame(({clock:{elapsedTime:t}},delta)=>{
    if (entranceDelay.current>0) {
      entranceDelay.current=Math.max(0,entranceDelay.current-delta)
    } else {
      entranceProg.current=Math.min(1,entranceProg.current+delta/ENTRANCE_DURATION)
    }
    const ep=1-Math.pow(1-entranceProg.current,3)

    hoverProg.current+=(hovered?1:-1)*0.07
    hoverProg.current=Math.max(0,Math.min(1,hoverProg.current))
    const hp=hoverProg.current

    const dy=Math.sin(t*0.65+phase)*0.09
    const dx=Math.cos(t*0.45+phase)*0.032
    const px=def.pos[0]+dx
    const py=def.pos[1]+dy+(1-ep)*-3.5
    const pz=def.pos[2]+(1-ep)*-14+hp*0.40
    const sc=1+hp*0.032

    if (meshRef.current){
      meshRef.current.position.set(px,py,pz)
      meshRef.current.scale.setScalar(sc)
      meshRef.current.material.emissiveIntensity=def.emissiveIntensity+0.35+hp*0.52
    }
    // Halo stays 0.18 units behind the card face — FIX-v4-B
    if (haloRef.current)  haloRef.current.position.set(px,py,pz-0.18)
    if (edgesRef.current) edgesRef.current.position.set(px,py,pz)
    if (lightRef.current){
      const lightBase=def.lightIntensity ?? 3.5
      lightRef.current.position.set(px,py,pz)
      lightRef.current.intensity=lightBase === 0 ? 0 : lightBase+hp*4.5
    }
  })

  return (
    <>
      {/*
        FIX-v4-B halo: renderOrder=1, depthTest={false}
        Prevents sorting fight with card mesh.
      */}
      <mesh ref={haloRef} position={def.pos} rotation={def.rot} renderOrder={1}>
        <planeGeometry args={[def.w*1.85,def.h*1.85]}/>
        <meshBasicMaterial map={glowTex} transparent opacity={def.glowOpacity}
          blending={THREE.AdditiveBlending} depthWrite={false} depthTest={false}/>
      </mesh>

      {/*
        FIX-v4-A: BoxGeometry (reverted from RoundedBox).
        BoxGeometry maps the 800×500 canvas texture correctly to the front face.
        RoundedBox has a custom UV layout that broke the texture mapping.
        renderOrder=2 ensures card renders on top of its halo.
      */}
      <mesh
        ref={meshRef}
        position={def.pos}
        rotation={def.rot}
        castShadow
        receiveShadow
        renderOrder={2}
        onPointerOver={(e)=>{ e.stopPropagation(); setHovered(true) }}
        onPointerOut={()=>setHovered(false)}
        onClick={openCardUrl}
      >
        <boxGeometry args={[def.w,def.h,0.048]}/>
        <meshPhysicalMaterial
          map={texture}
          color={0xffffff}
          emissive="#ffffff"
          emissiveMap={texture}
          emissiveIntensity={def.emissiveIntensity + 0.35}
          metalness={0.06} roughness={0.04}
          transmission={0.02} thickness={0.03}
          transparent opacity={0.98}
          envMapIntensity={1.5}
        />
      </mesh>

      {/*
        FIX-v4-D: EdgesGeometry on BoxGeometry (reverted from RoundedEdgeLine).
        renderOrder=3 keeps it on top of both halo and card face.
      */}
      <lineSegments ref={edgesRef} position={def.pos} rotation={def.rot} renderOrder={3}>
        <edgesGeometry args={[edgeGeo]}/>
        <lineBasicMaterial color={def.edgeColor} transparent opacity={0.88}
          blending={THREE.AdditiveBlending} depthWrite={false}/>
      </lineSegments>

      <pointLight ref={lightRef} color={def.lightColor} intensity={def.lightIntensity ?? 3.5} distance={7} position={def.pos}/>
    </>
  )
}

/* ── Cards group — idle sway ── */
function Cards() {
  const groupRef=useRef()
  useFrame(({clock})=>{
    if (groupRef.current) groupRef.current.rotation.y=Math.sin(clock.elapsedTime*0.11)*0.042
  })
  return (
    <group ref={groupRef}>
      {CARD_DEFS.map((def,i)=><Card key={i} def={def} phase={i*1.3}/>)}
    </group>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  PLATFORM                                                            */
/* ═══════════════════════════════════════════════════════════════════ */

const PLATFORM_Y=-2.32

function Platform() {
  const rimRef=useRef(),rim2Ref=useRef(),glowRef=useRef()
  const s1=useRef(),s2=useRef(),s3=useRef()
  useFrame(({clock:{elapsedTime:t}})=>{
    if (rimRef.current)  rimRef.current.material.opacity=0.12+Math.sin(t*1.40)*.04
    if (rim2Ref.current) rim2Ref.current.material.opacity=0.06+Math.sin(t*0.88+1)*.02
    if (glowRef.current) glowRef.current.material.opacity=0
    if (s1.current) s1.current.rotation.z= t*0.22
    if (s2.current) s2.current.rotation.z=-t*0.16
    if (s3.current) s3.current.rotation.z= t*0.32
  })
  return (
    <group>
      <mesh position={[0,PLATFORM_Y,0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.55,2.85,0.22,96]}/>
        <meshPhysicalMaterial color={0x04071c} metalness={0.95} roughness={0.10} emissive={0x000d40} emissiveIntensity={0.28}/>
      </mesh>
      <mesh position={[0,-2.20,0]} rotation={[-Math.PI/2,0,0]}>
        <circleGeometry args={[2.45,96]}/>
        <meshBasicMaterial color={0xffffff} transparent opacity={0.04} blending={THREE.AdditiveBlending} depthWrite={false}/>
      </mesh>
      {[[1.48,1.52,0xffffff,0.08],[2.08,2.12,0xffffff,0.06]].map(([i,o,c,op],k)=>(
        <mesh key={k} position={[0,-2.19,0]} rotation={[-Math.PI/2,0,0]}>
          <ringGeometry args={[i,o,96]}/>
          <meshBasicMaterial color={c} transparent opacity={op} blending={THREE.AdditiveBlending} depthWrite={false}/>
        </mesh>
      ))}
      {[[s1,1.80,1.82,0xffffff,0.04],[s2,2.20,2.22,0xffffff,0.04],[s3,1.30,1.31,0xffffff,0.05]].map(([r,i,o,c,op],k)=>(
        <mesh key={k} ref={r} position={[0,-2.18,0]} rotation={[-Math.PI/2,0,0]}>
          <ringGeometry args={[i,o,48]}/>
          <meshBasicMaterial color={c} transparent opacity={op} blending={THREE.AdditiveBlending} depthWrite={false}/>
        </mesh>
      ))}
      <mesh ref={rimRef} position={[0,-2.19,0]} rotation={[Math.PI/2,0,0]}>
        <torusGeometry args={[2.50,0.040,16,160]}/>
        <meshBasicMaterial color={0xffffff} transparent opacity={0.16} blending={THREE.AdditiveBlending}/>
      </mesh>
      <mesh ref={rim2Ref} position={[0,-2.18,0]} rotation={[Math.PI/2,0,0]}>
        <torusGeometry args={[1.78,0.026,12,120]}/>
        <meshBasicMaterial color={0xffffff} transparent opacity={0.08} blending={THREE.AdditiveBlending}/>
      </mesh>
      <mesh ref={glowRef} position={[0,-2.17,0]} rotation={[Math.PI/2,0,0]}>
        <torusGeometry args={[2.50,0.46,8,160]}/>
        <meshBasicMaterial color={0xffffff} transparent opacity={0} blending={THREE.AdditiveBlending}/>
      </mesh>
      <mesh position={[0,-2.06,0]}>
        <cylinderGeometry args={[0.075,0.115,0.52,16]}/>
        <meshPhysicalMaterial color={0x0a1540} metalness={0.92} roughness={0.14} emissive={0x000000} emissiveIntensity={0.08}/>
      </mesh>
      <CentralOrb/>
      {/* FIX-v4-E: beam endpoint kept within reasonable range */}
      {CARD_DEFS.map((def,i)=>(
        <ConnectionBeam key={i} startPos={ORB_POS}
          endPos={[def.pos[0]*0.6, def.pos[1]-def.h/2+0.2, def.pos[2]*0.5]}
          color={def.edgeColor}/>
      ))}
      <pointLight color={0xffffff} intensity={0} distance={9} position={[0,-2.5,0]}/>
    </group>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  LIGHTS                                                              */
/* ═══════════════════════════════════════════════════════════════════ */

function Lights() {
  const blRef=useRef(),plRef=useRef()
  useFrame(({clock:{elapsedTime:t}})=>{
    if (blRef.current){blRef.current.position.x=4.8+Math.sin(t*.26)*2.2; blRef.current.position.z=Math.cos(t*.26)*3.2+2}
    if (plRef.current){plRef.current.position.x=-4.5+Math.cos(t*.20)*1.8; plRef.current.position.z=Math.sin(t*.20)*3.2+1}
  })
  return (
    <>
      <ambientLight color={0x07102c} intensity={5.2}/>
      <pointLight ref={blRef} color={0xffffff} intensity={6} distance={24} position={[4.8,6,3]}
        castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024}/>
      <pointLight ref={plRef} color={0x7733ff} intensity={11} distance={18} position={[-4.5,2.5,1]}/>
      <pointLight color={0xffffff} intensity={0} distance={20} position={[0,-0.5,-8]}/>
      <directionalLight color={0xffffff} intensity={1.8} position={[2,10,5]} castShadow
        shadow-mapSize-width={1024} shadow-mapSize-height={1024}
        shadow-camera-left={-12} shadow-camera-right={12}
        shadow-camera-top={12} shadow-camera-bottom={-12}/>
      <pointLight color={0xffffff} intensity={0} distance={14} position={[0,11,0]}/>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  SCENE FOG + RESPONSIVE CAMERA                                       */
/* ═══════════════════════════════════════════════════════════════════ */

function SceneFog() {
  const {scene}=useThree()
  useEffect(()=>{ scene.fog=new THREE.FogExp2(0x020818,0.038); return ()=>{ scene.fog=null } },[scene])
  return null
}

/* ── Content bounding box the camera auto-fits into ──
   Sirf yeh 4 numbers tweak karne hain agar kabhi cards bade/chhote ya
   framing alag chahiye. Camera ka distance viewport ke aspect-ratio se
   recompute hota hai — isliye KISI bhi width pe koi card cut nahi hota
   aur extra khaali space minimum rehta hai.
   - Zyada space lage (cards chhote) → FIT_HALF_W / FIT_HALF_H thoda KAM karo.
   - Card kat raha ho       → FIT_HALF_W / FIT_HALF_H thoda BADHA do. */
const FIT_CENTER  = [1.6, 1.0, 0.6]   // [x, y, z] — 3 cards ka visual centre
const FIT_HALF_W  = 6.0               // horizontal half-extent to frame
const FIT_HALF_H  = 4.4               // vertical half-extent to frame
const FIT_PADDING = 1.08              // 8% breathing room

function FitCamera() {
  const {camera,size}=useThree()
  useEffect(()=>{
    const w = size.width
    // fov thoda device ke hisaab se vary karta hai taaki look consistent rahe
    let fov
    if (w < 480)       fov = 62
    else if (w < 900)  fov = 56
    else if (w < 1440) fov = 50
    else               fov = 44
    camera.fov = fov

    const aspect = w / Math.max(1, size.height)
    const vFov   = (fov * Math.PI) / 180
    const distH  = FIT_HALF_H / Math.tan(vFov / 2)
    const hFov   = 2 * Math.atan(Math.tan(vFov / 2) * aspect)
    const distW  = FIT_HALF_W / Math.tan(hFov / 2)
    const dist   = Math.max(distH, distW) * FIT_PADDING

    camera.position.set(FIT_CENTER[0] + 0.05, FIT_CENTER[1] + 1.3, FIT_CENTER[2] + dist)
    camera.updateProjectionMatrix()
  },[size.width,size.height,camera])
  return null
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  SCENE GROUP — mouse parallax + scroll                              */
/* ═══════════════════════════════════════════════════════════════════ */

const SCENE_OFFSET = [1.1, 0, 0]

function SceneGroup({ mouse, scroll }) {
  const groupRef=useRef(), smoothScroll=useRef(0)
  useFrame(()=>{  
    if (!groupRef.current) return
    smoothScroll.current+=(scroll.current-smoothScroll.current)*0.055
    const ss=smoothScroll.current
    const tRY= mouse.current.x*0.075
    const tRX=-mouse.current.y*0.045+ss*-0.28
    groupRef.current.rotation.y+=(tRY-groupRef.current.rotation.y)*0.048
    groupRef.current.rotation.x+=(tRX-groupRef.current.rotation.x)*0.048
    groupRef.current.position.y+=(ss*-2.2-groupRef.current.position.y)*0.055
  })
  return (
    <group ref={groupRef} position={SCENE_OFFSET}>
      <Cards/>
      <Platform/>
      <Particles/>
    </group>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  LOADING SHIMMER                                                     */
/* ═══════════════════════════════════════════════════════════════════ */

function LoadingShimmer() {
  return (
    <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',
      justifyContent:'center',gap:'18px',pointerEvents:'none',zIndex:10}}>
      {[
        {w:'260px',h:'162px',delay:'0s',   rgb:'59,130,246'},
        {w:'240px',h:'150px',delay:'0.18s',rgb:'168,85,247'},
        {w:'236px',h:'148px',delay:'0.36s',rgb:'20,184,166'},
      ].map(({w,h,delay,rgb},i)=>(
        <div key={i} style={{width:w,height:h,borderRadius:'14px',
          border:`1px solid rgba(${rgb},0.30)`,
          background:`linear-gradient(120deg,rgba(${rgb},0.06) 0%,rgba(${rgb},0.16) 50%,rgba(${rgb},0.06) 100%)`,
          backgroundSize:'300% 100%',
          animation:`_c3d_sh 1.8s ease-in-out ${delay} infinite`}}/>
      ))}
      <style>{`@keyframes _c3d_sh{0%{background-position:300% 0}100%{background-position:-300% 0}}`}</style>
    </div>
  )
}

function SceneReady({ onReady }) {
  const didReport=useRef(false)
  useFrame(()=>{
    if (didReport.current) return
    didReport.current=true
    requestAnimationFrame(()=>onReady?.())
  })
  return null
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  MAIN EXPORT                                                         */
/* ═══════════════════════════════════════════════════════════════════ */

export default function Cards3D({ height='100%', onReady }={}) {
  const containerRef = useRef(null)
  const mouse  = useRef({x:0,y:0})
  const scroll = useRef(0)
  const [loaded,setLoaded] = useState(false)
  const [isVisible,setIsVisible] = useState(true)
  const didNotifyReady = useRef(false)

  useEffect(()=>{
    const container = containerRef.current
    if (!container || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      ([entry])=>setIsVisible(entry.isIntersecting),
      { rootMargin:'220px 0px', threshold:0.01 }
    )
    observer.observe(container)
    return ()=>observer.disconnect()
  },[])

  useEffect(()=>{
    const onMove=(e)=>{
      mouse.current.x= (e.clientX/window.innerWidth -0.5)*2
      mouse.current.y=-(e.clientY/window.innerHeight-0.5)*2
    }
    const onTouch=(e)=>{
      const t=e.touches[0]; if (!t) return
      mouse.current.x= (t.clientX/window.innerWidth -0.5)*2
      mouse.current.y=-(t.clientY/window.innerHeight-0.5)*2
    }
    const onScroll=()=>{
      const max=document.documentElement.scrollHeight-window.innerHeight
      scroll.current=max>0?Math.min(1,window.scrollY/max):0
    }
    window.addEventListener('mousemove',onMove,  {passive:true})
    window.addEventListener('touchmove',onTouch, {passive:true})
    window.addEventListener('scroll',   onScroll,{passive:true})
    return ()=>{
      window.removeEventListener('mousemove',onMove)
      window.removeEventListener('touchmove',onTouch)
      window.removeEventListener('scroll',   onScroll)
    }
  },[])

  const handleSceneReady=()=>{
    setLoaded(true)
    if (!didNotifyReady.current){
      didNotifyReady.current=true
      onReady?.()
    }
  }

  return (
    <div ref={containerRef} style={{width:'100%',height,position:'absolute',inset:0,overflow:'hidden',background:'transparent'}}>

      {!loaded && <LoadingShimmer/>}

      <Canvas
        shadows
        dpr={[1,2]}
        frameloop={isVisible ? 'always' : 'demand'}
        camera={{position:[1.2,2.2,11.5],fov:60,near:0.1,far:120}}
        style={{width:'100%',height:'100%',background:'transparent'}}
        gl={{antialias:true,alpha:true,toneMapping:THREE.ACESFilmicToneMapping,toneMappingExposure:1.65}}
        onCreated={({gl})=>{ gl.setClearColor(0x000000,0) }}
      >
        <Suspense fallback={null}>
          <SceneFog/>
          <FitCamera/>
          <Lights/>
          <SceneGroup mouse={mouse} scroll={scroll}/>

          <EffectComposer>
            <Bloom intensity={1.85} luminanceThreshold={0.14} luminanceSmoothing={0.9} mipmapBlur/>
          </EffectComposer>
          <SceneReady onReady={handleSceneReady}/>
        </Suspense>

        {/*
          FIX-v4-C: OrbitControls back.
          enableDamping + dampingFactor for smooth inertia.
          target centred on scene offset so orbiting feels natural.
          Zoom clamped 6-18 to prevent clipping.
        */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.07}
          minDistance={4}
          maxDistance={40}
          minPolarAngle={Math.PI * 0.25}
          maxPolarAngle={Math.PI * 0.75}
          target={FIT_CENTER}
        />
      </Canvas>
    </div>
  )
}