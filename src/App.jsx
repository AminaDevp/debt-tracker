import { useState,useEffect } from 'react'

import CustomerList from './components/CustomerList'
import DebtList from './components/DebtList'


function App() {
  const [selectedCustomer, setSelectedCustomer] = useState(null)
    // تحميل الديون من localStorage مباشرة عند التهيئة
  const [debts, setDebts] = useState(() => {
    const saved = localStorage.getItem("debts")
    return saved ? JSON.parse(saved): [];
  
  })

  // حفظ الديون في localStorage عند كل تغيير
  useEffect(() => {
    localStorage.setItem("debts", JSON.stringify(debts))
  }, [debts])

  return (
    <div  className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white text-center py-4 text-2xl font-bold shadow">
        📒 دفتر الذمم
           </header>

<div className="w-full max-w-lg mx-auto p-4">
        {selectedCustomer === null ? (
        <CustomerList onSelectCustomer={setSelectedCustomer}    debts={debts} />
      ) : (
        <DebtList
          customer={selectedCustomer}
          onBack={() => setSelectedCustomer(null)}
          debts={debts}
          setDebts={setDebts}/>)} 
</div>
   
    </div>
  )
}

export default App