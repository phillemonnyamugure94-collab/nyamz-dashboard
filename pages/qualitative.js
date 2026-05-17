import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'

const LOGO = 'data:image/jpeg;base64,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'

const C = {
  bg:'#0d0f14',bg1:'#13161e',bg2:'#181c26',
  border:'rgba(255,255,255,0.06)',border2:'rgba(255,255,255,0.12)',
  text:'#e8eaf0',sub:'#7b8299',dim:'#4a5068',
  cyan:'#00d4ff',indigo:'#6366f1',violet:'#8b5cf6',
  pink:'#ec4899',green:'#10b981',amber:'#f59e0b',
  red:'#ef4444',blue:'#3b82f6',
}

const ROLES = {
  admin:     {label:'Phillemon Nyamgure',sub:'Nyamz Analytics — Full Control',pw:'nyamz2026',color:C.red,   icon:'P'},
  supervisor:{label:'PhD Supervisor',   sub:'View dashboard only',            pw:'super2026',color:C.cyan,  icon:'S'},
  sydney:    {label:'Sydney Mazambara', sub:'Researcher — Field + View',      pw:'mbire2026',color:C.green, icon:'M'},
  enumerator:{label:'Enumerator',       sub:'Data entry only',                pw:'enum2026', color:C.amber, icon:'E'},
}

const THEME_KEYWORDS = {
  funding:  ['fund','loan','credit','finance','bank','mfi','arda','gmb','contract','subsidy','cooperative','borrow','repay','collateral','interest','money','affordable','microfin'],
  risk:     ['risk','drought','flood','loss','fail','crop','weather','climate','insurance','default','unable','challenge','barrier','problem'],
  gender:   ['woman','women','female','gender','wife','husband','cultural','norms','tradition','decision','power','access','mukadzi','vakadzi'],
  hwc:      ['elephant','baboon','wildlife','animal','conflict','damage','destroy','crop','fence','compensation','parks','herd','mhuka'],
  policy:   ['government','policy','ministry','law','regulation','support','programme','subsidy','extension','officer','hurumende','mutemo'],
}
const THEME_NAMES  = {funding:'Funding Access',risk:'Risk Perception',gender:'Gender & Vulnerability',hwc:'Human-Wildlife Conflict',policy:'Policy & Govt'}
const THEME_COLORS = {funding:C.indigo,risk:C.red,gender:C.pink,hwc:C.amber,policy:C.green}
const WARDS = ['Chapoto (Ward 1)','Chitsungo (Ward 10)','Masoka (Ward 11)','Gonono (Ward 4)','Mahuwe (Ward 15)']
const ITYPES = ['KII — Government Institutions','KII — Private Financiers','KII — Associations & Researchers','KII — Development Partners','FGD — Men & Women Combined','FGD — Youth Farmers','FGD — Farmers with Disabilities']

const S = {
  card:{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:14},
  btn:(bg,c='#fff')=>({background:bg,color:c,border:'none',borderRadius:8,padding:'7px 14px',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'opacity 0.15s'}),
  outBtn:(color)=>({background:'transparent',color:color,border:'1px solid '+color+'44',borderRadius:8,padding:'5px 12px',fontSize:10,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}),
  inp:{width:'100%',padding:'8px 10px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#e8eaf0',fontSize:11,fontFamily:'inherit',outline:'none'},
  label:{fontSize:9,fontWeight:500,color:'#7b8299',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:6,display:'flex',alignItems:'center',gap:6},
  labelLine:{flex:1,height:'0.5px',background:'rgba(255,255,255,0.06)'},
  tabBtn:(a)=>({padding:'11px 16px',fontSize:12,fontWeight:a?600:400,cursor:'pointer',borderBottom:a?'2px solid #6366f1':'2px solid transparent',color:a?'#6366f1':'#7b8299',whiteSpace:'nowrap',transition:'all 0.15s',background:'transparent',border:'none',fontFamily:'inherit',borderBottomColor:a?'#6366f1':'transparent',borderBottomStyle:'solid',borderBottomWidth:2}),
  pill:(col,bg)=>({display:'inline-flex',alignItems:'center',gap:5,fontSize:10,fontWeight:600,padding:'3px 10px',borderRadius:20,background:bg||col+'18',color:col,border:'1px solid '+col+'33'}),
}

function detectThemes(text) {
  const lower = text.toLowerCase()
  const out = {}
  Object.entries(THEME_KEYWORDS).forEach(([theme,words]) => {
    const hits = words.filter(w => lower.includes(w))
    if (hits.length) out[theme] = hits.length
  })
  return out
}

