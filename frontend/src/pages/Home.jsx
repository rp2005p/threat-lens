import Upload from "../components/Upload";
import logo from "../assets/logo.png";

export default function Home() {
  

  return (
    <div className="min-h-screen bg-[#020617] text-gray-200 relative overflow-hidden">

      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-yellow-500/10 blur-[160px] rounded-full"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-orange-500/10 blur-[160px] rounded-full"></div>

      <div className="relative z-10 px-8 py-10">

        <div className="grid md:grid-cols-2 items-center gap-10 min-h-[80vh]">

          <div className="space-y-6 max-w-lg mx-auto">

            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              ThreatLens
            </h1>

            <h2 className="text-3xl font-semibold text-white leading-snug">
              See Threats Before They Strike
            </h2>

            <p className="text-gray-400 max-w-md">
              Detect cyber threats using machine learning. Upload network logs and get attack patterns, and risk analysis.
            </p>

            <div className="pt-4 max-w-md">
              <Upload />
            </div>

          </div>

          <div className="flex justify-center relative items-center">

            <div className="absolute w-[550px] h-[550px] bg-yellow-500/20 blur-[160px] rounded-full"></div>
            <div className="absolute w-[400px] h-[400px] border border-yellow-400/20 rounded-full animate-ping"></div>

            <img
              src={logo}
              alt="ThreatLens Logo"
              className="w-[450px] z-10 drop-shadow-[0_0_80px_rgba(245,158,11,0.8)]"
            />

          </div>

        </div>

      </div>
    </div>
  );
}