import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const LOGO = 'data:image/jpeg;base64,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'

// ── DESIGN SYSTEM ─────────────────────────────────────────────────────
const C = {
  navy:'#1B2A6B', navyL:'#2438A0', navyD:'#0F1A45',
  red:'#C0272D',  redL:'#E83038',  redD:'#8B1A1F',
  green:'#1F7A4A',greenL:'#27A262',greenD:'#145233',
  gold:'#D4A017', goldL:'#F0B820', goldD:'#9A7410',
  teal:'#0D5F6E', tealL:'#0F7A8C', tealD:'#083D48',
  purple:'#6D28D9',
  bg:'#F0F2F8', card:'#FFFFFF', border:'#E2E6F0',
  text:'#1A1D2E', sub:'#6B7280', light:'#9CA3AF',
  success:'#DCFCE7', successT:'#166534',
  warning:'#FEF3C7', warningT:'#92400E',
  danger:'#FEE2E2',  dangerT:'#991B1B',
  info:'#EEF2FF',    infoT:'#3730A3',
}

const WARD_COLORS = [C.navy, C.red, C.green, C.gold, C.teal]
const FUND_LABELS = {contract:'Contract Farming',mfi:'MFI Loan',gmb_scheme:'GMB Scheme',arda:'ARDA Outgrower',cooperative:'Cooperative',govt_subsidy:'Govt Subsidy',agro_credit:'Agro-dealer',informal:'Informal',none:'None'}

const ROLES = {
  admin:      {label:'Phillemon Nyamgure', sub:'Nyamz Analytics — Full Control', pw:'nyamz2026', color:C.red,    icon:'👑'},
  supervisor: {label:'PhD Supervisor',     sub:'View dashboard only',             pw:'super2026', color:C.teal,   icon:'🎓'},
  sydney:     {label:'Sydney Mazambara',   sub:'Researcher — Field + View',       pw:'mbire2026', color:C.green,  icon:'🌾'},
  enumerator: {label:'Enumerator',         sub:'Data entry only',                 pw:'enum2026',  color:C.gold,   icon:'📋'},
}

// ── MICRO-INTERACTION STYLES ───────────────────────────────────────────
const hover = {transform:'translateY(-1px)', boxShadow:'0 6px 20px rgba(0,0,0,0.12)'}

function useHover() {
  const [h, setH] = useState(false)
  return [h, {onMouseEnter:()=>setH(true), onMouseLeave:()=>setH(false)}]
}

function Btn({bg=C.navy,tc='#fff',children,onClick,style={},small=false,outline=false,danger=false}) {
  const [h,hProps] = useHover()
  const base = {
    background: outline?'transparent': danger?C.red : bg,
    color: outline?(danger?C.red:bg) : tc,
    border: outline?`1.5px solid ${danger?C.red:bg}`:'none',
    borderRadius: 9, padding: small?'6px 12px':'10px 18px',
    fontSize: small?11:13, fontWeight:600, cursor:'pointer',
    fontFamily:'inherit', transition:'all 0.18s',
    transform: h?'translateY(-1px)':'none',
    boxShadow: h?'0 4px 14px rgba(0,0,0,0.15)':'none',
    ...style
  }
  return <button style={base} onClick={onClick} {...hProps}>{children}</button>
}

function Card({children, style={}, hover:hoverEffect=false}) {
  const [h, hProps] = useHover()
  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:20,
      transition:'all 0.2s', boxShadow: (hoverEffect&&h)?'0 8px 30px rgba(0,0,0,0.1)':'0 1px 4px rgba(0,0,0,0.04)',
      transform:(hoverEffect&&h)?'translateY(-2px)':'none',...style}} {...(hoverEffect?hProps:{})}>
      {children}
    </div>
  )
}

function Badge({children, type='info'}) {
  const styles = {
    info:    {bg:C.info,    color:C.infoT},
    success: {bg:C.success, color:C.successT},
    warning: {bg:C.warning, color:C.warningT},
    danger:  {bg:C.danger,  color:C.dangerT},
    navy:    {bg:'#EEF2FF', color:C.navy},
  }
  const s = styles[type]||styles.info
  return <span style={{background:s.bg,color:s.color,fontSize:10,padding:'3px 9px',borderRadius:20,fontWeight:700,letterSpacing:0.3}}>{children}</span>
}

