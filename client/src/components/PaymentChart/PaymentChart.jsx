import React from "react";
import axios from "axios";

const PaymentChart = ({ orders }) => {
  let count = 0;
  return (
    <div className="w-760">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p- dark:bg-gray-700">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2 dark:text-gray-200">
              Latest Transactions
            </h3>
            <span class="text-base font-normal text-gray-500 dark:text-gray-400">
              This is a list of latest transactions
            </span>
          </div>
          <div class="flex-shrink-0">
            <a
              href="/sellerPay"
              class="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
            >
              View all
            </a>
          </div>
        </div>
        <div class="flex flex-col mt-8">
          <div class="overflow-x-auto rounded-lg">
            <div class="align-middle inline-block min-w-full">
              <div class="shadow overflow-hidden sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 dark:bg-gray-700">
                  <thead class="bg-gray-50 dark:bg-gray-600">
                    <tr>
                      <th
                        scope="col"
                        class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                      >
                        Transaction
                      </th>
                      <th
                        scope="col"
                        class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                      >
                        Date & Time
                      </th>
                      <th
                        scope="col"
                        class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white dark:bg-gray-600">
                    {orders.map((order) => {
                      count++;
                      if (count < 5) {
                        return (
                          <tr>
                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 dark:text-gray-200">
                              Payment from
                              <span class="font-semibold">
                                {" " + order.email}
                              </span>
                            </td>
                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-200">
                              Apr 23 ,2021
                            </td>
                            <td class=" whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-200">
                              $ {order.total}
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

export default PaymentChart;
