import { useEffect } from "react";
import { useState } from "react";
import NotFound from "../../components/History/NotFound";
import TransactionCard from "../../components/History/TransactionCard";
import Order from "../../services/api/Order";
import ReactLoading from "react-loading";
import moment from "moment/min/moment-with-locales";
import Icon from "../../assets/NoHistory.png"

const History = () => {
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(true);

  const getHistory = async () => {
    try {
      const response = await Order.historyOrder();
      setHistory(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <main className="pb-16">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <ReactLoading type="spin" color="#6AA434" height={36} width={36} />
        </div>
      ) : (
        <div className="">
          {Object.keys(history).length === 0 ? (
            <NotFound icon={Icon} title="Riwayat pesananmu masih kosong" subtitle="Cari kebutuhan produkmu sekarang juga,
            yuk belanja!" />
          ) : (
            <div className="">
              {Object.keys(history).map((item, i) => (
                <div className="" key={i}>
                  <h4 className="mt-3.5 font-bold text-secondary">
                    {moment(item).locale("id").format("LL")}
                  </h4>
                  {history[item].length === 0 ? (
                    <h4 className="my-3 text-center text-sm text-gray-400">
                      Tidak ada order di tanggal ini
                    </h4>
                  ) : (
                    <div className="">
                      {history[item].map((trans, i) => (
                        <div className="" key={i}>
                          <div className="">
                            <TransactionCard
                              id={trans.id}
                              name={trans.no_order}
                              date={trans.transaction_date}
                              status={trans.status}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default History;
