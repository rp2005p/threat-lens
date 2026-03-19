import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function Dashboard({ data }) {
  if (!data) return null;

  const donutData = [
    { name: "Normal", value: data.normal },
    { name: "Attacks", value: data.attacks },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-gray-200 p-6 space-y-6">

      {/* 🔥 HEADING */}
      <h1 className="text-3xl font-bold text-white drop-shadow[0_0_10px_rgba(225, 225, 225, 0.7)] tracking-wide">
        Dashboard Insights
      </h1>

      {/* 🔥 CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <Card title="Total Traffic" value={data.total} />
        <Card title="Attacks" value={data.attacks} color="text-yellow-400" />
        <Card title="Normal" value={data.normal} color="text-green-400" />
        <Card
          title="Risk Level"
          value={data.attack_percentage.toFixed(1) + "%"}
          color="text-orange-400"
        />

      </div>

      {/* 🔥 CHARTS */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* 🍩 DONUT */}
        <GlassCard title="Traffic Distribution">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#043215" />
                  <stop offset="100%" stopColor="#22d339" />
                </linearGradient>

                <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e9c431" />
                  <stop offset="100%" stopColor="#69470d" />
                </linearGradient>
              </defs>

              <Pie
                data={donutData}
                innerRadius={65}
                outerRadius={100}
                dataKey="value"
              >
                <Cell fill="url(#greenGrad)" />
                <Cell fill="url(#goldGrad)" />
              </Pie>

              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* 📊 BAR */}
        <GlassCard title="Attack Density">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.density}>
              <defs>
                <linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f7d449" />
                  <stop offset="100%" stopColor="#613f05" />
                </linearGradient>
              </defs>

              <XAxis dataKey="segment" stroke="#fff" tick={{ fill: "#fff" }} />
              <YAxis stroke="#fff" tick={{ fill: "#fff" }} />
              <Tooltip contentStyle={tooltipStyle} />

              <Bar
                dataKey="attacks"
                fill="url(#barGold)"
                radius={[25, 25, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* 📈 AREA */}
        <GlassCard title="Attack Flow">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data.density}>
              <defs>
                <linearGradient id="areaGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#facc15" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#000" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="segment" stroke="#fff" tick={{ fill: "#fff" }} />
              <YAxis stroke="#fff" tick={{ fill: "#fff" }} />
              <Tooltip contentStyle={tooltipStyle} />

              <Area
                type="monotone"
                dataKey="attacks"
                stroke="#facc15"
                strokeWidth={2}
                fill="url(#areaGold)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

      </div>

      {/* 🔥 TABLE WITH INTELLIGENT ROW STYLING */}
      <GlassCard title="Service Risk Analysis">
        <table className="w-full text-sm text-gray-300 text-center">
          <thead>
            <tr className="text-yellow-400 border-b border-gray-700">
              <th className="py-2 text-left">Service</th>
              <th>Total</th>
              <th>Attacks</th>
              <th>Risk %</th>
            </tr>
          </thead>

          <tbody>
            {data.services.map((row, i) => {
              const isHigh = row.rate > 50;

              return (
                <tr
                  key={i}
                  className={`
                    border-b border-gray-800 transition
                    ${isHigh 
                      ? "bg-[#111827] hover:bg-[#1f2937]"   // 🔥 darker rows
                      : "bg-[#020617] hover:bg-gray-800/30"} // lighter rows
                  `}
                >
                  <td className="py-3 text-left">{row.service}</td>
                  <td>{row.total}</td>

                  {/* 🔥 ATTACK TEXT GLOW */}
                  <td className="text-yellow-300 font-semibold">
                    {row.attacks}
                  </td>

                  {/* 🔥 PROGRESS BAR */}
                  <td>
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-300 to-orange-400"
                          style={{ width: `${row.rate}%` }}
                        />
                      </div>
                      <span>{row.rate}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </GlassCard>

    </div>
  );
}

/* 🔥 CARD */
function Card({ title, value, color = "text-white" }) {
  return (
    <div className="bg-gradient-to-br from-[#0f172a] to-[#020617]
      border border-gray-700 p-5 rounded-2xl
      shadow-[0_10px_30px_rgba(0,0,0,0.7)]
      hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]
      transition transform hover:-translate-y-1">

      <p className="text-white text-sm mb-1 uppercase tracking-wide font-medium">
        {title}
      </p>

      <h2 className={`text-2xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}

/* 🔥 GLASS CARD */
function GlassCard({ title, children }) {
  return (
    <div className="bg-gradient-to-br from-[#020617]/90 to-[#020617]/70
      backdrop-blur-md border border-gray-700
      p-5 rounded-2xl
      shadow-[0_10px_40px_rgba(0,0,0,0.9)]
      hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]
      transition">

      <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">
        {title}
      </h3>

      {children}
    </div>
  );
}

/* 🔥 TOOLTIP */
const tooltipStyle = {
  background: "#020617",
  border: "1px solid #444",
  color: "#fff",
};