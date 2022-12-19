import { Link } from "react-router-dom";
import moment from "moment/min/moment-with-locales"

const TransactionCard = ({status, name, date, id}) => {
  return ( 
    <Link to={`/history/${id}`} className="mt-3.5 px-2.5 py-4 flex flex-row bg-white rounded-[5px] shadow-[0_2px_4px_0px_rgba(0,0,0,0.12)] text-secondary">
      <div className="basis-5/6">
        <h6 className="text-sm font-semibold">{name}</h6>
        <span className="text-xs">{moment(date).locale('id').format('LLL')}</span>
      </div>
      <div className={`py-1 w-[60px] h-fit rounded-full text-center text-xs text-white font-medium ${status === "Proses" ? "bg-success" : "bg-danger"}`}>
        <span>
          {status === "Proses" ? "Proses" : "Batal"}
        </span>
      </div>
    </Link>
   );
}
 
export default TransactionCard;