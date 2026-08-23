import { useState } from "react"
import Faq from "../../components/common/Faq"
import employeeManagementFAQs from "../../data/mock/faq"

const FaqContainer = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleQuestion = (id:number) => setOpenId(openId === id ? null: id);

  return (
    <div className="w-[50%] mx-auto">
        <h1>Frequently Asked Questions</h1>
        {employeeManagementFAQs.map((faq) => <Faq key={faq.id} {...faq} openId={openId} toggleQuestion={toggleQuestion}/>)}
    </div>
  )
}

export default FaqContainer