import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
const LOGO = 'data:image/jpeg;base64,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'

const C = {
  navy:'#1B2A6B',red:'#C0272D',green:'#1F7A4A',gold:'#D4A017',teal:'#0D5F6E',purple:'#6D28D9',
  bg:'#F0F2F8',card:'#FFFFFF',border:'#E2E6F0',text:'#1A1D2E',sub:'#6B7280',light:'#9CA3AF',
  success:'#DCFCE7',successT:'#166534',warning:'#FEF3C7',warningT:'#92400E',
  danger:'#FEE2E2',dangerT:'#991B1B',info:'#EEF2FF',infoT:'#3730A3',
}
const WC = [C.navy,C.red,C.green,C.gold,C.teal]
const FL = {contract:'Contract',mfi:'MFI Loan',gmb_scheme:'GMB',arda:'ARDA',cooperative:'Coop',govt_subsidy:'Subsidy',agro_credit:'Agro-dealer',informal:'Informal',none:'None'}
const ROLES = {
  admin:     {label:'Phillemon Nyamgure',sub:'Nyamz Analytics — Full Control',pw:'nyamz2026',color:C.red,   icon:'👑'},
  supervisor:{label:'PhD Supervisor',    sub:'View dashboard only',            pw:'super2026',color:C.teal,  icon:'🎓'},
  sydney:    {label:'Sydney Mazambara',  sub:'Researcher — Field + View',      pw:'mbire2026',color:C.green, icon:'🌾'},
  enumerator:{label:'Enumerator',        sub:'Data entry only',                pw:'enum2026', color:C.gold,  icon:'📋'},
}

function Badge({children,type='info'}) {
  const s={info:{bg:C.info,c:C.infoT},success:{bg:C.success,c:C.successT},warning:{bg:C.warning,c:C.warningT},danger:{bg:C.danger,c:C.dangerT},navy:{bg:'#EEF2FF',c:C.navy}}[type]||{bg:C.info,c:C.infoT}
  return <span style={{background:s.bg,color:s.c,fontSize:10,padding:'3px 9px',borderRadius:20,fontWeight:700}}>{children}</span>
}

