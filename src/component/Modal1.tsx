import React from "react";
import { useGlobalContext } from "../context";
import { Modal } from "antd";

const Modal1 = () => {
  const { isModalOpen, closeModal, correct, questions } = useGlobalContext();
  return (
    <div>
      <Modal
        // title="Modal 1000px width"
        centered
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
        width={600}
        maskClosable={false}
      >
        <div className="flex  flex-col">
          <h1 className="text-[25px] text-[#333] text-center font-semibold">
            Congratulation ! 🎉{" "}
          </h1>
          <div className="text-[22px] text-center py-5 flex items-center justify-center ">
            The number of points you achieved :{" "}
            <span className="block text-red-500 text-[27px]">
              {Math.floor((correct / questions.length) * 10)}
            </span>
          </div>
          <h1 className="text-red-500 text-[30px] text-center font-mono">
            {correct < 3
              ? "Bạn gà vcl 🐤🐥🐣"
              : correct >= 3 && correct <= 6
              ? "Cố gắng lên !! 💪"
              : correct > 6 && correct < 8
              ? "Khá Tốt 🤞"
              : "Bạn là Thiên Tài 🤴"}
          </h1>
          <button
            onClick={closeModal}
            className="bg-orange-300 py-2 px-4 my-6 text-[18px] text-white font-medium hover:bg-blue-700 rounded-md transition-all"
          >
            Play Again
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Modal1;