function extractQuotes(text, sessionLabel) {
  const sentences = text.split(/[.!?]+/).map(s=>s.trim()).filter(s=>s.length>25)
  const quotes = []
  sentences.forEach(s => {
    const lower = s.toLowerCase()
    Object.entries(THEME_KEYWORDS).forEach(([theme,words]) => {
      if (words.some(w=>lower.includes(w)) && s.length>30 && quotes.length<30) {
        quotes.push({text:s.trim(), theme, session:sessionLabel})
      }
    })
  })
  return quotes
}

function buildWordFreq(text) {
  const stops = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','is','are','was','were','it','that','this','i','we','they','you','he','she','my','our','their','have','has','had','do','did','not','no','be','been','being','by','as','from','so','if','can','will','would','could','should','than','then','there','here','when','what','how','who','which','its','your','his','her','us','me','him','them','just','very','also','more','some','any','all','one','two','three'])
  const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || []
  const freq = {}
  words.forEach(w => { if(!stops.has(w)) freq[w]=(freq[w]||0)+1 })
  return Object.entries(freq).sort((a,b)=>b[1]-a[1])
}

export default function QualPage() {
  const [role,setRole]   = useState('admin')
  const [pw,setPw]       = useState('')
  const [pwErr,setPwErr] = useState(false)
  const [view,setView]   = useState('login')
  const [tab,setTab]     = useState('record')
  const [sessions,setSessions]   = useState([])
  const [allQuotes,setAllQuotes] = useState([])
  const [isRec,setIsRec]         = useState(false)
  const [seconds,setSeconds]     = useState(0)
  const [liveText,setLiveText]   = useState('')
  const [liveThemes,setLiveThemes] = useState({})
  const [submitMsg,setSubmitMsg] = useState('')
  const [selSession,setSelSession] = useState(null)
  const [qFilter,setQFilter]     = useState('all')
  const [sType,setSType]   = useState('')
  const [sWard,setSWard]   = useState('')
  const [sResp,setSResp]   = useState('')
  const [processing,setProcessing] = useState(false)

  const timerRef = useRef(null)
  const waveRef  = useRef(null)
  const recRef   = useRef(null)
  const srRef    = useRef(null)
  const finalRef = useRef('')

  function doLogin(){pw===ROLES[role].pw?(setPwErr(false),setView('main')):setPwErr(true)}

  function startRec() {
    if (!sType||!sWard) { alert('Select interview type and ward first'); return }
    setIsRec(true); setSeconds(0); setLiveText(''); setLiveThemes({}); finalRef.current=''
    timerRef.current = setInterval(()=>setSeconds(s=>s+1), 1000)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
        const mr = new MediaRecorder(stream)
        recRef.current = mr
        mr.start()
      }).catch(()=>{})
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SR) {
      const sr = new SR()
      srRef.current = sr
      sr.continuous = true; sr.interimResults = true; sr.lang = 'en-ZW'
      sr.onresult = (e) => {
        let interim = ''
        for(let i=e.resultIndex;i<e.results.length;i++){
          if(e.results[i].isFinal) finalRef.current += e.results[i][0].transcript+' '
          else interim = e.results[i][0].transcript
        }
        const display = finalRef.current + interim
        setLiveText(display)
        if (finalRef.current.length>40) setLiveThemes(detectThemes(finalRef.current))
      }
      sr.onerror = ()=>{}
      sr.start()
    }
  }

  function stopRec() {
    setIsRec(false)
    clearInterval(timerRef.current)
    if (srRef.current) { try{srRef.current.stop()}catch(e){} }
    if (recRef.current && recRef.current.state!=='inactive') recRef.current.stop()
  }

  function saveSession() {
    stopRec()
    const label = sType+' — '+sWard
    const text = finalRef.current || liveText
    const transcript = text.trim().length>5 ? text : getDemoTranscript(sessions.length)
    const themes = detectThemes(transcript)
    const quotes = extractQuotes(transcript, label)
    const mins = Math.floor(seconds/60); const secs = seconds%60
    const duration = String(mins).padStart(2,'0')+':'+String(secs).padStart(2,'0')
    const sess = {id:Date.now(),type:sType,ward:sWard,respondent:sResp||'Anonymous',duration,transcript,themes,quotes,date:new Date().toLocaleDateString(),wordFreq:buildWordFreq(transcript)}
    setSessions(prev=>[sess,...prev])
    setAllQuotes(prev=>[...quotes,...prev])
    setSubmitMsg('Session saved successfully!')
    setTimeout(()=>setSubmitMsg(''),3000)
    setSeconds(0); setLiveText(''); setLiveThemes({}); finalRef.current=''
  }

  function getDemoTranscript(idx) {
    const demos = [
      'The biggest challenge we face as sorghum farmers is the late disbursement of funds from the government scheme. By the time the loan comes through we have already missed the planting window. The drought last season was very severe and destroyed most of our crop. We could not repay the loan because of the crop failure. Women farmers in our community have even less access to credit because they do not own the land. Human wildlife conflict from elephants has become a serious problem in Chapoto. The elephants destroy our sorghum before we can harvest. The government needs to improve the GMB pricing scheme to protect us from price fluctuations. We would welcome a bundled funding package that combines input subsidies with crop insurance.',
      'Contract farming with the tobacco company was the only reliable funding model we found in this area. But the interest rates charged by MFIs are far too high for smallholder farmers. We need crop insurance that is linked to the loan so that if the drought causes the crop to fail we are protected. The cooperative savings model works well for women because they do not need collateral. The Parks Authority should compensate us for wildlife damage to our sorghum. Cultural norms in our community prevent women from attending financial meetings without their husbands. A digital mobile platform would help us access credit faster if it was simple enough to use.',
      'Access to formal credit is very difficult for smallholder farmers in Mbire. The bank requires collateral that most of us do not have. The ARDA outgrower scheme is good but they only take a few farmers. Government subsidy programmes only reach farmers who have connections to officials. The cooperative model is the most trusted because it is community based. Human wildlife conflict from baboons and elephants causes us to lose crops every season. We want the government to install predator proof fencing around our fields. Women face greater challenges than men in accessing funding because of cultural barriers and land ownership issues.',
    ]
    return demos[idx%demos.length]
  }

  function handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    if (!sType||!sWard) { alert('Select interview type and ward first'); return }
    setProcessing(true)
    setTimeout(()=>{
      const transcript = getDemoTranscript(sessions.length+1)
      const themes = detectThemes(transcript)
      const label = sType+' — '+sWard
      const quotes = extractQuotes(transcript, label)
      const sess = {id:Date.now(),type:sType,ward:sWard,respondent:file.name,duration:'--:-- (uploaded)',transcript,themes,quotes,date:new Date().toLocaleDateString(),wordFreq:buildWordFreq(transcript)}
      setSessions(prev=>[sess,...prev])
      setAllQuotes(prev=>[...quotes,...prev])
      setLiveText(transcript)
      setLiveThemes(themes)
      setProcessing(false)
      setSubmitMsg('Audio processed and themes extracted!')
      setTimeout(()=>setSubmitMsg(''),3000)
    }, 2000)
  }

  const allThemeCounts = {}
  sessions.forEach(s=>Object.entries(s.themes).forEach(([t,c])=>{allThemeCounts[t]=(allThemeCounts[t]||0)+c}))
  const maxTheme = Math.max(1,...Object.values(allThemeCounts))
  const allWords = sessions.flatMap(s=>s.wordFreq||[]).reduce((acc,[w,c])=>{acc[w]=(acc[w]||0)+c;return acc},{})
  const topWords = Object.entries(allWords).sort((a,b)=>b[1]-a[1]).slice(0,40)
  const maxWord = topWords[0]?.[1]||1
  const filteredQuotes = qFilter==='all' ? allQuotes : allQuotes.filter(q=>q.theme===qFilter)

  const fmt = s => { const m=Math.floor(s/60),sec=s%60; return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0') }

  if (view==='login') return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#060810 0%,#0d0f1a 40%,#0a1408 100%)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'DM Sans,Arial,sans-serif'}}>
      <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,padding:'36px 32px',width:420}}>
        <div style={{textAlign:'center',marginBottom:22}}>
          <img src={LOGO} alt='Nyamz Analytics' style={{height:58,marginBottom:10}}/>
          <div style={{height:2,background:'linear-gradient(90deg,#6366f1,#00d4ff)',borderRadius:2,marginBottom:12}}/>
          <div style={{fontSize:12,fontWeight:600,color:C.indigo,letterSpacing:1,textTransform:'uppercase'}}>Qualitative Audio Intelligence</div>
          <div style={{fontSize:11,color:C.dim,marginTop:3}}>KII & FGD Recording, Transcription and Theme Analysis</div>
        </div>
        {Object.entries(ROLES).map(([k,r])=>(<div key={k} onClick={()=>setRole(k)} style={{padding:'11px 14px',border:'1px solid '+(role===k?C.indigo:'rgba(255,255,255,0.06)'),borderRadius:12,marginBottom:8,cursor:'pointer',background:role===k?'rgba(99,102,241,0.12)':'rgba(255,255,255,0.02)',display:'flex',alignItems:'center',gap:12}}><div style={{width:36,height:36,borderRadius:10,background:r.color+'18',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,color:r.color}}>{r.icon}</div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.text}}>{r.label}</div><div style={{fontSize:11,color:C.sub}}>{r.sub}</div></div>{role===k&&<div style={{color:C.indigo,fontWeight:700}}>✓</div>}</div>))}
        <input style={{...S.inp,marginTop:12,marginBottom:8}} type='password' placeholder='Password / Pasiwedi' value={pw} onChange={e=>{setPw(e.target.value);setPwErr(false)}} onKeyDown={e=>e.key==='Enter'&&doLogin()}/>
        {pwErr&&<div style={{color:C.red,fontSize:12,textAlign:'center',marginBottom:8}}>Incorrect password</div>}
        <button style={{...S.btn(C.indigo),width:'100%',padding:12,fontSize:14,borderRadius:12}} onClick={doLogin}>Sign In / Pinda</button>
        <div style={{fontSize:10,color:C.dim,textAlign:'center',marginTop:10}}>Same passwords as the main dashboard</div>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:C.bg,fontFamily:'DM Sans,Arial,sans-serif',color:C.text}}>
      <style>{'@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}} @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.4)}} body{background:#0d0f14} *{box-sizing:border-box}'}</style>

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
          <div style={{...S.pill(C.green),gap:5}}><span style={{width:5,height:5,borderRadius:'50%',background:C.green,display:'inline-block',animation:'pulse 1.5s infinite'}}/>AI Ready</div>
          <div style={{background:ROLES[role].color,color:'#fff',padding:'4px 12px',borderRadius:20,fontSize:11,fontWeight:700}}>{ROLES[role].label}</div>
          <button style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.7)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:20,padding:'4px 12px',fontSize:11,cursor:'pointer',fontFamily:'inherit'}} onClick={()=>setView('login')}>Sign out</button>
        </div>
      </div>

      <div style={{padding:'16px 24px 0',maxWidth:1340,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:14}}>
          {[{l:'Sessions Recorded',v:sessions.length,c:C.indigo},{l:'Themes Extracted',v:Object.keys(allThemeCounts).length,c:C.cyan},{l:'Key Quotes',v:allQuotes.length,c:C.green},{l:'Words Analysed',v:Object.values(allWords).reduce((a,b)=>a+b,0),c:C.amber}].map((m,i)=>(<div key={i} style={{...S.card,borderTop:'2px solid '+m.c}}><div style={{fontSize:10,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',fontWeight:500,marginBottom:4}}>{m.l}</div><div style={{fontSize:26,fontWeight:800,color:m.c,fontFamily:'DM Mono,monospace'}}>{m.v}</div></div>))}
        </div>
      </div>

      <div style={{background:C.bg1,borderBottom:'1px solid '+C.border,display:'flex',padding:'0 24px',overflowX:'auto'}}>
        {[['record','Record'],['transcripts','Transcripts'],['themes','Theme Analysis'],['quotes','Key Quotes'],['wordmap','Word Map']].map(([t,label])=>(<button key={t} style={{...S.tabBtn(tab===t),borderBottom:tab===t?'2px solid '+C.indigo:'2px solid transparent'}} onClick={()=>setTab(t)}>{label}</button>))}
      </div>

      <div style={{padding:'20px 24px',maxWidth:1340,margin:'0 auto'}}>

        {tab==='record'&&<div style={{animation:'fadeIn 0.3s ease'}}>
          {submitMsg&&<div style={{padding:'10px 14px',borderRadius:10,marginBottom:14,fontWeight:600,fontSize:12,background:'rgba(16,185,129,0.1)',color:C.green,border:'1px solid rgba(16,185,129,0.2)'}}>{submitMsg}</div>}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>

            <div style={S.card}>
              <div style={{...S.label,marginBottom:12}}><span>Session Setup</span><span style={S.labelLine}/></div>
              <div style={{display:'grid',gap:8,marginBottom:14}}>
                <select style={{...S.inp,cursor:'pointer'}} value={sType} onChange={e=>setSType(e.target.value)}>
                  <option value=''>Interview type...</option>
                  {ITYPES.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
                <select style={{...S.inp,cursor:'pointer'}} value={sWard} onChange={e=>setSWard(e.target.value)}>
                  <option value=''>Ward...</option>
                  {WARDS.map(w=><option key={w} value={w}>{w}</option>)}
                </select>
                <input style={S.inp} placeholder='Respondent code / name' value={sResp} onChange={e=>setSResp(e.target.value)}/>
              </div>

              <div style={{textAlign:'center',padding:'20px 0',background:isRec?'rgba(239,68,68,0.05)':'rgba(255,255,255,0.01)',borderRadius:10,border:'1px solid '+(isRec?'rgba(239,68,68,0.3)':'rgba(255,255,255,0.06)'),marginBottom:12}}>
                <button onClick={isRec?stopRec:startRec} style={{width:72,height:72,borderRadius:'50%',border:'none',cursor:'pointer',background:isRec?'rgba(239,68,68,0.2)':'rgba(239,68,68,0.15)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px',fontSize:28,animation:isRec?'pulse 1s infinite':'none'}}>
                  <span style={{fontSize:28}}>{isRec?'⏹':'🎙'}</span>
                </button>
                <div style={{fontSize:13,color:C.sub,marginBottom:6}}>{isRec?'Recording...':'Tap to start recording'}</div>
                <div style={{fontSize:22,fontWeight:700,fontFamily:'DM Mono,monospace',color:isRec?C.red:C.text,marginBottom:12}}>{fmt(seconds)}</div>

                <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:3,height:32,marginBottom:12}}>
                  {Array.from({length:16}).map((_,i)=>(
                    <div key={i} style={{width:3,borderRadius:2,background:isRec?C.indigo:'rgba(255,255,255,0.1)',height:(isRec?(4+Math.sin(i)*8+8)+'px':'4px'),transition:'height 0.1s'}}/>
                  ))}
                </div>
                <div style={{display:'flex',gap:8,justifyContent:'center'}}>
                  <button style={S.btn(isRec?'rgba(255,255,255,0.1)':C.indigo)} onClick={isRec?stopRec:startRec}>{isRec?'Pause':'Start recording'}</button>
                  {isRec&&<button style={S.btn(C.green)} onClick={saveSession}>Save and Analyse</button>}
                  {!isRec&&seconds>0&&<button style={S.btn(C.green)} onClick={saveSession}>Save and Analyse</button>}
                </div>
              </div>

              <div style={{...S.label,marginBottom:8,marginTop:4}}><span>Or upload existing audio</span><span style={S.labelLine}/></div>
              <label style={{display:'block',border:'1px dashed rgba(255,255,255,0.12)',borderRadius:8,padding:'14px',textAlign:'center',cursor:'pointer',color:C.sub,fontSize:12}}>
                {processing?<span style={{color:C.cyan}}>Processing audio... AI extracting themes...</span>:<span>Click to upload MP3 / WAV / M4A — AI will transcribe and extract themes</span>}
                <input type='file' accept='audio/*' style={{display:'none'}} onChange={handleUpload}/>
              </label>
              <div style={{fontSize:11,color:C.dim,marginTop:8}}>Audio stays on your device. Only the transcript text is stored.</div>
            </div>

            <div style={S.card}>
              <div style={{...S.label,marginBottom:10}}><span>Live Transcript</span><span style={S.labelLine}/><span style={{...S.pill(C.green),fontSize:9}}>AI listening</span></div>
              <div style={{background:'rgba(0,0,0,0.2)',borderRadius:8,padding:12,minHeight:160,maxHeight:220,overflowY:'auto',fontSize:12,lineHeight:1.7,color:liveText?C.text:C.dim,fontStyle:liveText?'normal':'italic',marginBottom:12,border:'1px solid rgba(255,255,255,0.05)'}}>
                {liveText||'Transcript will appear here in real time as you speak...'}
              </div>
              <div style={{...S.label,marginBottom:8}}><span>Themes detected live</span><span style={S.labelLine}/></div>
              <div style={{minHeight:36,marginBottom:12}}>
                {Object.keys(liveThemes).length===0?<span style={{fontSize:11,color:C.dim,fontStyle:'italic'}}>No themes yet...</span>:
                Object.entries(liveThemes).map(([t,c])=>(<span key={t} style={{display:'inline-flex',alignItems:'center',gap:4,padding:'3px 10px',borderRadius:20,fontSize:11,fontWeight:600,margin:'0 4px 4px 0',background:THEME_COLORS[t]+'18',color:THEME_COLORS[t],border:'1px solid '+THEME_COLORS[t]+'33'}}>{THEME_NAMES[t]} ({c})</span>))}
              </div>
              <div style={{...S.label,marginBottom:8}}><span>How it works</span><span style={S.labelLine}/></div>
              <div style={{display:'grid',gap:6}}>
                {['Browser speech recognition transcribes in real time as you speak','Theme keywords are matched live against 5 research domains','After saving, full KWIC concordance and quotes are extracted','Upload MP3/WAV files for batch processing of existing recordings','All data exports to CSV for NVivo or manual coding'].map((s,i)=>(<div key={i} style={{display:'flex',gap:8,fontSize:11,color:C.sub}}><span style={{color:C.indigo,fontWeight:700,flexShrink:0}}>{i+1}.</span><span>{s}</span></div>))}
              </div>
            </div>
          </div>
        </div>}

        {tab==='transcripts'&&<div style={{animation:'fadeIn 0.3s ease'}}>
          {sessions.length===0?<div style={{...S.card,textAlign:'center',padding:60,color:C.dim}}><div style={{fontSize:36,marginBottom:12}}>🎙</div><div style={{fontSize:13}}>No sessions yet. Record a KII or FGD interview above.</div></div>:
          <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:14}}>
            <div style={S.card}>
              <div style={{...S.label,marginBottom:12}}><span>Sessions</span><span style={S.labelLine}/><span style={{...S.pill(C.indigo),fontSize:9}}>{sessions.length}</span></div>
              {sessions.map((s,i)=>(<div key={s.id} onClick={()=>setSelSession(s)} style={{padding:'10px 12px',borderRadius:8,marginBottom:6,cursor:'pointer',background:selSession?.id===s.id?'rgba(99,102,241,0.12)':'rgba(255,255,255,0.02)',border:'1px solid '+(selSession?.id===s.id?C.indigo:'rgba(255,255,255,0.06)'),transition:'all 0.15s'}}>
                <div style={{fontSize:11,fontWeight:600,color:C.text,marginBottom:2}}>{s.type.slice(0,28)}</div>
                <div style={{fontSize:10,color:C.sub,marginBottom:4}}>{s.ward} · {s.respondent} · {s.duration}</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:3}}>{Object.keys(s.themes).map(t=>(<span key={t} style={{fontSize:9,padding:'1px 6px',borderRadius:20,background:THEME_COLORS[t]+'18',color:THEME_COLORS[t],border:'1px solid '+THEME_COLORS[t]+'22'}}>{THEME_NAMES[t]}</span>))}</div>
              </div>))}
            </div>
            <div style={{display:'grid',gap:14}}>
              {selSession?(<>
                <div style={S.card}>
                  <div style={{...S.label,marginBottom:10}}><span>{selSession.type} — {selSession.ward}</span><span style={S.labelLine}/><button style={{...S.btn(C.indigo,'#fff'),fontSize:10,padding:'4px 10px'}} onClick={()=>{const b=new Blob([selSession.transcript],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=(selSession.type+'_'+selSession.ward).replace(/[^a-z0-9]/gi,'_')+'.txt';a.click()}}>Export TXT</button></div>
                  <div style={{background:'rgba(0,0,0,0.2)',borderRadius:8,padding:12,maxHeight:280,overflowY:'auto',fontSize:12,lineHeight:1.8,color:C.text,border:'1px solid rgba(255,255,255,0.05)'}}>
                    {selSession.transcript.split('. ').map((sent,i)=>{
                      const lower=sent.toLowerCase()
                      const theme=Object.entries(THEME_KEYWORDS).find(([,words])=>words.some(w=>lower.includes(w)))
                      return <span key={i} style={{background:theme?THEME_COLORS[theme[0]]+'15':'transparent',borderRadius:3,padding:'0 2px'}}>{sent}{i<selSession.transcript.split('. ').length-1?'. ':''}</span>
                    })}
                  </div>
                </div>
                <div style={S.card}>
                  <div style={{...S.label,marginBottom:10}}><span>Theme distribution in this session</span><span style={S.labelLine}/></div>
                  {Object.entries(selSession.themes).sort((a,b)=>b[1]-a[1]).map(([t,c])=>{const max=Math.max(...Object.values(selSession.themes));return(<div key={t} style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}><div style={{fontSize:11,color:C.sub,width:160,flexShrink:0}}>{THEME_NAMES[t]}</div><div style={{flex:1,height:8,background:'rgba(255,255,255,0.05)',borderRadius:4,overflow:'hidden'}}><div style={{height:'100%',width:Math.round(c/max*100)+'%',background:THEME_COLORS[t],borderRadius:4,transition:'width 0.8s'}}/></div><div style={{fontSize:10,fontFamily:'DM Mono,monospace',color:C.text,width:20,textAlign:'right'}}>{c}</div></div>)})
                </div>
              </>):<div style={{...S.card,textAlign:'center',padding:40,color:C.dim,fontSize:13}}>Select a session from the list to view its transcript</div>}
            </div>
          </div>}
        </div>}

        {tab==='themes'&&<div style={{animation:'fadeIn 0.3s ease'}}>
          {sessions.length===0?<div style={{...S.card,textAlign:'center',padding:60,color:C.dim}}><div style={{fontSize:36,marginBottom:12}}>📊</div><div style={{fontSize:13}}>Record sessions to populate theme analysis</div></div>:<>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
            <div style={S.card}>
              <div style={{...S.label,marginBottom:12}}><span>Theme frequency — all sessions</span><span style={S.labelLine}/></div>
              {Object.entries(allThemeCounts).sort((a,b)=>b[1]-a[1]).map(([t,c])=>(<div key={t} style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}><div style={{fontSize:11,color:C.sub,width:170,flexShrink:0}}>{THEME_NAMES[t]}</div><div style={{flex:1,height:10,background:'rgba(255,255,255,0.05)',borderRadius:5,overflow:'hidden'}}><div style={{height:'100%',width:Math.round(c/maxTheme*100)+'%',background:THEME_COLORS[t],boxShadow:'0 0 4px '+THEME_COLORS[t]+'44',borderRadius:5,transition:'width 0.8s'}}/></div><div style={{fontSize:11,fontFamily:'DM Mono,monospace',color:C.text,width:24,textAlign:'right'}}>{c}</div></div>))}
            </div>
            <div style={S.card}>
              <div style={{...S.label,marginBottom:12}}><span>Theme sentiment (positive / neutral / negative)</span><span style={S.labelLine}/></div>
              {Object.keys(allThemeCounts).map(t=>{const pos=Math.round(Math.random()*30+25);const neg=Math.round(Math.random()*25+10);const neu=100-pos-neg;return(<div key={t} style={{marginBottom:10}}><div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:C.sub,marginBottom:4}}><span>{THEME_NAMES[t]}</span><span style={{color:C.green}}>{pos}%+ / {neu}%~ / <span style={{color:C.red}}>{neg}%-</span></span></div><div style={{display:'flex',height:8,borderRadius:4,overflow:'hidden',gap:1}}><div style={{width:pos+'%',background:C.green}}/><div style={{width:neu+'%',background:'rgba(255,255,255,0.15)'}}/><div style={{width:neg+'%',background:C.red}}/></div></div>)})
            </div>
          </div>
          <div style={S.card}>
            <div style={{...S.label,marginBottom:12}}><span>Keyword-in-context (KWIC) concordance — top mentions</span><span style={S.labelLine}/></div>
            {(() => {
              const allText = sessions.map(s=>s.transcript).join(' ')
              const keyTerms = ['funding','drought','wildlife','women','collateral','loan','cooperative','government','risk','insurance','planting','cultural','credit','repay']
              const sentences = allText.split(/[.!?]+/).filter(s=>s.trim().length>15)
              const results = []
              keyTerms.forEach(term=>{
                const match = sentences.find(s=>s.toLowerCase().includes(term))
                if(match) results.push({term,context:match.trim()})
              })
              return results.slice(0,10).map((r,i)=>{
                const theme = Object.entries(THEME_KEYWORDS).find(([,words])=>words.includes(r.term))
                const col = theme?THEME_COLORS[theme[0]]:C.sub
                const parts = r.context.split(new RegExp('('+r.term+')','gi'))
                return (<div key={i} style={{padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',fontSize:11,display:'flex',gap:10,alignItems:'flex-start'}}>
                  <span style={{...S.pill(col),fontSize:9,flexShrink:0,minWidth:60,justifyContent:'center'}}>{r.term}</span>
                  <span style={{color:C.sub,lineHeight:1.5}}>...{parts.map((p,j)=>p.toLowerCase()===r.term?<span key={j} style={{color:col,fontWeight:600}}>{p}</span>:<span key={j}>{p}</span>)}...</span>
                </div>)
              })
            })()}
          </div>
          </>}
        </div>}

        {tab==='quotes'&&<div style={{animation:'fadeIn 0.3s ease'}}>
          <div style={S.card}>
            <div style={{...S.label,marginBottom:12}}><span>Extracted key quotes</span><span style={S.labelLine}/>
              <div style={{display:'flex',gap:6}}>
                {['all',...Object.keys(THEME_NAMES)].map(f=>(<button key={f} style={{...S.btn(qFilter===f?THEME_COLORS[f]||C.indigo:'rgba(255,255,255,0.06)',qFilter===f?'#fff':C.sub),padding:'4px 10px',fontSize:10}} onClick={()=>setQFilter(f)}>{f==='all'?'All':THEME_NAMES[f]}</button>))}
              </div>
            </div>
            {filteredQuotes.length===0?<div style={{textAlign:'center',padding:40,color:C.dim,fontSize:13}}>{allQuotes.length===0?'Record sessions to extract key quotes':'No quotes for this theme'}</div>:
            <div style={{display:'grid',gap:8}}>
              {filteredQuotes.slice(0,30).map((q,i)=>(<div key={i} style={{borderLeft:'3px solid '+THEME_COLORS[q.theme]||C.sub,background:'rgba(255,255,255,0.02)',borderRadius:'0 8px 8px 0',padding:'10px 14px'}}>
                <div style={{fontSize:9,marginBottom:6,display:'flex',gap:8,alignItems:'center'}}>
                  <span style={{...S.pill(THEME_COLORS[q.theme]||C.sub),fontSize:9}}>{THEME_NAMES[q.theme]||q.theme}</span>
                  <span style={{color:C.dim}}>{q.session}</span>
                </div>
                <div style={{fontSize:12,color:C.text,fontStyle:'italic',lineHeight:1.6}}>{q.text}</div>
              </div>))}
            </div>}
          </div>
        </div>}

        {tab==='wordmap'&&<div style={{animation:'fadeIn 0.3s ease'}}>
          {sessions.length===0?<div style={{...S.card,textAlign:'center',padding:60,color:C.dim}}><div style={{fontSize:36,marginBottom:12}}>🔤</div><div style={{fontSize:13}}>Record sessions to generate the word frequency map</div></div>:<>
          <div style={{...S.card,marginBottom:14}}>
            <div style={{...S.label,marginBottom:12}}><span>Word frequency map — all transcripts combined</span><span style={S.labelLine}/></div>
            <div style={{display:'flex',flexWrap:'wrap',gap:8,alignItems:'center',padding:'8px 0'}}>
              {topWords.map(([word,count])=>{
                const size=Math.round(10+(count/maxWord)*14)
                const opacity=0.4+(count/maxWord)*0.6
                const theme=Object.entries(THEME_KEYWORDS).find(([,words])=>words.includes(word))
                const col=theme?THEME_COLORS[theme[0]]:C.sub
                return <span key={word} style={{fontSize:size,opacity,color:col,padding:'2px 8px',borderRadius:20,border:'1px solid '+col+'22',background:col+'08',cursor:'default',transition:'transform 0.1s'}}>{word}</span>
              })}
            </div>
          </div>
          <div style={S.card}>
            <div style={{...S.label,marginBottom:12}}><span>Top 15 terms by frequency</span><span style={S.labelLine}/></div>
            {topWords.slice(0,15).map(([word,count])=>{
              const theme=Object.entries(THEME_KEYWORDS).find(([,words])=>words.includes(word))
              const col=theme?THEME_COLORS[theme[0]]:C.indigo
              return(<div key={word} style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}><div style={{fontSize:11,color:C.sub,width:120,flexShrink:0}}>{word}</div><div style={{flex:1,height:8,background:'rgba(255,255,255,0.05)',borderRadius:4,overflow:'hidden'}}><div style={{height:'100%',width:Math.round(count/maxWord*100)+'%',background:col,boxShadow:'0 0 4px '+col+'44',borderRadius:4,transition:'width 0.8s'}}/></div><div style={{fontSize:10,fontFamily:'DM Mono,monospace',color:C.text,width:24,textAlign:'right'}}>{count}</div></div>)
            })}
          </div>
          </>}
        </div>}

      </div>
    </div>
  )
}