function Modal({open,onClose,title,children}) {
  if(!open) return null
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.55)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={onClose}>
      <div style={{background:'#fff',borderRadius:16,padding:28,width:460,maxWidth:'95vw',boxShadow:'0 24px 80px rgba(0,0,0,0.3)'}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
          <div style={{fontSize:15,fontWeight:700,color:C.red}}>{title}</div>
          <button onClick={onClose} style={{background:'none',border:'none',fontSize:22,cursor:'pointer',color:C.light}}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

const CT = ({active,payload,label}) => {
  if(!active||!payload||!payload.length) return null
  return <div style={{background:'rgba(26,29,46,0.93)',borderRadius:10,padding:'8px 12px'}}>
    <div style={{color:'rgba(255,255,255,0.6)',fontSize:11,marginBottom:3}}>{label}</div>
    {payload.map((p,i)=><div key={i} style={{color:'#fff',fontSize:13,fontWeight:600}}>{p.value}</div>)}
  </div>
}

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
  const [bulkSelect,setBulkSelect]=useState([])
  const [filterWard,setFilterWard]=useState('all')
  const [filterStatus,setFilterStatus]=useState('all')
  const [toast,setToast]=useState(null)

  const showToast=useCallback((msg,type)=>{setToast({msg,type:'success',...(type?{type}:{})});setTimeout(()=>setToast(null),3500)},[])

  const fetchData=useCallback(async()=>{
    try {
      const [{data:r},{data:u}]=await Promise.all([
        supabase.from('responses').select('*').order('submitted_at',{ascending:false}),
        supabase.from('users').select('*')
      ])
      if(r)setResponses(r)
      if(u)setUsers(u)
    } catch(e){console.error(e)}
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
  const useFund=responses.filter(r=>r.q13_usefunding==='yes').length
  const hwcAff=responses.filter(r=>r.q19_hwc>=4).length
  const lateD=responses.filter(r=>r.q20_latedisbursement>=4).length
  const avgDrought=total?(responses.reduce((s,r)=>s+(r.q18_drought||0),0)/total).toFixed(1):'0'
  const avgTrust=total?(responses.reduce((s,r)=>s+(r.q23_trust||0),0)/total).toFixed(1):'0'
  const enumerators=users.filter(u=>u.role==='enumerator')
  const isInc=r=>!r.q1_sex||!r.q13_usefunding||!r.q18_drought
  const incomplete=responses.filter(isInc)

  const wardData=['Ward 1','Ward 2','Ward 3','Ward 4','Ward 5'].map((w,i)=>{
    const c=responses.filter(r=>r.ward===w).length
    return{ward:w,collected:c,target:92,color:WC[i],pct:Math.round(c/92*100)}
  })
  const genderData=[
    {name:'Male',value:responses.filter(r=>r.q1_sex==='male').length,color:C.navy},
    {name:'Female',value:responses.filter(r=>r.q1_sex==='female').length,color:C.red},
  ].filter(d=>d.value>0)
  const fundMap={};responses.forEach(r=>{if(r.q14_models)r.q14_models.forEach(m=>{if(m)fundMap[m]=(fundMap[m]||0)+1})})
  const fundData=Object.entries(fundMap).sort((a,b)=>b[1]-a[1]).slice(0,7).map(([k,v],i)=>({name:FL[k]||k,count:v,fill:WC[i%5]}))
  const dailyMap={};responses.forEach(r=>{const d=r.submitted_at&&r.submitted_at.slice(0,10);if(d)dailyMap[d]=(dailyMap[d]||0)+1})
  const dailyData=Object.entries(dailyMap).sort(([a],[b])=>a.localeCompare(b)).slice(-14).map(([d,c])=>({day:d.slice(5),count:c}))
  const riskRadar=[
    {subject:'Drought',score:parseFloat(avgDrought)||0,fullMark:5},
    {subject:'HWC',score:total?parseFloat((responses.reduce((s,r)=>s+(r.q19_hwc||0),0)/total).toFixed(1)):0,fullMark:5},
    {subject:'Late Disb',score:total?parseFloat((responses.reduce((s,r)=>s+(r.q20_latedisbursement||0),0)/total).toFixed(1)):0,fullMark:5},
    {subject:'Repayment',score:total?parseFloat((responses.reduce((s,r)=>s+(r.q21_repayability||0),0)/total).toFixed(1)):0,fullMark:5},
    {subject:'Price',score:total?parseFloat((responses.reduce((s,r)=>s+(r.q22_pricefluctuation||0),0)/total).toFixed(1)):0,fullMark:5},
    {subject:'Trust',score:parseFloat(avgTrust)||0,fullMark:5},
  ]
  const hdData=[
    {name:'Male-headed',value:responses.filter(r=>r.q4_hhhead==='male_headed').length},
    {name:'Female-headed',value:responses.filter(r=>r.q4_hhhead==='female_headed').length},
    {name:'Youth-headed',value:responses.filter(r=>r.q4_hhhead==='youth_headed').length},
  ].filter(d=>d.value>0)
  const filteredResp=responses.filter(r=>{
    if(filterWard!=='all'&&r.ward!==filterWard)return false
    if(filterStatus==='incomplete'&&!isInc(r))return false
    if(filterStatus==='complete'&&isInc(r))return false
    return true
  })

  function setF(k,v){setForm(p=>({...p,[k]:v}))}
  function toggleModel(m){setForm(p=>({...p,q14_models:p.q14_models.includes(m)?p.q14_models.filter(x=>x!==m):[...p.q14_models,m]}))}

  async function deleteOne(id) {
    const {error}=await supabase.from('responses').delete().eq('id',id)
    if(!error){fetchData();showToast('Response deleted')}
    else showToast('Delete failed: '+error.message,'danger')
    setDeleteModal(null)
  }
  async function bulkDelete() {
    for(const id of bulkSelect){await supabase.from('responses').delete().eq('id',id)}
    setBulkSelect([]);fetchData();showToast(bulkSelect.length+' responses deleted')
    setDeleteModal(null)
  }
  async function deleteAllInc() {
    for(const r of incomplete){await supabase.from('responses').delete().eq('id',r.id)}
    fetchData();showToast(incomplete.length+' incomplete responses deleted')
    setDeleteModal(null)
  }

  async function submitForm(e) {
    e.preventDefault()
    if(!form.ward||!form.questionnaire_no){setSubmitStatus('error:Fill in Ward and Questionnaire Number');return}
    const payload={
      questionnaire_no:form.questionnaire_no,ward:form.ward,
      q1_sex:form.q1_sex,q2_age:form.q2_age,q3_education:form.q3_education,
      q4_hhhead:form.q4_hhhead,q5_farmsize:form.q5_farmsize,q6_experience:form.q6_experience,
      q7_hhsize:form.q7_hhsize,q9_yield:form.q9_yield,q10_pctsold:form.q10_pctsold,
      q11_market:form.q11_market,q12_planting:form.q12_planting,
      q13_usefunding:form.q13_usefunding,q14_models:form.q14_models,
      q15_fundtiming:form.q15_fundtiming,q16_barrier:form.q16_barrier,
      q18_drought:parseInt(form.q18_drought)||null,q19_hwc:parseInt(form.q19_hwc)||null,
      q20_latedisbursement:parseInt(form.q20_latedisbursement)||null,
      q21_repayability:parseInt(form.q21_repayability)||null,
      q22_pricefluctuation:parseInt(form.q22_pricefluctuation)||null,
      q23_trust:parseInt(form.q23_trust)||null,q24_govtsupport:parseInt(form.q24_govtsupport)||null,
      q25_cooperative:parseInt(form.q25_cooperative)||null,q26_extension:parseInt(form.q26_extension)||null,
      q27_community:parseInt(form.q27_community)||null,q28_mobile:parseInt(form.q28_mobile)||null,
      q29_digital:parseInt(form.q29_digital)||null,q30_landowner:form.q30_landowner,
      q31_femchallenge:parseInt(form.q31_femchallenge)||null,q32_cultural:parseInt(form.q32_cultural)||null,
      q33_femproduct:parseInt(form.q33_femproduct)||null,q34_femdecision:parseInt(form.q34_femdecision)||null,
      q35_bundled:parseInt(form.q35_bundled)||null,q36_riskpool:parseInt(form.q36_riskpool)||null,
      q37_cropinsurance:parseInt(form.q37_cropinsurance)||null,q38_digital_trust:parseInt(form.q38_digital_trust)||null,
      q39_history:parseInt(form.q39_history)||null,q40_cooperation:form.q40_cooperation,
      q41_dwelling:form.q41_dwelling,enumerator_code:form.enumerator_code||null,
    }
    const {error}=await supabase.from('responses').insert([payload])
    if(error){setSubmitStatus('error:'+(error.message.includes('unique')?'Questionnaire number already exists!':error.message))}
    else{setSubmitStatus('success:Response saved! / Mhinduro yasungirirwa!');setForm({q14_models:[]});fetchData()}
    setTimeout(()=>setSubmitStatus(''),5000)
  }

  async function addEnumerator() {
    if(!newEnum.name||!newEnum.email||!newEnum.ward)return
    const code='ENUM-W'+newEnum.ward+'-'+String(enumerators.filter(e=>e.ward==='Ward '+newEnum.ward).length+1).padStart(3,'0')
    await supabase.from('users').insert([{name:newEnum.name,email:newEnum.email,role:'enumerator',ward:'Ward '+newEnum.ward,enumerator_code:code,is_active:true}])
    setNewEnum({name:'',email:'',ward:''});setShowAddEnum(false);fetchData()
    showToast('Enumerator '+newEnum.name+' added!')
  }

  function exportCSV() {
    if(!responses.length){alert('No data yet!');return}
    const headers=Object.keys(responses[0])
    const lines=[headers.join(',')]
    responses.forEach(r=>{
      const row=headers.map(h=>{
        const v=r[h]
        const s=Array.isArray(v)?v.join('|'):(v==null?'':String(v))
        return '"'+s.replace(/"/g,'""')+'"'
      })
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

  const inp={width:'100%',padding:'9px 12px',border:'1.5px solid '+C.border,borderRadius:9,fontSize:13,fontFamily:'inherit',outline:'none',background:'#fff',marginBottom:10}
  const rSel=(sel)=>({padding:'6px 13px',borderRadius:20,cursor:'pointer',userSelect:'none',border:'1.5px solid '+(sel?C.navy:C.border),background:sel?'#EEF2FF':'#fff',color:sel?C.navy:C.sub,fontWeight:sel?600:400,fontSize:12,transition:'all 0.15s'})

  const Q=({qn,en,sh})=>(
    <div style={{marginBottom:4,marginTop:14}}>
      <div style={{fontSize:12,fontWeight:700,color:C.text}}>{qn&&'Q'+qn+'. '}{en}</div>
      {sh&&<div style={{fontSize:11,color:C.sub,fontStyle:'italic',marginTop:1}}>{sh}</div>}
    </div>
  )

  const RG=({id,opts,multi})=>(
    <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:14,marginTop:6}}>
      {opts.map(([v,en,sh])=>{
        const sel=multi?(form[id]||[]).includes(v):form[id]===v
        return <div key={v} onClick={()=>{
          if(multi){const arr=form[id]||[];setF(id,arr.includes(v)?arr.filter(x=>x!==v):[...arr,v])}
          else setF(id,v)
        }} style={rSel(sel)}>
          <div>{en}</div>
          {sh&&<div style={{fontSize:10,color:sel?'#6B7EF0':C.light}}>{sh}</div>}
        </div>
      })}
    </div>
  )

  const LK=({id,qn,en,sh})=>(
    <div style={{marginBottom:12,padding:'12px 14px',background:'#FAFBFF',borderRadius:10,border:'1.5px solid '+(form[id]?C.navy:C.border)}}>
      <div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:2}}>{qn}. {en}</div>
      {sh&&<div style={{fontSize:11,color:C.sub,fontStyle:'italic',marginBottom:8}}>{sh}</div>}
      <div style={{display:'flex',gap:6,alignItems:'center'}}>
        {[1,2,3,4,5].map(n=>(
          <div key={n} onClick={()=>setF(id,n)} style={{width:40,height:40,borderRadius:8,cursor:'pointer',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center',border:'1.5px solid '+(form[id]===n?C.navy:C.border),background:form[id]===n?C.navy:'#fff',color:form[id]===n?'#fff':C.sub,fontWeight:form[id]===n?700:400,transform:form[id]===n?'scale(1.1)':'scale(1)',transition:'all 0.15s'}}>{n}</div>
        ))}
        <span style={{fontSize:10,color:C.light,marginLeft:8}}>1=Disagree · 5=Agree</span>
        {form[id]&&<Badge type="navy">{form[id]}/5</Badge>}
      </div>
    </div>
  )

  const SH=({bg,en,sh,vars})=>(
    <div style={{background:bg,borderRadius:12,padding:'12px 16px',marginBottom:14,marginTop:24,boxShadow:'0 4px 14px '+bg+'44'}}>
      <div style={{color:'#fff',fontWeight:700,fontSize:13}}>{en}</div>
      {sh&&<div style={{color:'rgba(255,255,255,0.75)',fontSize:11,fontStyle:'italic',marginTop:2}}>{sh}</div>}
      {vars&&<div style={{color:'rgba(255,255,255,0.6)',fontSize:10,marginTop:3}}>Variables: {vars}</div>}
    </div>
  )

  const statBox=(label,val,color)=>(
    <div style={{padding:'10px 12px',background:'#FAFBFF',borderRadius:10,borderLeft:'3px solid '+color}}>
      <div style={{fontSize:10,color:C.sub,fontWeight:600,textTransform:'uppercase',letterSpacing:0.5,marginBottom:4}}>{label}</div>
      <div style={{fontSize:20,fontWeight:800,color:color,fontFamily:'monospace'}}>{val}</div>
    </div>
  )

  if(view==='login') return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#0a1628 0%,#1B2A6B 50%,#0a2018 100%)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'DM Sans,Arial,sans-serif'}}>
      <style>{'.lrole:hover{border-color:#1B2A6B !important;background:#F5F7FF !important}'}</style>
      <div style={{background:'#fff',borderRadius:22,padding:'38px 34px',width:430,boxShadow:'0 32px 100px rgba(0,0,0,0.5)'}}>
        <div style={{textAlign:'center',marginBottom:22}}>
          <img src={LOGO} alt="Nyamz Analytics" style={{height:68,marginBottom:12}}/>
          <div style={{height:3,background:'linear-gradient(90deg,#1B2A6B,#C0272D)',borderRadius:2,marginBottom:14}}></div>
          <div style={{fontSize:11,color:C.light,letterSpacing:0.5}}>MAZAMBARA PhD · FIELD DATA PORTAL · MBIRE DISTRICT 2026</div>
        </div>
        {Object.entries(ROLES).map(([k,r])=>(
          <div key={k} className="lrole" onClick={()=>setRole(k)} style={{padding:'12px 14px',border:'2px solid '+(role===k?C.navy:C.border),borderRadius:13,marginBottom:8,cursor:'pointer',background:role===k?'#EEF2FF':'#fff',display:'flex',alignItems:'center',gap:12,transition:'all 0.18s'}}>
            <div style={{width:38,height:38,borderRadius:10,background:r.color+'18',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>{r.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:C.text}}>{r.label}</div>
              <div style={{fontSize:11,color:C.sub}}>{r.sub}</div>
            </div>
            {role===k&&<div style={{color:C.navy,fontWeight:700,fontSize:16}}>✓</div>}
          </div>
        ))}
        <input style={{...inp,marginTop:14}} type="password" placeholder="Password / Pasiwedi" value={pw} onChange={e=>{setPw(e.target.value);setPwErr(false)}} onKeyDown={e=>e.key==='Enter'&&doLogin()}/>
        {pwErr&&<div style={{color:C.red,fontSize:12,textAlign:'center',marginBottom:8,fontWeight:600}}>Incorrect password. Try again.</div>}
        <button style={{width:'100%',padding:13,background:C.navy,color:'#fff',border:'none',borderRadius:12,fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}} onClick={doLogin}>Sign In / Pinda</button>
        <div style={{fontSize:10,color:C.light,textAlign:'center',marginTop:12}}>🔒 Export & Delete restricted to Admin · Nyamz Analytics</div>
      </div>
    </div>
  )

  function doLogin(){pw===ROLES[role].pw?(setPwErr(false),setView('main')):setPwErr(true)}

  return (
    <div style={{minHeight:'100vh',fontFamily:'DM Sans,Arial,sans-serif'}}>
      <style>{'
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes toastIn{from{opacity:0;transform:translateX(80px)}to{opacity:1;transform:none}}
        body{background:#F0F2F8}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-thumb{background:#C5CAE0;border-radius:3px}
      '}</style>

      {toast&&(
        <div style={{position:'fixed',top:66,right:18,zIndex:9999,padding:'11px 18px',borderRadius:12,fontWeight:600,fontSize:13,
          background:toast.type==='danger'?C.dangerT:toast.type==='warning'?C.warningT:C.successT,
          color:'#fff',boxShadow:'0 8px 30px rgba(0,0,0,0.2)',animation:'toastIn 0.3s ease',display:'flex',alignItems:'center',gap:8}}>
          {toast.type==='danger'?'❌':toast.type==='warning'?'⚠️':'✅'} {toast.msg}
        </div>
      )}

      <Modal open={!!deleteModal} onClose={()=>setDeleteModal(null)} title={deleteModal&&deleteModal.title||'Confirm Delete'}>
        <div style={{fontSize:13,color:C.sub,marginBottom:20,lineHeight:1.6}}>{deleteModal&&deleteModal.message}</div>
        {deleteModal&&deleteModal.details&&<div style={{background:C.danger,borderRadius:8,padding:'10px 14px',fontSize:12,color:C.dangerT,marginBottom:20,fontWeight:600}}>{deleteModal.details}</div>}
        <div style={{display:'flex',gap:10,justifyContent:'flex-end'}}>
          <button onClick={()=>setDeleteModal(null)} style={{padding:'8px 16px',border:'1.5px solid '+C.border,background:'#fff',borderRadius:9,cursor:'pointer',fontSize:13,fontFamily:'inherit'}}>Cancel</button>
          <button onClick={deleteModal&&deleteModal.action} style={{padding:'8px 16px',background:C.red,color:'#fff',border:'none',borderRadius:9,cursor:'pointer',fontSize:13,fontWeight:600,fontFamily:'inherit'}}>🗑 Delete</button>
        </div>
      </Modal>

      <div style={{background:C.navy,padding:'0 28px',display:'flex',alignItems:'center',justifyContent:'space-between',height:56,position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 20px rgba(27,42,107,0.5)'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <img src={LOGO} alt="NA" style={{height:32}}/>
          <div style={{height:28,width:1,background:'rgba(255,255,255,0.15)'}}></div>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:'#fff'}}>Mazambara PhD — Live Dashboard</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.45)',display:'flex',alignItems:'center',gap:5,marginTop:1}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#4ADE80',display:'inline-block'}}></span>
              Live · {total} of 460 · Mbire District
            </div>
          </div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          {incomplete.length>0&&role==='admin'&&(
            <div onClick={()=>setTab('manage')} style={{background:C.red,color:'#fff',padding:'3px 10px',borderRadius:20,fontSize:11,fontWeight:700,cursor:'pointer'}}>⚠ {incomplete.length} incomplete</div>
          )}
          <div style={{background:ROLES[role].color,color:'#fff',padding:'5px 14px',borderRadius:20,fontSize:12,fontWeight:700}}>{ROLES[role].icon} {ROLES[role].label}</div>
          <button onClick={()=>setView('login')} style={{background:'rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.8)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:20,padding:'5px 14px',fontSize:12,cursor:'pointer',fontFamily:'inherit'}}>Sign out</button>
        </div>
      </div>

      <div style={{background:'#fff',borderBottom:'1px solid '+C.border,display:'flex',padding:'0 28px',overflowX:'auto',boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}>
        {[
          ['dashboard','📊 Dashboard'],
          ...(role!=='supervisor'?[['collect','📝 Collect Data']]:[]),
          ...(role==='admin'?[['manage','🗂 Manage Data'],['enumerators','👥 Enumerators'],['export','⬇ Export']]:[]),
        ].map(([t,label])=>(
          <div key={t} onClick={()=>setTab(t)} style={{padding:'14px 18px',fontSize:13,fontWeight:tab===t?700:500,cursor:'pointer',whiteSpace:'nowrap',borderBottom:tab===t?'3px solid '+C.navy:'3px solid transparent',color:tab===t?C.navy:C.sub,transition:'all 0.15s',position:'relative'}}>
            {label}
            {t==='manage'&&incomplete.length>0&&<span style={{position:'absolute',top:10,right:8,width:8,height:8,borderRadius:'50%',background:C.red}}></span>}
          </div>
        ))}
      </div>

      <div style={{padding:'24px 28px',maxWidth:1340,margin:'0 auto'}}>

        {tab==='dashboard'&&(
          <div style={{animation:'fadeIn 0.3s ease'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:18}}>
              {[
                {l:'Total Collected',v:total,s:'of 460 target',c:C.navy,i:'📋',p:pct},
                {l:'Completion Rate',v:pct+'%',s:total>=460?'✓ Complete!':'In progress',c:C.green,i:'📈',p:pct},
                {l:'Female-Headed HH',v:total?Math.round(femHH/total*100)+'%':'–',s:femHH+' households',c:C.red,i:'👩‍🌾',p:total?Math.round(femHH/total*100):0},
                {l:'Using Formal Funding',v:total?Math.round(useFund/total*100)+'%':'–',s:useFund+' farmers',c:C.teal,i:'💰',p:total?Math.round(useFund/total*100):0},
              ].map((m,i)=>(
                <div key={i} style={{background:C.card,borderRadius:16,padding:'18px 20px',borderTop:'3px solid '+m.c,boxShadow:'0 1px 4px rgba(0,0,0,0.05)',transition:'all 0.2s'}}>
                  <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:8}}>
                    <div style={{fontSize:11,color:C.sub,textTransform:'uppercase',letterSpacing:0.8,fontWeight:600}}>{m.l}</div>
                    <div style={{fontSize:20}}>{m.i}</div>
                  </div>
                  <div style={{fontSize:32,fontWeight:800,color:m.c,lineHeight:1,fontFamily:'monospace'}}>{m.v}</div>
                  <div style={{fontSize:11,color:C.sub,marginTop:5,marginBottom:8}}>{m.s}</div>
                  <div style={{height:4,background:'#F0F2F8',borderRadius:2,overflow:'hidden'}}>
                    <div style={{height:'100%',width:m.p+'%',background:'linear-gradient(90deg,'+m.c+'99,'+m.c+')',borderRadius:2,transition:'width 1s ease'}}></div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:18}}>
              {[
                {l:'Avg Drought Risk',v:avgDrought+'/5',c:C.gold},
                {l:'HWC Impact',v:total?Math.round(hwcAff/total*100)+'%':'–',c:C.purple},
                {l:'Late Disbursement',v:total?Math.round(lateD/total*100)+'%':'–',c:C.red},
                {l:'Incomplete Records',v:incomplete.length,c:incomplete.length>0?C.red:C.green},
              ].map((s,i)=>(
                <div key={i} style={{background:C.card,borderRadius:14,padding:'14px 18px',border:'1px solid '+C.border,borderLeft:'4px solid '+s.c}}>
                  <div style={{fontSize:11,color:C.sub,textTransform:'uppercase',letterSpacing:0.7,fontWeight:600,marginBottom:4}}>{s.l}</div>
                  <div style={{fontSize:26,fontWeight:800,color:s.c,fontFamily:'monospace'}}>{s.v}</div>
                </div>
              ))}
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
              <div style={{background:C.card,border:'1px solid '+C.border,borderRadius:14,padding:20}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.navy}}>Ward Progress</div>
                  <Badge type="success">Live</Badge>
                </div>
                {wardData.map(w=>(
                  <div key={w.ward} style={{marginBottom:12}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:5}}>
                      <span style={{color:C.sub}}>{w.ward}</span>
                      <div style={{display:'flex',gap:6,alignItems:'center'}}>
                        <span style={{color:C.light,fontFamily:'monospace',fontSize:11}}>{w.collected}/92</span>
                        <Badge type={w.pct>=100?'success':w.pct>=50?'info':'warning'}>{w.pct}%</Badge>
                      </div>
                    </div>
                    <div style={{height:10,background:'#F0F2F8',borderRadius:5,overflow:'hidden'}}>
                      <div style={{height:'100%',width:w.pct+'%',background:'linear-gradient(90deg,'+w.color+'CC,'+w.color+')',borderRadius:5,transition:'width 0.8s'}}></div>
                    </div>
                  </div>
                ))}
                <div style={{marginTop:12,padding:'8px 12px',background:C.info,borderRadius:8,fontSize:11,color:C.infoT,fontWeight:600}}>
                  🎯 Target: 92 per ward · {460-total} remaining
                </div>
              </div>
              <div style={{background:C.card,border:'1px solid '+C.border,borderRadius:14,padding:20}}>
                <div style={{fontSize:13,fontWeight:700,color:C.navy,marginBottom:16}}>Submission Trend</div>
                {dailyData.length>0?(
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={dailyData}>
                      <defs><linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.navy} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={C.navy} stopOpacity={0}/>
                      </linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                      <XAxis dataKey="day" tick={{fontSize:10}} tickLine={false}/>
                      <YAxis tick={{fontSize:10}} tickLine={false} axisLine={false}/>
                      <Tooltip content={<CT/>}/>
                      <Area type="monotone" dataKey="count" stroke={C.navy} fill="url(#grad)" strokeWidth={2.5} dot={{fill:C.navy,r:4}}/>
                    </AreaChart>
                  </ResponsiveContainer>
                ):<div style={{height:220,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:C.light}}>
                  <div style={{fontSize:36,marginBottom:8}}>📊</div><div>No data yet</div>
                </div>}
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,marginBottom:16}}>
              <div style={{background:C.card,border:'1px solid '+C.border,borderRadius:14,padding:20}}>
                <div style={{fontSize:13,fontWeight:700,color:C.navy,marginBottom:16}}>Gender Split</div>
                {genderData.length>0?(
                  <ResponsiveContainer width="100%" height={170}>
                    <PieChart><Pie data={genderData} cx="50%" cy="50%" innerRadius={48} outerRadius={68} dataKey="value" paddingAngle={3}
                      label={({name,percent})=>name+' '+(percent*100).toFixed(0)+'%'} labelLine={false} fontSize={11}>
                      {genderData.map((d,i)=><Cell key={i} fill={d.color}/>)}
                    </Pie><Tooltip content={<CT/>}/></PieChart>
                  </ResponsiveContainer>
                ):<div style={{height:170,display:'flex',alignItems:'center',justifyContent:'center',color:C.light}}>No data</div>}
              </div>
              <div style={{background:C.card,border:'1px solid '+C.border,borderRadius:14,padding:20}}>
                <div style={{fontSize:13,fontWeight:700,color:C.navy,marginBottom:8}}>Risk Profile</div>
                {total>0?(
                  <ResponsiveContainer width="100%" height={170}>
                    <RadarChart data={riskRadar}>
                      <PolarGrid stroke={C.border}/>
                      <PolarAngleAxis dataKey="subject" tick={{fontSize:9,fill:C.sub}}/>
                      <Radar dataKey="score" stroke={C.red} fill={C.red} fillOpacity={0.2} strokeWidth={2}/>
                      <Tooltip content={<CT/>}/>
                    </RadarChart>
                  </ResponsiveContainer>
                ):<div style={{height:170,display:'flex',alignItems:'center',justifyContent:'center',color:C.light}}>No data</div>}
              </div>
              <div style={{background:C.card,border:'1px solid '+C.border,borderRadius:14,padding:20}}>
                <div style={{fontSize:13,fontWeight:700,color:C.navy,marginBottom:8}}>Funding Models</div>
                {fundData.length>0?(
                  <ResponsiveContainer width="100%" height={170}>
                    <BarChart data={fundData} layout="vertical">
                      <XAxis type="number" tick={{fontSize:9}} tickLine={false} axisLine={false}/>
                      <YAxis type="category" dataKey="name" tick={{fontSize:9}} width={75} tickLine={false}/>
                      <Tooltip content={<CT/>}/>
                      <Bar dataKey="count" radius={[0,5,5,0]}>{fundData.map((d,i)=><Cell key={i} fill={d.fill}/>)}</Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ):<div style={{height:170,display:'flex',alignItems:'center',justifyContent:'center',color:C.light}}>No data</div>}
              </div>
            </div>

            <div style={{background:C.card,border:'1px solid '+C.border,borderRadius:14,padding:20,marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:700,color:C.navy,marginBottom:16}}>Key Performance Indicators <Badge type="success">Auto-refresh 30s</Badge></div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
                {[
                  ['Female-headed HH',total?Math.round(femHH/total*100)+'%':'–',C.red],
                  ['Using formal funding',total?Math.round(useFund/total*100)+'%':'–',C.green],
                  ['HWC impact ≥4/5',total?Math.round(hwcAff/total*100)+'%':'–',C.purple],
                  ['Late disbursement ≥4',total?Math.round(lateD/total*100)+'%':'–',C.gold],
                  ['Avg drought score',avgDrought+'/5',C.gold],
                  ['Avg trust score',avgTrust+'/5',C.teal],
                  ['Incomplete records',incomplete.length,incomplete.length>0?C.red:C.green],
                  ['Wards active',[...new Set(responses.map(r=>r.ward))].filter(Boolean).length+'/5',C.navy],
                  ['Enumerators',enumerators.length,C.teal],
                ].map(([l,v,c],i)=>statBox(l,v,c))}
              </div>
            </div>

            <div style={{background:C.card,border:'1px solid '+C.border,borderRadius:14,padding:20}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:700,color:C.navy}}>Recent Submissions</div>
                <Badge type="success">Live feed</Badge>
              </div>
              {responses.length===0
                ?<div style={{textAlign:'center',color:C.light,padding:40,fontSize:13}}><div style={{fontSize:40,marginBottom:10}}>📭</div>No responses yet</div>
                :responses.slice(0,8).map(r=>(
                  <div key={r.id} style={{display:'flex',gap:12,padding:'10px 14px',background:isInc(r)?'#FFF5F5':'#F9FAFB',borderRadius:10,marginBottom:8,border:'1px solid '+(isInc(r)?'#FECACA':C.border)}}>
                    <div style={{width:10,height:10,borderRadius:'50%',background:isInc(r)?C.red:r.q1_sex==='female'?C.red:C.navy,marginTop:4,flexShrink:0}}></div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:700,display:'flex',alignItems:'center',gap:8}}>
                        {r.questionnaire_no} — {r.ward}
                        {isInc(r)&&<Badge type="danger">Incomplete</Badge>}
                      </div>
                      <div style={{fontSize:11,color:C.sub,marginTop:2}}>{r.q1_sex||'?'} · {(r.q4_hhhead||'').replace(/_/g,' ')} · Funding: {r.q13_usefunding||'–'} · Drought: {r.q18_drought||'–'}/5</div>
                      <div style={{fontSize:10,color:C.light,marginTop:3,fontFamily:'monospace'}}>{new Date(r.submitted_at).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {tab==='collect'&&role!=='supervisor'&&(
          <div style={{maxWidth:720,animation:'fadeIn 0.3s ease'}}>
            <div style={{background:C.success,border:'1px solid #BBF7D0',borderRadius:12,padding:'12px 16px',marginBottom:20,fontSize:12,color:C.successT,fontWeight:600}}>
              ✅ All 41 questions — English & Shona. Saves to live database in real time.
            </div>
            {submitStatus&&<div style={{padding:'12px 16px',borderRadius:12,marginBottom:16,fontWeight:600,fontSize:13,background:submitStatus.startsWith('error:')?C.danger:C.success,color:submitStatus.startsWith('error:')?C.dangerT:C.successT}}>
              {submitStatus.replace(/^(error|success):/,'')}
            </div>}
            <form onSubmit={submitForm}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:16,padding:14,background:'#F8F9FF',borderRadius:12,border:'1px solid '+C.border}}>
                <div><label style={{fontSize:12,fontWeight:700,color:C.text,display:'block',marginBottom:5}}>Ward *</label>
                  <select style={{...inp,margin:0}} value={form.ward||''} onChange={e=>setF('ward',e.target.value)} required>
                    <option value="">Select...</option>
                    {['Ward 1','Ward 2','Ward 3','Ward 4','Ward 5'].map(w=><option key={w}>{w}</option>)}
                  </select></div>
                <div><label style={{fontSize:12,fontWeight:700,color:C.text,display:'block',marginBottom:5}}>Questionnaire No *</label>
                  <input style={{...inp,margin:0}} placeholder="e.g. W1-023" value={form.questionnaire_no||''} onChange={e=>setF('questionnaire_no',e.target.value)} required/></div>
                <div><label style={{fontSize:12,fontWeight:700,color:C.text,display:'block',marginBottom:5}}>Date</label>
                  <input type="date" style={{...inp,margin:0}} value={form.date||new Date().toISOString().slice(0,10)} onChange={e=>setF('date',e.target.value)}/></div>
              </div>

              <SH bg={C.navy} en="SECTION A: FARMER PROFILE & DEMOGRAPHICS" sh="CHIKAMU A: CHIMIRO CHEMURIMWA" vars="Descriptive Stats, Probit, Cluster, SEM"/>
              <Q qn="1" en="Sex of respondent" sh="Murume kana Mukadzi"/>
              <RG id="q1_sex" opts={[['male','Male','Murume'],['female','Female','Mukadzi']]}/>
              <Q qn="2" en="Age" sh="Makore enyu"/>
              <RG id="q2_age" opts={[['below_25','Below 25','Pasi pa25'],['25_34','25–34',''],['35_44','35–44',''],['45_54','45–54',''],['55plus','55+','']]}/>
              <Q qn="3" en="Highest level of education" sh="Danhiko rekuchikoro rakakwirira"/>
              <RG id="q3_education" opts={[['none','No formal','Hapana'],['primary','Primary','Chikoro'],['secondary','Secondary','Sekondari'],['tertiary','Tertiary','Koleji']]}/>
              <Q qn="4" en="Household headship" sh="Mutungamiriri wemhuri"/>
              <RG id="q4_hhhead" opts={[['male_headed','Male-headed','Murume'],['female_headed','Female-headed','Mukadzi'],['youth_headed','Youth-headed','Mudiki']]}/>
              <Q qn="5" en="Farm size (hectares)" sh="Hukuru hwemunda (mahekitia)"/>
              <RG id="q5_farmsize" opts={[['lt1','< 1 ha',''],['1_2','1–2 ha',''],['2_5','2–5 ha',''],['5_10','5–10 ha',''],['gt10','> 10 ha','']]}/>
              <Q qn="6" en="Years of sorghum farming experience" sh="Makore ekurima sorghum"/>
              <RG id="q6_experience" opts={[['lt2','< 2 yrs',''],['2_5','2–5 yrs',''],['6_10','6–10 yrs',''],['11_20','11–20 yrs',''],['gt20','> 20 yrs','']]}/>
              <Q qn="7" en="Ward of residence" sh="Divi raMunogara"/>
              <RG id="q7_ward_res" opts={[['ward1','Ward 1',''],['ward2','Ward 2',''],['ward3','Ward 3',''],['ward4','Ward 4',''],['ward5','Ward 5','']]}/>
              <Q qn="8" en="Household size" sh="Huwandu hwemhuri"/>
              <RG id="q7_hhsize" opts={[['1_3','1–3',''],['4_6','4–6',''],['7_9','7–9',''],['10_12','10–12',''],['13plus','13+','']]}/>

              <SH bg={C.red} en="SECTION B: SORGHUM PRODUCTION & PERFORMANCE" sh="CHIKAMU B: KURIMA SORGHUM UNEHUNYANZVI" vars="Descriptive Stats, SEM (dependent variable)"/>
              <Q qn="9" en="Average sorghum yield last season (50kg bags)" sh="Kubuda kwesorghum mugore rapfuura"/>
              <RG id="q9_yield" opts={[['lt5','< 5 bags',''],['5_10','5–10',''],['11_20','11–20',''],['21_50','21–50',''],['gt50','> 50','']]}/>
              <Q qn="10" en="Percentage of sorghum sold" sh="Mazana esorghum inotengwa"/>
              <RG id="q10_pctsold" opts={[['0_20','0–20%',''],['21_40','21–40%',''],['41_60','41–60%',''],['61_80','61–80%',''],['81_100','81–100%','']]}/>
              <Q qn="11" en="Primary sorghum market" sh="Ndepi panonyanya kutengesa sorghum yenyu?"/>
              <RG id="q11_market" opts={[['gmb','GMB',''],['agro_dealer','Agro-dealer','Mutengesi'],['contract','Contract','Chibvumirano'],['local_market','Local market','Musika'],['cooperative','Cooperative','']]}/>
              <Q qn="12" en="Planting timing relative to ideal window" sh="Mavhiki mangani musati/mushure mekurimira"/>
              <RG id="q12_planting" opts={[['early_4plus','> 4wks early',''],['early_1_4','1–4wks early',''],['on_time','On time','Nenguva'],['late_1_4','1–4wks late',''],['late_4plus','> 4wks late','']]}/>

              <SH bg={C.green} en="SECTION C: FUNDING MODEL ACCESS & USAGE" sh="CHIKAMU C: KUFIKIWA NEKUSHANDISWA KWEMAMIRIRO EKUFONDERA" vars="Probit, Logit, SEM, Profile Analysis"/>
              <Q qn="13" en="Do you currently use any formal funding model?" sh="Munoshandisa mamiriro ekufondera iye zvino?"/>
              <RG id="q13_usefunding" opts={[['yes','Yes','Hongu'],['no','No','Kwete']]}/>
              <Q qn="14" en="Funding models used in past 3 years? (Select ALL)" sh="Mamiriro ekufondera amakashandisa mumakore 3? (Tinya zvose)"/>
              <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:14}}>
                {[['contract','Contract Farming','Kurima Pachishandiso'],['mfi','MFI Loan','Chikwereti cheMFI'],['gmb_scheme','GMB Input Scheme','Hurongwa hweGMB'],['arda','ARDA Outgrower','Hurongwa hweARDA'],['cooperative','Cooperative Savings','Chengetero yeSangano'],['govt_subsidy','Govt Subsidy','Mari yehurumende'],['agro_credit','Agro-dealer Credit','Chikwereti chemutengesi'],['informal','Informal borrowing','Kukwereta kwemuno'],['none','None','Hapana']].map(([v,en,sh])=>{
                  const sel=(form.q14_models||[]).includes(v)
                  return <div key={v} onClick={()=>toggleModel(v)} style={rSel(sel)}>
                    <div>{en}</div><div style={{fontSize:10,color:sel?'#6B7EF0':C.light}}>{sh}</div>
                  </div>
                })}
              </div>
              {form.q13_usefunding==='yes'&&<><Q qn="15" en="When did funding arrive relative to planting?" sh="Kufondera kwenyu kwasvika rinhi?"/>
              <RG id="q15_fundtiming" opts={[['very_early','> 4wks before',''],['early','1–4wks before',''],['on_time','Just in time','Nenguva'],['late_1_4','1–4wks late',''],['very_late','> 4wks late','']]}/></>}
              {form.q13_usefunding==='no'&&<><Q qn="16" en="Main reason for NOT using formal funding?" sh="Chikonzero chikuru chekusashandisa kufondera?"/>
              <RG id="q16_barrier" opts={[['no_collateral','No collateral','Hapana chekuchengeta'],['too_far','Too far','Kure'],['high_interest','High interest','Mubhadharo murefu'],['not_aware','Not aware','Handizivi'],['prev_default','Previous default','Ndakambokutadza'],['cultural','Cultural barriers','Zviradziko'],['no_trust','No trust','Hapana kutenda']]}/></>}

              <SH bg={C.teal} en="SECTION D: RISK PERCEPTION (Likert 1–5)" sh="CHIKAMU D: MAONERO PAMUSORO PEZVINETSO" vars="SEM, SmartPLS, Factor Analysis, Cronbach Alpha"/>
              <LK id="q18_drought" qn="Q17" en="Drought is the biggest risk to my sorghum farming." sh="Njodzi yezuva rakachena ndiyo njodzi huru."/>
              <LK id="q19_hwc" qn="Q18" en="Human-wildlife conflict significantly reduces my sorghum yield." sh="Nharo dzakaitwa nevanhu nemhuka zvinopunza kubuda kwesorghum."/>
              <LK id="q20_latedisbursement" qn="Q19" en="Late disbursement of funds causes me to miss the planting window." sh="Kunonoka kwemari kunoita ndisifire nguva yakanaka yekurimira."/>
              <LK id="q21_repayability" qn="Q20" en="I am unable to repay loans when my crop fails." sh="Ndinokutadza kudzorora chikwereti chirimwa changu chikafa."/>
              <LK id="q22_pricefluctuation" qn="Q21" en="Price fluctuations of sorghum make it risky to use funding models." sh="Kushanduka kwemutengo wesorghum kunoita kuve njodzi kushandisa mamiriro."/>
              <LK id="q23_trust" qn="Q22" en="I trust the funding institutions operating in Mbire District." sh="Ndinovimba nemanyanga ekufondera ashanda muDunhu reMbire."/>
              <LK id="q24_govtsupport" qn="Q23" en="Government support programs adequately protect farmers from financial risk." sh="Hurongwa hwehurumende hunochengeta zvakanaka varimi kubva kuzvinetso."/>

              <SH bg={C.gold} en="SECTION E: SOCIAL CAPITAL & INFORMATION ACCESS" sh="CHIKAMU E: PFUMA YEMUMUSHA & KUFIKIWA KWERUZIVO" vars="SEM, Probit, SmartPLS"/>
              <LK id="q25_cooperative" qn="Q24" en="I am a member of a farmer cooperative or savings group." sh="Ndiri nhengo yesangano revarimi kana boka rechengetero."/>
              <LK id="q26_extension" qn="Q25" en="I receive regular agricultural extension advice from government officers." sh="Ndinogamuchira mazano ekurima achienderera kubva kuvashandi."/>
              <LK id="q27_community" qn="Q26" en="My neighbours and community share knowledge about funding opportunities." sh="Vavakidzani vangu nemumusha vanogovana ruzivo pamusoro pezvidziviriro."/>
              <LK id="q28_mobile" qn="Q27" en="I have access to a mobile phone for farming-related information." sh="Ndine foni yepamaoko yekuwana ruzivo rwekurima."/>
              <LK id="q29_digital" qn="Q28" en="I have heard of or accessed credit through WhatsApp or digital platforms." sh="Ndakunzwa kana kuwana chikwereti kuburikidza neWhatsApp."/>

              <SH bg={C.purple} en="SECTION F: GENDER & VULNERABILITY INDICATORS" sh="CHIKAMU F: BATO REMURUME/MUKADZI & ZVIRATIDZO" vars="Gender Disaggregation, Female Targeting, SEM Subgroup"/>
              <Q qn="29" en="Do you own the land you farm on?" sh="Munave nenyika yamunorima?"/>
              <RG id="q30_landowner" opts={[['yes_full','Yes, fully','Hongu, zvizere'],['yes_joint','Yes, jointly','Hongu, pamwe'],['rented','No, rented','Kwete, kukodesha'],['communal','No, communal','Kwete, yemuno']]}/>
              <LK id="q31_femchallenge" qn="Q30" en="As a woman, I face greater challenges accessing funding than male farmers." sh="Semukadzi, ndinosangana nematambudziko makuru pakuwana kufondera."/>
              <LK id="q32_cultural" qn="Q31" en="Cultural norms in my community prevent women from applying for loans." sh="Tsika dzamumusha dzangu dzinodzvanya vakadzi kubva kushambadzira zvikwereti."/>
              <LK id="q33_femproduct" qn="Q32" en="I would use a funding model designed specifically for women farmers." sh="Ndaishandisa mamiriro ekufondera akagadzirwa kuvarimi vakadzi."/>
              <LK id="q34_femdecision" qn="Q33" en="Female farmers in my area have less decision-making power over farm finances." sh="Varimi vakadzi vane simba diki rekusarudza pamusoro pemari yemunda."/>

              <SH bg="#0891B2" en="SECTION G: FRAMEWORK & STRATEGY PREFERENCES" sh="CHIKAMU G: ZVAKAFARIRWA PAMUSORO PECHIMIRO" vars="Framework Dev (Obj 4), Candidate Portfolio, Model Prediction"/>
              <LK id="q35_bundled" qn="Q34" en="A combined funding package (subsidy + insurance + loan) would reduce my farming risk." sh="Pfungswa yakasanganiswa yefondera yaizopunza njodzi yangu yekurima."/>
              <LK id="q36_riskpool" qn="Q35" en="I would participate in a community-based risk pooling scheme." sh="Ndingatore chikamu mushambadziro yekupamharara njodzi yemuno."/>
              <LK id="q37_cropinsurance" qn="Q36" en="Crop insurance linked to my funding model would encourage more funding uptake." sh="Inishuransi yechirimwa yakabatana nefondera yaindiitisa kuwana kufondera."/>
              <LK id="q38_digital_trust" qn="Q37" en="I trust a digital mobile platform to manage my farm funding profile." sh="Ndinovimba nenzvimbo yedijitari yefoni kukurudzira chimiro changu chefondera."/>
              <LK id="q39_history" qn="Q38" en="I want my funding history used to predict my future funding eligibility." sh="Ndinoda nhoroondo yangu yefondera kushandiswa kuporofira kufanira kwangu."/>

              <SH bg={C.text} en="SECTION H: ENUMERATOR OBSERVATIONS" sh="CHIKAMU H: ZVAKACHERECHEDZWA NEMUVERENGERI" vars="Data quality control"/>
              <Q qn="39" en="Was the respondent cooperative and engaged?" sh="Mubvunzwi akabatikana uye akashirikira?"/>
              <RG id="q40_cooperation" opts={[['yes','Yes','Hongu'],['partial','Partially','Zvimwe'],['no','No','Kwete']]}/>
              <Q qn="40" en="Observed dwelling condition" sh="Mamiriro aakaona ekugara"/>
              <RG id="q41_dwelling" opts={[['good','Good','Akanaka'],['average','Average','Pakati'],['poor','Poor','Akaipa']]}/>
              <div style={{marginTop:10}}>
                <label style={{fontSize:12,fontWeight:700,color:C.text,display:'block',marginBottom:5}}>Q41. Enumerator code</label>
                <input style={inp} placeholder="e.g. ENUM-W1-001" value={form.enumerator_code||''} onChange={e=>setF('enumerator_code',e.target.value)}/>
              </div>
              <button type="submit" style={{width:'100%',padding:14,background:C.navy,color:'#fff',border:'none',borderRadius:12,fontSize:15,fontWeight:600,cursor:'pointer',fontFamily:'inherit',marginTop:4}}>
                ✅ Submit Response / Tumira Mhinduro
              </button>
            </form>
          </div>
        )}

        {tab==='manage'&&role==='admin'&&(
          <div style={{animation:'fadeIn 0.3s ease'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:18}}>
              {[{l:'Total',v:total,c:C.navy},{l:'Complete',v:responses.filter(r=>!isInc(r)).length,c:C.green},{l:'Incomplete',v:incomplete.length,c:C.red},{l:'Selected',v:bulkSelect.length,c:C.gold}].map((s,i)=>(
                <div key={i} style={{background:C.card,borderRadius:12,padding:'14px 16px',border:'1px solid '+C.border,borderLeft:'4px solid '+s.c}}>
                  <div style={{fontSize:11,color:C.sub,fontWeight:600,textTransform:'uppercase',letterSpacing:0.5}}>{s.l}</div>
                  <div style={{fontSize:28,fontWeight:800,color:s.c,fontFamily:'monospace'}}>{s.v}</div>
                </div>
              ))}
            </div>
            <div style={{background:C.card,borderRadius:12,padding:'14px 16px',marginBottom:16,display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',border:'1px solid '+C.border}}>
              <span style={{fontSize:13,fontWeight:700,color:C.navy}}>Filters:</span>
              <select style={{padding:'7px 12px',border:'1px solid '+C.border,borderRadius:8,fontSize:12,fontFamily:'inherit',background:'#fff',cursor:'pointer'}} value={filterWard} onChange={e=>setFilterWard(e.target.value)}>
                <option value="all">All Wards</option>
                {['Ward 1','Ward 2','Ward 3','Ward 4','Ward 5'].map(w=><option key={w}>{w}</option>)}
              </select>
              <select style={{padding:'7px 12px',border:'1px solid '+C.border,borderRadius:8,fontSize:12,fontFamily:'inherit',background:'#fff',cursor:'pointer'}} value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="complete">Complete only</option>
                <option value="incomplete">Incomplete only</option>
              </select>
              <div style={{flex:1}}></div>
              {bulkSelect.length>0&&<button onClick={()=>setDeleteModal({title:'Delete '+bulkSelect.length+' selected?',message:'This permanently removes selected responses. Cannot be undone.',details:bulkSelect.length+' responses will be deleted.',action:bulkDelete})} style={{padding:'7px 14px',background:C.red,color:'#fff',border:'none',borderRadius:9,cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:'inherit'}}>🗑 Delete Selected ({bulkSelect.length})</button>}
              {incomplete.length>0&&<button onClick={()=>setDeleteModal({title:'Delete ALL incomplete responses?',message:'Permanently deletes all responses missing key fields.',details:incomplete.length+' incomplete responses will be deleted.',action:deleteAllInc})} style={{padding:'7px 14px',background:C.red,color:'#fff',border:'none',borderRadius:9,cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:'inherit'}}>🧹 Delete All Incomplete ({incomplete.length})</button>}
            </div>
            <div style={{background:C.card,border:'1px solid '+C.border,borderRadius:14,overflow:'hidden'}}>
              <div style={{overflowX:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
                  <thead><tr style={{background:'#F8F9FF',borderBottom:'2px solid '+C.border}}>
                    <th style={{padding:'12px 14px',textAlign:'left'}}>
                      <input type="checkbox" onChange={e=>e.target.checked?setBulkSelect(filteredResp.map(r=>r.id)):setBulkSelect([])} checked={bulkSelect.length===filteredResp.length&&filteredResp.length>0}/>
                    </th>
                    {['Q.No','Ward','Status','Sex','HH Head','Farm','Funding','Drought','HWC','Submitted','Del'].map(h=>(
                      <th key={h} style={{padding:'12px 10px',textAlign:'left',fontSize:10,fontWeight:700,color:C.sub,textTransform:'uppercase',letterSpacing:0.5,whiteSpace:'nowrap'}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {filteredResp.map(r=>{
                      const inc=isInc(r);const sel=bulkSelect.includes(r.id)
                      return <tr key={r.id} style={{borderBottom:'1px solid '+C.border,background:sel?'#EEF2FF':inc?'#FFF5F5':'#fff',transition:'background 0.15s'}}>
                        <td style={{padding:'10px 14px'}}><input type="checkbox" checked={sel} onChange={e=>e.target.checked?setBulkSelect(p=>[...p,r.id]):setBulkSelect(p=>p.filter(id=>id!==r.id))}/></td>
                        <td style={{padding:'10px 10px',fontFamily:'monospace',fontSize:11,fontWeight:700}}>{r.questionnaire_no}</td>
                        <td style={{padding:'10px 10px'}}>{r.ward||'–'}</td>
                        <td style={{padding:'10px 10px'}}><Badge type={inc?'danger':'success'}>{inc?'Incomplete':'Complete'}</Badge></td>
                        <td style={{padding:'10px 10px'}}>{r.q1_sex||'–'}</td>
                        <td style={{padding:'10px 10px',fontSize:11}}>{(r.q4_hhhead||'–').replace(/_/g,' ')}</td>
                        <td style={{padding:'10px 10px'}}>{r.q5_farmsize||'–'}</td>
                        <td style={{padding:'10px 10px'}}>{r.q13_usefunding||'–'}</td>
                        <td style={{padding:'10px 10px',textAlign:'center',fontWeight:700}}>{r.q18_drought?r.q18_drought+'/5':'–'}</td>
                        <td style={{padding:'10px 10px',textAlign:'center'}}>{r.q19_hwc?r.q19_hwc+'/5':'–'}</td>
                        <td style={{padding:'10px 10px',fontSize:10,fontFamily:'monospace',whiteSpace:'nowrap',color:C.sub}}>{new Date(r.submitted_at).toLocaleDateString()}</td>
                        <td style={{padding:'10px 10px'}}>
                          <button onClick={()=>setDeleteModal({title:'Delete this response?',message:'Delete questionnaire '+r.questionnaire_no+'? This cannot be undone.',details:'Ward: '+r.ward+' · '+new Date(r.submitted_at).toLocaleDateString(),action:()=>deleteOne(r.id)})} style={{padding:'5px 10px',background:C.red,color:'#fff',border:'none',borderRadius:7,cursor:'pointer',fontSize:11,fontFamily:'inherit'}}>🗑</button>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
                {filteredResp.length===0&&<div style={{textAlign:'center',padding:40,color:C.light,fontSize:13}}><div style={{fontSize:32,marginBottom:10}}>📭</div>No responses match filters.</div>}
              </div>
            </div>
          </div>
        )}

        {tab==='enumerators'&&role==='admin'&&(
          <div style={{animation:'fadeIn 0.3s ease'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <div style={{fontSize:14,fontWeight:700,color:C.navy}}>Enumerator Management <Badge type="navy">{enumerators.length} active</Badge></div>
              <button onClick={()=>setShowAddEnum(!showAddEnum)} style={{padding:'9px 18px',background:C.green,color:'#fff',border:'none',borderRadius:9,cursor:'pointer',fontSize:13,fontWeight:600,fontFamily:'inherit'}}>+ Add Enumerator</button>
            </div>
            {showAddEnum&&(
              <div style={{background:C.card,border:'2px solid '+C.green,borderRadius:14,padding:18,marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:700,color:C.green,marginBottom:12}}>New Enumerator</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
                  {[['name','Full name'],['email','Email']].map(([k,ph])=>(
                    <input key={k} style={{...inp,margin:0}} placeholder={ph} value={newEnum[k]} onChange={e=>setNewEnum(p=>({...p,[k]:e.target.value}))}/>
                  ))}
                  <select style={{...inp,margin:0}} value={newEnum.ward} onChange={e=>setNewEnum(p=>({...p,ward:e.target.value}))}>
                    <option value="">Ward...</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>Ward {n}</option>)}
                  </select>
                </div>
                <div style={{display:'flex',gap:8,marginTop:12}}>
                  <button onClick={addEnumerator} style={{padding:'8px 18px',background:C.green,color:'#fff',border:'none',borderRadius:9,cursor:'pointer',fontSize:13,fontWeight:600,fontFamily:'inherit'}}>Save</button>
                  <button onClick={()=>setShowAddEnum(false)} style={{padding:'8px 18px',background:'#eee',color:C.sub,border:'none',borderRadius:9,cursor:'pointer',fontSize:13,fontFamily:'inherit'}}>Cancel</button>
                </div>
              </div>
            )}
            <div style={{display:'grid',gap:10}}>
              {enumerators.map(e=>{
                const done=responses.filter(r=>r.enumerator_code===e.enumerator_code).length
                const pct=Math.min(100,Math.round(done/92*100))
                const initials=e.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()
                return <div key={e.id} style={{background:C.card,border:'1px solid '+C.border,borderRadius:14,padding:'14px 18px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:14}}>
                    <div style={{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,'+C.navy+',#2438A0)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,fontWeight:700,flexShrink:0}}>{initials}</div>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                        <span style={{fontSize:14,fontWeight:700,color:C.text}}>{e.name}</span>
                        <Badge type="success">Active</Badge>
                        <span style={{fontSize:11,color:C.sub,fontFamily:'monospace'}}>{e.enumerator_code}</span>
                      </div>
                      <div style={{fontSize:11,color:C.sub,marginBottom:8}}>{e.ward} · {done} surveys · {e.email}</div>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <div style={{flex:1,height:8,background:'#F0F2F8',borderRadius:4,overflow:'hidden'}}>
                          <div style={{height:'100%',width:pct+'%',background:'linear-gradient(90deg,'+C.green+'CC,'+C.green+')',borderRadius:4,transition:'width 0.8s'}}></div>
                        </div>
                        <span style={{fontSize:11,fontFamily:'monospace',color:C.sub,width:55,textAlign:'right'}}>{done}/92 ({pct}%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              })}
            </div>
            {enumerators.length===0&&<div style={{textAlign:'center',color:C.light,padding:60,fontSize:13}}><div style={{fontSize:40,marginBottom:10}}>👥</div>No enumerators yet.</div>}
          </div>
        )}

        {tab==='export'&&role==='admin'&&(
          <div style={{animation:'fadeIn 0.3s ease'}}>
            <div style={{background:C.warning,border:'1px solid #FDE68A',borderRadius:12,padding:'12px 16px',marginBottom:20,fontSize:12,color:C.warningT,fontWeight:700}}>
              🔒 Export restricted to Admin only (Phillemon Nyamgure). {total} responses · 41 variables.
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div style={{background:C.card,border:'1px solid '+C.border,borderRadius:14,padding:20}}>
                <div style={{fontSize:13,fontWeight:700,color:C.navy,marginBottom:16}}>Download Data</div>
                {[[C.green,'📊 Export for SPSS / Stata (CSV)'],[C.navy,'📈 Export for SmartPLS (CSV)'],[C.teal,'📋 Export All Variables (CSV)'],[C.purple,'🔬 Export for R Analysis (CSV)']].map(([bg,label],i)=>(
                  <button key={i} onClick={exportCSV} style={{width:'100%',padding:'11px',background:bg,color:'#fff',border:'none',borderRadius:10,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit',marginBottom:8,textAlign:'left'}}>{label}</button>
                ))}
              </div>
              <div style={{background:C.card,border:'1px solid '+C.border,borderRadius:14,padding:20}}>
                <div style={{fontSize:13,fontWeight:700,color:C.navy,marginBottom:16}}>Data Quality</div>
                {[
                  ['Total responses',total,C.navy],
                  ['Complete',responses.filter(r=>!isInc(r)).length,C.green],
                  ['Incomplete',incomplete.length,incomplete.length>0?C.red:C.green],
                  ['Wards covered',[...new Set(responses.map(r=>r.ward))].filter(Boolean).length+' / 5',C.navy],
                  ['Enumerators',enumerators.length,C.teal],
                  ['Ready for analysis',total>=30?'✓ Yes':'Collect more',total>=30?C.green:C.gold],
                ].map(([l,v,c],i)=>(
                  <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 0',borderBottom:'1px solid '+C.bg,fontSize:12}}>
                    <span style={{color:C.sub}}>{l}</span>
                    <span style={{fontWeight:700,color:c,fontFamily:'monospace'}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
