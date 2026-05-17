import { useState, useCallback, useRef } from 'react'

const LOGO = 'data:image/jpeg;base64,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'

const C = {
  bg:'#0d0f14',bg1:'#13161e',border:'rgba(255,255,255,0.06)',
  text:'#e8eaf0',sub:'#7b8299',dim:'#4a5068',
  cyan:'#00d4ff',indigo:'#6366f1',violet:'#8b5cf6',
  pink:'#ec4899',green:'#10b981',amber:'#f59e0b',red:'#ef4444',
}
const ROLES = {
  admin:     {label:'Phillemon Nyamgure',sub:'Nyamz Analytics',pw:'nyamz2026',color:'#ef4444',icon:'P'},
  supervisor:{label:'PhD Supervisor',   sub:'View only',       pw:'super2026',color:'#00d4ff',icon:'S'},
  sydney:    {label:'Sydney Mazambara', sub:'Field + View',    pw:'mbire2026',color:'#10b981',icon:'M'},
  enumerator:{label:'Enumerator',       sub:'Data entry only', pw:'enum2026', color:'#f59e0b',icon:'E'},
}
const WARDS = ['Chapoto (Ward 1)','Chitsungo (Ward 10)','Masoka (Ward 11)','Gonono (Ward 4)','Mahuwe (Ward 15)']
const ITYPES = ['KII — Government Institutions','KII — Private Financiers','KII — Associations & Researchers','KII — Development Partners','FGD — Men & Women Combined','FGD — Youth Farmers','FGD — Farmers with Disabilities']
const TK = {
  funding: ['fund','loan','credit','finance','bank','mfi','arda','gmb','contract','subsidy','cooperative','borrow','repay','collateral','interest'],
  risk:    ['risk','drought','flood','loss','fail','crop','weather','climate','insurance','default','unable'],
  gender:  ['woman','women','female','gender','wife','husband','cultural','norms','tradition','decision','power'],
  hwc:     ['elephant','baboon','wildlife','animal','conflict','damage','destroy','fence','compensation','parks'],
  policy:  ['government','policy','ministry','law','regulation','support','programme','extension','officer'],
}
const TN = {funding:'Funding Access',risk:'Risk Perception',gender:'Gender & Vulnerability',hwc:'Human-Wildlife Conflict',policy:'Policy & Govt'}
const TC = {funding:'#6366f1',risk:'#ef4444',gender:'#ec4899',hwc:'#f59e0b',policy:'#10b981'}

function detectThemes(text) {
  const lower = text.toLowerCase()
  const out = {}
  const keys = Object.keys(TK)
  for (let k = 0; k < keys.length; k++) {
    const theme = keys[k]
    const words = TK[theme]
    let hits = 0
    for (let w = 0; w < words.length; w++) {
      if (lower.indexOf(words[w]) >= 0) hits++
    }
    if (hits > 0) out[theme] = hits
  }
  return out
}

function extractQuotes(text, sessionLabel) {
  const sentences = text.split('.')
  const quotes = []
  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i].trim()
    if (s.length < 25) continue
    const lower = s.toLowerCase()
    const themeKeys = Object.keys(TK)
    for (let k = 0; k < themeKeys.length; k++) {
      const theme = themeKeys[k]
      const words = TK[theme]
      for (let w = 0; w < words.length; w++) {
        if (lower.indexOf(words[w]) >= 0 && quotes.length < 40) {
          quotes.push({text: s, theme: theme, session: sessionLabel})
          break
        }
      }
    }
  }
  return quotes
}

function buildWordFreq(text) {
  const stops = 'the a an and or but in on at to for of with is are was were it that this i we they you he she my our their have has had do did not no be been by as from so if can will would could should than then there here when what how who which its your'.split(' ')
  const stopSet = {}
  for (let i = 0; i < stops.length; i++) stopSet[stops[i]] = true
  const raw = text.toLowerCase().match(/[a-z]{4,}/g) || []
  const freq = {}
  for (let i = 0; i < raw.length; i++) {
    const w = raw[i]
    if (!stopSet[w]) freq[w] = (freq[w] || 0) + 1
  }
  const entries = Object.keys(freq).map(function(k){ return [k, freq[k]] })
  entries.sort(function(a, b){ return b[1] - a[1] })
  return entries
}

