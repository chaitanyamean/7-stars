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
    axios.get("https://sevenstarbakers.onrender.com/getorders").then((res) => {
      if (res && res.data && res.data.length > 0) {
        setData(res.data);
      }
    });
  }, []);
  return (
    <div className="m-4 flex justify-center">
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
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </Table.Cell>
                  <Table.Cell>{item.mobile}</Table.Cell>
                  <Table.Cell>{item.flavourType}</Table.Cell>
                  <Table.Cell>{item.quantity}</Table.Cell>

                  <Table.Cell>{item.comments}</Table.Cell>
                  <Table.Cell>{item.date}</Table.Cell>
                  <Table.Cell>{item.location}</Table.Cell>
                  <Table.Cell>{item.address}</Table.Cell>
                  <Table.Cell>
                    <img src={item.image} className="h-auto w-40" />
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
}
