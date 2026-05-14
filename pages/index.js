import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const LOGO = 'data:image/jpeg;base64,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'

const C = {
  bg:'#0d0f14',bg1:'#13161e',bg2:'#181c26',
  border:'rgba(255,255,255,0.06)',border2:'rgba(255,255,255,0.12)',
  text:'#e8eaf0',sub:'#7b8299',dim:'#4a5068',
  cyan:'#00d4ff',indigo:'#6366f1',violet:'#8b5cf6',
  pink:'#ec4899',green:'#10b981',amber:'#f59e0b',
  red:'#ef4444',blue:'#3b82f6',
}

const WC = [C.indigo,C.cyan,C.green,C.amber,C.pink]
const WARDS = ['Chapoto (Ward 1)','Chitsungo (Ward 10)','Masoka (Ward 11)','Gonono (Ward 4)','Mahuwe (Ward 15)']
const FUND_LABELS = {contract:'Contract',mfi:'MFI Loan',gmb_scheme:'GMB',arda:'ARDA',cooperative:'Coop',govt_subsidy:'Subsidy',agro_credit:'Agro-dealer',informal:'Informal'}
const RISK_QS = [{id:'q21_drought',label:'Drought'},{id:'q22_hwc',label:'HWC'},{id:'q23_latedisb',label:'Late Disb.'},{id:'q24_repay',label:'Repayment'},{id:'q25_price',label:'Price Risk'},{id:'q26_trust',label:'Trust'},{id:'q27_govt',label:'Govt Support'}]
const ROLES = {admin:{label:'Phillemon Nyamgure',sub:'Nyamz Analytics — Full Control',pw:'nyamz2026',color:C.red,icon:'P'},supervisor:{label:'PhD Supervisor',sub:'View dashboard only',pw:'super2026',color:C.cyan,icon:'S'},sydney:{label:'Sydney Mazambara',sub:'Researcher — Field + View',pw:'mbire2026',color:C.green,icon:'M'},enumerator:{label:'Enumerator',sub:'Data entry only',pw:'enum2026',color:C.amber,icon:'E'}}

