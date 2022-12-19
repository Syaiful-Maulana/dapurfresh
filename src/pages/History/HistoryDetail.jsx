import { FaMapMarkerAlt } from "react-icons/fa";
import { BsCash } from "react-icons/bs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ReactLoading from"react-loading"
import NavHeader from "../../components/Header/NavHeader";
import Popup from "reactjs-popup";
import moment from "moment/min/moment-with-locales";
import Order from "../../services/api/Order";
import SweetAlert from "../../components/SweetAlert"

const HistoryDetail = () => {
  const { id } = useParams();
  const [history, setHistory] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const closeModal = () => setOpen(false);
  const contentStyle = { background: "#000" };
  const overlayStyle = { background: "rgba(0,0,0,0.5)" };

  const setStatus = async () => {
    await Order.historyStatus(id);
    setOpen(false);
    await SweetAlert({title : "Order Berhasil dibatalkan", icon: "success"})
  };

  const getOrder = async () => {
    try {
      const response = await Order.orderDetail(id);
      setHistory(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrder();
  }, [history]);

  return (
    <>
      <NavHeader title="Detail Riwayat Transaksi" />
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <ReactLoading type="spin" color="#6AA434" height={36} width={36} />
        </div>
      ) : (
        <div className="text-[#888888] m-[-15px]">
          <div className="mt-3 px-3.5 py-3 flex flex-row shadow-[0_1px_5px_0px_rgba(0,0,0,0.05)] font-semibold">
            <h6 className="basis-1/2 text-xs">
              Status :{" "}
              <span
                className={`${
                  history.status === "Proses" ? "text-success" : "text-danger"
                } font-bold `}
              >
                {history.status}
              </span>
            </h6>
            <h6 className="basis-1/2 text-xs text-right">
              Diterima :{" "}
              <span className="text-neutral-500 font-bold">
                {moment(history.transaction_date).locale("id").format("ll")}
              </span>
            </h6>
          </div>
          <div className="mt-2 px-3.5 pb-5 border-b border-dark">
            <h6 className="text-xs font-semibold">Detail Pemesan</h6>
            <h5 className="mt-2 text-xs font-bold text-secondary">
              {history.name}
            </h5>
          </div>
          <div className="mt-2 px-3.5 pb-5 border-b border-dark">
            <h6 className="text-xs font-semibold">Detail Pengantaran</h6>
            <div className="flex text-primary mt-2.5">
              <FaMapMarkerAlt size={24} />
              <div className="pl-3 text-xs text-secondary">
                <h6 className="font-medium">Lokasi Tujuan</h6>
                <h6 className="font-bold">{history.address}</h6>
              </div>
            </div>
          </div>
          <div className="mt-2 px-3.5 pb-5 border-b border-dark text-xs font-semibold">
            <h6>Detail Pesanan</h6>
            {history.order_items.map((item, index) => (
              <div
                className="mt-2.5 grid grid-cols-2 text-secondary font-bold"
                key={index}
              >
                <h6>{item.product_name}</h6>
                <h6 className="text-right">
                  {item.qty} x {item.unit}
                </h6>
              </div>
            ))}
            <h6 className="my-2.5">Catatan Tambahan</h6>
            <p className="text-secondary">{history.note}</p>
          </div>
          <div className="mt-2 px-3.5 pb-5 border-b text-xs font-semibold">
            <h6>Detail Pembayaran</h6>
            <div className="mt-2.5 pb-5 grid grid-cols-3 border-b-2 border-dashed border-dark text-secondary font-bold">
              <h6 className="col-span-2">Subtotal</h6>
              <h6 className="text-right">Rp.{history.sub_total}</h6>
              <h6 className="col-span-2 mt-2">Ongkos Kirim</h6>
              <h6 className="text-right mt-2">Rp.{history.delivery_cost}</h6>
            </div>
            <div className="mt-3.5 pb-5 grid grid-cols-3 border-b-2 border-dashed border-dark text-secondary font-bold">
              <h6 className="col-span-2">Total</h6>
              <h6 className="text-right">Rp.{history.total}</h6>
            </div>
            <div className="mt-3.5 mx-[-14px] px-3.5 pb-5 grid grid-cols-3 border-b-2 text-secondary font-bold">
              <h6 className="col-span-2">Bayar TUNAI</h6>
              <h6 className="text-right">
                <BsCash className="inline" size={24} color="#8E9194" /> Rp.
                {history.total}
              </h6>
            </div>
          </div>
          <div className="mx-3.5 py-3.5">
            <button
              className={`${
                history.status !== "Batal"
                  ? "py-3.5 w-full bg-primary rounded-md font-bold text-white"
                  : "hidden"
              }`}
            >
              Bantuan
            </button>
            <button
              className={`${
                history.status === "Proses"
                  ? "mt-2.5 py-3.5 w-full border-2 border-[#9FA3A6] shadow-[0_1px_5px_0px_rgba(0,0,0,0.25)] rounded-md font-bold text-[#9FA3A6]"
                  : "hidden"
              }`}
              onClick={() => setOpen((o) => !o)}
            >
              Batalkan Pesanan
            </button>
            <Popup
              open={open}
              closeOnDocumentClick
              onClose={closeModal}
              {...{ contentStyle, overlayStyle }}
            >
              <div className="bg-white w-[310px] h-[127px] rounded-[5px] p-[15px]">
                <h4 className="">Apakah kamu yakin untuk batalin pesanan?</h4>
                <div className="mt-5 text-right">
                  <button
                    className="text-sm font-semibold text-primary"
                    onClick={closeModal}
                  >
                    Tidak Yakin
                  </button>
                  <button
                    className="ml-3 text-sm font-semibold text-neutral-400"
                    onClick={setStatus}
                  >
                    {" "}
                    Yakin
                  </button>
                </div>
              </div>
            </Popup>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryDetail;
