import React from 'react';

export default function Subscription() {
    // const payoutData = [
    //   { title: "Today", value: 20 },
    //   { title: "This Month", value: 200 },
    //   { title: "Total", value: 2000 },
    // ];

    // const historyData = [
    //   { date: "16-02-2025", time: "9:00 AM", client: "Heemesh", status: "Approved", amount: "₹499", help: true },
    //   { date: "16-02-2025", time: "8:58 AM", client: "Heemesh", status: "Failed", amount: "₹499", help: true },
    //   { date: "10-02-2025", time: "10:40 PM", client: "Sajid", status: "Failed", amount: "₹1000", help: true },
    //   { date: "07-02-2025", time: "7:15 PM", client: "Harsh", status: "Approved", amount: "₹800", help: true },
    //   { date: "06-02-2025", time: "12:40 PM", client: "Mahesh", status: "Approved", amount: "₹2200", help: true },
    //   { date: "04-02-2025", time: "8:40 AM", client: "Yogita", status: "Approved", amount: "500", help: true },
    // ];

    return (
        <div className=" max-md:w-[100vw] h-full w-[81vw] flex flex-col bg-bgmain">

            <h1>
                Work on it
            </h1>

            {/* Top Section */}

            {/* <div className="h-[20%] flex justify-evenly items-center">
        {payoutData.map((data, index) => (
          <div key={index} className="w-[20%] h-28 bg-white rounded-lg flex flex-col justify-center shadow-md">
            <h1 className="text-xl pl-3 pt-2 font-semibold">
              {data.title}
            </h1>
            <p className="text-2xl pl-3 font-medium text-gray-600">
              ${data.value}
            </p>
          </div>
        ))}
      </div> */}

            {/* Table Section */}
            {/* <div className="h-[80%] bg-white overflow-y-scroll p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-4">History</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-sm font-semibold text-gray-700 border-b">Date</th>
              <th className="p-3 text-sm font-semibold text-gray-700 border-b">Time</th>
              <th className="p-3 text-sm font-semibold text-gray-700 border-b">Client</th>
              <th className="p-3 text-sm font-semibold text-gray-700 border-b">Status</th>
              <th className="p-3 text-sm font-semibold text-gray-700 border-b">Amount</th>
              <th className="p-3 text-sm font-semibold text-gray-700 border-b">Help</th>
            </tr>
          </thead> */}

            {/* <tbody>
            {historyData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 text-sm border-b">{item.date}</td>
                <td className="p-3 text-sm border-b">{item.time}</td>
                <td className="p-3 text-sm border-b">{item.client}</td>
                <td
                  className={`p-3 text-sm border-b font-semibold ${item.status === "Approved" ? "text-green-500" : "text-red-500"
                    }`}
                >
                  {item.status}
                </td>

                <td className="p-3 text-sm border-b">{item.amount}</td>
                <td className="p-3 text-sm border-b">
                  {item.help && (
                    <button className="text-green-500 hover:text-green-700">
                      <i className="fas fa-headset"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody> */}
          
            {/* </table>
      </div> */}
        </div>
    );
}
