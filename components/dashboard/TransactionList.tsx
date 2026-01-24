// Ruta: components/dashboard/TransactionList.tsx

interface Transaction {
  id: string
  concept: string 
  amount: number
  created_at: string
}

interface TransactionListProps {
  transactions: Transaction[]
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-sm mt-6">
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-slate-200 font-semibold">Historial de Movimientos</h3>
      </div>
      
      {transactions.length === 0 ? (
        <div className="p-8 text-center text-slate-500 text-sm">
          No hay movimientos recientes.
        </div>
      ) : (
        <ul className="divide-y divide-slate-700">
          {transactions.map((tx) => {
            const isPositive = tx.amount > 0
            return (
              <li key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors">
                <div className="flex flex-col">
                  <span className="text-slate-200 font-medium">{tx.concept}</span>
                  <span className="text-xs text-slate-500">
                    {new Date(tx.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className={`font-mono font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositive ? '+' : ''}{tx.amount}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}