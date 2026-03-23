import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, 
  CloudRain, 
  Activity, 
  Users, 
  Zap, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingUp,
  Clock,
  Smartphone,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from './lib/utils';
import { Worker, Payout, ZoneData, BENGALURU_ZONES } from './types';

// Mock initial workers
const INITIAL_WORKERS: Worker[] = [
  { id: '1', name: 'Rajesh Kumar', partnerId: 'SWG-9921', zone: 'HSR Layout', status: 'active', lastLocation: { lat: 12.9141, lng: 77.6411 }, upiId: 'rajesh@okaxis' },
  { id: '2', name: 'Suresh V', partnerId: 'ZOM-4412', zone: 'Koramangala', status: 'active', lastLocation: { lat: 12.9352, lng: 77.6245 }, upiId: 'suresh.v@paytm' },
  { id: '3', name: 'Amit Singh', partnerId: 'DUN-1102', zone: 'Indiranagar', status: 'active', lastLocation: { lat: 12.9716, lng: 77.6412 }, upiId: 'amit.singh@ybl' },
  { id: '4', name: 'Priya M', partnerId: 'SWG-8823', zone: 'Whitefield', status: 'active', lastLocation: { lat: 12.9698, lng: 77.7500 }, upiId: 'priya.m@okicici' },
  { id: '5', name: 'Karthik R', partnerId: 'ZOM-2231', zone: 'HSR Layout', status: 'active', lastLocation: { lat: 12.9100, lng: 77.6450 }, upiId: 'karthik.r@upi' },
];

