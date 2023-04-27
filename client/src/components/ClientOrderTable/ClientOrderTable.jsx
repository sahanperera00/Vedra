import React from "react";
import { Link } from "react-router-dom";

const ClientOrderTable = ({ order }) => {
  let count = 0;
  console.log("Order from order Table", order);
  return (
    <div>
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 dark:bg-gray-700">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2 dark:text-gray-200">
              Latest Orders
            </h3>
            <span class="text-base font-normal text-gray-500 dark:text-gray-200">
              Recent Purchases
            </span>
          </div>
          <div class="flex-shrink-0">
            <Link
              to="/sellerPay"
              class="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2 dark:text-blue-200"
            >
              View all
            </Link>
          </div>
        </div>
        <div class="flex flex-col mt-8">
          <div class="overflow-x-auto rounded-lg">
            <div class="align-middle inline-block min-w-full">
              <div class="shadow overflow-hidden sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-200"
                      >
                        Order
                      </th>
                      <th
                        scope="col"
                        class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-200"
                      >
                        Date & Time
                      </th>
                      <th
                        scope="col"
                        class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-200"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-200"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white dark:bg-gray-700">
                    {order.map((order) => {
                      count++;
                      if (count < 5) {
                        return (
                          <tr>
                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 dark:text-gray-200">
                              <span class="font-semibold">
                                {" " + order._id}
                              </span>
                            </td>
                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-200">
                              {new Date().toISOString().split("T")[0]}
                            </td>
                            <td class=" whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-200">
                              $ {order.total.toFixed(2)}
                            </td>
                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 dark:text-gray-200">
                              <span class="font-semibold">
                                {" " + order.status}
                              </span>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOrderTable;