function KPI({label,value,sub,color,icon,trend,pct}) {
  const [h,hProps] = useHover()
  return (
    <div style={{background:C.card,borderRadius:16,padding:'18px 20px',borderTop:`3px solid ${color}`,
      boxShadow: h?'0 8px 28px rgba(0,0,0,0.1)':'0 1px 4px rgba(0,0,0,0.05)',
      transform: h?'translateY(-3px)':'none', transition:'all 0.2s', cursor:'default'}} {...hProps}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:8}}>
        <div style={{fontSize:11,color:C.sub,textTransform:'uppercase',letterSpacing:0.8,fontWeight:600}}>{label}</div>
        <div style={{fontSize:20}}>{icon}</div>
      </div>
      <div style={{fontSize:32,fontWeight:800,color,lineHeight:1,fontFamily:'DM Mono,monospace'}}>{value}</div>
      {sub&&<div style={{fontSize:11,color:C.sub,marginTop:5}}>{sub}</div>}
      {trend!==undefined&&(
        <div style={{marginTop:8,display:'flex',alignItems:'center',gap:4}}>
          <div style={{height:3,flex:1,background:`linear-gradient(90deg,${color}22,${color})`,borderRadius:3}}>
            <div style={{height:'100%',width:(pct||0)+'%',background:color,borderRadius:3,transition:'width 1s ease'}}></div>
          </div>
          <span style={{fontSize:10,color:C.sub,fontFamily:'monospace'}}>{pct}%</span>
        </div>
      )}
    </div>
  )
}

function ProgressBar({label,collected,target,color,pct}) {
  const [h,hProps]=useHover()
  return (
    <div style={{marginBottom:12,...(h?{background:'#F8F9FF',borderRadius:8,padding:'6px 8px',margin:'0 -8px 8px'}:{padding:'0 0 4px'})}} {...hProps}>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:5}}>
        <span style={{color:C.sub,fontWeight:h?600:400,transition:'font-weight 0.15s'}}>{label}</span>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <span style={{color:C.light,fontFamily:'monospace',fontSize:11}}>{collected}/{target}</span>
          <Badge type={pct>=100?'success':pct>=50?'info':'warning'}>{pct}%</Badge>
        </div>
      </div>
      <div style={{height:10,background:'#F0F2F8',borderRadius:5,overflow:'hidden',position:'relative'}}>
        <div style={{height:'100%',width:pct+'%',background:`linear-gradient(90deg,${color}CC,${color})`,borderRadius:5,transition:'width 1s cubic-bezier(0.4,0,0.2,1)',position:'relative'}}>
          {pct>10&&<div style={{position:'absolute',right:6,top:'50%',transform:'translateY(-50%)',width:4,height:4,borderRadius:'50%',background:'rgba(255,255,255,0.8)'}}></div>}
        </div>
      </div>
    </div>
  )
}