export default function App() {
  const [zones, setZones] = useState<ZoneData[]>(BENGALURU_ZONES);
  const [workers, setWorkers] = useState<Worker[]>(INITIAL_WORKERS);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationTime, setSimulationTime] = useState(0);
  const [activeTrigger, setActiveTrigger] = useState<string | null>(null);

  // Rainfall history for chart
  const [rainfallHistory, setRainfallHistory] = useState<{ time: string; value: number }[]>(
    Array.from({ length: 20 }, (_, i) => ({ time: `${i}:00`, value: Math.random() * 5 }))
  );

  // Simulation logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        setSimulationTime(prev => prev + 1);
        
        // Update rainfall randomly
        setZones(prev => prev.map(zone => {
          const change = (Math.random() - 0.3) * 2; // Bias towards increasing
          const newValue = Math.max(0, zone.rainfall + change);
          
          // Check for trigger
          if (newValue >= zone.threshold && zone.rainfall < zone.threshold) {
            handleTrigger(zone.name);
          }
          
          return {
            ...zone,
            rainfall: newValue,
            riskLevel: newValue > 15 ? 'critical' : newValue > 10 ? 'high' : newValue > 5 ? 'medium' : 'low'
          };
        }));

        // Update history
        setRainfallHistory(prev => {
          const next = [...prev.slice(1), { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), value: zones[2].rainfall }];
          return next;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isSimulating, zones]);

  const handleTrigger = (zoneName: string) => {
    setActiveTrigger(zoneName);
    
    // Find workers in this zone
    const eligibleWorkers = workers.filter(w => w.zone === zoneName && w.status === 'active');
    
    eligibleWorkers.forEach(worker => {
      // Simulate validation delay
      setTimeout(() => {
        processPayout(worker);
      }, 1500);
    });

    // Reset trigger alert after some time
    setTimeout(() => setActiveTrigger(null), 10000);
  };

  const processPayout = (worker: Worker) => {
    const amount = 2500;
    const newPayout: Payout = {
      id: Math.random().toString(36).substr(2, 9),
      workerId: worker.id,
      workerName: worker.name,
      amount,
      timestamp: new Date().toLocaleTimeString(),
      trigger: 'Heavy Rainfall (>15mm/hr)',
      status: 'completed',
      transactionId: `TXN-${Math.random().toString(36).toUpperCase().substr(0, 10)}`
    };

    setPayouts(prev => [newPayout, ...prev]);
    setWorkers(prev => prev.map(w => w.id === worker.id ? { ...w, status: 'paid' } : w));
    
    // Reset worker status after 20 seconds for demo loop
    setTimeout(() => {
      setWorkers(prev => prev.map(w => w.id === worker.id ? { ...w, status: 'active' } : w));
    }, 20000);
  };

  const triggerManualStorm = () => {
    setZones(prev => prev.map(z => z.name === 'HSR Layout' ? { ...z, rainfall: 18.5 } : z));
    handleTrigger('HSR Layout');
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-primary selection:text-black">
      {/* Header */}
      <header className="border-b border-brand-border bg-brand-bg/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
              <Shield className="text-black w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">GIGSHIELD</h1>
              <p className="text-[10px] font-mono text-brand-primary uppercase tracking-widest leading-none">Parametric Protection Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                <span className="text-zinc-400">ENGINE:</span>
                <span className="text-brand-primary">OPERATIONAL</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">CITY:</span>
                <span>BENGALURU</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">UPTIME:</span>
                <span>99.98%</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsSimulating(!isSimulating)}
              className={cn(
                "px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-2",
                isSimulating 
                  ? "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20" 
                  : "bg-brand-primary text-black hover:opacity-90"
              )}
            >
              {isSimulating ? <Activity className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
              {isSimulating ? "STOP SIMULATION" : "START LIVE FEED"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Stats & Map */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard 
              label="Active Partners" 
              value="12,482" 
              icon={Users} 
              trend="+12%" 
              sub="Across 5 Zones"
            />
            <StatCard 
              label="Avg. Rainfall" 
              value={`${(zones.reduce((acc, z) => acc + z.rainfall, 0) / zones.length).toFixed(1)} mm`} 
              icon={CloudRain} 
              trend={activeTrigger ? "CRITICAL" : "NORMAL"}
              trendColor={activeTrigger ? "text-red-500" : "text-brand-primary"}
              sub="Live IMD Data"
            />
            <StatCard 
              label="Total Payouts" 
              value={`₹${(payouts.length * 2500).toLocaleString()}`} 
              icon={CreditCard} 
              trend={`+${payouts.length}`} 
              sub="Last 24 Hours"
            />
            <StatCard 
              label="Engine Latency" 
              value="84ms" 
              icon={Zap} 
              trend="OPTIMAL" 
              sub="Validation Loop"
            />
          </div>

          {/* Trigger Alert */}
          <AnimatePresence>
            {activeTrigger && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <AlertTriangle className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-red-500 font-bold">PARAMETRIC TRIGGER BREACHED</h3>
                    <p className="text-xs text-red-400/80 font-mono">Zone: {activeTrigger} | Rainfall: {zones.find(z => z.name === activeTrigger)?.rainfall.toFixed(1)}mm/hr | Threshold: 15mm/hr</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-mono text-red-400 uppercase">Automated Validation</p>
                  <p className="text-xs font-bold">IN PROGRESS...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Visual: Map & Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Zone Map Simulation */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-6 relative overflow-hidden min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-bold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-primary" />
                  BENGALURU ZONE MONITOR
                </h2>
                <div className="flex gap-2">
                   <span className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-mono rounded">LIVE</span>
                </div>
              </div>

              {/* Simulated Map Grid */}
              <div className="relative w-full aspect-square max-w-[350px] mx-auto">
                <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-1 opacity-20">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className="border border-brand-primary/30 rounded-sm" />
                  ))}
                </div>
                
                {/* Zones as interactive elements */}
                {zones.map((zone, i) => (
                  <motion.div
                    key={zone.name}
                    className={cn(
                      "absolute rounded-full flex items-center justify-center cursor-pointer transition-all",
                      zone.rainfall >= zone.threshold ? "bg-red-500/40 animate-pulse" : "bg-brand-primary/10"
                    )}
                    style={{
                      width: 80,
                      height: 80,
                      left: `${20 + (i % 3) * 30}%`,
                      top: `${20 + Math.floor(i / 3) * 35}%`,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-center">
                      <p className="text-[8px] font-bold uppercase leading-none mb-1">{zone.name}</p>
                      <p className={cn(
                        "text-[10px] font-mono",
                        zone.rainfall >= zone.threshold ? "text-red-400" : "text-brand-primary"
                      )}>{zone.rainfall.toFixed(1)}mm</p>
                    </div>
                  </motion.div>
                ))}

                {/* Worker dots */}
                {workers.map((worker, i) => (
                  <motion.div
                    key={worker.id}
                    className={cn(
                      "absolute w-2 h-2 rounded-full z-10",
                      worker.status === 'paid' ? "bg-brand-primary shadow-[0_0_10px_#00FF41]" : "bg-zinc-500"
                    )}
                    animate={{
                      x: (Math.random() - 0.5) * 20,
                      y: (Math.random() - 0.5) * 20,
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                    style={{
                      left: `${30 + (i * 15) % 60}%`,
                      top: `${30 + (i * 12) % 60}%`,
                    }}
                  />
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button 
                  onClick={triggerManualStorm}
                  className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
                >
                  Simulate Storm (HSR)
                </button>
                <button className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors">
                  Recalibrate Sensors
                </button>
              </div>
            </div>

            {/* Rainfall Chart */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-bold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-primary" />
                  REAL-TIME PRECIPITATION
                </h2>
                <span className="text-[10px] font-mono text-zinc-500">HSR LAYOUT (MM/HR)</span>
              </div>
              
              <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={rainfallHistory}>
                    <defs>
                      <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00FF41" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00FF41" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#525252" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      hide={true}
                    />
                    <YAxis 
                      stroke="#525252" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      domain={[0, 20]}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#141414', border: '1px solid #262626', fontSize: '12px' }}
                      itemStyle={{ color: '#00FF41' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#00FF41" 
                      fillOpacity={1} 
                      fill="url(#colorRain)" 
                      strokeWidth={2}
                      isAnimationActive={false}
                    />
                    {/* Threshold Line */}
                    <Line 
                      type="monotone" 
                      dataKey={() => 15} 
                      stroke="#ef4444" 
                      strokeDasharray="5 5" 
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex items-center gap-4 text-[10px] font-mono">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-brand-primary rounded-full" />
                  <span>LIVE RAINFALL</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span>PAYOUT THRESHOLD (15MM)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Worker Feed */}
          <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-brand-border flex items-center justify-between">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-brand-primary" />
                ACTIVE PARTNER FEED
              </h2>
              <span className="text-[10px] font-mono text-zinc-500">VALIDATING GPS + SHIFT STATUS</span>
            </div>
            <div className="divide-y divide-brand-border">
              {workers.map((worker) => (
                <div key={worker.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold">
                      {worker.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">{worker.name}</p>
                        <span className="text-[10px] font-mono text-zinc-500">{worker.partnerId}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                        <MapPin className="w-3 h-3" />
                        <span>{worker.zone}</span>
                        <span>•</span>
                        <span>{worker.upiId}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-mono text-zinc-500">STATUS</p>
                      <p className={cn(
                        "text-xs font-bold",
                        worker.status === 'active' ? "text-brand-primary" : "text-blue-400"
                      )}>
                        {worker.status === 'active' ? 'ON SHIFT' : 'PAYOUT SENT'}
                      </p>
                    </div>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      worker.status === 'active' ? "bg-brand-primary" : "bg-blue-400 animate-pulse"
                    )} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Payout Logs & Info */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Payout History */}
          <div className="bg-brand-card border border-brand-border rounded-2xl flex flex-col h-full max-h-[800px]">
            <div className="p-6 border-b border-brand-border">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-primary" />
                INSTANT PAYOUT LOG
              </h2>
              <p className="text-[10px] font-mono text-zinc-500 mt-1">AUTOMATED UPI DISBURSEMENTS</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              <AnimatePresence initial={false}>
                {payouts.length === 0 ? (
                  <div className="h-40 flex flex-col items-center justify-center text-zinc-600">
                    <Clock className="w-8 h-8 mb-2 opacity-20" />
                    <p className="text-xs font-mono">WAITING FOR TRIGGER...</p>
                  </div>
                ) : (
                  payouts.map((payout) => (
                    <motion.div 
                      key={payout.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-zinc-900/50 border border-brand-border rounded-xl p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                          <span className="text-xs font-bold text-brand-primary">SUCCESS</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">{payout.timestamp}</span>
                      </div>
                      
                      <div>
                        <p className="text-xs font-bold">{payout.workerName}</p>
                        <p className="text-[10px] text-zinc-400 font-mono">{payout.transactionId}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-brand-border">
                        <div className="text-[10px] text-zinc-500">
                          <p>TRIGGER: RAIN</p>
                          <p>ZONE: HSR</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-brand-primary">₹{payout.amount}</p>
                          <p className="text-[8px] font-mono text-zinc-500">VIA UPI</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <div className="p-6 bg-zinc-900/30 border-t border-brand-border rounded-b-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-zinc-400">Policy Tier</span>
                <span className="text-xs font-bold">Standard (₹59/wk)</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-zinc-400">Max Payout</span>
                <span className="text-xs font-bold">₹2,500</span>
              </div>
              <button className="w-full py-3 bg-brand-primary text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                VIEW FULL AUDIT LOG
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Engine Info */}
          <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-2xl p-6">
            <h3 className="text-xs font-bold text-brand-primary mb-4 uppercase tracking-widest">How it works</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center text-[10px] font-bold text-brand-primary shrink-0">1</div>
                <p className="text-[11px] text-zinc-300">Engine pulls live weather data from IMD & OpenWeatherMap every 60 seconds.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center text-[10px] font-bold text-brand-primary shrink-0">2</div>
                <p className="text-[11px] text-zinc-300">If rainfall exceeds 15mm/hr, the parametric trigger is activated for that zone.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center text-[10px] font-bold text-brand-primary shrink-0">3</div>
                <p className="text-[11px] text-zinc-300">System cross-references worker GPS and shift logs to validate eligibility.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center text-[10px] font-bold text-brand-primary shrink-0">4</div>
                <p className="text-[11px] text-zinc-300">Payout is fired instantly via UPI API. No claims, no wait.</p>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="border-t border-brand-border bg-brand-card p-4">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-[10px] font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              <span>IMD API: CONNECTED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              <span>OPENAQ: CONNECTED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              <span>UPI GATEWAY: READY</span>
            </div>
          </div>
          <p className="text-[10px] font-mono text-zinc-600">© 2026 GIGSHIELD TECHNOLOGIES • BENGALURU, IN</p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, trend, trendColor = "text-brand-primary", sub }: any) {
  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-5 hover:border-brand-primary/30 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-zinc-900 rounded-lg">
          <Icon className="w-4 h-4 text-brand-primary" />
        </div>
        <span className={cn("text-[10px] font-bold font-mono", trendColor)}>{trend}</span>
      </div>
      <div>
        <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-1">{label}</p>
        <p className="text-[9px] text-zinc-600 mt-2">{sub}</p>
      </div>
    </div>
  );
}
