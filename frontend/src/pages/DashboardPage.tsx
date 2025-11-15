export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Total Swaps</h3>
            <p className="text-3xl font-bold text-primary-600">0</p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Tej Coins</h3>
            <p className="text-3xl font-bold text-secondary-600">100</p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Badges Earned</h3>
            <p className="text-3xl font-bold text-primary-600">0</p>
          </div>
        </div>

        <div className="mt-8 card">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-slate-600">No recent activity yet. Start swapping skills!</p>
        </div>
      </div>
    </div>
  );
}
