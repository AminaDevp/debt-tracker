import { useState } from "react";
import PaidList from './PaidList.jsx';

function DebtList({ customer, onBack, debts, setDebts })  {
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [showPaid, setShowPaid] = useState(false)

  // ديون هذا العميل فقط (غير المسددة)
  const customerDebts = debts.filter(
    d => d.customerId === customer.id && !d.isPaid
  )

  // إضافة دين جديد
  function addDebt() {
    if (!amount.trim()) return
    const newDebt = {
      id: Date.now(),
      customerId: customer.id,
      amount: Number(amount),
      note: note.trim(),
      date: new Date().toLocaleDateString("ar-TN"),
      isPaid: false
    }
    setDebts([...debts, newDebt])
    setAmount("")
    setNote("")
  }
   function payDebt(id) {
  setDebts(debts.map(d => 
    d.id === id? { ...d, isPaid: true } : d
  ))
}
if (showPaid) return (
  <PaidList
    customer={customer}
    onBack={() => setShowPaid(false)}
    debts={debts}
    setDebts={setDebts}
  />
)
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between my-4">
        <button
          onClick={onBack}
          className="bg-gray-200 px-4 py-2 rounded-xl text-gray-700"
        >
          ← رجوع
        </button>
        <h2 className="text-xl font-bold text-gray-800">{customer.name}</h2>
        <button
          onClick={() => setShowPaid(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl"
        >
          📋 المدفوعات
        </button>
      </div>

      {/* إضافة دين */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <p className="text-gray-600 font-semibold mb-2">إضافة دين جديد</p>
        <input
          id="debtAmount"
          type="number"
          placeholder="المبلغ"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-right text-lg mb-2 focus:outline-none focus:border-green-500"
        />
        <input
          id="debtNote"
          type="text"
          placeholder="ملاحظة (اختياري)"
          value={note}
          onChange={e => setNote(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-right text-lg mb-2 focus:outline-none focus:border-green-500"
        />
        <button
          onClick={addDebt}
          className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-bold"
        >
          + إضافة دين
        </button>
      </div>

      {/* قائمة الديون */}
      {customerDebts.length === 0 ? (
        <p className="text-center text-gray-400 mt-10 text-lg">لا توجد ديون 🎉</p>
      ) : (
        customerDebts.map(debt => (
          <div
            key={debt.id}
            className="bg-white rounded-xl shadow p-4 mb-3 flex items-center justify-between"
          >
            <div>
              <p className="text-lg font-bold text-red-500">{debt.amount} دينار</p>
              <p className="text-gray-400 text-sm">{debt.date}</p>
              {debt.note && <p className="text-gray-600">{debt.note}</p>}
            </div>
            <button
              onClick={() => payDebt(debt.id)}
              className="bg-green-600 text-white px-4 py-2 rounded-xl"
            >
              ✅ تسديد
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default DebtList;