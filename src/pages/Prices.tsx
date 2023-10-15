import { Label, Table, TextInput, Button } from "flowbite-react";
import React, { useEffect } from "react";
import { priceProps } from "../interfaces";

import { useSelector, useDispatch } from "react-redux";

import { fetchPrices } from "../slices/priceSlice";
import { fetchQuantites } from "../slices/quantitySlice";
import { fetchFlavours } from "../slices/flavourSlice";

import DefaultDropdown from "../components/Dropdown";
import { AppDispatch } from "../store";

const Prices = () => {
  const priceSlice = useSelector((state: any) => state.priceSlice);
  const quantitySlice = useSelector((state: any) => state.quantitySlice);
  const flavourSlice = useSelector((state: any) => state.flavourSlice);

  console.log("priceSlice", priceSlice, quantitySlice, flavourSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPrices());
    dispatch(fetchQuantites());
    dispatch(fetchFlavours());
  }, []);

  const onSubmit = () => {};

  return (
    <div className="flex flex-col justify-center">
      <form
        className="flex max-w-md flex-col justify-center gap-4 m-2"
        onSubmit={onSubmit}
      >
        <div>
          <div className="max-w-md" id="kgsOptionsId">
            {quantitySlice &&
            quantitySlice.quantity &&
            quantitySlice.quantity.length > 0 ? (
              <div className="mb-2 block">
                <DefaultDropdown
                  title="Kgs"
                  options={quantitySlice.quantity}
                  keys={["quantityId", "quantityName"]}
                  handleOnChange={(e: string) =>
                    // setData({ ...data, quantity: e })
                    console.log(e)
                  }
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="max-w-md" id="kgsOptionsId">
            {flavourSlice &&
            flavourSlice.flavour &&
            flavourSlice.flavour.length > 0 ? (
              <div className="mb-2 block">
                <DefaultDropdown
                  title="Kgs"
                  options={flavourSlice.flavour}
                  keys={["flavourId", "flavourName"]}
                  handleOnChange={(e: string) =>
                    // setData({ ...data, quantity: e })
                    console.log(e)
                  }
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
              placeholder="Enter Pricee"
              required
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                // setData({ ...data, mobile: e.target.value })
                console.log("e", e.target.value)
              }
            />
          </div>

          <div>
            <div className="mt-2">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </div>
      </form>
      <div className="m-4 flex max-w-xs">
        {priceSlice.loading && <div>Loading...</div>}
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
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            href="/tables"
                          >
                            <p>Edit</p>
                          </a>
                          <a
                            className="font-medium text-red-600 hover:underline dark:text-red-500"
                            href="/tables"
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
    </div>
  );
};

export default Prices;
