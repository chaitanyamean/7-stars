import { useEffect, useState } from "react";
import { Table } from "flowbite-react";

import axios from "axios";
// const Dashboard = () => {
//   return <div>Dashboard</div>;
// };

// export default Dashboard;

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // console.log(import.meta.env.VITE_API_KEY + "/getOrders");
    console.log(import.meta.env.VITE_API_KEY);
    axios.get(`${import.meta.env.VITE_API_KEY}/getorders`).then((res) => {
      if (res && res.data && res.data.length > 0) {
        setData(res.data);
      }
    });
  }, []);
  return (
    <div className="m-4 flex">
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>mobile</Table.HeadCell>
          <Table.HeadCell>flavourType</Table.HeadCell>
          <Table.HeadCell>quantity</Table.HeadCell>
          <Table.HeadCell>Comments</Table.HeadCell>
          <Table.HeadCell>date</Table.HeadCell>
          <Table.HeadCell>location</Table.HeadCell>
          <Table.HeadCell>address</Table.HeadCell>
          <Table.HeadCell>image</Table.HeadCell>
          <Table.HeadCell>Total</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data &&
            data.length > 0 &&
            data.map((item: any) => {
              return (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={item.orderId}
                >
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.mobile}</Table.Cell>
                  <Table.Cell>{item.flavourType}</Table.Cell>
                  <Table.Cell>{item.quantity}</Table.Cell>

                  <Table.Cell>{item.comments}</Table.Cell>
                  <Table.Cell>{item.date}</Table.Cell>
                  <Table.Cell>{item.location}</Table.Cell>
                  <Table.Cell>{item.address}</Table.Cell>
                  <Table.Cell>
                    <a
                      href={item.image}
                      target="_blank"
                      className="text-blue-600"
                    >
                      {item.image ? "View" : ""}
                    </a>
                  </Table.Cell>
                  <Table.Cell>{item.price}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
}