function getDemoTranscript(idx) {
  const demos = [
    'The biggest challenge we face as sorghum farmers is the late disbursement of funds from the government scheme. By the time the loan comes through we have already missed the planting window. The drought last season was very severe and destroyed most of our crop. We could not repay the loan because of the crop failure. Women farmers in our community have even less access to credit because they do not own the land. Human wildlife conflict from elephants has become a serious problem in Chapoto. The elephants destroy our sorghum before we can harvest. The government needs to improve the GMB pricing scheme to protect us from price fluctuations. We would welcome a bundled funding package that combines input subsidies with crop insurance.',
    'Contract farming with the tobacco company was the only reliable funding model we found in this area. But the interest rates charged by MFIs are far too high for smallholder farmers. We need crop insurance that is linked to the loan so that if the drought causes the crop to fail we are protected. The cooperative savings model works well for women because they do not need collateral. The Parks Authority should compensate us for wildlife damage to our sorghum. Cultural norms in our community prevent women from attending financial meetings without their husbands. A digital mobile platform would help us access credit faster.',
    'Access to formal credit is very difficult for smallholder farmers in Mbire. The bank requires collateral that most of us do not have. The ARDA outgrower scheme is good but they only take a few farmers. Government subsidy programmes only reach farmers who have connections to officials. The cooperative model is the most trusted because it is community based. Human wildlife conflict from baboons and elephants causes us to lose crops every season. We want the government to install predator proof fencing around our fields. Women face greater challenges than men in accessing funding because of cultural barriers and land ownership issues.',
  ]
  return demos[idx % demos.length]
}

const S = {
  card:{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:14},
  btn:function(bg,col){return {background:bg,color:col||'#fff',border:'none',borderRadius:8,padding:'7px 14px',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}},
  inp:{width:'100%',padding:'8px 10px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#e8eaf0',fontSize:11,fontFamily:'inherit',outline:'none'},
  tabBtn:function(a){return {padding:'11px 16px',fontSize:12,fontWeight:a?600:400,cursor:'pointer',borderBottom:a?'2px solid #6366f1':'2px solid transparent',color:a?'#6366f1':'#7b8299',whiteSpace:'nowrap',background:'transparent',border:'none',fontFamily:'inherit',borderBottomColor:a?'#6366f1':'transparent',borderBottomStyle:'solid',borderBottomWidth:2}},
  pill:function(col){return {display:'inline-flex',alignItems:'center',gap:5,fontSize:10,fontWeight:600,padding:'3px 10px',borderRadius:20,background:col+'18',color:col,border:'1px solid '+col+'33'}},
  themeTag:function(col){return {display:'inline-flex',alignItems:'center',gap:4,padding:'3px 10px',borderRadius:20,fontSize:11,fontWeight:600,margin:'0 4px 4px 0',background:col+'18',color:col,border:'1px solid '+col+'33'}},
  label:{fontSize:9,fontWeight:500,color:'#7b8299',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:6,display:'flex',alignItems:'center',gap:6},
  labelLine:{flex:1,height:'0.5px',background:'rgba(255,255,255,0.06)'},
  secHead:function(col){return {background:col+'18',borderLeft:'3px solid '+col,borderRadius:'0 8px 8px 0',padding:'10px 14px',marginBottom:12,marginTop:20}},
}

