import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons"; // Import icon DownOutlined từ Ant Design hoặc thư viện icon khác
import { Button, Flex, InputNumber } from "antd";
import { Select, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useGlobalContext } from "../context";

const SetForm = () => {
  const { quiz, handleChange, handleSubmit } = useGlobalContext();
  return (
    <div className="flex items-center justify-center h-full mt-20 ">
      <div className="bg-white py-6 px-4 w-[500px] rounded-lg">
        <Title level={1} className="text-center">
          Quiz - NMT
        </Title>

        <Flex gap="middle" vertical>
          <Flex vertical gap="6px">
            <Title level={5}>Number Of Questions</Title>
            <input
              type="number"
              name="amount"
              id="amount"
              value={quiz.amount}
              onChange={handleChange}
              className="border-[2px] py-2 px-3 rounded-md cursor-pointer"
              min={1}
              max={30}
            />
          </Flex>
          <Flex vertical gap="6px">
            <Title level={5}>Category</Title>
            <select
              name="category"
              id="category"
              className="border-[2px] py-2 px-3 rounded-md cursor-pointer"
              value={quiz.category}
              onChange={handleChange}
            >
              <option value="sports">Sports</option>
              <option value="geography">Geography</option>
              <option value="history">History</option>
            </select>
          </Flex>

          <Flex vertical gap="6px">
            <Title level={5}>Select Difficulty</Title>
            <select
              name="difficulty"
              id="difficulty"
              className="border-[2px] py-2 px-3 rounded-md cursor-pointer"
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </Flex>

          <Button
            type="primary"
            className="text-red-500 text-[16px] bg-orange-300 font-medium my-5"
            onClick={handleSubmit}
          >
            Start
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default SetForm;
