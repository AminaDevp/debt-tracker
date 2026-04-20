import { useState, useRef, useEffect } from 'react';
function CustomerList({ onSelectCustomer, debts }) { 
  const [customers, setCustomers] = useState([])
  const [newName, setNewName] = useState("")
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  // تحميل العملاء من localStorage عند فتح التطبيق
 useEffect(() => {
  const savedCustomers = localStorage.getItem("customers")
  if (savedCustomers) setCustomers(JSON.parse(savedCustomers))},[])


  // حفظ العملاء في localStorage عند كل تغيير
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers))
  }, [customers])
 
  // إضافة عميل جديد
  function addCustomer() {
    if (!newName.trim()) return
     const newCustomer = { id: Date.now(), name: newName.trim() }
    setCustomers([...customers, newCustomer])
    setNewName("")
  }

  // حذف عميل
  function deleteCustomer(id) {
    setCustomers(customers.filter(c => c.id !== id))
  }
 function getTotalDebt(customerId) {
  return debts.filter(d => d.customerId === customerId && !d.isPaid).reduce((sum, d) => sum + d.amount, 0)
}

 
  return (
    <div>
      {/* إضافة عميل */}
      <div className="flex gap-2 my-4">
        <input
          ref={inputRef}
          id="customerName"
          type="text"
          placeholder="اسم العميل"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-right text-lg focus:outline-none focus:border-green-500"
        />
        <button
         onClick={addCustomer}
       className="bg-green-600 text-white px-5 py-3 rounded-xl text-lg font-bold active:scale-95 transition"
>
          + إضافة
        </button>
      </div>

      {/* قائمة العملاء */}
      {customers.length === 0 ? (
        <p className="text-center text-gray-400 mt-10 text-lg">لا يوجد عملاء بعد</p>
      ) : (
        customers.map(customer => (
          <div
            key={customer.id}
            className="bg-white rounded-xl shadow p-4 mb-3 flex items-center justify-between"
          >
            <div>
              <p className="text-lg font-bold text-gray-800">{customer.name}</p>
              <p className="text-red-500 font-semibold">
                {getTotalDebt(customer.id)} دينار
              </p>
            </div>
            <div className="flex gap-2">
              <button
  onClick={() => onSelectCustomer(customer)}
  className="bg-green-600 text-white px-5 py-3 rounded-xl text-base font-bold active:scale-95 transition"
>
  فتح
</button>
<button
  onClick={() => deleteCustomer(customer.id)}
  className="bg-red-500 text-white px-5 py-3 rounded-xl text-base font-bold active:scale-95 transition"
>
  حذف
</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
export default CustomerList;