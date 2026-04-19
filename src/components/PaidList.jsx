function PaidList({ customer, onBack, debts, setDebts }) {
  
  // الديون المسددة لهذا العميل فقط
  const paidDebts = debts.filter(
    d => d.customerId === customer.id && d.isPaid
  )

  // تراجع عن التسديد
  function undoPayment(id) {
    setDebts(debts.map(d =>
      d.id === id ? { ...d, isPaid: false } : d
    ))
  }

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
        <h2 className="text-xl font-bold text-gray-800">سجل مدفوعات: {customer.name}</h2>
      </div>

      {/* قائمة المدفوعات */}
      {paidDebts.length === 0 ? (
        <p className="text-center text-gray-400 mt-10 text-lg">لا توجد مدفوعات بعد</p>
      ) : (
        paidDebts.map(debt => (
          <div
            key={debt.id}
            className="bg-white rounded-xl shadow p-4 mb-3 flex items-center justify-between"
          >
            <div>
              <p className="text-lg font-bold text-green-600">{debt.amount} دينار</p>
              <p className="text-gray-400 text-sm">{debt.date}</p>
              {debt.note && <p className="text-gray-600">{debt.note}</p>}
            </div>
            <button
              onClick={() => undoPayment(debt.id)}
              className="bg-orange-500 text-white px-4 py-2 rounded-xl"
            >
              ↩ تراجع
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default PaidList