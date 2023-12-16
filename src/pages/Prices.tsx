import {
  Label,
  Table,
  TextInput,
  Button,
  Spinner,
  Alert,
} from "flowbite-react";
import React, { useState, useEffect } from "react";
import { priceProps } from "../interfaces";
import { HiInformationCircle } from "react-icons/hi";

import { useSelector, useDispatch } from "react-redux";

import { fetchPrices } from "../slices/priceSlice";
import { fetchQuantites } from "../slices/quantitySlice";
import { fetchFlavours } from "../slices/flavourSlice";

import DefaultDropdown from "../components/Dropdown";
import { AppDispatch } from "../store";
import axios from "axios";

const Prices = () => {
  const [data, setData] = useState({
    flavourName: "Please Select",
    quantity: "Please Select",
    price: 0,
    priceId: "",
  });
  const [btnTitle, setBtnTitle] = useState("Submit");
  const [errorMessage, setErrorMessage] = useState("");

  const priceSlice = useSelector((state: any) => state.priceSlice);
  const quantitySlice = useSelector((state: any) => state.quantitySlice);
  const flavourSlice = useSelector((state: any) => state.flavourSlice);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPrices());
    dispatch(fetchQuantites());
    dispatch(fetchFlavours());
  }, []);

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
      console.log("priceSlice", data, priceSlice);

      if (
        data.flavourName === "Please Select" &&
        data.quantity == "Please Select"
      ) {
        setErrorMessage("Please select Kgs and Flavours");
        return;
      } else if (data.flavourName === "Please Select") {
        setErrorMessage("Please select Flavours");
        return;
      } else if (data.quantity === "Please Select") {
        setErrorMessage("Please select Kgs");
        return;
      }
      let isFound = false;
      const pricesList = priceSlice.prices;
      pricesList.forEach((item) => {
        if (
          item.flavourName == data.flavourName &&
          item.quantity == data.quantity
        ) {
          isFound = true;
        }
      });
      if (!isFound) {
        const payload = {
          flavourName: data.flavourName,
          quantity: data.quantity,
          price: data.price,
          priceId: "",
        };
        if (btnTitle == "Submit") {
          axios
            .post(`${import.meta.env.VITE_API_KEY}/addprices`, payload)
            .then((response) => {
              console.log(response);
              if (response && response.status == 200) {
                setData({
                  quantity: "Please Select",
                  flavourName: "Please Select",
                  price: 0,
                  priceId: "",
                });
                dispatch(fetchPrices());
              } else {
                console.log("else 200 condition");
              }
            })
            .catch((err) => console.log(err));
        } else {
          payload.priceId = data.priceId;
          setBtnTitle("Submit");

          axios
            .put(`${import.meta.env.VITE_API_KEY}/editprices`, payload)
            .then((response) => {
              console.log(response);
              if (response && response.status == 200) {
                setData({
                  quantity: "Please Select",
                  flavourName: "Please Select",
                  price: 0,
                  priceId: "",
                });
                dispatch(fetchPrices());
              } else {
                console.log("else 200 condition");
              }
            })
            .catch((err) => console.log(err));
        }
      } else {
        setErrorMessage("Flavour Name and Quantity already exist");
      }
    }
  };

  const handleEdit = (item: priceProps) => {
    console.log(item);
    setData({
      quantity: item.quantity,
      flavourName: item.flavourName,
      price: item.price,
      priceId: item.priceId!,
    });
    setBtnTitle("Update");
  };

  const handleDelete = (
    e: React.MouseEvent<Element, MouseEvent>,
    priceId: string
  ) => {
    console.log(priceId);
    if (e) {
      e.preventDefault();
      axios
        .delete(`${import.meta.env.VITE_API_KEY}/deletePrice/${priceId}`)
        .then((response) => {
          if (response && response.status == 200) {
            dispatch(fetchPrices());
          } else {
            console.log("else 200 condition");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="flex flex-col m-[1rem]">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div id="kgsOptionsId">
            {quantitySlice &&
            quantitySlice.quantity &&
            quantitySlice.quantity.length > 0 ? (
              <div className="mb-2 block">
                <DefaultDropdown
                  title="Kgs"
                  options={quantitySlice.quantity}
                  value={data.quantity}
                  keys={["quantityId", "quantityName"]}
                  handleOnChange={(e: string) => {
                    setData({ ...data, quantity: e });
                    console.log(e);
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div id="flavourOptionsId">
            {flavourSlice &&
            flavourSlice.flavour &&
            flavourSlice.flavour.length > 0 ? (
              <div className="mb-2 block">
                <DefaultDropdown
                  title="Flavours"
                  options={flavourSlice.flavour}
                  keys={["flavourId", "flavourName"]}
                  value={data.flavourName}
                  handleOnChange={(e: string) => {
                    console.log(e);
                    setData({ ...data, flavourName: e });
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="enterprice" value="Enter Price" />
            </div>
            <TextInput
              id="enterprice"
              placeholder="Enter Price"
              required
              value={data.price}
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setData({ ...data, price: Number(e.target.value) });
                console.log("e", e.target.value);
              }}
            />
          </div>

          <div>
            {/* <span className="">{errorMessage}</span> */}
            {errorMessage ? (
              <Alert color="failure" icon={HiInformationCircle}>
                <span>
                  <p>
                    <span className="font-medium"></span>
                    {errorMessage}
                  </p>
                </span>
              </Alert>
            ) : (
              ""
            )}
            <div className="mt-2">
              <Button type="submit">{btnTitle}</Button>
            </div>
          </div>
        </form>
      </div>

      <div className="m-4 flex">
        {priceSlice.loading && (
          <div className="text-center">
            <Spinner aria-label="Large spinner example" size="lg" />
          </div>
        )}
        {!priceSlice.loading && priceSlice.prices.length ? (
          <Table>
            <Table.Head>
              <Table.HeadCell>Flavour Name</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {priceSlice.prices &&
                priceSlice.prices.length > 0 &&
                priceSlice.prices.map((item: priceProps) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={item.priceId}
                    >
                      <Table.Cell>{item.flavourName}</Table.Cell>
                      <Table.Cell>{item.quantity}</Table.Cell>
                      <Table.Cell>{item.price}</Table.Cell>
                      <Table.Cell>
                        <div className="flex space-x-3">
                          <a
                            className="font-medium text-cyan-600 hover:underline cursor-pointer dark:text-cyan-500"
                            onClick={() => handleEdit(item)}
                          >
                            <p>Edit</p>
                          </a>
                          <a
                            className="font-medium text-red-600 hover:underline cursor-pointer dark:text-red-500"
                            onClick={(e) => handleDelete(e, item.priceId!)}
                          >
                            <p>Delete</p>
                          </a>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Prices;