const S = {
  card:{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:14},
  label:{fontSize:9,fontWeight:500,color:'#7b8299',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:6,display:'flex',alignItems:'center',gap:6},
  labelLine:{flex:1,height:'0.5px',background:'rgba(255,255,255,0.06)'},
  btn:(bg,c='#fff')=>({background:bg,color:c,border:'none',borderRadius:8,padding:'7px 14px',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}),
  outBtn:(color)=>({background:'transparent',color:color,border:'1px solid '+color+'44',borderRadius:8,padding:'5px 12px',fontSize:10,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}),
  inp:{width:'100%',padding:'8px 10px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#e8eaf0',fontSize:11,fontFamily:'inherit',outline:'none'},
  tabBtn:(a)=>({padding:'11px 16px',fontSize:12,fontWeight:a?600:400,cursor:'pointer',borderBottom:a?'2px solid #6366f1':'2px solid transparent',color:a?'#6366f1':'#7b8299',whiteSpace:'nowrap',transition:'all 0.15s',background:'transparent',border:'none',fontFamily:'inherit',borderBottomColor:a?'#6366f1':'transparent',borderBottomStyle:'solid',borderBottomWidth:2}),
  radio:(sel)=>({padding:'4px 11px',borderRadius:20,cursor:'pointer',border:'1px solid '+(sel?'#6366f1':'rgba(255,255,255,0.08)'),background:sel?'rgba(99,102,241,0.15)':'rgba(255,255,255,0.02)',color:sel?'#6366f1':'#7b8299',fontSize:11,fontWeight:sel?600:400,transition:'all 0.15s',userSelect:'none'}),
  likertBtn:(sel)=>({width:36,height:36,borderRadius:7,cursor:'pointer',fontSize:13,display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid '+(sel?'#6366f1':'rgba(255,255,255,0.08)'),background:sel?'rgba(99,102,241,0.2)':'rgba(255,255,255,0.02)',color:sel?'#6366f1':'#7b8299',fontWeight:sel?700:400,transform:sel?'scale(1.1)':'scale(1)',transition:'all 0.15s'}),
  secHead:(col)=>({background:col+'18',borderLeft:'3px solid '+col,borderRadius:'0 8px 8px 0',padding:'10px 14px',marginBottom:12,marginTop:20}),
}

function CT({active,payload,label}) {
  if(!active||!payload||!payload.length) return null
  return React.createElement('div',{style:{background:'rgba(13,15,20,0.95)',borderRadius:8,padding:'8px 12px',border:'1px solid rgba(99,102,241,0.3)'}},
    React.createElement('div',{style:{color:'rgba(255,255,255,0.5)',fontSize:10,marginBottom:3}},label),
    payload.map((p,i)=>React.createElement('div',{key:i,style:{color:'#e8eaf0',fontSize:12,fontWeight:600}},p.value))
  )
}

import React from 'react'

export default function Home() {
  const [view,setView]=useState('login')
  const [role,setRole]=useState('admin')
  const [pw,setPw]=useState('')
  const [pwErr,setPwErr]=useState(false)
  const [tab,setTab]=useState('dashboard')
  const [responses,setResponses]=useState([])
  const [users,setUsers]=useState([])
  const [form,setForm]=useState({q14_models:[]})
  const [submitStatus,setSubmitStatus]=useState('')
  const [newEnum,setNewEnum]=useState({name:'',email:'',ward:''})
  const [showAddEnum,setShowAddEnum]=useState(false)
  const [deleteModal,setDeleteModal]=useState(null)
  const [bulkSel,setBulkSel]=useState([])
  const [fWard,setFWard]=useState('all')
  const [fStatus,setFStatus]=useState('all')
  const [toast,setToast]=useState(null)

  const showToast=useCallback((msg,type='success')=>{setToast({msg,type});setTimeout(()=>setToast(null),3500)},[]) 

  const fetchData=useCallback(async()=>{
    try{
      const [{data:r},{data:u}]=await Promise.all([
        supabase.from('responses').select('*').order('submitted_at',{ascending:false}),
        supabase.from('users').select('*')
      ])
      if(r)setResponses(r)
      if(u)setUsers(u)
    }catch(e){console.error(e)}
  },[])

  useEffect(()=>{
    if(view!=='main')return
    fetchData()
    const ch=supabase.channel('rt').on('postgres_changes',{event:'INSERT',schema:'public',table:'responses'},()=>{fetchData();showToast('New response received!')}).subscribe()
    const iv=setInterval(fetchData,30000)
    return()=>{supabase.removeChannel(ch);clearInterval(iv)}
  },[view,fetchData,showToast])

  const total=responses.length
  const pct=parseFloat(((total/460)*100).toFixed(1))
  const femHH=responses.filter(r=>r.q4_hhhead==='female_headed').length
  const useFund=responses.filter(r=>r.q16_usefunding==='yes').length
  const isInc=r=>!r.q1_sex||!r.q16_usefunding||!r.q21_drought
  const incomplete=responses.filter(isInc)
  const enumerators=users.filter(u=>u.role==='enumerator')

  const wardData=WARDS.map((w,i)=>{const c=responses.filter(r=>r.ward===w).length;return{ward:w,collected:c,target:92,color:WC[i],pct:Math.round(c/92*100)}})
  const dailyMap={};responses.forEach(r=>{const d=r.submitted_at&&r.submitted_at.slice(0,10);if(d)dailyMap[d]=(dailyMap[d]||0)+1})
  const dailyData=Object.entries(dailyMap).sort(([a],[b])=>a.localeCompare(b)).slice(-14).map(([d,c])=>({day:d.slice(5),count:c}))
  const fundMap={};responses.forEach(r=>{if(r.q17_models)r.q17_models.forEach(m=>{if(m)fundMap[m]=(fundMap[m]||0)+1})})
  const fundData=Object.entries(fundMap).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([k,v])=>({name:FUND_LABELS[k]||k,count:v}))
  const genderData=[{name:'Male',value:responses.filter(r=>r.q1_sex==='male').length,color:C.indigo},{name:'Female',value:responses.filter(r=>r.q1_sex==='female').length,color:C.pink}].filter(d=>d.value>0)

  function setF(k,v){setForm(p=>({...p,[k]:v}))}
  function toggleModel(m){setForm(p=>({...p,q14_models:p.q14_models.includes(m)?p.q14_models.filter(x=>x!==m):[...p.q14_models,m]}))}
  function doLogin(){pw===ROLES[role].pw?(setPwErr(false),setView('main')):setPwErr(true)}

  async function deleteOne(id){
    const {error}=await supabase.from('responses').delete().eq('id',id)
    if(!error){fetchData();showToast('Deleted');setDeleteModal(null)}
    else showToast('Error: '+error.message,'danger')
  }
  async function bulkDelete(){
    for(const id of bulkSel){await supabase.from('responses').delete().eq('id',id)}
    setBulkSel([]);fetchData();showToast(bulkSel.length+' deleted');setDeleteModal(null)
  }
  async function deleteAllInc(){
    for(const r of incomplete){await supabase.from('responses').delete().eq('id',r.id)}
    fetchData();showToast(incomplete.length+' incomplete deleted');setDeleteModal(null)
  }

  async function submitForm(e){
    e.preventDefault()
    if(!form.ward||!form.questionnaire_no){setSubmitStatus('error:Fill in Ward and Questionnaire Number');return}
    const payload={
      questionnaire_no:form.questionnaire_no,ward:form.ward,
      q1_sex:form.q1_sex,q2_age:form.q2_age,q3_education:form.q3_education,
      q4_hhhead:form.q4_hhhead,q5_farmsize:form.q5_farmsize,q6_experience:form.q6_experience,
      q7_hhsize:form.q7_hhsize,q8_seedvariety:form.q8_seedvariety,
      q9_prodmethod:form.q9_prodmethod,q10_landprop:form.q10_landprop,
      q11_yield:form.q11_yield,q12_pctsold:form.q12_pctsold,
      q13_market:form.q13_market,q14_pricefluc:form.q14_pricefluc,
      q15_planting:form.q15_planting,q16_usefunding:form.q16_usefunding,
      q17_models:form.q14_models,q18_fundtiming:form.q18_fundtiming,
      q19_fundstage:form.q19_fundstage,q20_barrier:form.q20_barrier,
      q21_drought:parseInt(form.q21_drought)||null,q22_hwc:parseInt(form.q22_hwc)||null,
      q23_latedisb:parseInt(form.q23_latedisb)||null,q24_repay:parseInt(form.q24_repay)||null,
      q25_price:parseInt(form.q25_price)||null,q26_trust:parseInt(form.q26_trust)||null,
      q27_govt:parseInt(form.q27_govt)||null,q28_coop:parseInt(form.q28_coop)||null,
      q29_extension:parseInt(form.q29_extension)||null,q30_community:parseInt(form.q30_community)||null,
      q31_mobile:parseInt(form.q31_mobile)||null,q32_digital:parseInt(form.q32_digital)||null,
      q33_landowner:form.q33_landowner,q34_femchallenge:parseInt(form.q34_femchallenge)||null,
      q35_cultural:parseInt(form.q35_cultural)||null,q36_femproduct:parseInt(form.q36_femproduct)||null,
      q37_femdecision:parseInt(form.q37_femdecision)||null,q38_bundled:parseInt(form.q38_bundled)||null,
      q39_riskpool:parseInt(form.q39_riskpool)||null,q40_cropins:parseInt(form.q40_cropins)||null,
      q41_digital_trust:parseInt(form.q41_digital_trust)||null,q42_history:parseInt(form.q42_history)||null,
      q43_cooperation:form.q43_cooperation,q44_dwelling:form.q44_dwelling,
      enumerator_code:form.enumerator_code||null,
    }
    const {error}=await supabase.from('responses').insert([payload])
    if(error){setSubmitStatus('error:'+(error.message.includes('unique')?'Questionnaire number already exists!':error.message))}
    else{setSubmitStatus('success:Response saved! / Mhinduro yasungirirwa!');setForm({q14_models:[]});fetchData()}
    setTimeout(()=>setSubmitStatus(''),5000)
  }

  async function addEnumerator(){
    if(!newEnum.name||!newEnum.email||!newEnum.ward)return
    const code='ENUM-W'+newEnum.ward+'-'+String(enumerators.filter(e=>e.ward==='Ward '+newEnum.ward).length+1).padStart(3,'0')
    await supabase.from('users').insert([{name:newEnum.name,email:newEnum.email,role:'enumerator',ward:'Ward '+newEnum.ward,enumerator_code:code,is_active:true}])
    setNewEnum({name:'',email:'',ward:''});setShowAddEnum(false);fetchData()
    showToast('Enumerator '+newEnum.name+' added!')
  }

  function exportCSV(){
    if(!responses.length){alert('No data yet!');return}
    const headers=Object.keys(responses[0])
    const lines=[headers.join(',')]
    responses.forEach(r=>{
      const row=headers.map(h=>{const v=r[h];const s=Array.isArray(v)?v.join('|'):(v==null?'':String(v));return '"'+s.split('"').join('""')+'"'})
      lines.push(row.join(','))
    })
    const blob=new Blob([lines.join('\n')],{type:'text/csv'})
    const url=URL.createObjectURL(blob)
    const a=document.createElement('a')
    a.href=url
    a.download='Mazambara_PhD_'+new Date().toISOString().slice(0,10)+'.csv'
    a.click()
    showToast('Downloaded '+responses.length+' responses')
  }

  function QLabel({qn,en,sh}){return(<div style={{marginTop:14,marginBottom:4}}><div style={{fontSize:12,fontWeight:600,color:C.text}}>{qn&&'Q'+qn+'. '}{en}</div>{sh&&<div style={{fontSize:11,color:C.sub,fontStyle:'italic',marginTop:1}}>{sh}</div>}</div>)}
  function RG({id,opts}){return(<div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:12,marginTop:6}}>{opts.map(([v,en,sh])=>(<div key={v} style={S.radio(form[id]===v)} onClick={()=>setF(id,v)}><div>{en}</div>{sh&&<div style={{fontSize:10,color:form[id]===v?C.indigo:C.dim}}>{sh}</div>}</div>))}</div>)}
  function LK({id,qn,en,sh}){return(<div style={{marginBottom:12,padding:'12px 14px',background:'rgba(99,102,241,0.04)',borderRadius:10,border:'1px solid '+(form[id]?C.indigo:'rgba(255,255,255,0.06)')}}><div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:2}}>{qn}. {en}</div>{sh&&<div style={{fontSize:11,color:C.sub,fontStyle:'italic',marginBottom:8}}>{sh}</div>}<div style={{display:'flex',gap:6,alignItems:'center'}}>{[1,2,3,4,5].map(n=>(<div key={n} style={S.likertBtn(form[id]===n)} onClick={()=>setF(id,n)}>{n}</div>))}<span style={{fontSize:10,color:C.dim,marginLeft:8}}>1=Disagree 5=Agree</span>{form[id]&&<span style={{fontSize:10,background:'rgba(99,102,241,0.2)',color:C.indigo,padding:'2px 8px',borderRadius:20,fontWeight:700}}>{form[id]+'/5'}</span>}</div></div>)}
  function SH({bg,en,sh,vars}){return(<div style={{...S.secHead(bg),marginTop:20}}><div style={{color:'#fff',fontWeight:700,fontSize:13}}>{en}</div>{sh&&<div style={{color:'rgba(255,255,255,0.65)',fontSize:11,fontStyle:'italic',marginTop:2}}>{sh}</div>}{vars&&<div style={{color:'rgba(255,255,255,0.45)',fontSize:10,marginTop:3}}>Variables: {vars}</div>}</div>)}
  function MultiModel(){return(<div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:12}}>{[['contract','Contract Farming','Kurima Pachishandiso'],['mfi','MFI Loan','Chikwereti cheMFI'],['gmb_scheme','GMB Input Scheme','Hurongwa hweGMB'],['arda','ARDA Outgrower','Hurongwa hweARDA'],['cooperative','Cooperative Savings','Chengetero yeSangano'],['govt_subsidy','Govt Subsidy','Mari yehurumende'],['agro_credit','Agro-dealer Credit','Chikwereti chemutengesi'],['informal','Informal borrowing','Kukwereta kwemuno'],['none','None','Hapana']].map(([v,en,sh])=>{const sel=(form.q14_models||[]).includes(v);return(<div key={v} style={S.radio(sel)} onClick={()=>toggleModel(v)}><div>{en}</div><div style={{fontSize:10,color:sel?C.indigo:C.dim}}>{sh}</div></div>)})}</div>)}

  if(view==='login') return(
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#060810 0%,#0d0f1a 40%,#0a1408 100%)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'DM Sans,Arial,sans-serif'}}>
      <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,padding:'36px 32px',width:420}}>
        <div style={{textAlign:'center',marginBottom:24}}>
          <img src={LOGO} alt='Nyamz Analytics' style={{height:60,marginBottom:12}}/>
          <div style={{height:2,background:'linear-gradient(90deg,#6366f1,#00d4ff)',borderRadius:2,marginBottom:14}}/>
          <div style={{fontSize:11,color:'#4a5068',letterSpacing:0.5,textTransform:'uppercase'}}>MAZAMBARA PhD - FIELD DATA PORTAL - MBIRE DISTRICT 2026</div>
        </div>
        {Object.entries(ROLES).map(([k,r])=>(<div key={k} onClick={()=>setRole(k)} style={{padding:'11px 14px',border:'1px solid '+(role===k?C.indigo:'rgba(255,255,255,0.06)'),borderRadius:12,marginBottom:8,cursor:'pointer',background:role===k?'rgba(99,102,241,0.12)':'rgba(255,255,255,0.02)',display:'flex',alignItems:'center',gap:12,transition:'all 0.15s'}}><div style={{width:38,height:38,borderRadius:10,background:r.color+'18',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,fontWeight:700,color:r.color}}>{r.icon}</div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.text}}>{r.label}</div><div style={{fontSize:11,color:C.sub}}>{r.sub}</div></div>{role===k&&<div style={{color:C.indigo,fontWeight:700,fontSize:16}}>{'✓'}</div>}</div>))}
        <input style={{...S.inp,marginTop:14,marginBottom:8}} type='password' placeholder='Password / Pasiwedi' value={pw} onChange={e=>{setPw(e.target.value);setPwErr(false)}} onKeyDown={e=>e.key==='Enter'&&doLogin()}/>
        {pwErr&&<div style={{color:C.red,fontSize:12,textAlign:'center',marginBottom:8,fontWeight:600}}>Incorrect password</div>}
        <button style={{...S.btn(C.indigo),width:'100%',padding:13,fontSize:14,borderRadius:12}} onClick={doLogin}>Sign In / Pinda</button>
        <div style={{fontSize:10,color:C.dim,textAlign:'center',marginTop:12}}>Export and Delete restricted to Admin only</div>
      </div>
    </div>
  )

  return(
    <div style={{minHeight:'100vh',background:C.bg,fontFamily:'DM Sans,Arial,sans-serif',color:C.text}}>
      <style>{'@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}} @keyframes toastIn{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:none}} body{background:#0d0f14} *{box-sizing:border-box} ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#2a2f42;border-radius:2px}'}</style>

      {toast&&<div style={{position:'fixed',top:66,right:18,zIndex:9999,padding:'10px 16px',borderRadius:10,fontWeight:600,fontSize:12,color:'#fff',background:toast.type==='danger'?'#7f1d1d':toast.type==='warning'?'#78350f':'#064e3b',border:'1px solid '+(toast.type==='danger'?'rgba(239,68,68,0.3)':toast.type==='warning'?'rgba(245,158,11,0.3)':'rgba(16,185,129,0.3)'),animation:'toastIn 0.3s ease'}}>{toast.type==='danger'?'ERR: ':toast.type==='warning'?'WARN: ':''}{toast.msg}</div>}

      {deleteModal&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setDeleteModal(null)}><div style={{background:'#181c26',border:'1px solid rgba(255,255,255,0.1)',borderRadius:16,padding:28,width:440,boxShadow:'0 24px 80px rgba(0,0,0,0.5)'}} onClick={e=>e.stopPropagation()}><div style={{fontSize:15,fontWeight:700,color:C.red,marginBottom:14}}>{deleteModal.title}</div><div style={{fontSize:12,color:C.sub,marginBottom:14,lineHeight:1.6}}>{deleteModal.message}</div>{deleteModal.details&&<div style={{background:'rgba(239,68,68,0.1)',borderRadius:8,padding:'8px 12px',fontSize:11,color:'#fca5a5',marginBottom:16}}>{deleteModal.details}</div>}<div style={{display:'flex',gap:10,justifyContent:'flex-end'}}><button style={S.outBtn('rgba(255,255,255,0.3)')} onClick={()=>setDeleteModal(null)}>Cancel</button><button style={S.btn(C.red)} onClick={deleteModal.action}>Delete</button></div></div></div>}

      <div style={{background:C.bg1,borderBottom:'1px solid '+C.border,padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:54,position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 20px rgba(0,0,0,0.4)'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <img src={LOGO} alt='NA' style={{height:30}}/>
          <div style={{width:1,height:26,background:'rgba(255,255,255,0.08)'}}/>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:C.text}}>Mazambara PhD - Live Dashboard</div>
            <div style={{fontSize:10,color:C.dim,marginTop:1,display:'flex',alignItems:'center',gap:5}}>
              <span style={{width:5,height:5,borderRadius:'50%',background:C.green,display:'inline-block'}}/>
              {'Live - '+total+' of 460 - Mbire District, Zimbabwe'}
            </div>
          </div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          {incomplete.length>0&&role==='admin'&&<div style={{background:C.red,color:'#fff',padding:'3px 10px',borderRadius:20,fontSize:10,fontWeight:700,cursor:'pointer'}} onClick={()=>setTab('manage')}>{'! '+incomplete.length+' incomplete'}</div>}
          <div style={{background:ROLES[role].color,color:'#fff',padding:'4px 12px',borderRadius:20,fontSize:11,fontWeight:700}}>{ROLES[role].label}</div>
          <button style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.7)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:20,padding:'4px 12px',fontSize:11,cursor:'pointer',fontFamily:'inherit'}} onClick={()=>setView('login')}>Sign out</button>
        </div>
      </div>

      <div style={{background:C.bg1,borderBottom:'1px solid '+C.border,display:'flex',padding:'0 24px',overflowX:'auto'}}>
        {[['dashboard','Dashboard'],...(role!=='supervisor'?[['collect','Collect']]:[])]
          .concat(role==='admin'?[['manage','Manage'],['enumerators','Enumerators'],['export','Export']]:[]).map(([t,label])=>(<button key={t} style={{...S.tabBtn(tab===t),borderBottom:tab===t?'2px solid '+C.indigo:'2px solid transparent'}} onClick={()=>setTab(t)}>{label}{t==='manage'&&incomplete.length>0&&<span style={{display:'inline-block',width:6,height:6,borderRadius:'50%',background:C.red,marginLeft:5}}/>}</button>))}
      </div>

      <div style={{padding:'20px 24px',maxWidth:1340,margin:'0 auto'}}>

        {tab==='dashboard'&&<div style={{animation:'fadeIn 0.3s ease'}}>

          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:14}}>
            {[{label:'Total Collected',val:total,sub:'of 460 target',color:C.cyan,pct:pct},{label:'Completion Rate',val:pct+'%',sub:total>=460?'Complete!':'In progress',color:C.green,pct:pct},{label:'Female-Headed HH',val:total?Math.round(femHH/total*100)+'%':'--',sub:femHH+' households',color:C.pink,pct:total?Math.round(femHH/total*100):0},{label:'Using Formal Funding',val:total?Math.round(useFund/total*100)+'%':'--',sub:useFund+' farmers',color:C.indigo,pct:total?Math.round(useFund/total*100):0}].map((m,i)=>(<div key={i} style={{...S.card,borderTop:'2px solid '+m.color}}><div style={{fontSize:10,color:C.sub,textTransform:'uppercase',letterSpacing:'0.8px',fontWeight:500,marginBottom:6}}>{m.label}</div><div style={{fontSize:28,fontWeight:800,color:m.color,lineHeight:1,fontFamily:'DM Mono,monospace'}}>{m.val}</div><div style={{fontSize:10,color:C.sub,marginTop:5,marginBottom:8}}>{m.sub}</div><div style={{height:2,background:'rgba(255,255,255,0.05)',borderRadius:1,overflow:'hidden'}}><div style={{height:'100%',width:m.pct+'%',background:m.color,boxShadow:'0 0 6px '+m.color+'66',borderRadius:1,transition:'width 1s ease'}}/></div></div>))}
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:14}}>
            {[{l:'Avg Drought Score',v:total?(responses.reduce((s,r)=>s+(r.q21_drought||0),0)/total).toFixed(1):'--',c:C.amber},{l:'HWC Impact (avg)',v:total?(responses.reduce((s,r)=>s+(r.q22_hwc||0),0)/total).toFixed(1):'--',c:C.red},{l:'Incomplete Records',v:incomplete.length,c:incomplete.length>0?C.red:C.green},{l:'Wards Active',v:[...new Set(responses.map(r=>r.ward))].filter(Boolean).length+' / 5',c:C.violet}].map((s,i)=>(<div key={i} style={{...S.card,borderLeft:'3px solid '+s.c}}><div style={{fontSize:10,color:C.sub,textTransform:'uppercase',letterSpacing:'0.7px',fontWeight:500,marginBottom:4}}>{s.l}</div><div style={{fontSize:22,fontWeight:800,color:s.c,fontFamily:'DM Mono,monospace'}}>{s.v}</div></div>))}
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
            <div style={S.card}>
              <div style={S.label}><span>Ward Progress</span><span style={S.labelLine}/></div>
              {wardData.map(wd=>(<div key={wd.ward} style={{marginBottom:10}}><div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:4}}><span style={{color:C.sub}}>{wd.ward}</span><div style={{display:'flex',gap:6,alignItems:'center'}}><span style={{color:C.dim,fontFamily:'DM Mono,monospace',fontSize:10}}>{wd.collected+'/92'}</span><span style={{background:'rgba(99,102,241,0.15)',color:C.indigo,fontSize:9,padding:'1px 7px',borderRadius:20,fontWeight:600}}>{wd.pct+'%'}</span></div></div><div style={{height:8,background:'rgba(255,255,255,0.05)',borderRadius:4,overflow:'hidden'}}><div style={{height:'100%',width:wd.pct+'%',background:wd.color,boxShadow:'0 0 6px '+wd.color+'44',borderRadius:4,transition:'width 0.8s ease'}}/></div></div>))}
              <div style={{marginTop:10,padding:'7px 10px',background:'rgba(99,102,241,0.06)',border:'1px solid rgba(99,102,241,0.15)',borderRadius:7,fontSize:10,color:C.indigo}}>{'Target: 92 per ward - '+Math.max(0,460-total)+' remaining'}</div>
            </div>
            <div style={S.card}>
              <div style={S.label}><span>Submission Trend</span><span style={S.labelLine}/></div>
              {dailyData.length>0?<ResponsiveContainer width='100%' height={200}><AreaChart data={dailyData}><defs><linearGradient id='ag' x1='0' y1='0' x2='0' y2='1'><stop offset='5%' stopColor={C.indigo} stopOpacity={0.3}/><stop offset='95%' stopColor={C.indigo} stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray='3 3' stroke='rgba(255,255,255,0.04)'/><XAxis dataKey='day' tick={{fill:C.sub,fontSize:9}} tickLine={false} axisLine={{stroke:'rgba(255,255,255,0.05)'}}/><YAxis tick={{fill:C.sub,fontSize:9}} tickLine={false} axisLine={false}/><Tooltip content={<CT/>}/><Area type='monotone' dataKey='count' stroke={C.indigo} fill='url(#ag)' strokeWidth={2} dot={{fill:C.indigo,r:3}}/></AreaChart></ResponsiveContainer>:<div style={{height:200,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8,color:C.dim}}><div style={{fontSize:32}}>{'📊'}</div><div style={{fontSize:12}}>No data yet</div></div>}
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14,marginBottom:14}}>
            <div style={S.card}>
              <div style={S.label}><span>Gender Split</span><span style={S.labelLine}/></div>
              {genderData.length>0?<ResponsiveContainer width='100%' height={160}><PieChart><Pie data={genderData} cx='50%' cy='50%' innerRadius={45} outerRadius={65} dataKey='value' paddingAngle={3} label={({name,percent})=>name+' '+(percent*100).toFixed(0)+'%'} labelLine={false} fontSize={9}>{genderData.map((d,i)=><Cell key={i} fill={d.color}/>)}</Pie><Tooltip content={<CT/>}/></PieChart></ResponsiveContainer>:<div style={{height:160,display:'flex',alignItems:'center',justifyContent:'center',color:C.dim,fontSize:12}}>No data</div>}
            </div>
            <div style={S.card}>
              <div style={S.label}><span>Risk Scores</span><span style={S.labelLine}/></div>
              <div>{RISK_QS.map((q,i)=>{const vals=responses.map(r=>r[q.id]).filter(Boolean).map(Number);const avg=vals.length?(vals.reduce((a,b)=>a+b,0)/vals.length):0;const cols=[C.amber,C.red,C.pink,C.violet,C.cyan,C.green,C.indigo];return(<div key={q.id} style={{marginBottom:8,display:'flex',alignItems:'center',gap:8}}><div style={{fontSize:10,color:C.sub,width:80,flexShrink:0}}>{q.label}</div><div style={{flex:1,height:4,background:'rgba(255,255,255,0.05)',borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',width:(avg/5*100)+'%',background:cols[i],boxShadow:'0 0 4px '+cols[i]+'66',borderRadius:2,transition:'width 0.8s'}}/></div><div style={{fontSize:10,fontFamily:'DM Mono,monospace',color:C.text,width:24,textAlign:'right'}}>{avg.toFixed(1)}</div></div>)})}</div>
            </div>
            <div style={S.card}>
              <div style={S.label}><span>Funding Models</span><span style={S.labelLine}/></div>
              {fundData.length>0?<ResponsiveContainer width='100%' height={160}><BarChart data={fundData} layout='vertical'><XAxis type='number' tick={{fill:C.sub,fontSize:9}} tickLine={false} axisLine={false}/><YAxis type='category' dataKey='name' tick={{fill:C.sub,fontSize:9}} width={75} tickLine={false}/><Tooltip content={<CT/>}/><Bar dataKey='count' radius={[0,4,4,0]}>{fundData.map((_,i)=><Cell key={i} fill={WC[i%5]}/>)}</Bar></BarChart></ResponsiveContainer>:<div style={{height:160,display:'flex',alignItems:'center',justifyContent:'center',color:C.dim,fontSize:12}}>No data</div>}
            </div>
          </div>

          <div style={{...S.card,marginBottom:14}}>
            <div style={S.label}><span>Key Performance Indicators</span><span style={S.labelLine}/><span style={{fontSize:9,background:'rgba(16,185,129,0.12)',border:'1px solid rgba(16,185,129,0.2)',color:C.green,padding:'2px 8px',borderRadius:20,fontWeight:600}}>Auto-refresh 30s</span></div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
              {[['Female-headed HH',total?Math.round(femHH/total*100)+'%':'--',C.pink],['Using formal funding',total?Math.round(useFund/total*100)+'%':'--',C.green],['HWC impact (avg 4+)',total?Math.round(responses.filter(r=>r.q22_hwc>=4).length/total*100)+'%':'--',C.red],['Late disbursement (4+)',total?Math.round(responses.filter(r=>r.q23_latedisb>=4).length/total*100)+'%':'--',C.amber],['Avg trust score',total?(responses.reduce((s,r)=>s+(r.q26_trust||0),0)/total).toFixed(1)+'/5':'--',C.cyan],['Avg govt support',total?(responses.reduce((s,r)=>s+(r.q27_govt||0),0)/total).toFixed(1)+'/5':'--',C.indigo],['Incomplete records',incomplete.length,incomplete.length>0?C.red:C.green],['Wards covered',[...new Set(responses.map(r=>r.ward))].filter(Boolean).length+'/5',C.violet],['Active enumerators',enumerators.filter(e=>e.is_active).length,C.cyan]].map(([l,v,c],i)=>(<div key={i} style={{padding:'10px 12px',background:'rgba(255,255,255,0.02)',borderRadius:8,borderLeft:'2px solid '+c}}><div style={{fontSize:9,color:C.sub,textTransform:'uppercase',letterSpacing:'0.5px',fontWeight:500,marginBottom:3}}>{l}</div><div style={{fontSize:18,fontWeight:800,color:c,fontFamily:'DM Mono,monospace'}}>{v}</div></div>))}
            </div>
          </div>

          <div style={S.card}>
            <div style={{...S.label,marginBottom:12}}><span>Recent Submissions</span><span style={S.labelLine}/></div>
            {responses.length===0?<div style={{textAlign:'center',color:C.dim,padding:40,fontSize:13}}>No responses yet — share the Collect link with enumerators!</div>:responses.slice(0,8).map(r=>(<div key={r.id} style={{display:'flex',gap:10,padding:'9px 12px',background:isInc(r)?'rgba(239,68,68,0.04)':'rgba(255,255,255,0.02)',borderRadius:8,marginBottom:6,border:'1px solid '+(isInc(r)?'rgba(239,68,68,0.15)':C.border)}}><div style={{width:8,height:8,borderRadius:'50%',background:isInc(r)?C.red:r.q1_sex==='female'?C.pink:C.indigo,marginTop:4,flexShrink:0}}/><div style={{flex:1}}><div style={{fontSize:11,fontWeight:700,display:'flex',alignItems:'center',gap:8}}>{r.questionnaire_no+' - '+r.ward}{isInc(r)&&<span style={{background:'rgba(239,68,68,0.15)',color:C.red,fontSize:9,padding:'1px 7px',borderRadius:20,fontWeight:600}}>Incomplete</span>}</div><div style={{fontSize:10,color:C.sub,marginTop:2}}>{(r.q1_sex||'?')+' - '+(r.q4_hhhead||'').replace(/_/g,' ')+' - Funding: '+(r.q16_usefunding||'--')+' - Drought: '+(r.q21_drought||'--')+'/5 - HWC: '+(r.q22_hwc||'--')+'/5'}</div><div style={{fontSize:9,color:C.dim,marginTop:2,fontFamily:'DM Mono,monospace'}}>{new Date(r.submitted_at).toLocaleString()}</div></div></div>))}
          </div>
        </div>}

        {tab==='collect'&&role!=='supervisor'&&<div style={{maxWidth:720,animation:'fadeIn 0.3s ease'}}>
          <div style={{background:'rgba(16,185,129,0.08)',border:'1px solid rgba(16,185,129,0.2)',borderRadius:10,padding:'10px 14px',marginBottom:20,fontSize:12,color:C.green,fontWeight:600}}>{'All 45 questions - bilingual English and Shona. Saves to live database in real time.'}</div>
          {submitStatus&&<div style={{padding:'10px 14px',borderRadius:10,marginBottom:14,fontWeight:600,fontSize:12,background:submitStatus.startsWith('error:')?'rgba(239,68,68,0.1)':'rgba(16,185,129,0.1)',color:submitStatus.startsWith('error:')?C.red:C.green,border:'1px solid '+(submitStatus.startsWith('error:')?'rgba(239,68,68,0.2)':'rgba(16,185,129,0.2)')}}>{submitStatus.replace(/^(error|success):/,'')}</div>}
          <form onSubmit={submitForm}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:16,padding:14,background:'rgba(99,102,241,0.05)',borderRadius:10,border:'1px solid rgba(99,102,241,0.15)'}}>
              <div><label style={{fontSize:11,fontWeight:600,color:C.text,display:'block',marginBottom:5}}>Ward / Divi *</label><select style={{...S.inp,cursor:'pointer'}} value={form.ward||''} onChange={e=>setF('ward',e.target.value)} required><option value=''>Select...</option>{['Chapoto (Ward 1)','Chitsungo (Ward 10)','Masoka (Ward 11)','Gonono (Ward 4)','Mahuwe (Ward 15)'].map(w=><option key={w} value={w}>{w}</option>)}</select></div>
              <div><label style={{fontSize:11,fontWeight:600,color:C.text,display:'block',marginBottom:5}}>Questionnaire No *</label><input style={S.inp} placeholder='e.g. W1-023' value={form.questionnaire_no||''} onChange={e=>setF('questionnaire_no',e.target.value)} required/></div>
              <div><label style={{fontSize:11,fontWeight:600,color:C.text,display:'block',marginBottom:5}}>Date / Zuva</label><input type='date' style={S.inp} value={form.date||new Date().toISOString().slice(0,10)} onChange={e=>setF('date',e.target.value)}/></div>
            </div>

            <SH bg={C.indigo} en='SECTION A: FARMER PROFILE AND DEMOGRAPHICS' sh='CHIKAMU A: CHIMIRO CHEMURIMWA AND RUZIVO RWAKE' vars='Descriptive Stats, Probit, Cluster, SEM'/>
            <QLabel qn={1} en='Sex of respondent' sh='Murume kana Mukadzi:'/><RG id='q1_sex' opts={[['male','Male','Murume'],['female','Female','Mukadzi']]}/>
            <QLabel qn={2} en='Age of respondent' sh='Makore enyu:'/><RG id='q2_age' opts={[['below_25','Below 25','Pasi pa25'],['25_34','25-34',''],['35_44','35-44',''],['45_54','45-54',''],['55plus','55+','']]}/>
            <QLabel qn={3} en='Highest level of education' sh='Danhiko rekuchikoro rakakwirira:'/><RG id='q3_education' opts={[['none','No formal','Hapana'],['primary','Primary','Chikoro'],['secondary','Secondary','Sekondari'],['tertiary','Tertiary','Koleji']]}/>
            <QLabel qn={4} en='Household headship' sh='Mutungamiriri wemhuri:'/><RG id='q4_hhhead' opts={[['male_headed','Male-headed','Murume'],['female_headed','Female-headed','Mukadzi'],['youth_headed','Youth-headed','Mudiki']]}/>
            <QLabel qn={5} en='Farm size (hectares)' sh='Hukuru hwemunda (mahekitia):'/><RG id='q5_farmsize' opts={[['lt1','< 1 ha',''],['1_2','1-2 ha',''],['2_5','2-5 ha',''],['5_10','5-10 ha',''],['gt10','> 10 ha','']]}/>
            <QLabel qn={6} en='Years of sorghum farming experience' sh='Makore ekurima sorghum:'/><RG id='q6_experience' opts={[['lt2','< 2 yrs',''],['2_5','2-5 yrs',''],['6_10','6-10 yrs',''],['11_20','11-20 yrs',''],['gt20','> 20 yrs','']]}/>
            <QLabel qn={7} en='Household size' sh='Huwandu hwemhuri:'/><RG id='q7_hhsize' opts={[['1_3','1-3',''],['4_6','4-6',''],['7_9','7-9',''],['10_12','10-12',''],['13plus','13+','']]}/>

            <SH bg={C.red} en='SECTION B: SORGHUM MARKETING AND PERFORMANCE' sh='CHIKAMU B: KUTENGESA SORGHUM UNEHUNYANZVI' vars='Descriptive Stats, SEM (dependent variable)'/>
            <QLabel qn={8} en='Seed varieties used? What is the source?' sh='Mhando dzezvitsiga dzamunozvishandisa sorghum?'/><RG id='q8_seedvariety' opts={[['hybrid','Hybrid','Hybrid'],['retained','Retained seed','Tsinga yekuchengetwa'],['improved','Improved open-pollinated','Yakavandurwa'],['other','Other','Dzimwe']]}/>
            <QLabel qn={9} en='Production method for sorghum farming' sh='Nzira yekugadzira yamunozvishandisa pakurima sorghum:'/><RG id='q9_prodmethod' opts={[['conservation','Conservation Agriculture','Kurima Kuchengeta'],['conventional','Conventional tillage','Kurima kwakajairwa'],['minimum','Minimum tillage','Kurima Kuduku'],['other','Other','Dzimwe']]}/>
            <QLabel qn={10} en='Proportion of total land allocated to sorghum (e.g. 0.5ha of 2ha = 25%)' sh='Chikamu chenyika yako yose chinoshandiswa sorghum:'/><RG id='q10_landprop' opts={[['lt25','< 25%',''],['25_49','25-49%',''],['50_74','50-74%',''],['75_99','75-99%',''],['100','100%','']]}/>
            <QLabel qn={11} en='Average sorghum yield last season (50kg bags)' sh='Kubuda kwesorghum mugore rapfuura (masaga/50kg):'/><RG id='q11_yield' opts={[['lt5','< 5 bags',''],['5_10','5-10 bags',''],['11_20','11-20 bags',''],['21_50','21-50 bags',''],['gt50','> 50 bags','']]}/>
            <QLabel qn={12} en='Percentage of sorghum sold vs household consumption' sh='Mazana esorghum inotengwa (pane kuchengetwa kumhuri):'/><RG id='q12_pctsold' opts={[['0_20','0-20%',''],['21_40','21-40%',''],['41_60','41-60%',''],['61_80','61-80%',''],['81_100','81-100%','']]}/>
            <QLabel qn={13} en='Primary sorghum market' sh='Ndepi panonyanya kutengesa sorghum yenyu?'/><RG id='q13_market' opts={[['gmb','GMB',''],['agro_dealer','Agro-dealer','Mutengesi'],['contract','Contract','Chibvumirano'],['local_market','Local market','Musika'],['cooperative','Cooperative','']]}/>
            <QLabel qn={14} en='Has the price of sorghum grain fluctuated significantly over the past 3 years?' sh='Mutengo wesorghum wakashanduka zvikuru mumakore matatu apfuura?'/><RG id='q14_pricefluc' opts={[['increased','Yes, increased','Hongu, wakakwira'],['decreased','Yes, decreased','Hongu, wakaburuka'],['stable','Relatively stable','Wakagara akadaro'],['variable','Highly variable','Wakashanduka zvikuru']]}/>
            <QLabel qn={15} en='Planting timing relative to ideal window' sh='Mavhiki mangani musati/mushure mekurimira kwenguva yakanaka:'/><RG id='q15_planting' opts={[['early_4plus','> 4wks early',''],['early_1_4','1-4wks early',''],['on_time','On time','Nenguva'],['late_1_4','1-4wks late',''],['late_4plus','> 4wks late','']]}/>

            <SH bg={C.green} en='SECTION C: FUNDING MODEL ACCESS AND USAGE' sh='CHIKAMU C: KUFIKIWA NEKUSHANDISWA KWEMAMIRIRO EKUFONDERA' vars='Probit, Logit, SEM, Profile Analysis'/>
            <QLabel qn={16} en='Do you currently use any formal funding model for sorghum-related activities?' sh='Munoshandisa mamiriro ekufondera ekushandiswa pakurima sorghum iye zvino?'/><RG id='q16_usefunding' opts={[['yes','Yes','Hongu'],['no','No','Kwete']]}/>
            <QLabel qn={17} en='Funding models used in past 3 years? Select ALL that apply' sh='Mamiriro api ekufondera amakashandisa mumakore matatu? (Tinya zvose)'/><MultiModel/>
            {form.q16_usefunding==='yes'&&<><QLabel qn={18} en='When did funding arrive relative to planting season?' sh='Kufondera kwenyu kwasvika rinhi pane nguva yekurimira?'/><RG id='q18_fundtiming' opts={[['very_early','> 4wks before','Masvondo 4+'],['early','1-4wks before',''],['on_time','Just in time','Nenguva'],['late_1_4','1-4wks late',''],['very_late','> 4wks late','']]}/></>}
            <QLabel qn={19} en='Stage of sorghum-related activities mainly funded' sh='Chikamu chesorghum painonyanya kushandiswa kufondera:'/><RG id='q19_fundstage' opts={[['production','Primary production','Kurima'],['storage','Post-harvest storage','Kuchengetwa'],['transport','Transportation','Zvitutwa'],['marketing','Marketing','Kutengesa'],['all','All stages','Zvose']]}/>
            {form.q16_usefunding==='no'&&<><QLabel qn={20} en='Main reason for NOT using formal funding (Q16=No only)' sh='Chikonzero chikuru chekusashandisa kufondera:'/><RG id='q20_barrier' opts={[['no_collateral','No collateral','Hapana chekuchengeta'],['too_far','Too far','Kure'],['high_interest','High interest','Mubhadharo murefu'],['not_aware','Not aware','Handizivi'],['prev_default','Previous default','Ndakambokutadza'],['cultural','Cultural barriers','Zviradziko'],['no_trust','No trust','Hapana kutenda']]}/></>}

            <SH bg={C.cyan} en='SECTION D: RISK PERCEPTION (Likert Scale 1-5)' sh='CHIKAMU D: MAONERO PAMUSORO PEZVINETSO (Likert 1-5)' vars='SEM Latent Constructs, SmartPLS, Factor Analysis, Cronbach Alpha'/>
            <LK id='q21_drought' qn='Q21' en='Drought is the biggest risk to my sorghum farming.' sh='Njodzi yezuva rakachena ndiyo njodzi huru yekundirima sorghum kwangu.'/>
            <LK id='q22_hwc' qn='Q22' en='Human-wildlife conflict significantly reduces my sorghum yield.' sh='Nharo dzakaitwa nevanhu nemhuka zvinopunza zvakanyanya kubuda kwesorghum yangu.'/>
            <LK id='q23_latedisb' qn='Q23' en='Late disbursement of funds causes me to miss the planting window.' sh='Kunonoka kwemari kunoita ndisifire nguva yakanaka yekurimira.'/>
            <LK id='q24_repay' qn='Q24' en='I am unable to repay loans when my crop fails.' sh='Ndinokutadza kudzorora chikwereti chirimwa changu chikafa.'/>
            <LK id='q25_price' qn='Q25' en='Price fluctuations of sorghum make it risky to use funding models.' sh='Kushanduka kwemutengo wesorghum kunoita kuve njodzi kushandisa mamiriro ekufondera.'/>
            <LK id='q26_trust' qn='Q26' en='I trust the funding institutions operating in Mbire District.' sh='Ndinovimba nemanyanga ekufondera ashanda muDunhu reMbire.'/>
            <LK id='q27_govt' qn='Q27' en='Government support programs adequately protect farmers from financial risk.' sh='Hurongwa hwehurumende hunochengeta zvakanaka varimi kubva kuzvinetso zvemari.'/>

            <SH bg={C.amber} en='SECTION E: SOCIAL CAPITAL AND INFORMATION ACCESS' sh='CHIKAMU E: PFUMA YEMUMUSHA AND KUFIKIWA KWERUZIVO' vars='SEM Latent Constructs, Probit, SmartPLS'/>
            <LK id='q28_coop' qn='Q28' en='I am a member of a farmer cooperative or savings group.' sh='Ndiri nhengo yesangano revarimi kana boka rechengetero.'/>
            <LK id='q29_extension' qn='Q29' en='I receive regular agricultural extension advice from government officers.' sh='Ndinogamuchira mazano ekurima achienderera kubva kuvashandi vehurumende.'/>
            <LK id='q30_community' qn='Q30' en='My neighbours and community share knowledge about funding opportunities.' sh='Vavakidzani vangu nemumusha vanogovana ruzivo pamusoro pezvidziviriro zvekufondera.'/>
            <LK id='q31_mobile' qn='Q31' en='I have access to a mobile phone for farming-related information.' sh='Ndine foni yepamaoko yekuwana ruzivo rwekurima.'/>
            <LK id='q32_digital' qn='Q32' en='I have heard of or accessed credit through WhatsApp or digital platforms.' sh='Ndakunzwa kana kuwana chikwereti kuburikidza neWhatsApp kana nzvimbo dzedijitari.'/>

            <SH bg={C.violet} en='SECTION F: GENDER AND VULNERABILITY INDICATORS' sh='CHIKAMU F: BATO REMURUME/MUKADZI AND ZVIRATIDZO ZEKUSHAYIWA SIMBA' vars='Gender Disaggregation, Female Targeting Module, SEM Subgroup'/>
            <QLabel qn={33} en='Do you own the land you farm on?' sh='Munave nenyika yamunorima?'/><RG id='q33_landowner' opts={[['yes_full','Yes, fully','Hongu, zvizere'],['yes_joint','Yes, jointly','Hongu, pamwe'],['rented','No, rented','Kwete, kukodesha'],['communal','No, communal','Kwete, yemuno']]}/>
            <LK id='q34_femchallenge' qn='Q34' en='As a woman, I face greater challenges accessing funding than male farmers.' sh='Semukadzi, ndinosangana nematambudziko makuru pakuwana kufondera kupfuura varimi varume.'/>
            <LK id='q35_cultural' qn='Q35' en='Cultural norms in my community prevent women from applying for loans.' sh='Tsika dzemumusha dzangu dzinodzvanya vakadzi kubva kushambadzira zvikwereti.'/>
            <LK id='q36_femproduct' qn='Q36' en='I would use a funding model designed specifically for women farmers.' sh='Ndaishandisa mamiriro ekufondera akagadzirwa kunyanya kuvarimi vakadzi.'/>
            <LK id='q37_femdecision' qn='Q37' en='Female farmers in my area have less decision-making power over farm finances (including borrowing and post marketing).' sh='Varimi vakadzi munzvimbo yangu vane simba diki rekusarudza pamusoro pemari yemunda (kusanganisira kukwereta nekutengesa mushure mekohwa).'/>

            <SH bg='#0891B2' en='SECTION G: FRAMEWORK AND STRATEGY PREFERENCES' sh='CHIKAMU G: ZVAKAFARIRWA PAMUSORO PECHIMIRO AND NZIRA' vars='Framework Development (Obj 4), Candidate Portfolio, Model Prediction'/>
            <LK id='q38_bundled' qn='Q38' en='A combined funding package (input subsidy + crop insurance + loan) would reduce my farming risk.' sh='Pfungswa yakasanganiswa yefondera (tsigiro yezvirimwa + inishuransi yechirimwa + chikwereti) yaizopunza njodzi yangu yekurima.'/>
            <LK id='q39_riskpool' qn='Q39' en='I would participate in a community-based risk pooling scheme for sorghum farmers.' sh='Ndingatore chikamu mushambadziro yekupamharara njodzi yemuno yevarimi vesorghum.'/>
            <LK id='q40_cropins' qn='Q40' en='Crop insurance linked to my funding model would encourage me to take more funding.' sh='Inishuransi yechirimwa yakabatana nemamiriro angu ekufondera yaindiitisa kuwana kufondera kuzhinji.'/>
            <LK id='q41_digital_trust' qn='Q41' en='I trust a digital mobile platform to manage my farm funding profile.' sh='Ndinovimba nenzvimbo yedijitari yefoni kukurudzira chimiro changu chefondera yemunda.'/>
            <LK id='q42_history' qn='Q42' en='I want my funding history and repayment record to be used to predict my future funding eligibility.' sh='Ndinoda nhoroondo yangu yefondera uye rekodhi rekudzorora kushandiswa kuporofira kufanira kwangu kwefondera kwave.'/>

            <SH bg='#374151' en='SECTION H: ENUMERATOR OBSERVATIONS' sh='CHIKAMU H: ZVAKACHERECHEDZWA NEMUVERENGERI' vars='Data quality control - completed by enumerator only'/>
            <QLabel qn={43} en='Was the respondent cooperative and engaged throughout?' sh='Mubvunzwi akabatikana uye akashirikira munzira yese?'/><RG id='q43_cooperation' opts={[['yes','Yes','Hongu'],['partial','Partially','Zvimwe'],['no','No','Kwete']]}/>
            <QLabel qn={44} en='Observed dwelling condition' sh='Mamiriro aakaona ekugara:'/><RG id='q44_dwelling' opts={[['good','Good','Akanaka'],['average','Average','Pakati'],['poor','Poor','Akaipa']]}/>
            <div style={{marginTop:10}}><label style={{fontSize:11,fontWeight:600,color:C.text,display:'block',marginBottom:5}}>Q45. Enumerator code / Kodhi yemuverengeri</label><input style={S.inp} placeholder='e.g. ENUM-W1-001' value={form.enumerator_code||''} onChange={e=>setF('enumerator_code',e.target.value)}/></div>
            <button type='submit' style={{...S.btn(C.indigo),width:'100%',padding:13,fontSize:14,borderRadius:12,marginTop:10}}>Submit Response / Tumira Mhinduro</button>
          </form>
        </div>}

        {tab==='manage'&&role==='admin'&&<div style={{animation:'fadeIn 0.3s ease'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:16}}>{[{l:'Total',v:total,c:C.cyan},{l:'Complete',v:responses.filter(r=>!isInc(r)).length,c:C.green},{l:'Incomplete',v:incomplete.length,c:C.red},{l:'Selected',v:bulkSel.length,c:C.amber}].map((s,i)=>(<div key={i} style={{...S.card,borderLeft:'3px solid '+s.c}}><div style={{fontSize:10,color:C.sub,textTransform:'uppercase',letterSpacing:'0.5px',fontWeight:600}}>{s.l}</div><div style={{fontSize:26,fontWeight:800,color:s.c,fontFamily:'DM Mono,monospace'}}>{s.v}</div></div>))}</div>
          <div style={{...S.card,display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',marginBottom:14}}>
            <select style={{...S.inp,width:'auto'}} value={fWard} onChange={e=>setFWard(e.target.value)}><option value='all'>All Wards</option>{WARDS.map(w=><option key={w} value={w}>{w}</option>)}</select>
            <select style={{...S.inp,width:'auto'}} value={fStatus} onChange={e=>setFStatus(e.target.value)}><option value='all'>All Status</option><option value='complete'>Complete only</option><option value='incomplete'>Incomplete only</option></select>
            <div style={{flex:1}}/>
            {bulkSel.length>0&&<button style={S.btn(C.red)} onClick={()=>setDeleteModal({title:'Delete '+bulkSel.length+' selected?',message:'This permanently removes selected responses.',details:bulkSel.length+' responses will be deleted.',action:bulkDelete})}>{'Delete Selected ('+bulkSel.length+')'}</button>}
            {incomplete.length>0&&<button style={S.btn(C.red)} onClick={()=>setDeleteModal({title:'Delete ALL incomplete?',message:'Permanently deletes all responses missing key fields.',details:incomplete.length+' incomplete responses will be deleted.',action:deleteAllInc})}>{'Delete All Incomplete ('+incomplete.length+')'}</button>}
          </div>
          <div style={{...S.card,padding:0,overflow:'hidden'}}><div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:11}}>
              <thead><tr style={{background:'rgba(255,255,255,0.03)',borderBottom:'1px solid '+C.border}}>
                <th style={{padding:'10px 12px',textAlign:'left'}}><input type='checkbox' onChange={e=>{const fr=responses.filter(r=>{if(fWard!=='all'&&r.ward!==fWard)return false;if(fStatus==='incomplete'&&!isInc(r))return false;if(fStatus==='complete'&&isInc(r))return false;return true});e.target.checked?setBulkSel(fr.map(r=>r.id)):setBulkSel([])}}/></th>
                {['Q.No','Ward','Status','Sex','HH Head','Farm','Funding','Drought','HWC','Submitted','Del'].map(h=>(<th key={h} style={{padding:'10px 10px',textAlign:'left',fontSize:9,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'0.5px',whiteSpace:'nowrap'}}>{h}</th>))}
              </tr></thead>
              <tbody>
                {responses.filter(r=>{if(fWard!=='all'&&r.ward!==fWard)return false;if(fStatus==='incomplete'&&!isInc(r))return false;if(fStatus==='complete'&&isInc(r))return false;return true}).map(r=>{const inc=isInc(r);const sel=bulkSel.includes(r.id);return(<tr key={r.id} style={{borderBottom:'1px solid '+C.border,background:sel?'rgba(99,102,241,0.06)':inc?'rgba(239,68,68,0.04)':'transparent'}}>
                  <td style={{padding:'8px 12px'}}><input type='checkbox' checked={sel} onChange={e=>e.target.checked?setBulkSel(p=>[...p,r.id]):setBulkSel(p=>p.filter(id=>id!==r.id))}/></td>
                  <td style={{padding:'8px 10px',fontFamily:'DM Mono,monospace',fontWeight:700}}>{r.questionnaire_no}</td>
                  <td style={{padding:'8px 10px',color:C.sub}}>{r.ward||'--'}</td>
                  <td style={{padding:'8px 10px'}}><span style={{padding:'2px 7px',borderRadius:20,fontSize:9,fontWeight:600,background:inc?'rgba(239,68,68,0.12)':'rgba(16,185,129,0.12)',color:inc?C.red:C.green}}>{inc?'Incomplete':'Complete'}</span></td>
                  <td style={{padding:'8px 10px',color:C.sub}}>{r.q1_sex||'--'}</td>
                  <td style={{padding:'8px 10px',color:C.sub,fontSize:10}}>{(r.q4_hhhead||'--').replace(/_/g,' ')}</td>
                  <td style={{padding:'8px 10px',color:C.sub}}>{r.q5_farmsize||'--'}</td>
                  <td style={{padding:'8px 10px',color:C.sub}}>{r.q16_usefunding||'--'}</td>
                  <td style={{padding:'8px 10px',textAlign:'center',fontWeight:700,color:C.text}}>{r.q21_drought?r.q21_drought+'/5':'--'}</td>
                  <td style={{padding:'8px 10px',textAlign:'center',color:C.sub}}>{r.q22_hwc?r.q22_hwc+'/5':'--'}</td>
                  <td style={{padding:'8px 10px',fontSize:9,fontFamily:'DM Mono,monospace',color:C.dim,whiteSpace:'nowrap'}}>{new Date(r.submitted_at).toLocaleDateString()}</td>
                  <td style={{padding:'8px 10px'}}><button style={{padding:'3px 8px',background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:6,fontSize:9,color:C.red,cursor:'pointer',fontFamily:'inherit'}} onClick={()=>setDeleteModal({title:'Delete this response?',message:'Delete questionnaire '+r.questionnaire_no+'? Cannot be undone.',details:'Ward: '+r.ward+' - '+new Date(r.submitted_at).toLocaleDateString(),action:()=>deleteOne(r.id)})}>Del</button></td>
                </tr>)})}
              </tbody></table></div></div>
        </div>}

        {tab==='enumerators'&&role==='admin'&&<div style={{animation:'fadeIn 0.3s ease'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:700}}>Enumerator Management <span style={{fontSize:10,background:'rgba(99,102,241,0.15)',color:C.indigo,padding:'2px 8px',borderRadius:20,fontWeight:600}}>{enumerators.length+' active'}</span></div>
            <button style={S.btn(C.green)} onClick={()=>setShowAddEnum(!showAddEnum)}>+ Add Enumerator</button>
          </div>
          {showAddEnum&&<div style={{...S.card,border:'1px solid rgba(16,185,129,0.3)',marginBottom:14}}><div style={{fontSize:12,fontWeight:700,color:C.green,marginBottom:10}}>New Enumerator</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}><input style={S.inp} placeholder='Full name' value={newEnum.name} onChange={e=>setNewEnum(p=>({...p,name:e.target.value}))}/><input style={S.inp} placeholder='Email' value={newEnum.email} onChange={e=>setNewEnum(p=>({...p,email:e.target.value}))}/><select style={{...S.inp,cursor:'pointer'}} value={newEnum.ward} onChange={e=>setNewEnum(p=>({...p,ward:e.target.value}))}><option value=''>Ward...</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{'Ward '+n}</option>)}</select></div><div style={{display:'flex',gap:8,marginTop:10}}><button style={S.btn(C.green)} onClick={addEnumerator}>Save</button><button style={S.outBtn('rgba(255,255,255,0.3)')} onClick={()=>setShowAddEnum(false)}>Cancel</button></div></div>}
          <div style={{display:'grid',gap:10}}>{enumerators.map(e=>{const done=responses.filter(r=>r.enumerator_code===e.enumerator_code).length;const pct=Math.min(100,Math.round(done/92*100));const initials=e.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();return(<div key={e.id} style={S.card}><div style={{display:'flex',alignItems:'center',gap:14}}><div style={{width:42,height:42,borderRadius:'50%',background:'linear-gradient(135deg,'+C.indigo+','+C.violet+')',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,flexShrink:0}}>{initials}</div><div style={{flex:1}}><div style={{display:'flex',alignItems:'center',gap:8,marginBottom:3}}><span style={{fontSize:13,fontWeight:700}}>{e.name}</span><span style={{fontSize:9,background:'rgba(16,185,129,0.12)',border:'1px solid rgba(16,185,129,0.2)',color:C.green,padding:'1px 7px',borderRadius:20,fontWeight:600}}>Active</span><span style={{fontSize:10,color:C.dim,fontFamily:'DM Mono,monospace'}}>{e.enumerator_code}</span></div><div style={{fontSize:11,color:C.sub,marginBottom:6}}>{e.ward+' - '+done+' surveys - '+e.email}</div><div style={{display:'flex',alignItems:'center',gap:10}}><div style={{flex:1,height:6,background:'rgba(255,255,255,0.05)',borderRadius:3,overflow:'hidden'}}><div style={{height:'100%',width:pct+'%',background:C.green,boxShadow:'0 0 4px '+C.green+'44',borderRadius:3,transition:'width 0.8s'}}/></div><span style={{fontSize:10,fontFamily:'DM Mono,monospace',color:C.sub,width:55,textAlign:'right'}}>{done+'/92 ('+pct+'%)'}</span></div></div></div></div>)})}</div>
          {enumerators.length===0&&<div style={{textAlign:'center',color:C.dim,padding:60,fontSize:12}}>No enumerators yet. Add one above.</div>}
        </div>}

        {tab==='export'&&role==='admin'&&<div style={{animation:'fadeIn 0.3s ease'}}>
          <div style={{background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:10,padding:'10px 14px',marginBottom:16,fontSize:12,color:C.amber,fontWeight:600}}>{'Export restricted to Admin only (Phillemon Nyamgure). '+total+' responses - 45 variables.'}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            <div style={S.card}><div style={S.label}><span>Download Data</span><span style={S.labelLine}/></div>{[[C.green,'Export for SPSS / Stata (CSV)'],[C.indigo,'Export for SmartPLS (CSV)'],[C.cyan,'Export All 45 Variables (CSV)'],[C.violet,'Export for R Analysis (CSV)']].map(([bg,label],i)=>(<button key={i} style={{...S.btn(bg),width:'100%',padding:10,marginBottom:8,textAlign:'left',borderRadius:9}} onClick={exportCSV}>{'Download: '+label}</button>))}<div style={{fontSize:10,color:C.dim,marginTop:6,lineHeight:1.5}}>All exports CSV format. Import into SPSS/Stata and define variable labels. For SmartPLS use same CSV and select measurement model variables.</div></div>
            <div style={S.card}><div style={S.label}><span>Data Quality</span><span style={S.labelLine}/></div>{[['Total responses',total,C.cyan],['Complete records',responses.filter(r=>!isInc(r)).length,C.green],['Incomplete (for deletion)',incomplete.length,incomplete.length>0?C.red:C.green],['Wards covered',[...new Set(responses.map(r=>r.ward))].filter(Boolean).length+' / 5',C.indigo],['Active enumerators',enumerators.length,C.cyan],['Ready for analysis',total>=30?'Yes':'Collect more',total>=30?C.green:C.amber]].map(([l,v,c],i)=>(<div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 0',borderBottom:'1px solid '+C.border,fontSize:11}}><span style={{color:C.sub}}>{l}</span><span style={{fontWeight:700,color:c,fontFamily:'DM Mono,monospace'}}>{v}</span></div>))}</div>
          </div>
        </div>}

      </div>
    </div>
  )
}
