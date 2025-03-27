"use client";

// Global Imports
import React, { Component } from "react";
// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
import { Select, SelectItem } from "@nextui-org/select";

// Local Imports
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends Component {
  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "Pie Chart",
        fontColor: "#f37d2d",
        horizontalAlign: "left",
        margin: 25,
      },
      colorSet: "customColorSet",
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          yValueFormatString: "#,###'%'",
          dataPoints: [
            { name: "Mobile", y: 40 },
            { name: "Laptop", y: 25 },
            { name: "Tab", y: 5 },
            { name: "Desktop", y: 30 },
          ],
        },
      ],
    };

    // Define custom color set
    CanvasJS.addColorSet("customColorSet", [
      "#F27D32",
      "#AC5924",
      "#F6A876",
      "#663515",
    ]);

    return (
      <div className="col-span-2 relative ">
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />

        <div className="absolute top-0  right-5">
          {" "}
          <Select
            defaultSelectedKeys={"sales"}
            placeholder="Types of Sales"
            classNames={{
              label: "text-customPrimary-500",
              trigger:
                "h-5 min-w-40  text-customPrimary-500 bg-transparent rounded-lg border-none  self-end group-data-[focus=true]:bg-transparent data-[hover=true]:bg-customPrimary-50 text-customPrimary-500 ",
              mainWrapper:
                "w-full text-customPrimary-500  data-[hover=true]:bg-customPrimary-50",
              innerWrapper: "text-customPrimary-500 ",
              popoverContent:
                "bg-white text-customPrimary-500 w-fit p-2 data-[hover=true]:bg-customPrimary-500",

              value:
                "data-[selected=true]:bg-customPrimary-500 group-data-[has-value=true]:text-customPrimary-500 data-[selectable=true]:focus:bg-customPrimary-500 data-selected:bg-customPrimary-50",
              listbox:
                "data-selected:bg-customPrimary-50  data-[hover=true]:bg-customPrimary-50  ",
            }}
            listboxProps={{
              itemClasses: {
                base: [
                  "rounded-md",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-black",
                  "data-[hover=true]:bg-customPrimary-50",
                  "dark:data-[hover=true]:bg-customPrimary-50",
                  "data-[selectable=true]:focus:bg-customPrimary-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              },
            }}
          >
            <SelectItem key="sales" value="sales">
              Types of Sales
            </SelectItem>
            <SelectItem key="product-sales" value="product-sales">
              Product sales
            </SelectItem>
            <SelectItem key="repairs" value="repairs">
              Repairs
            </SelectItem>
            <SelectItem key="recycles" value="recycles">
              Recycles
            </SelectItem>
            <SelectItem key="bought-items" value="bought-items">
              Bought Items
            </SelectItem>
            <SelectItem key="expenses" value="expenses">
              Expenses
            </SelectItem>
          </Select>
        </div>
      </div>
    );
  }
}

export default Chart;