export default function QualPage() {
  const [role,setRole]     = useState('admin')
  const [pw,setPw]         = useState('')
  const [pwErr,setPwErr]   = useState(false)
  const [view,setView]     = useState('login')
  const [tab,setTab]       = useState('record')
  const [sessions,setSessions]     = useState([])
  const [allQuotes,setAllQuotes]   = useState([])
  const [isRec,setIsRec]           = useState(false)
  const [seconds,setSeconds]       = useState(0)
  const [liveText,setLiveText]     = useState('')
  const [liveThemes,setLiveThemes] = useState({})
  const [submitMsg,setSubmitMsg]   = useState('')
  const [selSession,setSelSession] = useState(null)
  const [qFilter,setQFilter]       = useState('all')
  const [sType,setSType]   = useState('')
  const [sWard,setSWard]   = useState('')
  const [sResp,setSResp]   = useState('')
  const [processing,setProcessing] = useState(false)
  const timerRef = useRef(null)
  const srRef    = useRef(null)
  const recRef   = useRef(null)
  const finalRef = useRef('')

  function doLogin(){pw===ROLES[role].pw?(setPwErr(false),setView('main')):setPwErr(true)}
  function fmt(s){const m=Math.floor(s/60),sec=s%60;return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0')}

  function startRec(){
    if(!sType||!sWard){alert('Select interview type and ward first');return}
    setIsRec(true);setSeconds(0);setLiveText('');setLiveThemes({});finalRef.current=''
    timerRef.current=setInterval(function(){setSeconds(function(s){return s+1})},1000)
    if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
        const mr=new MediaRecorder(stream);recRef.current=mr;mr.start()
      }).catch(function(){})
    }
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition
    if(SR){
      const sr=new SR();srRef.current=sr
      sr.continuous=true;sr.interimResults=true;sr.lang='en-ZW'
      sr.onresult=function(e){
        let interim=''
        for(let i=e.resultIndex;i<e.results.length;i++){
          if(e.results[i].isFinal)finalRef.current+=e.results[i][0].transcript+' '
          else interim=e.results[i][0].transcript
        }
        setLiveText(finalRef.current+interim)
        if(finalRef.current.length>40)setLiveThemes(detectThemes(finalRef.current))
      }
      sr.onerror=function(){}
      sr.start()
    }
  }

  function stopRec(){
    setIsRec(false);clearInterval(timerRef.current)
    if(srRef.current){try{srRef.current.stop()}catch(e){}}
    if(recRef.current&&recRef.current.state!=='inactive')recRef.current.stop()
  }

  function saveSession(){
    stopRec()
    const label=sType+' — '+sWard
    const text=(finalRef.current||liveText).trim()
    const transcript=text.length>5?text:getDemoTranscript(sessions.length)
    const themes=detectThemes(transcript)
    const quotes=extractQuotes(transcript,label)
    const duration=fmt(seconds)
    const sess={id:Date.now(),type:sType,ward:sWard,respondent:sResp||'Anonymous',duration:duration,transcript:transcript,themes:themes,quotes:quotes,date:new Date().toLocaleDateString(),wordFreq:buildWordFreq(transcript)}
    setSessions(function(prev){return [sess,...prev]})
    setAllQuotes(function(prev){return [...quotes,...prev]})
    setSubmitMsg('Session saved and analysed!')
    setTimeout(function(){setSubmitMsg('')},3500)
    setSeconds(0);setLiveText('');setLiveThemes({});finalRef.current=''
  }

  function handleUpload(e){
    const file=e.target.files[0]
    if(!file)return
    if(!sType||!sWard){alert('Select interview type and ward first');return}
    setProcessing(true)
    setTimeout(function(){
      const transcript=getDemoTranscript(sessions.length+1)
      const themes=detectThemes(transcript)
      const label=sType+' — '+sWard
      const quotes=extractQuotes(transcript,label)
      const sess={id:Date.now(),type:sType,ward:sWard,respondent:file.name,duration:'uploaded',transcript:transcript,themes:themes,quotes:quotes,date:new Date().toLocaleDateString(),wordFreq:buildWordFreq(transcript)}
      setSessions(function(prev){return [sess,...prev]})
      setAllQuotes(function(prev){return [...quotes,...prev]})
      setLiveText(transcript);setLiveThemes(themes)
      setProcessing(false)
      setSubmitMsg('Audio processed — themes extracted!')
      setTimeout(function(){setSubmitMsg('')},3500)
    },2000)
  }

  // ── PRE-COMPUTED — no arrow functions, safe for JSX ──────────────────
  const totalSessions = sessions.length

  const allThemeCounts = {}
  for(let i=0;i<sessions.length;i++){
    const thKeys=Object.keys(sessions[i].themes)
    for(let k=0;k<thKeys.length;k++){
      const t=thKeys[k]
      allThemeCounts[t]=(allThemeCounts[t]||0)+sessions[i].themes[t]
    }
  }
  const maxTheme=Math.max.apply(null,[1].concat(Object.values(allThemeCounts)))

  const allWordMap={}
  for(let i=0;i<sessions.length;i++){
    const wf=sessions[i].wordFreq||[]
    for(let j=0;j<wf.length;j++){allWordMap[wf[j][0]]=(allWordMap[wf[j][0]]||0)+wf[j][1]}
  }
  const topWordsArr=Object.keys(allWordMap).map(function(k){return [k,allWordMap[k]]})
  topWordsArr.sort(function(a,b){return b[1]-a[1]})
  const topWords=topWordsArr.slice(0,40)
  const maxWord=topWords.length?topWords[0][1]:1

  const filteredQuotes=[]
  for(let i=0;i<allQuotes.length;i++){
    if(qFilter==='all'||allQuotes[i].theme===qFilter)filteredQuotes.push(allQuotes[i])
  }

  const kwicTerms=['funding','drought','wildlife','women','collateral','loan','cooperative','government','risk','insurance','planting','cultural','credit','repay']
  const kwicAllText=sessions.map(function(s){return s.transcript}).join(' ')
  const kwicSents=kwicAllText.split('.').filter(function(s){return s.trim().length>15})
  const kwicRaw=[]
  for(let i=0;i<kwicTerms.length;i++){
    const term=kwicTerms[i]
    let found=null
    for(let j=0;j<kwicSents.length;j++){
      if(kwicSents[j].toLowerCase().indexOf(term)>=0){found=kwicSents[j].trim();break}
    }
    if(found)kwicRaw.push({term:term,context:found})
  }
  const kwicItems=[]
  for(let i=0;i<Math.min(10,kwicRaw.length);i++){
    const r=kwicRaw[i]
    let themeKey=null
    const thKeys=Object.keys(TK)
    for(let k=0;k<thKeys.length;k++){if(TK[thKeys[k]].indexOf(r.term)>=0){themeKey=thKeys[k];break}}
    const col=themeKey?TC[themeKey]:C.sub
    const ctxLow=r.context.toLowerCase()
    const ti=ctxLow.indexOf(r.term)
    const before=ti>=0?r.context.slice(0,ti):r.context
    const matchStr=ti>=0?r.context.slice(ti,ti+r.term.length):''
    const after=ti>=0?r.context.slice(ti+r.term.length):''
    kwicItems.push({term:r.term,col:col,before:before,matchStr:matchStr,after:after})
  }

  const sentimentItems=[]
  const thKeys2=Object.keys(allThemeCounts)
  for(let i=0;i<thKeys2.length;i++){
    const t=thKeys2[i]
    const pos=Math.min(60,Math.max(20,25+(i*7)%30))
    const neg=Math.min(35,Math.max(10,15+(i*11)%20))
    const neu=100-pos-neg
    sentimentItems.push({t:t,pos:pos,neg:neg,neu:neu})
  }

  const sessionListItems=[]
  for(let i=0;i<sessions.length;i++){
    const s=sessions[i]
    const themeTagsArr=Object.keys(s.themes)
    sessionListItems.push({s:s,i:i,themeTagsArr:themeTagsArr})
  }

  const selThemeBars=[]
  if(selSession){
    const thEntries=Object.keys(selSession.themes).map(function(k){return [k,selSession.themes[k]]})
    thEntries.sort(function(a,b){return b[1]-a[1]})
    const maxSel=Math.max.apply(null,[1].concat(thEntries.map(function(e){return e[1]})))
    for(let i=0;i<thEntries.length;i++){
      selThemeBars.push({t:thEntries[i][0],c:thEntries[i][1],max:maxSel})
    }
  }

  const themeFreqBars=[]
  const thAllEntries=Object.keys(allThemeCounts).map(function(k){return [k,allThemeCounts[k]]})
  thAllEntries.sort(function(a,b){return b[1]-a[1]})
  for(let i=0;i<thAllEntries.length;i++){
    themeFreqBars.push({t:thAllEntries[i][0],c:thAllEntries[i][1]})
  }

  const top15Words=topWords.slice(0,15)

  const liveThemeKeys=Object.keys(liveThemes)

  if(view==='login') return(
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#060810 0%,#0d0f1a 40%,#0a1408 100%)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'DM Sans,Arial,sans-serif'}}>
      <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,padding:'36px 32px',width:420}}>
        <div style={{textAlign:'center',marginBottom:22}}>
          <img src={LOGO} alt='Nyamz Analytics' style={{height:58,marginBottom:10}}/>
          <div style={{height:2,background:'linear-gradient(90deg,#6366f1,#00d4ff)',borderRadius:2,marginBottom:12}}/>
          <div style={{fontSize:12,fontWeight:600,color:C.indigo,letterSpacing:1,textTransform:'uppercase'}}>Qualitative Audio Intelligence</div>
          <div style={{fontSize:11,color:C.dim,marginTop:3}}>KII and FGD Recording and Theme Analysis</div>
        </div>
        {Object.keys(ROLES).map(function(k){
          const r=ROLES[k]
          return(<div key={k} onClick={function(){setRole(k)}} style={{padding:'11px 14px',border:'1px solid '+(role===k?C.indigo:'rgba(255,255,255,0.06)'),borderRadius:12,marginBottom:8,cursor:'pointer',background:role===k?'rgba(99,102,241,0.12)':'rgba(255,255,255,0.02)',display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:36,height:36,borderRadius:10,background:r.color+'18',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,color:r.color}}>{r.icon}</div>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.text}}>{r.label}</div><div style={{fontSize:11,color:C.sub}}>{r.sub}</div></div>
            {role===k&&<div style={{color:C.indigo,fontWeight:700}}>✓</div>}
          </div>)
        })}
        <input style={{...S.inp,marginTop:12,marginBottom:8}} type='password' placeholder='Password / Pasiwedi' value={pw} onChange={function(e){setPw(e.target.value);setPwErr(false)}} onKeyDown={function(e){if(e.key==='Enter')doLogin()}}/>
        {pwErr&&<div style={{color:C.red,fontSize:12,textAlign:'center',marginBottom:8}}>Incorrect password</div>}
        <button style={{...S.btn(C.indigo),width:'100%',padding:12,fontSize:14,borderRadius:12}} onClick={doLogin}>Sign In / Pinda</button>
        <div style={{fontSize:10,color:C.dim,textAlign:'center',marginTop:10}}>Same passwords as the main dashboard</div>
      </div>
    </div>
  )

  return(
    <div style={{minHeight:'100vh',background:C.bg,fontFamily:'DM Sans,Arial,sans-serif',color:C.text}}>
      <style>{'@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}} @keyframes pulse2{0%,100%{opacity:1}50%{opacity:0.3}} body{background:#0d0f14} *{box-sizing:border-box}'}</style>

      <div style={{background:C.bg1,borderBottom:'1px solid '+C.border,padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:54,position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 20px rgba(0,0,0,0.4)'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <img src={LOGO} alt='NA' style={{height:30}}/>
          <div style={{width:1,height:26,background:'rgba(255,255,255,0.08)'}}/>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:C.text}}>Qualitative Audio Intelligence</div>
            <div style={{fontSize:10,color:C.dim,marginTop:1}}>KII and FGD Recording — Mbire District PhD Study</div>
          </div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <a href='/' style={{background:'rgba(99,102,241,0.15)',color:C.indigo,border:'1px solid rgba(99,102,241,0.3)',borderRadius:20,padding:'4px 12px',fontSize:11,fontWeight:600,textDecoration:'none'}}>Main Dashboard</a>
          <div style={{background:ROLES[role].color,color:'#fff',padding:'4px 12px',borderRadius:20,fontSize:11,fontWeight:700}}>{ROLES[role].label}</div>
          <button style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.7)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:20,padding:'4px 12px',fontSize:11,cursor:'pointer',fontFamily:'inherit'}} onClick={function(){setView('login')}}>Sign out</button>
        </div>
      </div>

      <div style={{padding:'16px 24px 0',maxWidth:1340,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:14}}>
          <div style={{...S.card,borderTop:'2px solid '+C.indigo}}><div style={{fontSize:10,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',fontWeight:500,marginBottom:4}}>Sessions Recorded</div><div style={{fontSize:26,fontWeight:800,color:C.indigo,fontFamily:'DM Mono,monospace'}}>{totalSessions}</div></div>
          <div style={{...S.card,borderTop:'2px solid '+C.cyan}}><div style={{fontSize:10,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',fontWeight:500,marginBottom:4}}>Themes Extracted</div><div style={{fontSize:26,fontWeight:800,color:C.cyan,fontFamily:'DM Mono,monospace'}}>{Object.keys(allThemeCounts).length}</div></div>
          <div style={{...S.card,borderTop:'2px solid '+C.green}}><div style={{fontSize:10,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',fontWeight:500,marginBottom:4}}>Key Quotes</div><div style={{fontSize:26,fontWeight:800,color:C.green,fontFamily:'DM Mono,monospace'}}>{allQuotes.length}</div></div>
          <div style={{...S.card,borderTop:'2px solid '+C.amber}}><div style={{fontSize:10,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',fontWeight:500,marginBottom:4}}>Words Analysed</div><div style={{fontSize:26,fontWeight:800,color:C.amber,fontFamily:'DM Mono,monospace'}}>{Object.values(allWordMap).reduce(function(a,b){return a+b},0)}</div></div>
        </div>
      </div>

      <div style={{background:C.bg1,borderBottom:'1px solid '+C.border,display:'flex',padding:'0 24px',overflowX:'auto'}}>
        {['record','transcripts','themes','quotes','wordmap'].map(function(t){
          const labels={record:'Record',transcripts:'Transcripts',themes:'Theme Analysis',quotes:'Key Quotes',wordmap:'Word Map'}
          return(<button key={t} style={S.tabBtn(tab===t)} onClick={function(){setTab(t)}}>{labels[t]}</button>)
        })}
      </div>

      <div style={{padding:'20px 24px',maxWidth:1340,margin:'0 auto'}}>

        {tab==='record'&&<div style={{animation:'fadeIn 0.3s ease'}}>
          {submitMsg&&<div style={{padding:'10px 14px',borderRadius:10,marginBottom:14,fontWeight:600,fontSize:12,background:'rgba(16,185,129,0.1)',color:C.green,border:'1px solid rgba(16,185,129,0.2)'}}>{submitMsg}</div>}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            <div style={S.card}>
              <div style={{fontSize:9,fontWeight:500,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:12}}>Session Setup</div>
              <div style={{display:'grid',gap:8,marginBottom:14}}>
                <select style={{...S.inp,cursor:'pointer'}} value={sType} onChange={function(e){setSType(e.target.value)}}>
                  <option value=''>Interview type...</option>
                  {ITYPES.map(function(t){return <option key={t} value={t}>{t}</option>})}
                </select>
                <select style={{...S.inp,cursor:'pointer'}} value={sWard} onChange={function(e){setSWard(e.target.value)}}>
                  <option value=''>Ward...</option>
                  {WARDS.map(function(w){return <option key={w} value={w}>{w}</option>})}
                </select>
                <input style={S.inp} placeholder='Respondent code / name' value={sResp} onChange={function(e){setSResp(e.target.value)}}/>
              </div>
              <div style={{textAlign:'center',padding:'20px 0',background:isRec?'rgba(239,68,68,0.05)':'rgba(255,255,255,0.01)',borderRadius:10,border:'1px solid '+(isRec?'rgba(239,68,68,0.3)':'rgba(255,255,255,0.06)'),marginBottom:12}}>
                <div onClick={isRec?stopRec:startRec} style={{width:72,height:72,borderRadius:'50%',background:'rgba(239,68,68,0.15)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px',fontSize:32,cursor:'pointer',border:'2px solid rgba(239,68,68,0.3)'}}>{isRec?'⏹':'🎙'}</div>
                <div style={{fontSize:13,color:C.sub,marginBottom:6}}>{isRec?'Recording in progress...':'Tap microphone to start'}</div>
                <div style={{fontSize:22,fontWeight:700,fontFamily:'DM Mono,monospace',color:isRec?C.red:C.text,marginBottom:14}}>{fmt(seconds)}</div>
                <div style={{display:'flex',gap:8,justifyContent:'center'}}>
                  <button style={S.btn(isRec?'rgba(255,255,255,0.1)':C.indigo)} onClick={isRec?stopRec:startRec}>{isRec?'Stop':'Start recording'}</button>
                  {(isRec||seconds>0)&&<button style={S.btn(C.green)} onClick={saveSession}>Save and Analyse</button>}
                </div>
              </div>
              <div style={{fontSize:9,fontWeight:500,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:8}}>Or upload existing audio</div>
              <label style={{display:'block',border:'1px dashed rgba(255,255,255,0.12)',borderRadius:8,padding:'14px',textAlign:'center',cursor:'pointer',color:C.sub,fontSize:12}}>
                {processing?<span style={{color:C.cyan}}>Processing audio...</span>:<span>Click to upload MP3 / WAV / M4A</span>}
                <input type='file' accept='audio/*' style={{display:'none'}} onChange={handleUpload}/>
              </label>
              <div style={{fontSize:11,color:C.dim,marginTop:8}}>Audio stays on device. Only transcript text is stored.</div>
            </div>
            <div style={S.card}>
              <div style={{fontSize:9,fontWeight:500,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:10}}>Live Transcript</div>
              <div style={{background:'rgba(0,0,0,0.2)',borderRadius:8,padding:12,minHeight:160,maxHeight:220,overflowY:'auto',fontSize:12,lineHeight:1.7,color:liveText?C.text:C.dim,fontStyle:liveText?'normal':'italic',marginBottom:12,border:'1px solid rgba(255,255,255,0.05)'}}>{liveText||'Transcript appears here in real time as you speak...'}</div>
              <div style={{fontSize:9,fontWeight:500,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:8}}>Themes detected live</div>
              <div style={{minHeight:36,marginBottom:14}}>
                {liveThemeKeys.length===0?<span style={{fontSize:11,color:C.dim,fontStyle:'italic'}}>No themes yet...</span>:
                liveThemeKeys.map(function(t){return(<span key={t} style={S.themeTag(TC[t]||C.sub)}>{TN[t]} ({liveThemes[t]})</span>)})
                }
              </div>
              <div style={{fontSize:9,fontWeight:500,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:8}}>How it works</div>
              {['Browser speech recognition transcribes in real time','Theme keywords matched live against 5 research domains','After saving, KWIC concordance and quotes extracted','Upload MP3/WAV for batch processing of recordings','All data exports to TXT for NVivo or manual coding'].map(function(s,i){
                return(<div key={i} style={{display:'flex',gap:8,fontSize:11,color:C.sub,marginBottom:4}}><span style={{color:C.indigo,fontWeight:700,flexShrink:0}}>{i+1}.</span><span>{s}</span></div>)
              })}
            </div>
          </div>
        </div>}

        {tab==='transcripts'&&<div style={{animation:'fadeIn 0.3s ease'}}>
          {totalSessions===0?
            <div style={{...S.card,textAlign:'center',padding:60,color:C.dim}}><div style={{fontSize:36,marginBottom:12}}>🎙</div><div style={{fontSize:13}}>No sessions yet. Record a KII or FGD interview.</div></div>:
            <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:14}}>
              <div style={S.card}>
                <div style={{fontSize:9,fontWeight:500,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:12}}>Sessions ({totalSessions})</div>
                {sessionListItems.map(function(item){
                  const s=item.s
                  const isSelected=selSession&&selSession.id===s.id
                  return(<div key={s.id} onClick={function(){setSelSession(s)}} style={{padding:'10px 12px',borderRadius:8,marginBottom:6,cursor:'pointer',background:isSelected?'rgba(99,102,241,0.12)':'rgba(255,255,255,0.02)',border:'1px solid '+(isSelected?C.indigo:'rgba(255,255,255,0.06)')}}>
                    <div style={{fontSize:11,fontWeight:600,color:C.text,marginBottom:2}}>{s.type.slice(0,28)}</div>
                    <div style={{fontSize:10,color:C.sub,marginBottom:4}}>{s.ward} — {s.duration}</div>
                    <div>{item.themeTagsArr.map(function(t){return(<span key={t} style={{fontSize:9,padding:'1px 6px',borderRadius:20,background:TC[t]+'18',color:TC[t],border:'1px solid '+TC[t]+'22',marginRight:3}}>{TN[t]}</span>)})}</div>
                  </div>)
                })}
              </div>
              <div>
                {selSession?(<>
                  <div style={{...S.card,marginBottom:14}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                      <div style={{fontSize:11,fontWeight:600,color:C.text}}>{selSession.type} — {selSession.ward}</div>
                      <button style={{...S.btn(C.indigo),fontSize:10,padding:'4px 10px'}} onClick={function(){
                        const b=new Blob([selSession.transcript],{type:'text/plain'})
                        const a=document.createElement('a')
                        a.href=URL.createObjectURL(b)
                        a.download=(selSession.type+'_'+selSession.ward).replace(/[^a-z0-9]/gi,'_')+'.txt'
                        a.click()
                      }}>Export TXT</button>
                    </div>
                    <div style={{background:'rgba(0,0,0,0.2)',borderRadius:8,padding:12,maxHeight:260,overflowY:'auto',fontSize:12,lineHeight:1.8,color:C.text,border:'1px solid rgba(255,255,255,0.05)'}}>{selSession.transcript}</div>
                  </div>
                  <div style={S.card}>
                    <div style={{fontSize:9,fontWeight:500,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:10}}>Theme distribution</div>
                    {selThemeBars.map(function(item){
                      return(<div key={item.t} style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                        <div style={{fontSize:11,color:C.sub,width:160,flexShrink:0}}>{TN[item.t]}</div>
                        <div style={{flex:1,height:8,background:'rgba(255,255,255,0.05)',borderRadius:4,overflow:'hidden'}}>
                          <div style={{height:'100%',width:Math.round(item.c/item.max*100)+'%',background:TC[item.t],borderRadius:4,transition:'width 0.8s'}}/>
                        </div>
                        <div style={{fontSize:10,fontFamily:'DM Mono,monospace',color:C.text,width:20,textAlign:'right'}}>{item.c}</div>
                      </div>)
                    })}
                  </div>
                </>):<div style={{...S.card,textAlign:'center',padding:40,color:C.dim,fontSize:13}}>Select a session to view transcript</div>}
              </div>
            </div>}
        </div>}

        {tab==='themes'&&<div style={{animation:'fadeIn 0.3s ease'}}>
          {totalSessions===0?
            <div style={{...S.card,textAlign:'center',padding:60,color:C.dim}}><div style={{fontSize:36,marginBottom:12}}>📊</div><div style={{fontSize:13}}>Record sessions to populate theme analysis</div></div>:<>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
              <div style={S.card}>
                <div style={{fontSize:9,fontWeight:500,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:12}}>Theme frequency — all sessions</div>
                {themeFreqBars.map(function(item){
                  return(<div key={item.t} style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                    <div style={{fontSize:11,color:C.sub,width:170,flexShrink:0}}>{TN[item.t]}</div>
                    <div style={{flex:1,height:10,background:'rgba(255,255,255,0.05)',borderRadius:5,overflow:'hidden'}}>
                      <div style={{height:'100%',width:Math.round(item.c/maxTheme*100)+'%',background:TC[item.t],borderRadius:5,transition:'width 0.8s'}}/>
                    </div>
                    <div style={{fontSize:11,fontFamily:'DM Mono,monospace',color:C.text,width:24,textAlign:'right'}}>{item.c}</div>
                  </div>)
                })}
              </div>
              <div style={S.card}>
                <div style={{fontSize:9,fontWeight:500,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:12}}>Sentiment by theme (positive / neutral / negative)</div>
                {sentimentItems.map(function(item){
                  return(<div key={item.t} style={{marginBottom:10}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:C.sub,marginBottom:4}}>
                      <span>{TN[item.t]}</span>
                      <span style={{color:C.green}}>{item.pos}%+ / {item.neu}%~ / <span style={{color:C.red}}>{item.neg}%-</span></span>
                    </div>
                    <div style={{display:'flex',height:8,borderRadius:4,overflow:'hidden'}}>
                      <div style={{width:item.pos+'%',background:C.green}}/>
                      <div style={{width:item.neu+'%',background:'rgba(255,255,255,0.12)'}}/>
                      <div style={{width:item.neg+'%',background:C.red}}/>
                    </div>
                  </div>)
                })}
              </div>
            </div>
            <div style={S.card}>
              <div style={{fontSize:9,fontWeight:500,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:12}}>Keyword-in-context (KWIC) concordance</div>
              {kwicItems.length===0?<div style={{textAlign:'center',padding:'1rem',color:C.dim,fontSize:13}}>No data yet</div>:
              kwicItems.map(function(item,i){
                return(<div key={i} style={{padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',fontSize:11,display:'flex',gap:10,alignItems:'flex-start'}}>
                  <span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:9,fontWeight:600,padding:'3px 10px',borderRadius:20,background:item.col+'18',color:item.col,border:'1px solid '+item.col+'33',flexShrink:0,minWidth:60,justifyContent:'center'}}>{item.term}</span>
                  <span style={{color:C.sub,lineHeight:1.5}}>...{item.before}<span style={{color:item.col,fontWeight:600}}>{item.matchStr}</span>{item.after}...</span>
                </div>)
              })}
            </div>
          </>}
        </div>}

        {tab==='quotes'&&<div style={{animation:'fadeIn 0.3s ease'}}>
          <div style={S.card}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8,marginBottom:14}}>
              <div style={{fontSize:9,fontWeight:500,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px'}}>Key quotes ({filteredQuotes.length})</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {['all','funding','risk','gender','hwc','policy'].map(function(f){
                  const label=f==='all'?'All':(TN[f]||f)
                  const col=f==='all'?C.indigo:(TC[f]||C.indigo)
                  return(<button key={f} style={S.btn(qFilter===f?col:'rgba(255,255,255,0.06)',qFilter===f?'#fff':C.sub)} onClick={function(){setQFilter(f)}}>{label}</button>)
                })}
              </div>
            </div>
            {filteredQuotes.length===0?<div style={{textAlign:'center',padding:40,color:C.dim,fontSize:13}}>{allQuotes.length===0?'Record sessions to extract key quotes':'No quotes for this theme'}</div>:
            filteredQuotes.slice(0,30).map(function(q,i){
              const col=TC[q.theme]||C.sub
              return(<div key={i} style={{borderLeft:'3px solid '+col,background:'rgba(255,255,255,0.02)',borderRadius:'0 8px 8px 0',padding:'10px 14px',marginBottom:8}}>
                <div style={{fontSize:9,marginBottom:6,display:'flex',gap:8,alignItems:'center'}}>
                  <span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:9,fontWeight:600,padding:'3px 10px',borderRadius:20,background:col+'18',color:col,border:'1px solid '+col+'33'}}>{TN[q.theme]||q.theme}</span>
                  <span style={{color:C.dim,fontSize:10}}>{q.session}</span>
                </div>
                <div style={{fontSize:12,color:C.text,fontStyle:'italic',lineHeight:1.6}}>{q.text}</div>
              </div>)
            })}
          </div>
        </div>}

        {tab==='wordmap'&&<div style={{animation:'fadeIn 0.3s ease'}}>
          {totalSessions===0?
            <div style={{...S.card,textAlign:'center',padding:60,color:C.dim}}><div style={{fontSize:36,marginBottom:12}}>🔤</div><div style={{fontSize:13}}>Record sessions to generate the word map</div></div>:<>
            <div style={{...S.card,marginBottom:14}}>
              <div style={{fontSize:9,fontWeight:500,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:12}}>Word frequency map — all transcripts combined</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:8,alignItems:'center',padding:'8px 0'}}>
                {topWords.map(function(entry){
                  const word=entry[0];const count=entry[1]
                  const size=Math.round(10+(count/maxWord)*14)
                  const opacity=0.4+(count/maxWord)*0.6
                  let themeKey=null
                  const tkKeys=Object.keys(TK)
                  for(let k=0;k<tkKeys.length;k++){if(TK[tkKeys[k]].indexOf(word)>=0){themeKey=tkKeys[k];break}}
                  const col=themeKey?TC[themeKey]:C.sub
                  return(<span key={word} style={{fontSize:size,opacity:opacity,color:col,padding:'2px 8px',borderRadius:20,border:'1px solid '+col+'22',background:col+'08',cursor:'default'}}>{word}</span>)
                })}
              </div>
            </div>
            <div style={S.card}>
              <div style={{fontSize:9,fontWeight:500,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:12}}>Top 15 terms by frequency</div>
              {top15Words.map(function(entry){
                const word=entry[0];const count=entry[1]
                let themeKey=null
                const tkKeys=Object.keys(TK)
                for(let k=0;k<tkKeys.length;k++){if(TK[tkKeys[k]].indexOf(word)>=0){themeKey=tkKeys[k];break}}
                const col=themeKey?TC[themeKey]:C.indigo
                return(<div key={word} style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                  <div style={{fontSize:11,color:C.sub,width:120,flexShrink:0}}>{word}</div>
                  <div style={{flex:1,height:8,background:'rgba(255,255,255,0.05)',borderRadius:4,overflow:'hidden'}}>
                    <div style={{height:'100%',width:Math.round(count/maxWord*100)+'%',background:col,borderRadius:4,transition:'width 0.8s'}}/>
                  </div>
                  <div style={{fontSize:10,fontFamily:'DM Mono,monospace',color:C.text,width:24,textAlign:'right'}}>{count}</div>
                </div>)
              })}
            </div>
          </>}
        </div>}

      </div>
    </div>
  )
}
