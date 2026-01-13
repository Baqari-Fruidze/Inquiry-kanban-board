




export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center items-start">
      <main className="min-w-3xl max-w-screen-2xl bg-gradient-to-r from-purple-700 to-pink-500 min-h-screen p-6 shadow-2xl flex flex-col items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/30 border-t-white" />
      </main>
    </div>
  )
}