function Modal({open,onClose,title,children,danger=false}) {
  if(!open) return null
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(4px)'}} onClick={onClose}>
      <div style={{background:'#fff',borderRadius:16,padding:28,width:460,maxWidth:'95vw',boxShadow:'0 24px 80px rgba(0,0,0,0.3)',animation:'slideUp 0.2s ease'}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
          <div style={{fontSize:15,fontWeight:700,color:danger?C.red:C.navy}}>{title}</div>
          <button onClick={onClose} style={{background:'none',border:'none',fontSize:20,cursor:'pointer',color:C.light,lineHeight:1}}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

// ── CUSTOM TOOLTIP ─────────────────────────────────────────────────────
const CustomTooltip = ({active,payload,label}) => {
  if(!active||!payload?.length) return null
  return (
    <div style={{background:'rgba(26,29,46,0.95)',borderRadius:10,padding:'8px 12px',border:'none',backdropFilter:'blur(10px)'}}>
      <div style={{color:'rgba(255,255,255,0.7)',fontSize:11,marginBottom:4}}>{label}</div>
      {payload.map((p,i)=><div key={i} style={{color:'#fff',fontSize:13,fontWeight:600}}>{p.value}</div>)}
    </div>
  )
}

// ── MAIN APP ───────────────────────────────────────────────────────────
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
  const [animIn,setAnimIn]=useState(false)

  const showToast = useCallback((msg,type='success')=>{
    setToast({msg,type})
    setTimeout(()=>setToast(null),3500)
  },[])

  const fetchData = useCallback(async()=>{
    try {
      const [{data:r},{data:u}]=await Promise.all([
        supabase.from('responses').select('*').order('submitted_at',{ascending:false}),
        supabase.from('users').select('*')
      ])
      if(r) setResponses(r)
      if(u) setUsers(u)
    } catch(e){ console.error(e) }
  },[])

  useEffect(()=>{
    if(view!=='main') return
    fetchData()
    setAnimIn(true)
    const ch=supabase.channel('rt').on('postgres_changes',{event:'*',schema:'public',table:'responses'},()=>{fetchData();showToast('New response received! 🎉','success')}).subscribe()
    const interval=setInterval(fetchData,30000)
    return()=>{supabase.removeChannel(ch);clearInterval(interval)}
  },[view,fetchData,showToast])

  // ── DATA COMPUTATIONS ──────────────────────────────────────────────
  const total=responses.length
  const pct=parseFloat(((total/460)*100).toFixed(1))
  const femaleHH=responses.filter(r=>r.q4_hhhead==='female_headed').length
  const useFunding=responses.filter(r=>r.q13_usefunding==='yes').length
  const hwcAffected=responses.filter(r=>r.q19_hwc>=4).length
  const lateDisb=responses.filter(r=>r.q20_latedisbursement>=4).length
  const avgDrought=total?(responses.reduce((s,r)=>s+(r.q18_drought||0),0)/total).toFixed(1):'0'
  const avgTrust=total?(responses.reduce((s,r)=>s+(r.q23_trust||0),0)/total).toFixed(1):'0'
  const enumerators=users.filter(u=>u.role==='enumerator')
  const incomplete=responses.filter(r=>!r.q1_sex||!r.q13_usefunding||!r.q18_drought)

  const wardData=['Ward 1','Ward 2','Ward 3','Ward 4','Ward 5'].map((w,i)=>{
    const c=responses.filter(r=>r.ward===w).length
    return {ward:w,ward_short:w.replace('Ward ','W'),collected:c,target:92,color:WARD_COLORS[i],pct:Math.round(c/92*100)}
  })

  const genderData=[
    {name:'Male',value:responses.filter(r=>r.q1_sex==='male').length,color:C.navy},
    {name:'Female',value:responses.filter(r=>r.q1_sex==='female').length,color:C.red},
  ].filter(d=>d.value>0)

  const fundMap={};responses.forEach(r=>{if(r.q14_models)r.q14_models.forEach(m=>{if(m)fundMap[m]=(fundMap[m]||0)+1})})
  const fundData=Object.entries(fundMap).sort((a,b)=>b[1]-a[1]).slice(0,7).map(([k,v])=>({name:FUND_LABELS[k]||k,count:v,fill:WARD_COLORS[Object.keys(fundMap).indexOf(k)%5]}))

  const dailyMap={};responses.forEach(r=>{const d=r.submitted_at?.slice(0,10);if(d)dailyMap[d]=(dailyMap[d]||0)+1})
  const dailyData=Object.entries(dailyMap).sort(([a],[b])=>a.localeCompare(b)).slice(-14).map(([d,c])=>({day:d.slice(5),count:c}))

  const riskRadar=[
    {subject:'Drought',score:parseFloat(avgDrought)||0,fullMark:5},
    {subject:'HWC',score:total?(responses.reduce((s,r)=>s+(r.q19_hwc||0),0)/total):0,fullMark:5},
    {subject:'Late Disb.',score:total?(responses.reduce((s,r)=>s+(r.q20_latedisbursement||0),0)/total):0,fullMark:5},
    {subject:'Repayment',score:total?(responses.reduce((s,r)=>s+(r.q21_repayability||0),0)/total):0,fullMark:5},
    {subject:'Price Risk',score:total?(responses.reduce((s,r)=>s+(r.q22_pricefluctuation||0),0)/total):0,fullMark:5},
    {subject:'Trust',score:parseFloat(avgTrust)||0,fullMark:5},
  ].map(r=>({...r,score:parseFloat(r.score.toFixed(2))}))

  const headData=[
    {name:'Male-headed',value:responses.filter(r=>r.q4_hhhead==='male_headed').length},
    {name:'Female-headed',value:responses.filter(r=>r.q4_hhhead==='female_headed').length},
    {name:'Youth-headed',value:responses.filter(r=>r.q4_hhhead==='youth_headed').length},
  ].filter(d=>d.value>0)

  // ── ACTIONS ────────────────────────────────────────────────────────
  function setF(k,v){setForm(p=>({...p,[k]:v}))}
  function toggleModel(m){setForm(p=>({...p,q14_models:p.q14_models.includes(m)?p.q14_models.filter(x=>x!==m):[...p.q14_models,m]}))}

  async function deleteResponse(id,single=true) {
    const {error}=await supabase.from('responses').delete().eq('id',id)
    if(!error){fetchData();showToast(single?'Response deleted':'Responses deleted','success')}
    else showToast('Delete failed: '+error.message,'danger')
    setDeleteModal(null)
  }

  async function bulkDelete() {
    for(const id of bulkSelect){
      await supabase.from('responses').delete().eq('id',id)
    }
    setBulkSelect([])
    fetchData()
    showToast(`${bulkSelect.length} responses deleted`,'success')
    setDeleteModal(null)
  }

  async function deleteAllIncomplete() {
    for(const r of incomplete){
      await supabase.from('responses').delete().eq('id',r.id)
    }
    fetchData()
    showToast(`${incomplete.length} incomplete responses deleted`,'success')
    setDeleteModal(null)
  }

  async function submitForm(e) {
    e.preventDefault()
    if(!form.ward||!form.questionnaire_no){setSubmitStatus('error:Fill in Ward and Questionnaire Number');return}
    const payload={
      questionnaire_no:form.questionnaire_no, ward:form.ward,
      q1_sex:form.q1_sex, q2_age:form.q2_age, q3_education:form.q3_education,
      q4_hhhead:form.q4_hhhead, q5_farmsize:form.q5_farmsize,
      q6_experience:form.q6_experience, q7_hhsize:form.q7_hhsize,
      q9_yield:form.q9_yield, q10_pctsold:form.q10_pctsold,
      q11_market:form.q11_market, q12_planting:form.q12_planting,
      q13_usefunding:form.q13_usefunding, q14_models:form.q14_models,
      q15_fundtiming:form.q15_fundtiming, q16_barrier:form.q16_barrier,
      q18_drought:parseInt(form.q18_drought)||null,
      q19_hwc:parseInt(form.q19_hwc)||null,
      q20_latedisbursement:parseInt(form.q20_latedisbursement)||null,
      q21_repayability:parseInt(form.q21_repayability)||null,
      q22_pricefluctuation:parseInt(form.q22_pricefluctuation)||null,
      q23_trust:parseInt(form.q23_trust)||null,
      q24_govtsupport:parseInt(form.q24_govtsupport)||null,
      q25_cooperative:parseInt(form.q25_cooperative)||null,
      q26_extension:parseInt(form.q26_extension)||null,
      q27_community:parseInt(form.q27_community)||null,
      q28_mobile:parseInt(form.q28_mobile)||null,
      q29_digital:parseInt(form.q29_digital)||null,
      q30_landowner:form.q30_landowner,
      q31_femchallenge:parseInt(form.q31_femchallenge)||null,
      q32_cultural:parseInt(form.q32_cultural)||null,
      q33_femproduct:parseInt(form.q33_femproduct)||null,
      q34_femdecision:parseInt(form.q34_femdecision)||null,
      q35_bundled:parseInt(form.q35_bundled)||null,
      q36_riskpool:parseInt(form.q36_riskpool)||null,
      q37_cropinsurance:parseInt(form.q37_cropinsurance)||null,
      q38_digital_trust:parseInt(form.q38_digital_trust)||null,
      q39_history:parseInt(form.q39_history)||null,
      q40_cooperation:form.q40_cooperation,
      q41_dwelling:form.q41_dwelling,
      enumerator_code:form.enumerator_code||null,
    }
    const {error}=await supabase.from('responses').insert([payload])
    if(error){setSubmitStatus('error:'+(error.message.includes('unique')?'Questionnaire number already exists!':error.message))}
    else{setSubmitStatus('success:✅ Response saved! / Mhinduro yasungirirwa!');setForm({q14_models:[]});fetchData()}
    setTimeout(()=>setSubmitStatus(''),5000)
  }

  async function addEnumerator() {
    if(!newEnum.name||!newEnum.email||!newEnum.ward) return
    const code=`ENUM-W${newEnum.ward}-${String(enumerators.filter(e=>e.ward===`Ward ${newEnum.ward}`).length+1).padStart(3,'0')}`
    await supabase.from('users').insert([{name:newEnum.name,email:newEnum.email,role:'enumerator',ward:`Ward ${newEnum.ward}`,enumerator_code:code,is_active:true}])
    setNewEnum({name:'',email:'',ward:''});setShowAddEnum(false);fetchData()
    showToast(`Enumerator ${newEnum.name} added!`)
  }

  function exportCSV() {
    if(!responses.length){alert('No data yet!');return}
    const headers=Object.keys(responses[0])
    const rows=responses.map(r=>headers.map(h=>{const v=r[h];return Array.isArray(v)?v.join('|'):(v??'')}))
    const csv=[headers.join(","),...rows.map(r=>r.map(v=>"\""+String(v).replace(/\"/g,'\"\"')+"\"").join(","))].join("\n")
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}))
    a.download="Mazambara_PhD_"+new Date().toISOString().slice(0,10)+".csv";a.click()
    showToast("Downloaded "+responses.length+" responses")
  }
